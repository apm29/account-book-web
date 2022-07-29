<template>
  <n-statistic :label="title" tabular-nums>
    <span class="text-3xl" v-bind="$attrs">
      <n-number-animation :from="0" :to="number" :precision="2"> </n-number-animation>
    </span>
    <span text="sm">元</span>
  </n-statistic>
</template>

<script setup>
defineProps({
  number: Number,
  title: String,
});
</script>

<style lang="scss" scoped></style>
