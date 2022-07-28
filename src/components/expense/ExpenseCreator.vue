<template>
  <n-drawer placement="bottom" v-model:show="show" height="100vh">
    <n-drawer-content :native-scrollbar="false">
      <div flex="~">
        <n-h2>记账</n-h2>
        <div flex="grow"></div>
        <n-button @click="toggle" tertiary size="small">
          <i i-carbon:close text="lg"></i>
        </n-button>
      </div>
      <n-tabs v-model:value="expenseType" type="line" size="large">
        <n-tab-pane name="expenditure" tab="支出">
          <div
            grid="~ cols-4 sm:cols-8 md:cols-10 lg:cols-12 xl:cols-16"
            gap="x-4 y-4"
            m="b-6"
          >
            <div flex="~ col" items="center" v-for="expenditureType of expenditureTypes">
              <div
                border="~ gray-500/50"
                rounded="!full"
                h="3rem"
                flex="~"
                items="center"
                justify="center"
                w="3rem"
                :class="
                  expenditureTypeId === expenditureType.id
                    ? 'bg-green-500 text-white'
                    : ''
                "
                @click="expenditureTypeId = expenditureType.id"
              >
                <i text="2xl" :class="expenditureType.icon || 'i-carbon:wallet'"></i>
              </div>
              {{ expenditureType.name }}
            </div>
            <ExpenditureTypeCreator @created="getExpenditureTypes">
              <div flex="~ col" items="center">
                <div
                  border="~ dashed gray-500/50 hover:green-400"
                  rounded="!full"
                  h="3rem"
                  flex="~"
                  items="center"
                  justify="center"
                  w="3rem"
                >
                  <i text="2xl" i-carbon:add></i>
                </div>
                新建类型
              </div>
            </ExpenditureTypeCreator>
          </div>
        </n-tab-pane>
        <n-tab-pane name="income" tab="收入">
          <div
            grid="~ cols-4 sm:cols-8 md:cols-10 lg:cols-12 xl:cols-16"
            gap="x-4 y-4"
            m="b-6"
          >
            <div flex="~ col" items="center" v-for="incomeType of incomeTypes">
              <div
                border="~ gray-500/50"
                rounded="!full"
                h="3rem"
                flex="~"
                items="center"
                justify="center"
                w="3rem"
                :class="incomeTypeId === incomeType.id ? 'bg-green-500 text-white' : ''"
                @click="incomeTypeId = incomeType.id"
              >
                <i text="2xl" :class="incomeType.icon || 'i-carbon:wallet'"></i>
              </div>
              {{ incomeType.name }}
            </div>
            <ExpenditureTypeCreator @created="getExpenditureTypes">
              <div flex="~ col" items="center">
                <div
                  border="~ dashed gray-500/50 hover:green-400"
                  rounded="!full"
                  h="3rem"
                  flex="~"
                  items="center"
                  justify="center"
                  w="3rem"
                >
                  <i text="2xl" i-carbon:add></i>
                </div>
                新建类型
              </div>
            </ExpenditureTypeCreator>
          </div>
        </n-tab-pane>
      </n-tabs>
      <n-form inline>
        <n-form-item label="金额">
          <n-input-number v-model:value="amount" placeholder="输入金额">
            <template #prefix> ￥ </template>
          </n-input-number>
        </n-form-item>
        <n-form-item label="时间">
          <n-space items="center">
            <n-date-picker v-model:value="createTime" type="datetime"> </n-date-picker>
            <n-time
              :time="0"
              :to="dayjs().subtract(dayjs(createTime)).valueOf()"
              type="relative"
            >
            </n-time>
          </n-space>
        </n-form-item>
        <n-form-item label="备注">
          <n-input clearable placeholder="请输入备注" v-model:value="remark">
            <template #suffix>
              <span text="gray-500/50">选填</span>
            </template>
          </n-input>
        </n-form-item>
      </n-form>

      <n-button :loading="loading" block type="success" @click="handleCreateExpenditure">
        <template #icon>
          <i i-carbon:add></i>
        </template>
        记一笔
      </n-button>
    </n-drawer-content>
  </n-drawer>
  <slot>
    <n-button
      shadow="lg"
      fixed="!~"
      right="3rem"
      bottom="2rem"
      round
      type="success"
      @click="toggle"
    >
      <template #icon>
        <i i-carbon:add></i>
      </template>
      记一笔
    </n-button>
  </slot>
</template>

<script setup>
import dayjs from "dayjs";
import { useExpenditureTypes, useIncomeTypes } from "~/composables";
import { createExpenditure, createIncome } from "~/api/expense";
const [show, toggle] = useToggle();
const emits = defineEmits(["saved"]);
//类型字典
const { expenditureTypes, getExpenditureTypes } = useExpenditureTypes();
const { incomeTypes, getIncomeTypes } = useIncomeTypes();
onMounted(getExpenditureTypes);
onMounted(getIncomeTypes);

const expenseType = ref("expenditure");
const expenditureTypeId = ref();
const incomeTypeId = ref();
const amount = ref();
const remark = ref();
const loading = ref();
const createTime = ref(dayjs().valueOf());

const message = useMessage();
function handleCreateExpenditure() {
  if (!amount.value || amount.value <= 0) {
    return message.error("金额未填写");
  }
  if (expenseType.value === "expenditure" && !expenditureTypeId.value) {
    return message.error("未选择类型");
  }
  if (expenseType.value === "income" && !incomeTypeId.value) {
    return message.error("未选择类型");
  }
  loading.value = true;
  const createFunction =
    expenseType.value === "expenditure" ? createExpenditure : createIncome;
  createFunction({
    amount: amount.value,
    remark: remark.value,
    expenditureTypeId: expenditureTypeId.value,
    incomeTypeId: incomeTypeId.value,
    createTime: dayjs(createTime.value).format("YYYY-MM-DD HH:mm:ss"),
  })
    .then(() => {
      message.success("已记账");
      toggle();
      emits("saved");
    })
    .finally(() => (loading.value = false));
}
</script>

<style lang="scss" scoped></style>
