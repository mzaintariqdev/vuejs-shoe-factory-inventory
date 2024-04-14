<template>
  <BTableSimple hover small caption-top responsive>
    <caption>{{ caption }}</caption>
    <colgroup>
      <col v-for="colWidth in colWidths" :style="{ width: colWidth }" />
    </colgroup>
    <BThead head-variant="dark">
      <BTr>
        <BTh v-for="(header, index) in headers" :key="index" :colspan="header.colspan" :rowspan="header.rowspan">{{ header.label }}</BTh>
      </BTr>
    </BThead>
    <BTbody>
      <BTr v-for="(row, rowIndex) in rows" :key="rowIndex">
        <BTh v-for="(cell, cellIndex) in row" :key="cellIndex" :rowspan="cell.rowspan" :class="cell.class">{{ cell.label }}</BTh>
      </BTr>
    </BTbody>
    <BTfoot>
      <BTr>
        <BTd :colspan="colCount" variant="secondary" class="text-end"> Total Rows: <b>{{ rowCount }}</b> </BTd>
      </BTr>
    </BTfoot>
  </BTableSimple>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  caption: String,
  colWidths: Array,
  headers: Array,
  rows: Array,
  rowCount: Number,
});

const colCount = props.headers.reduce((total, header) => total + (header.colspan || 1), 0);
</script>
