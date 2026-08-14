<script setup>
import {computed, ref} from "vue";
import {IconDroplet, IconTemperature} from "@tabler/icons-vue";
import {useComfortData} from "../composables/useComfortData.js";
import {humidityColor, humidityRatio, temperatureColor, temperatureRatio} from "../constants/comfortColors.js";
import ComfortModal from "./ComfortModal.vue";

const props = defineProps({
    tile: {type: Object, required: true},
    inline: {type: Boolean, default: false},
});

const {comfort} = useComfortData(props.tile.key);
const modalOpen = ref(false);

const tempColor = computed(() => temperatureColor(comfort.value.temp));
const tempWidth = computed(() => `${temperatureRatio(comfort.value.temp) * 100}%`);
const humidColor = computed(() => humidityColor(comfort.value.temp, comfort.value.humidity));
const humidWidth = computed(() => `${humidityRatio(comfort.value.humidity) * 100}%`);
</script>

<template>
  <div
    v-if="comfort"
    class="comfort-card"
    :class="{'comfort-card-inline': inline}"
    @click="modalOpen = true"
  >
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
      v-if="!inline"
      class="comfort-gauge-mobile"
    >
      <div
        class="comfort-gauge-half"
        :style="{background: tempColor}"
      >
        {{ Math.round(comfort.temp) }}°
      </div>
      <div
        class="comfort-gauge-half"
        :style="{background: humidColor}"
      >
        {{ Math.round(comfort.humidity) }}%
      </div>
    </div>
  </div>

  <ComfortModal
    v-if="comfort"
    :comfort="comfort"
    :open="modalOpen"
    @close="modalOpen = false"
  />
</template>
