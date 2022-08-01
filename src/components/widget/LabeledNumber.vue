<template>
  <n-statistic :label="title" tabular-nums>
    <span :class="textClass" v-bind="$attrs">
      <n-number-animation :from="0" :to="number" :precision="2"> </n-number-animation>
    </span>
    <span text="sm" v-if="unit">元</span>
  </n-statistic>
</template>

<script setup>
defineProps({
  number: Number,
  title: String,
  textClass: {
    type: String,
    default: "text-3xl",
  },
  unit: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss" scoped></style>
