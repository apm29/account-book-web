<template>
  <n-card p="x-4 y-2" title="7月账单" segmented>
    <template #header-extra>
      <i i-carbon:chevron-right text="2xl" cursor="pointer"></i>
    </template>
    <div grid="~ cols-3" gap="x-5">
      <n-statistic label="月收入" tabular-nums>
        <span text="3xl">
          <n-number-animation :from="0" :to="32039.22" :precision="2">
          </n-number-animation>
        </span>
        <span text="sm">元</span>
      </n-statistic>

      <n-statistic label="月支出" tabular-nums>
        <span text="3xl">
          <n-number-animation :from="0" :to="31039.22" :precision="2">
          </n-number-animation>
        </span>
        <span text="sm">元</span>
      </n-statistic>

      <n-statistic label="月结余" tabular-nums>
        <span text="3xl">
          <n-number-animation :from="0" :to="1000.0" :precision="2"> </n-number-animation>
        </span>
        <span text="sm">元</span>
      </n-statistic>
    </div>
  </n-card>
</template>

<script setup></script>

<style lang="scss" scoped></style>
