<template>
  <ScrollableContent>
    <n-list p="!x-6 !t-5">
      <template #header>
        <n-h2>{{ budget.budgetTitle }}</n-h2>
      </template>
      <template v-if="isCreate">
        <n-h6>点击选择类型:</n-h6>
        <div flex="~ wrap" items="center" gap="x-2 y-1">
          <n-tag
            checkable
            v-for="expenditureType of expenditureTypes"
            :checked="selectedTypes.includes(expenditureType.id)"
            @click="handleChangeSelectedTypes(expenditureType.id)"
          >
            {{ expenditureType.expenditureName }}
            <template #avatar>
              <i :class="expenditureType.icon"></i>
            </template>
          </n-tag>
          <ExpenditureTypeCreator @created="handleExpenditureTypeAdd">
          </ExpenditureTypeCreator>
        </div>
      </template>
      <template v-else>
        <n-form-item label="预算名称">
          <n-input v-model:value="budget.budgetTitle"> </n-input>
        </n-form-item>
        <n-form-item label="请选择预算月份">
          <n-date-picker
            w="!full"
            v-model:value="budget.budgetYearMonth"
            type="month"
            clearable
          />
        </n-form-item>
        <n-form-item label="预算模板">
          <n-switch v-model:value="budget.saveAsBudgetTemplate">
            <template #checked> 保存为预算模板 </template>
            <template #unchecked> 不保存为预算模板 </template>
          </n-switch>
        </n-form-item>
        <n-form-item label="预算模板名称">
          <n-input v-model:value="budget.budgetTemplateTitle"> </n-input>
        </n-form-item>
        <n-list-item v-for="detail of budget.budgetDetails">
          <template #prefix>
            <n-avatar round>
              <i
                text="xl"
                :class="getExpenditureTypeIconById(detail.budgetExpenditureTypeId)"
              ></i>
            </n-avatar>
          </template>
          <div flex="~" items="center" gap="x-4">
            <n-space>
              <n-text type="primary">
                {{ getExpenditureTypeNameById(detail.budgetExpenditureTypeId) }}
              </n-text>
              <div text="gray-500/60">{{ detail.remark }}</div>
            </n-space>
            <div flex="grow"></div>
            <n-form-item :show-feedback="false" label-placement="left" label="预算金额">
              <n-input-number :step="100" v-model:value="detail.budgetNumber">
              </n-input-number>
            </n-form-item>
            <n-form-item :show-feedback="false" label-placement="left" label="备注">
              <n-input v-model:value="detail.remark">
                <template #suffix>
                  <span text="gray-500/50">选填</span>
                </template>
              </n-input>
            </n-form-item>
          </div>
        </n-list-item>
      </template>
      <template #footer>
        <n-button
          v-if="isCreate"
          type="success"
          block
          :loading="loading"
          @click="handleGenerateBasicSheet"
        >
          生成预算表格
        </n-button>
        <n-space vertical v-else>
          <n-button type="success" block :loading="loading" @click="handleSaveBudget">
            保存预算表格
          </n-button>
          <n-button
            type="error"
            block
            ghost
            :loading="loading"
            @click="handleReselectTypes"
          >
            重新选择支出类型
          </n-button>
        </n-space>
      </template>
    </n-list>
  </ScrollableContent>
</template>

<script setup>
import { findBudgetById, createBudget } from "@/api/budget";
import { findAllExpenditureTypes } from "@/api/dict";
import dayjs from "dayjs";
import { useMessage, useDialog } from "naive-ui";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import ExpenditureTypeCreator from "@/components/expense/ExpenditureTypeCreator.vue";
const loading = ref();
const message = useMessage();
const dialog = useDialog();
const router = useRouter();
const route = useRoute();

const budgetId = computed(() => route.query.budgetId);
const generated = ref();
const isCreate = computed(() => !generated.value);

const budget = ref({
  budgetDetails: [],
});

//监听标题字段改变
const yearMonth = computed(() => budget.value.budgetYearMonth);
watch(yearMonth, function () {
  const title = dayjs(yearMonth.value).format("YYYY年MM月预算表");
  budget.value.budgetTitle = title;
  budget.value.budgetTemplateTitle = `${title}-模板`;
});

//获取详情
function getBudget() {
  if (!budgetId.value) {
    budget.value = {
      budgetDetails: [],
    };
    return;
  }
  loading.value = true;
  findBudgetById(unref(budgetId))
    .then((res) => {
      budget.value = {
        budgetYearMonth: dayjs(res.data.budgetYearMonthName).valueOf(),
        budgetTitle: res.data.budgetName,
        budgetId: res.data.id,
        budgetDetails:
          res.data.budgetDetails?.map((it) => ({
            budgetExpenditureTypeId: it?.budgetExpenditure?.id,
            remark: it.remark,
            budgetNumber: it.budgetNumber,
          })) ?? [],
        creatDefaultDetails: false,
        saveAsBudgetTemplate: false,
      };
    })
    .finally(() => (loading.value = false));
}
onMounted(getBudget);
watch([budgetId], getBudget, { immediate: true });

//类型字典
const expenditureTypes = ref([]);
function getExpenditureTypes() {
  loading.value = true;
  findAllExpenditureTypes()
    .then((res) => (expenditureTypes.value = res.data))
    .finally(() => {
      loading.value = false;
    });
}
function getExpenditureTypeNameById(id) {
  return expenditureTypes.value.find((it) => it.id === id)?.expenditureName ?? "--";
}
function getExpenditureTypeIconById(id) {
  return expenditureTypes.value.find((it) => it.id === id)?.icon ?? "i-carbon:wallet";
}
//新增类型
function handleExpenditureTypeAdd(expenditureType) {
  expenditureTypes.value.push(expenditureType);
}
onMounted(getExpenditureTypes);

//已选择
const selectedTypes = computed(() => {
  return budget.value.budgetDetails?.map((it) => it.budgetExpenditureTypeId) ?? [];
});
function handleChangeSelectedTypes(typeId) {
  if (selectedTypes.value.includes(typeId)) {
    const deleteIndex = budget.value.budgetDetails.findIndex(
      (it) => it.budgetExpenditureTypeId === typeId
    );
    if (deleteIndex >= 0) budget.value.budgetDetails.splice(deleteIndex, 1);
  } else {
    budget.value.budgetDetails.push({
      budgetExpenditureTypeId: typeId,
      remark: null,
      budgetNumber: 0.0,
    });
  }
}

//生成预算基本表
function handleGenerateBasicSheet() {
  if (!budget.value.budgetYearMonth) {
    budget.value.budgetYearMonth = dayjs().valueOf();
  }
  if (!budget.value.budgetTitle) {
    budget.value.budgetTitle = dayjs().format("YYYY年MM月预算表");
  }
  if (!budget.value.budgetTemplateTitle) {
    budget.value.budgetTemplateTitle = `${budget.value.budgetTitle}-模板`;
  }
  budget.value.saveAsBudgetTemplate = true;
  generated.value = true;
}

//重新选择表格
function handleReselectTypes() {
  generated.value = false;
}

//保存
function handleSaveBudget() {
  loading.value = true;
  createBudget({
    ...unref(budget),
    budgetYearMonth: dayjs(unref(budget).budgetYearMonth).format("YYYY-MM"),
  })
    .then(() => {
      return dialog.success({
        title: "成功",
        content: budgetId.value ? "预算已更新" : "预算已创建",
        positiveText: "前往查看",
        onPositiveClick: () => {
          router.replace({
            name: route.query?.redirect || "BudgetIndex",
          });
        },
      });
    })
    .finally(() => (loading.value = false));
}
</script>

<style lang="scss" scoped></style>
<route>
{
  "name":"BudgetCreate"
}
</route>
