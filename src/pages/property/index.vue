<template>
  <ScrollableContent>
    <ListSkeleton :loading="loading">
      <n-list>
        <template #header>
          <div grid="~ cols-2" p="x-4 y-2">
            <n-statistic label="净资产" tabular-nums col="span-2" text="center">
              <span text="5xl">
                <n-number-animation
                  :from="100000"
                  :to="property.propertyTotal"
                  :precision="2"
                >
                </n-number-animation>
              </span>
              <span text="sm">元</span>
            </n-statistic>

            <n-statistic label="资产" tabular-nums text="center">
              <span text="3xl">
                <n-number-animation
                  :from="100000"
                  :to="property.assetsTotal"
                  :precision="2"
                >
                </n-number-animation>
              </span>
              <span text="sm">元</span>
            </n-statistic>

            <n-statistic label="负债" tabular-nums text="center">
              <span text="3xl">
                <n-number-animation
                  :from="0"
                  :to="property.liabilitiesTotal"
                  :precision="2"
                >
                </n-number-animation>
              </span>
              <span text="sm">元</span>
            </n-statistic>
          </div>
        </template>
        <n-h5 prefix="bar">资产</n-h5>
        <n-list-item v-for="asset of property.assets" p="!x-5 !y-2">
          <template #prefix>
            <n-avatar round>
              <i text="xl" :class="asset.assetType.icon || 'i-carbon:wallet'"></i>
            </n-avatar>
          </template>
          <template #suffix>
            <div flex="~" items="center" gap="x-4">
              <n-text type="primary">
                {{ asset.asset.toFixed(2) }}
              </n-text>
              <n-button text>
                <i i-carbon:chevron-right text="2xl"></i>
              </n-button>
            </div>
          </template>
          {{ asset.assetType.assetName }}
        </n-list-item>
        <n-h5 prefix="bar">负债</n-h5>
        <n-list-item v-for="liability of property.liabilities" p="!x-5 !y-2">
          <template #prefix>
            <n-avatar round>
              <i text="xl" :class="liability.liabilityType.icon || 'i-carbon:wallet'"></i>
            </n-avatar>
          </template>
          <template #suffix>
            <div flex="~" items="center" gap="x-4">
              <n-text type="primary">
                {{ liability.liability.toFixed(2) }}
              </n-text>
              <n-button text>
                <i i-carbon:chevron-right text="2xl"></i>
              </n-button>
            </div>
          </template>
          {{ liability.liabilityType.liabilityName }}
        </n-list-item>
      </n-list>
    </ListSkeleton>
  </ScrollableContent>
</template>

<script setup>
import { getMyProperty } from "@/api/user/property";
import { onActivated } from "vue";

const loading = ref(true);
const property = ref({});
async function getPropertyData() {
  loading.value = true;
  const { data } = await getMyProperty().finally(() => (loading.value = false));
  property.value = data;
}
onActivated(getPropertyData);
</script>

<style lang="scss" scoped></style>

<route>
{
  "name":"PropertyIndex"
}
</route>
