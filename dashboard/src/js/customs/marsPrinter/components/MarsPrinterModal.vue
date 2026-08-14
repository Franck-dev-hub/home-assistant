<script setup>
import {computed} from "vue";
import {IconClock, IconExternalLink, IconFile, IconPlayerPause, IconPlayerPlay, IconPlayerStop, IconStack2, IconTemperature} from "@tabler/icons-vue";
import {mdiPrinter3d, mdiPrinter3dOff} from "@mdi/js";

import {marsPrinterStateColor, marsPrinterStateLabel} from "../constants/marsPrinterStates.js";
import {pressButton} from "../../../api/toggleEntity.js";
import ToggleSwitch from "../../../components/ToggleSwitch.vue";
import Modal from "../../../components/Modal.vue";
import MdiIcon from "../../../components/MdiIcon.vue";

const props = defineProps({
    printer: {type: Object, required: true},
    powerActive: {type: Boolean, required: true},
    open: {type: Boolean, default: false},
});
defineEmits(["close", "toggle-power"]);

const isConnecting = computed(() => {
    if (!props.powerActive) return false;
    return !props.printer.status || props.printer.status === "unknown" || props.printer.status === "unavailable";
});
const isPrinting = computed(() => props.printer.status === "printing");
const isPaused = computed(() => props.printer.printStatus === "paused");
const progressPercent = computed(() => Math.round(parseFloat(props.printer.progress ?? 0)));

const stateColors = computed(() => marsPrinterStateColor(props.powerActive ? props.printer.status : null));

const statusText = computed(() => {
    if (!props.powerActive) return "Éteinte";
    if (isConnecting.value) return "Connexion...";
    const label = marsPrinterStateLabel(props.printer.status);
    return isPrinting.value ? `${label} ${progressPercent.value}%` : label;
});

const timeLeftLabel = computed(() => {
    const minutes = parseFloat(props.printer.timeLeft ?? 0);
    return Number.isNaN(minutes) ? "-" : Math.round(minutes);
});

function togglePause() {
    pressButton(isPaused.value ? props.printer.resumeButton : props.printer.pauseButton);
}
function stopPrint() {
    pressButton(props.printer.stopButton);
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
            :path="powerActive && isPrinting ? mdiPrinter3d : mdiPrinter3dOff"
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
      v-if="powerActive && !isConnecting && isPrinting"
      class="printer-modal-section glass"
    >
      <div class="printer-progress-bar">
        <div
          class="printer-progress-fill"
          :style="{width: `${progressPercent}%`}"
        />
      </div>
      <div class="printer-badges">
        <span class="printer-badge">
          <IconFile :size="14" :stroke-width="2" />
          {{ printer.filename }}
        </span>
        <span class="printer-badge">
          <IconTemperature :size="14" :stroke-width="2" />
          {{ printer.uvLedTemp }}°C
        </span>
        <span class="printer-badge">
          <IconClock :size="14" :stroke-width="2" />
          {{ timeLeftLabel }} min
        </span>
        <span class="printer-badge">
          <IconStack2 :size="14" :stroke-width="2" />
          {{ printer.currentLayer }}/{{ printer.totalLayer }}
        </span>
      </div>
    </section>

    <section
      v-if="powerActive && !isConnecting && isPrinting"
      class="printer-modal-section glass"
    >
      <div class="printer-icon-button-row">
        <button
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
          type="button"
          class="printer-icon-button danger"
          @click="stopPrint"
        >
          <IconPlayerStop :size="20" :stroke-width="2" />
        </button>
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
        Ouvrir l'interface SDCP <IconExternalLink :size="16" :stroke-width="2" />
      </a>
    </section>

    <section
      v-if="powerActive && !isConnecting && printer.cameraImageUrl"
      class="printer-modal-section glass"
    >
      <img
        :src="`${printer.cameraImageUrl}?t=${Date.now()}`"
        alt="Image caméra chambre imprimante"
        class="printer-camera"
      >
    </section>
  </Modal>
</template>
