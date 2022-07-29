<template>
  <ScrollableContent>
    <n-list>
      <template #header>
        <div>
          <LabeledNumber
            text="center 5xl"
            title="结余"
            :number="expenseView.surplus"
          ></LabeledNumber>
          <div flex="~" gap="4" justify="center" items="center" p="y-5">
            <LabeledNumber
              text="center"
              title="收入"
              :number="expenseView.income"
            ></LabeledNumber>
            <n-divider vertical></n-divider>
            <LabeledNumber
              text="center"
              title="支出"
              :number="expenseView.expenditure"
            ></LabeledNumber>
          </div>
        </div>
      </template>
      <n-table>
        <thead>
          <tr>
            <th>月份</th>
            <th>收入</th>
            <th>支出</th>
            <th>结余</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="expense of expenseView.details"
            @click="$router.push({ name: 'MonthlyExpenseGraph' })"
          >
            <td>{{ expense.descriptionOfRange }}</td>
            <td>{{ expense.income }}</td>
            <td>{{ expense.expenditure }}</td>
            <td>{{ expense.surplus }}</td>
            <td>
              <i i-carbon:chevron-right></i>
            </td>
          </tr>
        </tbody>
      </n-table>
    </n-list>
  </ScrollableContent>
</template>

<script setup>
import dayjs from "dayjs";
import { findAnnuallyGroupedByMonthExpenseView } from "~/api/statistics";

const props = defineProps({
  year: {
    type: String,
    default: () => {
      return dayjs().format("YYYY");
    },
  },
});
const { year } = toRefs(props);
const expenseView = ref({
  details: [],
});
onMounted(() => {
  findAnnuallyGroupedByMonthExpenseView({
    year: dayjs(unref(year)).format("YYYY"),
    expenseType: null,
  }).then((res) => {
    expenseView.value = res.data;
  });
});
</script>

<style lang="scss" scoped></style>

<route>
{
  "name":"ExpenseAnnuallyList"
}
</route>
