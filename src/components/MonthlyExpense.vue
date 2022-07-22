<template>
  <n-card p="x-4 y-2" title="7月支出" segmented>
    <template #header-extra>
      <i i-carbon:chevron-right text="2xl" cursor="pointer"></i>
    </template>
    <div flex="~" gap="x-5">
      <BasicLineCharts
        :data="budgetPieData"
        w="full"
        h="60"
        title="7月支出折线"
      ></BasicLineCharts>
    </div>
  </n-card>
</template>

<script setup>
const budgetPieData = ref([10, 200, 400, 100, 40, 348]);
</script>

<style lang="scss" scoped></style>
