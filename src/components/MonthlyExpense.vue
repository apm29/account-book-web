<template>
  <n-card p="x-4 y-2" title="7月支出" segmented>
    <template #header-extra>
      <i i-carbon:chevron-right text="2xl" cursor="pointer"></i>
    </template>
    <div flex="~" gap="x-5">
      <BasicLineCharts
        :data="budgetPieData"
        :dataAxisX="dataX"
        w="full"
        h="60"
      ></BasicLineCharts>
    </div>
  </n-card>
</template>

<script setup>
import dayjs from "dayjs";
import { findMonthlyGrouedExpenseView } from "~/api/expense";
const expenseView = ref({
  details: [],
});
const budgetPieData = computed(() => [
  {
    data: Array.from({ length: dayjs().daysInMonth() }).map((_, index) => {
      const dayOfMonth = index + 1;
      const find = expenseView.value.details.find(
        (detail) => dayjs(detail.descriptionOfRange).date() === dayOfMonth
      );
      return find ? find.expenditure : 0;
    }),
    name: "当日支出",
  },
]);
const dataX = computed(() =>
  Array.from({ length: dayjs().daysInMonth() }).map((_, index) => `${index + 1}日`)
);
onMounted(() => {
  findMonthlyGrouedExpenseView({
    yearMonth: dayjs().format("YYYY-MM"),
    expenseType: 2000,
  }).then((res) => {
    expenseView.value = res.data;
  });
});
</script>

<style lang="scss" scoped></style>
