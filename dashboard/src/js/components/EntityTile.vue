<script setup>
import {computed} from "vue";

import {resolveEntityIcon} from "../utils/entityIcon.js";
import {useEntityToggle} from "../composables/useEntityToggle.js";
import ToggleSwitch from "./ToggleSwitch.vue";

const props = defineProps({
    entity: {type: Object, required: true},
    type: {type: String, required: true}, // 'light' | 'switch'
});

const {active, toggle} = useEntityToggle(props.entity, props.type);
const icon = computed(() => resolveEntityIcon(props.entity, active.value));
</script>

<template>
  <div
    class="entity-tile"
    :class="{on: active}"
    @click="toggle"
  >
    <div class="entity-tile-icon">
      <component
        :is="icon"
        :size="28"
        :stroke-width="2"
      />
    </div>
    <div class="entity-tile-info">
      <div class="entity-name">
        {{ entity.name }}
      </div>
      <div class="entity-state">
        {{ active ? "Allumé" : "Éteint" }}
      </div>
    </div>
    <ToggleSwitch :active="active" />
  </div>
</template>
