<script setup>
import {computed, onBeforeUnmount, onMounted, ref, watch} from "vue";

import EntityTile from "./EntityTile.vue";
import {resolveRoomIcon} from "../utils/roomIcon.js";
import {getRoomStats} from "../utils/roomStats.js";
import {CUSTOM_CARDS} from "../constants/customCards.js";

const props = defineProps({
    room: {type: Object, required: true},
});

const roomCardEl = ref(null);
const tilesEl = ref(null);
const wide = ref(false);
let observer = null;

function measure() {
    if (!tilesEl.value || !roomCardEl.value) return;
    tilesEl.value.classList.add("measure-wide");
    let total = 0;
    let count = 0;
    for (const tile of tilesEl.value.children) {
        total += tile.offsetWidth;
        count++;
    }
    tilesEl.value.classList.remove("measure-wide");
    const gaps = (count - 1) * 8;
    wide.value = total + gaps <= tilesEl.value.clientWidth;
}

onMounted(() => {
    measure();
    observer = new ResizeObserver(measure);
    observer.observe(roomCardEl.value);
});

onBeforeUnmount(() => {
    observer?.disconnect();
});

watch(() => props.room.tiles, measure);

const roomIcon = computed(() => resolveRoomIcon(props.room.icon));
const stats = computed(() => getRoomStats(props.room));
</script>

<template>
  <section
    ref="roomCardEl"
    class="room-card glass"
    :class="{wide}"
  >
    <header class="room-card-header">
      <div class="room-card-title">
        <component
          :is="roomIcon"
          :size="22"
          :stroke-width="2"
          class="room-icon"
        />
        <h2>{{ room.name }}</h2>
      </div>
      <span class="room-count">{{ stats.active }} / {{ stats.total }} actif{{ stats.active > 1 ? 's' : '' }}</span>
    </header>
    <div
      ref="tilesEl"
      class="room-tiles"
    >
      <template
        v-for="tile in room.tiles"
        :key="tile.id ?? tile.component"
      >
        <component
          :is="CUSTOM_CARDS[tile.component]"
          v-if="tile.type === 'custom'"
        />
        <EntityTile
          v-else
          :entity="tile"
          :type="tile.type"
        />
      </template>
    </div>
  </section>
</template>
