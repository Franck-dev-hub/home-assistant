<script setup>
defineProps({
  pills: {type: Array, default: () => []},
});
</script>

<template>
  <div
      v-if="pills.length"
      class="summary-strip"
  >
    <div
        v-for="pill in pills"
        :key="pill.label"
        class="pill glass"
    >
      <component
          :is="pill.icon"
          v-if="pill.icon"
          :size="18"
          :stroke-width="2"
          class="pill-icon"
      />
      <span class="pill-value">{{ pill.value }}</span>
      <span class="pill-label">{{ pill.label }}</span>
    </div>
  </div>
</template>
