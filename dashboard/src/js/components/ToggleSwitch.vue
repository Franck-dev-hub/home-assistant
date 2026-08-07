<script setup>
defineProps({
    active: {type: Boolean, default: false}
});
</script>

<template>
  <div
    class="toggle"
    :class="{on: active}"
  >
    <div class="toggle-knob" />
  </div>
</template>
