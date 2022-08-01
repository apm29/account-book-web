<template>
  <n-card p="x-4 y-2" :title="title" segmented>
    <template #header-extra>
      <i i-carbon:chevron-right text="2xl" cursor="pointer"></i>
    </template>
    <div flex="~" gap="x-5">
      <BasicPieCharts
        :data="budgetPieData"
        w="60"
        h="60"
        :title="expenseView.surplus > 0 ? '预算饼图' : '已超支'"
      ></BasicPieCharts>
      <div flex="grow" ref="barContainer">
        <div col="span-2" flex="~" gap="!x-4">
          <n-statistic label="剩余预算" tabular-nums>
            <span text="3xl">
              <n-number-animation :from="0" :to="expenseView.surplus" :precision="2">
              </n-number-animation>
            </span>
            <span text="sm">元</span>
          </n-statistic>

          <n-statistic label="本月预算" tabular-nums>
            <span text="3xl">
              <n-number-animation :from="0" :to="expenseView.budget" :precision="2">
              </n-number-animation>
            </span>
            <span text="sm">元</span>
          </n-statistic>

          <n-statistic label="本月支出" tabular-nums>
            <span text="3xl">
              <n-number-animation :from="0" :to="expenseView.expenditure" :precision="2">
              </n-number-animation>
            </span>
            <span text="sm">元</span>
          </n-statistic>
        </div>

        <BasicBarCharts
          :data="budgetBarData"
          :dataAxisX="budgetBarX"
          :w="width"
          :h="60"
          title="预算饼图"
        ></BasicBarCharts>
      </div>
    </div>
  </n-card>
</template>

<script setup>
import { findMonthlyBudgetExpenseView } from "~/api/statistics";
import { useElementSize } from "@vueuse/core";
import dayjs from "dayjs";
import { unref } from "vue";

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
    return day.format("MM月预算");
  }
  return day.format("YYYY年MM月预算");
});

const expenseView = ref({
  details: [],
});
const barContainer = ref();
const { width } = useElementSize(barContainer);
const budgetPieData = computed(() =>
  expenseView.value.surplus >= 0
    ? [
        {
          name: "支出",
          value: unref(expenseView).expenditure,
        },
        {
          name: "结余",
          value: unref(expenseView).surplus,
        },
      ]
    : []
);
const budgetBarData = computed(() => {
  return [
    { data: unref(expenseView).details.map((it) => it.budgetNumber), name: "预算" },
    { data: unref(expenseView).details.map((it) => it.expenseNumber), name: "支出" },
  ];
});

const budgetBarX = computed(() => {
  return unref(expenseView).details.map((it) => it.typeName);
});

onMounted(() => {
  findMonthlyBudgetExpenseView({
    yearMonth: dayjs(unref(yearMonth)).format("YYYY-MM"),
  }).then((res) => {
    expenseView.value = res.data;
  });
});
</script>

<style lang="scss" scoped></style>
