<script setup>
import {computed} from "vue";
import {IconSun, IconMoon} from "@tabler/icons-vue";
import {getWeatherDisplay} from "../constants/weatherConfig.js";
import {useTheme} from "../composables/useTheme.js";

const props = defineProps({
  weather: {type: Object, default: null}
});

const current = computed(() => (props.weather ? getWeatherDisplay(props.weather.code) : null));

const {theme, toggleTheme} = useTheme();
</script>

<template>
  <header class="app-header glass">
    <div class="header-left">
    </div>
    <div
        v-if="current"
        class="header-right"
    >
      <div class="weather-main">
        <component
            :is="current.icon"
            :size="30"
            :color="current.color"
            :stroke-width="2"
        />
        <span class="weather-temp">{{ weather.temp }}°C</span>
      </div>
      <div class="weather-desc">
        {{ current.label }}
      </div>
    </div>
    <button
        class="theme-toggle"
        type="button"
        :aria-label="theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'"
        @click="toggleTheme"
    >
      <component
          :is="theme === 'dark' ? IconSun : IconMoon"
          :size="20"
          :stroke-width="2"
      />
    </button>
  </header>
</template>
