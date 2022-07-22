<template>
  <n-card p="x-4 y-2" title="7月预算" segmented>
    <template #header-extra>
      <i i-carbon:chevron-right text="2xl" cursor="pointer"></i>
    </template>
    <div flex="~" gap="x-5">
      <BasicPieCharts
        :data="budgetPieData"
        w="60"
        h="60"
        title="预算饼图"
      ></BasicPieCharts>
      <div col="span-2" flex="grow">
        <n-statistic label="剩余预算" tabular-nums>
          <span text="3xl">
            <n-number-animation :from="0" :to="1000" :precision="2"> </n-number-animation>
          </span>
          <span text="sm">元</span>
        </n-statistic>

        <n-statistic label="本月预算" tabular-nums>
          <span text="3xl">
            <n-number-animation :from="0" :to="133039.22" :precision="2">
            </n-number-animation>
          </span>
          <span text="sm">元</span>
        </n-statistic>

        <n-statistic label="本月支出" tabular-nums>
          <span text="3xl">
            <n-number-animation :from="0" :to="132039.22" :precision="2">
            </n-number-animation>
          </span>
          <span text="sm">元</span>
        </n-statistic>
      </div>
    </div>
  </n-card>
</template>

<script setup>
const budgetPieData = ref([
  {
    name: "支出",
    value: 10000,
  },
  {
    name: "结余",
    value: 1000,
  },
]);
</script>

<style lang="scss" scoped></style>
