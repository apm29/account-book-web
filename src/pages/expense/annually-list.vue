<template>
  <ScrollableContent>
    <n-list>
      <template #header>
        <div>
          <div flex="~" gap="4" justify="center" items="center" p="y-5" relative="~">
            <LabeledNumber
              text="center 5xl"
              title="结余"
              :number="expenseView.surplus"
            ></LabeledNumber>
            <YearSelector v-model:year="year" absolute="~" right="1" />
          </div>

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

const year = ref(dayjs().format("YYYY"));
const expenseView = ref({
  details: [],
});
const getViewData = () => {
  findAnnuallyGroupedByMonthExpenseView({
    year: dayjs(unref(year)).format("YYYY"),
    expenseType: null,
  }).then((res) => {
    expenseView.value = res.data;
  });
};
onMounted(getViewData);
watch(year, getViewData);
</script>

<style lang="scss" scoped></style>

<route>
{
  "name":"ExpenseAnnuallyList"
}
</route>
