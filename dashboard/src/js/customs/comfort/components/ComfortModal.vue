<script setup>
import {computed} from "vue";
import {IconAtom2, IconDroplet, IconFlask, IconTemperature} from "@tabler/icons-vue";
import {mdiMoleculeCo2} from "@mdi/js";

import {
    co2Color, co2Ratio,
    formaldehydeColor, formaldehydeRatio,
    humidityColor, humidityRatio,
    temperatureColor, temperatureRatio,
    vocColor, vocRatio,
} from "../constants/comfortColors.js";
import Modal from "../../../components/Modal.vue";
import MdiIcon from "../../../components/MdiIcon.vue";

const props = defineProps({
    comfort: {type: Object, required: true},
    open: {type: Boolean, default: false},
});
defineEmits(["close"]);

const tempColor = computed(() => temperatureColor(props.comfort.temp));
const tempWidth = computed(() => `${temperatureRatio(props.comfort.temp) * 100}%`);
const humidColor = computed(() => humidityColor(props.comfort.temp, props.comfort.humidity));
const humidWidth = computed(() => `${humidityRatio(props.comfort.humidity) * 100}%`);
const co2Col = computed(() => co2Color(props.comfort.co2));
const co2Width = computed(() => `${co2Ratio(props.comfort.co2) * 100}%`);
const vocCol = computed(() => vocColor(props.comfort.voc));
const vocWidth = computed(() => `${vocRatio(props.comfort.voc) * 100}%`);
const formaldehydeCol = computed(() => formaldehydeColor(props.comfort.formaldehyde));
const formaldehydeWidth = computed(() => `${formaldehydeRatio(props.comfort.formaldehyde) * 100}%`);
</script>

<template>
  <Modal
    :open="open"
    @close="$emit('close')"
  >
    <section class="printer-modal-section glass">
      <div class="comfort-bar-row">
        <IconTemperature
          :size="16"
          :stroke-width="2"
          class="comfort-bar-icon"
        />
        <span class="comfort-bar-value">{{ Math.round(comfort.temp) }}°C</span>
        <div class="comfort-bar-track">
          <div
            class="comfort-bar-fill"
            :style="{width: tempWidth, background: tempColor}"
          />
        </div>
      </div>
      <div class="comfort-bar-row">
        <IconDroplet
          :size="16"
          :stroke-width="2"
          class="comfort-bar-icon"
        />
        <span class="comfort-bar-value">{{ Math.round(comfort.humidity) }}%</span>
        <div class="comfort-bar-track">
          <div
            class="comfort-bar-fill"
            :style="{width: humidWidth, background: humidColor}"
          />
        </div>
      </div>
      <div
        v-if="comfort.co2 !== null"
        class="comfort-bar-row"
      >
        <MdiIcon
          :path="mdiMoleculeCo2"
          :size="16"
          class="comfort-bar-icon"
        />
        <span class="comfort-bar-value">{{ Math.round(comfort.co2) }}</span>
        <div class="comfort-bar-track">
          <div
            class="comfort-bar-fill"
            :style="{width: co2Width, background: co2Col}"
          />
        </div>
      </div>
      <div
        v-if="comfort.voc !== null"
        class="comfort-bar-row"
      >
        <IconAtom2
          :size="16"
          :stroke-width="2"
          class="comfort-bar-icon"
        />
        <span class="comfort-bar-value">{{ comfort.voc }}</span>
        <div class="comfort-bar-track">
          <div
            class="comfort-bar-fill"
            :style="{width: vocWidth, background: vocCol}"
          />
        </div>
      </div>
      <div
        v-if="comfort.formaldehyde !== null"
        class="comfort-bar-row"
      >
        <IconFlask
          :size="16"
          :stroke-width="2"
          class="comfort-bar-icon"
        />
        <span class="comfort-bar-value">{{ comfort.formaldehyde }}</span>
        <div class="comfort-bar-track">
          <div
            class="comfort-bar-fill"
            :style="{width: formaldehydeWidth, background: formaldehydeCol}"
          />
        </div>
      </div>
    </section>
  </Modal>
</template>
