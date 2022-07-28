<template>
  <div>
    <n-form-item label="分类">
      <n-select
        v-if="expenseType === 2000"
        w-full
        v-model:value="expenseTypeId"
        filterable
        :options="expenditureTypes"
        label-field="name"
        value-field="id"
      >
      </n-select>
      <n-select
        v-if="expenseType === 1000"
        w-full
        v-model:value="expenseTypeId"
        filterable
        :options="incomeTypes"
        label-field="name"
        value-field="id"
      >
      </n-select>
    </n-form-item>
    <n-form-item label="金额">
      <n-input-number w-full v-model:value="amount">
        <template #prefix> ￥ </template>
      </n-input-number>
    </n-form-item>
    <n-form-item label="备注">
      <n-input v-model:value="remark">
        <template #suffix>
          <span text="gray-500/50">选填</span>
        </template>
      </n-input>
    </n-form-item>
    <n-form-item label="时间">
      <n-space items="center">
        <n-date-picker v-model:value="createTimeTimestamp" type="datetime">
        </n-date-picker>
        <n-time
          :time="0"
          :to="dayjs().subtract(dayjs(createTime)).valueOf()"
          type="relative"
        >
        </n-time>
      </n-space>
    </n-form-item>
    <n-space justify="end">
      <n-button :loading="loading" ghost type="error" @click="handleDeleteExpense">
        删除
      </n-button>
      <n-button :loading="loading" type="success" @click="handleSaveExpense">
        保存
      </n-button>
    </n-space>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import { updateExpense, deleteExpense } from "~/api/expense";
const props = defineProps({
  expenseId: [String, Number],
  expenseType: Number,
  expenditureTypes: Array,
  incomeTypes: Array,
  expenseTypeId: [String, Number],
  remark: String,
  amount: Number,
  createTime: [Number, String],
});
const emits = defineEmits(["saved", "update:createTime"]);
const loading = ref();

const createTimeTimestamp = computed({
  get: () => {
    return dayjs(props.createTime).valueOf();
  },
  set: (val) => {
    emits("update:createTime", dayjs(val).format("YYYY-MM-DD HH:mm:ss"));
  },
});

const message = useMessage();
function handleSaveExpense() {
  updateExpense({
    amount: props.amount,
    expenseType: props.expenseType,
    expenseTypeId: props.expenseTypeId,
    remark: props.remark,
    expenseId: props.expenseId,
    createTime: props.createTime,
  }).then(() => {
    message.success("更新成功");
    emits("saved");
  });
}

function handleDeleteExpense() {
  deleteExpense({
    expenseType: props.expenseType,
    expenseId: props.expenseId,
  }).then(() => {
    message.success("删除成功");
    emits("deleted");
  });
}
</script>

<style lang="scss" scoped></style>
