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
          <div grid="~ cols-4 sm:cols-8 md:cols-10 lg:cols-12 xl:cols-16" gap="x-4 y-2">
            <div flex="~ col" items="center" v-for="expenditureType of expenditureTypes">
              <n-tag
                border="~ gray-500/50"
                rounded="!~"
                circle
                checkable
                :checked="checkedTypeId === expenditureType.id"
                @click="checkedTypeId = expenditureType.id"
              >
                <i text="2xl" :class="expenditureType.icon || 'i-carbon:wallet'"></i>
              </n-tag>
              {{ expenditureType.name }}
            </div>
          </div>
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

const [show, toggle] = useToggle();

//类型字典
const { expenditureTypes, getExpenditureTypes } = useExpenditureTypes();
const { incomeTypes, getIncomeTypes } = useIncomeTypes();
onMounted(getExpenditureTypes);
onMounted(getIncomeTypes);

const checkedTypeId = ref();
</script>

<style lang="scss" scoped></style>
