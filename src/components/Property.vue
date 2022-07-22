<template>
  <n-card p="x-4 y-2" title="个人资产" segmented>
    <template #header-extra>
      <i i-carbon:chevron-right text="2xl" cursor="pointer"></i>
    </template>
    <div grid="~ cols-3" gap="x-5">
      <n-statistic label="净资产" tabular-nums>
        <span text="3xl">
          <n-number-animation :from="0" :to="property.propertyTotal" :precision="2">
          </n-number-animation>
        </span>
        <span text="sm">元</span>
      </n-statistic>

      <n-statistic label="资产" tabular-nums>
        <span text="3xl">
          <n-number-animation :from="0" :to="property.assetsTotal" :precision="2">
          </n-number-animation>
        </span>
        <span text="sm">元</span>
      </n-statistic>

      <n-statistic label="负债" tabular-nums>
        <span text="3xl">
          <n-number-animation :from="0" :to="property.liabilitiesTotal" :precision="2">
          </n-number-animation>
        </span>
        <span text="sm">元</span>
      </n-statistic>
    </div>
  </n-card>
</template>

<script setup>
import { getUserProperty } from "~/api/user";

const property = ref({});
onMounted(async () => {
  const { data } = await getUserProperty();
  property.value = data;
});
</script>

<style lang="scss" scoped></style>
