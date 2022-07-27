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
      <n-tabs type="line" size="large">
        <n-tab-pane name="income" tab="支出">
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
          <n-form-item label="金额">
            <n-input-number w-full v-model:value="amount" placeholder="输入支出金额">
              <template #prefix> ￥ </template>
            </n-input-number>
          </n-form-item>
          <n-form-item label="备注">
            <n-input
              min="!w-400px"
              clearable
              placeholder="请输入备注"
              v-model:value="remark"
            >
              <template #suffix>
                <span text="gray-500/50">选填</span>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item label="时间">
            <n-input min="!w-400px" clearable placeholder="备注" v-model:value="remark">
              <template #suffix>
                <span text="gray-500/50">选填</span>
              </template>
            </n-input>
          </n-form-item>
          <n-button
            :loading="loading"
            block
            type="success"
            @click="handleCreateExpenditure"
          >
            记一笔
          </n-button>
        </n-tab-pane>
        <n-tab-pane name="expenditure" tab="收入"> Hey Jude </n-tab-pane>
      </n-tabs>
    </n-drawer-content>
  </n-drawer>
  <slot>
    <n-button fixed="!~" right="3rem" bottom="2rem" round type="success" @click="toggle">
      <template #icon>
        <i i-carbon:add></i>
      </template>
      记一笔
    </n-button>
  </slot>
</template>

<script setup>
import { useExpenditureTypes, useIncomeTypes } from "~/composables";
import { createExpenditure } from "~/api/expense";
const [show, toggle] = useToggle();
const emits = defineEmits(["saved"]);
//类型字典
const { expenditureTypes, getExpenditureTypes } = useExpenditureTypes();
const { incomeTypes, getIncomeTypes } = useIncomeTypes();
onMounted(getExpenditureTypes);
onMounted(getIncomeTypes);

const expenditureTypeId = ref();
const amount = ref();
const remark = ref();
const loading = ref();

const message = useMessage();
function handleCreateExpenditure() {
  loading.value = true;
  createExpenditure({
    amount: amount.value,
    remark: remark.value,
    expenditureTypeId: expenditureTypeId.value,
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
