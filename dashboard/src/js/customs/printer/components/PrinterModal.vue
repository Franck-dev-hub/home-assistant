<script setup>
import {computed} from "vue";
import {IconBed, IconBulb, IconClock, IconExternalLink, IconPlayerPause, IconPlayerPlay, IconPlayerStop, IconStack2, IconTemperature, IconWind} from "@tabler/icons-vue";
import {mdiPrinter3d, mdiPrinter3dNozzleHeat, mdiPrinter3dOff} from "@mdi/js";

import {printerStateColor, printerStateLabel} from "../constants/printerStates.js";
import {pressButton, setNumberValue} from "../../../api/toggleEntity.js";
import {useOptimisticValue} from "../../../composables/useOptimisticValue.js";
import ToggleSwitch from "../../../components/ToggleSwitch.vue";
import Modal from "../../../components/Modal.vue";
import MdiIcon from "../../../components/MdiIcon.vue";

const props = defineProps({
    printer: {type: Object, required: true},
    powerActive: {type: Boolean, required: true},
    open: {type: Boolean, default: false},
});
defineEmits(["close", "toggle-power"]);

// Moonraker sensors report "unknown"/"unavailable" for a few seconds while it reconnects after power-on
const isConnecting = computed(() => {
    if (!props.powerActive) return false;
    return !props.printer.state || props.printer.state === "unknown" || props.printer.state === "unavailable";
});
const isPrinting = computed(() => props.printer.state === "printing" || props.printer.state === "paused");
const progressPercent = computed(() => Math.round(parseFloat(props.printer.progress ?? 0)));

const stateColors = computed(() => printerStateColor(props.printer.state, props.powerActive));

const statusText = computed(() => {
    if (!props.powerActive) return "Éteinte";
    if (isConnecting.value) return "Connexion...";
    const label = printerStateLabel(props.printer.state);
    return isPrinting.value ? `${label} ${progressPercent.value}%` : label;
});

const {value: lightActive, commit: commitLight} = useOptimisticValue(() => props.printer.light.value > 0);
function toggleLight() {
    const next = !lightActive.value;
    commitLight(next, () => setNumberValue(props.printer.light.id, next ? 100 : 0));
}

const isPaused = computed(() => props.printer.state === "paused");
function togglePause() {
    pressButton(isPaused.value ? props.printer.resumeButton : props.printer.pauseButton);
}
function cancelPrint() {
    pressButton(props.printer.cancelButton);
}

// Built once (not in a computed) so each fan keeps the same optimistic override across polls;
// the getter re-reads props.printer.fans by id on every access, so it still tracks live data.
const fanControls = new Map(props.printer.fans.map(fan => [
    fan.id,
    useOptimisticValue(() => props.printer.fans.find(f => f.id === fan.id)?.value ?? 0),
]));

function fanValue(fan) {
    return Math.round(fanControls.get(fan.id).value.value);
}
function onFanInput(fan, event) {
    fanControls.get(fan.id).setLocal(Number(event.target.value));
}
function onFanChange(fan, event) {
    const value = Number(event.target.value);
    fanControls.get(fan.id).commit(value, () => setNumberValue(fan.id, value));
}
</script>

<template>
  <Modal
    :open="open"
    @close="$emit('close')"
  >
    <section class="printer-modal-section glass">
      <div class="printer-power-row">
        <div
          class="printer-icon-circle"
          :style="{color: stateColors.color, background: stateColors.background}"
        >
          <MdiIcon
            :path="powerActive ? mdiPrinter3d : mdiPrinter3dOff"
            :size="22"
          />
        </div>
        <div class="printer-power-info">
          <div class="printer-power-name">
            {{ printer.name }}
          </div>
          <div class="printer-power-status">
            {{ statusText }}
          </div>
        </div>
        <ToggleSwitch
          :active="powerActive"
          @click="$emit('toggle-power')"
        />
      </div>
    </section>

    <section
      v-if="powerActive && !isConnecting"
      class="printer-modal-section glass"
    >
      <div
        v-if="isPrinting"
        class="printer-progress-bar"
      >
        <div
          class="printer-progress-fill"
          :style="{width: `${progressPercent}%`}"
        />
      </div>
      <div class="printer-badges">
        <span class="printer-badge">
          <MdiIcon :path="mdiPrinter3dNozzleHeat" :size="14" />
          {{ printer.extruderTemp }}°C
        </span>
        <span class="printer-badge">
          <IconBed :size="14" :stroke-width="2" />
          {{ printer.bedTemp }}°C
        </span>
        <span class="printer-badge">
          <IconTemperature :size="14" :stroke-width="2" />
          {{ printer.chamberTemp }}°C
        </span>
        <span class="printer-badge">
          <IconClock :size="14" :stroke-width="2" />
          {{ printer.timeLeft }} h
        </span>
        <span class="printer-badge">
          <IconStack2 :size="14" :stroke-width="2" />
          {{ printer.currentLayer }}/{{ printer.totalLayer }}
        </span>
      </div>
    </section>

    <section
      v-if="powerActive && !isConnecting"
      class="printer-modal-section glass"
    >
      <div class="printer-icon-button-row">
        <button
          type="button"
          class="printer-icon-button"
          :class="{on: lightActive}"
          @click="toggleLight"
        >
          <IconBulb :size="20" :stroke-width="2" />
        </button>
        <button
          v-if="isPrinting"
          type="button"
          class="printer-icon-button warm"
          @click="togglePause"
        >
          <component
            :is="isPaused ? IconPlayerPlay : IconPlayerPause"
            :size="20"
            :stroke-width="2"
          />
        </button>
        <button
          v-if="isPrinting"
          type="button"
          class="printer-icon-button danger"
          @click="cancelPrint"
        >
          <IconPlayerStop :size="20" :stroke-width="2" />
        </button>
      </div>
      <div
        v-for="fan in printer.fans"
        :key="fan.id"
        class="printer-control-row"
      >
        <IconWind :size="18" :stroke-width="2" />
        <span class="printer-control-label">{{ fan.name }}</span>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          class="printer-fan-slider"
          :value="fanValue(fan)"
          @input="onFanInput(fan, $event)"
          @change="onFanChange(fan, $event)"
        >
        <span class="printer-fan-value">{{ fanValue(fan) }}%</span>
      </div>
    </section>

    <section
      v-if="powerActive && !isConnecting"
      class="printer-modal-section glass"
    >
      <a
        :href="printer.interfaceUrl"
        target="_blank"
        rel="noopener"
        class="printer-open-link"
      >
        Ouvrir Fluidd <IconExternalLink :size="16" :stroke-width="2" />
      </a>
    </section>

    <section
      v-if="powerActive && !isConnecting && printer.cameraStreamUrl"
      class="printer-modal-section glass"
    >
      <img
        :src="printer.cameraStreamUrl"
        alt="Flux camera imprimante"
        class="printer-camera"
      >
    </section>
  </Modal>
</template>
