<template>
  <div>
    <n-form-item label="请输入预算类型" min="!w-400px">
      <n-select
        min="!w-400px"
        filterable
        :options="expenditureTypes"
        clearable
        placeholder="按预算类型"
        :value="expenditureTypeId"
        @update:value="$emit('update:expenditureTypeId', $event)"
        :loading="loading"
      />
    </n-form-item>
    <n-form-item label="金额">
      <n-input-number
        w-full
        :value="budgetNumber"
        @update:value="$emit('update:budgetNumber', $event)"
      >
        <template #prefix> ￥ </template>
      </n-input-number>
    </n-form-item>

    <n-form-item label="请输入备注">
      <n-input
        min="!w-400px"
        clearable
        placeholder="备注"
        :value="remark"
        @update:value="$emit('update:remark', $event)"
      >
        <template #suffix>
          <span text="gray-500/50">选填</span>
        </template>
      </n-input>
    </n-form-item>
    <n-form-item>
      <n-button
        min="!w-400px"
        type="primary"
        ghost
        @click="handleSave"
        :loading="saving"
        block
      >
        保存
      </n-button>
    </n-form-item>
  </div>
</template>

<script setup>
import { findAllExpenditureTypes } from "~/api/dict";
import { saveBudgetDetail } from "~/api/budget";
import { useMessage } from "naive-ui";
const props = defineProps({
  expenditureTypeId: {
    type: [String, Number],
  },
  remark: {
    type: String,
  },
  budgetNumber: {
    type: Number,
  },
  //传入时不需要budgetId,为修改
  budgetDetailId: {
    type: Number,
  },
  //传入时不需要budgetDetailId,为新增
  budgetId: {
    type: Number,
  },
});
const emits = defineEmits([
  "saved",
  "update:expenditureTypeId",
  "update:budgetNumber",
  "update:remark",
  "update:budgetDetailId",
  "update:budgetId",
]);

const expenditureTypes = ref([]);
const loading = ref();
function getExpenditureTypes() {
  loading.value = true;
  findAllExpenditureTypes()
    .then((res) => {
      expenditureTypes.value = res.data.map((it) => ({
        value: it.id,
        label: it.expenditureName,
      }));
    })
    .finally(() => {
      loading.value = false;
    });
}
getExpenditureTypes();

const saving = ref();
const message = useMessage();
function handleSave() {
  saveBudgetDetail({
    budgetDetailId: props.budgetDetailId,
    budgetId: props.budgetId,
    budgetExpenditureTypeId: props.expenditureTypeId,
    budgetNumber: props.budgetNumber,
    remark: props.remark,
  }).then(() => {
    message.success("预算项保存成功");
    emits("saved");
  });
}
</script>

<style lang="scss" scoped></style>
