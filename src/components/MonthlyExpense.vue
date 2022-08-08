<template>
  <n-card p="x-4 y-2" :title="title" segmented>
    <template #header-extra>
      <i
        i-carbon:chevron-right
        text="2xl"
        cursor="pointer"
        @click="$router.push({ name: 'ExpenseIndex' })"
      ></i>
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
import { findMonthlyGroupedByDayExpenseView } from "~/api/statistics";

const props = defineProps({
  yearMonth: {
    type: String,
    default: () => {
      return dayjs().format("YYYY-MM");
    },
  },
});

const { yearMonth } = toRefs(props);
const title = computed(() => {
  const day = dayjs(unref(yearMonth));
  if (day.year() === dayjs().year()) {
    return day.format("MM月支出");
  }
  return day.format("YYYY年MM月支出");
});
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
  findMonthlyGroupedByDayExpenseView({
    yearMonth: dayjs(unref(yearMonth)).format("YYYY-MM"),
    expenseType: 2000,
  }).then((res) => {
    expenseView.value = res.data;
  });
});
</script>

<style lang="scss" scoped></style>
