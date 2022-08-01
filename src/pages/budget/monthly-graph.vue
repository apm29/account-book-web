<template>
  <ScrollableContent>
    <n-list p="!x-4 !y-5" min="h-screen">
      <n-h1 flex="~">
        {{ dayjs(yearMonth).format("YYYY年MM月预算") }}
        <div flex="grow"></div>
        <MonthSelector v-model:data="budgetViewData" v-model:yearMonth="yearMonth" />
      </n-h1>
      <MonthlyBudget :yearMonth="yearMonth" @update:data="budgetViewData = $event" />
      <n-h1>预算项</n-h1>
      <div grid="~ xl:cols-4 lg:cols-3 md:cols-2 sm:cols-1" gap="3" m="t-3">
        <n-card v-for="detail of budgetViewData.details">
          <div flex="~" items="center" gap="x-5">
            <div flex="~ col" items="center">
              <ExpenseTypeIcon :icon="detail.typeIcon"></ExpenseTypeIcon>
              <n-text type="info">{{ detail.typeName }}</n-text>
            </div>
            <div flex="grow" grid="~ cols-3" justify="start" gap="x-2">
              <LabeledNumber
                title="预算"
                :number="detail.budgetNumber"
                text="sm"
                :unit="false"
              ></LabeledNumber>
              <LabeledNumber
                title="支出"
                :number="detail.expenseNumber"
                text="sm"
                :unit="false"
              ></LabeledNumber>
              <LabeledNumber
                :title="detail.budgetNumber >= detail.expenseNumber ? '结余' : '超支'"
                :text="
                  detail.budgetNumber >= detail.expenseNumber
                    ? 'green-500 sm'
                    : 'red-500 sm'
                "
                :number="detail.budgetNumber - detail.expenseNumber"
                :unit="false"
              ></LabeledNumber>
            </div>
          </div>
        </n-card>
      </div>
      <n-h1>预算项表格</n-h1>
      <n-scrollbar style="max-height: 300px" w="![calc(100vw-40px)]" x-scrollable m="b-2">
        <n-table p="b-5">
          <thead>
            <tr>
              <th min="w-6rem">
                <n-text type="success">类型</n-text>
              </th>
              <th
                min="w-4rem"
                class="group"
                v-for="budgetDetail of budgetViewData.details"
              >
                <div flex="~" items="center">
                  {{ budgetDetail.typeName }}
                </div>
              </th>
              <th min="w-6rem">
                <n-text type="warning">总计</n-text>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <n-text type="success">预算金额</n-text>
              </td>
              <td v-for="budgetDetail of budgetViewData.details">
                {{ budgetDetail.budgetNumber.toFixed(2) }}
              </td>
              <td>
                {{ budgetViewData.budget.toFixed(2) }}
              </td>
            </tr>
            <tr>
              <td>
                <n-text type="success">支出</n-text>
              </td>
              <td v-for="budgetDetail of budgetViewData.details">
                {{ budgetDetail.expenseNumber.toFixed(2) }}
              </td>
              <td>
                {{ budgetViewData.expenditure.toFixed(2) }}
              </td>
            </tr>
            <tr>
              <td>
                <n-text type="success">结余</n-text>
              </td>
              <td v-for="budgetDetail of budgetViewData.details">
                <n-text
                  :type="
                    budgetDetail.budgetNumber >= budgetDetail.expenseNumber
                      ? 'success'
                      : 'error'
                  "
                >
                  {{
                    (budgetDetail.budgetNumber - budgetDetail.expenseNumber).toFixed(2)
                  }}
                </n-text>
              </td>
              <td>
                <n-text
                  :type="
                    budgetViewData.budget >= budgetViewData.expenditure
                      ? 'success'
                      : 'error'
                  "
                >
                  {{ (budgetViewData.budget - budgetViewData.expenditure).toFixed(2) }}
                </n-text>
              </td>
            </tr>
          </tbody>
        </n-table>
      </n-scrollbar>
    </n-list>
  </ScrollableContent>
</template>

<script setup>
import dayjs from "dayjs";
import ExpenseTypeIcon from "~/components/widget/ExpenseTypeIcon.vue";
import LabeledNumber from "~/components/widget/LabeledNumber.vue";

const yearMonth = ref(dayjs().format("YYYY-MM"));

const budgetViewData = ref({
  expenditure: 0,
  income: 0,
  budget: 0,
  surplus: 0,
  details: [],
});
</script>

<style lang="scss" scoped></style>

<route>
{
  "name":"BugdetMonthlyGraph"
}
</route>
