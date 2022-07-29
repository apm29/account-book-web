<template>
  <ScrollableContent>
    <ListSkeleton :loading="loading" p="!x-6 !y-4">
      <n-list v-if="viewData">
        <template #header>
          <div flex="~">
            <n-h3 prefix="bar">{{ dayjs(yearMonth).format("YYYY年MM月收支明细") }}</n-h3>
            <div flex="grow"></div>
            <n-date-picker v-model:value="yearMonth" type="month" />
          </div>
          <n-space justify="space-around" items="center" size="large">
            <n-statistic label="支出" text="center" tabular-nums>
              <span text="3xl">
                <n-number-animation
                  :from="10000"
                  :to="viewData.expenditure"
                  :precision="2"
                >
                </n-number-animation>
              </span>
              <span text="sm">元</span>
            </n-statistic>
            <n-statistic label="收入" text="center" tabular-nums>
              <span text="3xl">
                <n-number-animation :from="10000" :to="viewData.income" :precision="2">
                </n-number-animation>
              </span>
              <span text="sm">元</span>
            </n-statistic>
          </n-space>
        </template>
        <n-list bordered m="b-3" v-for="day of viewData.details">
          <template #header>
            <n-text type="info" flex items="center" gap="x-3">
              <n-time
                :time="dayjs(day.descriptionOfRange).valueOf()"
                format="yyyy-MM-dd EEEE"
              >
              </n-time>
              <span flex="grow"></span>
              <span>
                支出:
                <span>
                  {{ day.expenditure.toFixed(2) }}
                </span>
              </span>
              <span>
                收入:
                <span>
                  {{ day.income.toFixed(2) }}
                </span>
              </span>
            </n-text>
          </template>
          <n-list-item v-for="expense of day.details">
            <template #prefix>
              <n-avatar round>
                <i text="xl" :class="expense.type.icon || 'i-carbon:wallet'"></i>
              </n-avatar>
            </template>
            <div>
              <div>{{ expense.type.name }}</div>
              <div text="gray-500/60">{{ expense.remark }}</div>
            </div>
            <template #suffix>
              <div flex="~" items="center" gap="x-4">
                <n-text>
                  <n-text>
                    {{ expense.expenseType === 2000 ? "-" : "+" }}
                  </n-text>
                  <n-text>
                    {{ expense.amount.toFixed(2) }}
                  </n-text>
                </n-text>
                <n-button text @click="handleEditExpense(expense)">
                  <i i-carbon:edit text="2xl"></i>
                </n-button>
              </div>
            </template>
          </n-list-item>
        </n-list>
        <div min="h-40"></div>
      </n-list>
    </ListSkeleton>
    <n-modal
      preset="card"
      title="编辑收支"
      :style="{ width: '480px' }"
      size="huge"
      v-model:show="showEditExpense"
    >
      <ExpenseEditor
        v-model:expenseId="editExpenseForm.id"
        v-model:remark="editExpenseForm.remark"
        v-model:amount="editExpenseForm.amount"
        v-model:expenseType="editExpenseForm.expenseType"
        v-model:expenseTypeId="editExpenseForm.expenseTypeId"
        v-model:createTime="editExpenseForm.createTime"
        :expenditureTypes="expenditureTypes"
        :incomeTypes="incomeTypes"
        @saved="handleSavedExpense"
        @deleted="handleSavedExpense"
      ></ExpenseEditor>
    </n-modal>
    <ExpenseCreator @saved="getViewData" />
  </ScrollableContent>
</template>

<script setup>
import { findMonthlyGroupedByDayExpenseView } from "~/api/statistics";
import { useExpenditureTypes, useIncomeTypes } from "~/composables";
import dayjs from "dayjs";

const loading = ref(true);
const viewData = ref();
const yearMonth = ref(dayjs().valueOf());
function getViewData() {
  loading.value = true;
  findMonthlyGroupedByDayExpenseView({
    yearMonth: dayjs(yearMonth.value).format("YYYY-MM"),
  })
    .then((res) => (viewData.value = res.data))
    .finally(() => (loading.value = false));
}
onMounted(getViewData);
watch(yearMonth, getViewData);

//类型字典
const { expenditureTypes, getExpenditureTypes } = useExpenditureTypes();
const { incomeTypes, getIncomeTypes } = useIncomeTypes();
onMounted(getExpenditureTypes);
onMounted(getIncomeTypes);

//编辑
const [showEditExpense, toggleEditExpense] = useToggle();
const editExpenseForm = ref({});
function handleEditExpense(expense) {
  editExpenseForm.value = {
    expenseType: expense.expenseType,
    expenseTypeId: expense.type.id,
    remark: expense.remark,
    id: expense.id,
    amount: expense.amount,
    createTime: expense.createTime,
  };
  toggleEditExpense();
}
function handleSavedExpense() {
  toggleEditExpense();
  getViewData();
}
</script>

<style lang="scss" scoped></style>

<route>
{
  "name":"ExpenseIndex"
}
</route>
