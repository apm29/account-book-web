<template>
  <n-card p="x-4 y-2" :title="title" segmented>
    <template #header-extra>
      <i
        i-carbon:chevron-right
        text="2xl"
        cursor="pointer"
        @click="$router.push({ name: 'ExpenseAnnuallyList' })"
      ></i>
    </template>
    <div grid="~ cols-3" gap="x-5">
      <LabeledNumber title="月收入" :number="expenseView.income"> </LabeledNumber>

      <n-statistic label="月支出" tabular-nums>
        <span text="3xl">
          <n-number-animation :from="5000" :to="expenseView.expenditure" :precision="2">
          </n-number-animation>
        </span>
        <span text="sm">元</span>
      </n-statistic>

      <n-statistic label="月结余" tabular-nums>
        <span text="3xl">
          <n-number-animation
            :from="1000"
            :to="expenseView.income - expenseView.expenditure"
            :precision="2"
          >
          </n-number-animation>
        </span>
        <span text="sm">元</span>
      </n-statistic>
    </div>
  </n-card>
</template>

<script setup>
import { findMonthlyExpenseView } from "~/api/statistics";
import dayjs from "dayjs";

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
    return day.format("MM月账单");
  }
  return day.format("YYYY年MM月账单");
});

const expenseView = ref({});
onMounted(() => {
  findMonthlyExpenseView({ yearMonth: dayjs(unref(yearMonth)).format("YYYY-MM") }).then(
    (res) => {
      expenseView.value = res.data;
    }
  );
});
</script>

<style lang="scss" scoped></style>
