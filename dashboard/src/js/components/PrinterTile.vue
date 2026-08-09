<script setup>
import {computed, ref} from "vue";
import {mdiPrinter3d, mdiPrinter3dOff} from "@mdi/js";
import MdiIcon from "./MdiIcon.vue";

import {usePrinterData} from "../composables/usePrinterData.js";
import {useOptimisticValue} from "../composables/useOptimisticValue.js";
import {setSwitchActive} from "../composables/dashboardStore.js";
import {toggleSwitch} from "../api/toggleEntity.js";
import {printerStateLabel} from "../constants/printerStates.js";
import PrinterModal from "./PrinterModal.vue";

const {printer} = usePrinterData();
const modalOpen = ref(false);

const {value: powerActive, commit: commitPower} = useOptimisticValue(() => printer.value?.power.isActive ?? false);

const stateLabel = computed(() => {
    if (!printer.value) return "";
    if (!powerActive.value) return "Éteinte";
    return printerStateLabel(printer.value.state);
});

function togglePower() {
    if (!printer.value) return;
    const id = printer.value.power.id;
    const next = !powerActive.value;
    setSwitchActive(id, next);
    commitPower(next, () => toggleSwitch(id, !next));
}
</script>

<template>
  <div
    v-if="printer"
    class="entity-tile"
    :class="{on: powerActive}"
    @click="modalOpen = true"
  >
    <div class="entity-tile-icon">
      <MdiIcon
        :path="powerActive ? mdiPrinter3d : mdiPrinter3dOff"
        :size="28"
      />
    </div>
    <div class="entity-tile-info">
      <div class="entity-name">
        {{ printer.name }}
      </div>
      <div class="entity-state">
        {{ stateLabel }}
      </div>
    </div>
  </div>

  <PrinterModal
    v-if="printer"
    :printer="printer"
    :power-active="powerActive"
    :open="modalOpen"
    @close="modalOpen = false"
    @toggle-power="togglePower"
  />
</template>
