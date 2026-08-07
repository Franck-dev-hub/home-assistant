<script setup>
import {computed} from "vue";

import {ENTITY_ICONS} from "../constants/entityIcons.js";
import {useEntityToggle} from "../composables/useEntityToggle.js";
import ToggleSwitch from "./ToggleSwitch.vue";

const props = defineProps({
    entity: {type: Object, required: true},
    type: {type: String, required: true}, // 'light' | 'switch'
});

const {active, toggle} = useEntityToggle(props.entity, props.type);
const icon = computed(() => (active.value ? ENTITY_ICONS[props.type].on : ENTITY_ICONS[props.type].off));
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
