<script setup>
import {computed} from "vue";

import EntityTile from "./EntityTile.vue";
import {resolveRoomIcon} from "../utils/roomIcon.js";
import {getRoomStats} from "../utils/roomStats.js";

const props = defineProps({
    room: {type: Object, required: true},
});

const roomIcon = computed(() => resolveRoomIcon(props.room.icon));
const stats = computed(() => getRoomStats(props.room));
</script>

<template>
  <section class="room-card glass">
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
    <div class="room-tiles">
      <EntityTile
        v-for="entity in room.lights"
        :key="entity.id"
        :entity="entity"
        type="light"
      />
      <EntityTile
        v-for="entity in room.switches"
        :key="entity.id"
        :entity="entity"
        type="switch"
      />
    </div>
  </section>
</template>
