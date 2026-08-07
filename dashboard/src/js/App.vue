<script setup>
import {computed} from "vue";

import Header from "./components/Header.vue";
import SummaryStrip from "./components/SummaryStrip.vue";
import RoomCard from "./components/RoomCard.vue";
import {useDashboardData} from "./composables/useDashboardData.js";
import {buildSummaryPills} from "./utils/summaryPills.js";

const {weather, lights, switches, rooms} = useDashboardData();
const pills = computed(() => buildSummaryPills(lights.value, switches.value));
</script>

<template>
  <div>
    <Header :weather="weather" />
    <SummaryStrip :pills="pills" />
    <div class="rooms-grid">
      <RoomCard
        v-for="room in rooms"
        :key="room.id"
        :room="room"
      />
    </div>
  </div>
</template>
