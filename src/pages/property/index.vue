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
              <n-button text @click="handleEditAsset(asset)">
                <i i-carbon:chevron-right text="2xl"></i>
              </n-button>
            </div>
          </template>
          <div>
            <div>{{ asset.assetType.assetName }}</div>
            <div text="gray-500/60">{{ asset.remark }}</div>
          </div>
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
              <n-button text @click="handleEditLiability(liability)">
                <i i-carbon:chevron-right text="2xl"></i>
              </n-button>
            </div>
          </template>
          <div>
            <div>{{ liability.liabilityType.liabilityName }}</div>
            <div text="gray-500/60">{{ liability.remark }}</div>
          </div>
        </n-list-item>
        <template #footer>
          <n-button type="primary" block>
            <template #icon><i i-carbon:add></i></template>
            新增资产
          </n-button>
        </template>
      </n-list>
    </ListSkeleton>
    <n-modal
      v-model:show="showEditAssetModal"
      class="custom-card"
      preset="card"
      title="编辑资产"
      :style="{ width: '400px' }"
      size="huge"
    >
      <n-form-item label="金额">
        <n-input-number w-full v-model:value="editAssetForm.asset">
          <template #prefix> ￥ </template>
        </n-input-number>
      </n-form-item>
      <n-form-item label="备注">
        <n-input v-model:value="editAssetForm.remark">
          <template #suffix>
            <span text="gray-500/50">选填</span>
          </template>
        </n-input>
      </n-form-item>
      <template #footer>
        <n-button :loading="loading" type="success" @click="handleSaveAsset">
          保存
        </n-button>
      </template>
    </n-modal>
    <n-modal
      v-model:show="showEditLiabilityModal"
      class="custom-card"
      preset="card"
      title="编辑负债"
      :style="{ width: '400px' }"
      size="huge"
    >
      <n-form-item label="金额">
        <n-input-number w-full v-model:value="editLiabilityForm.liability">
          <template #prefix> ￥ </template>
        </n-input-number>
      </n-form-item>
      <n-form-item label="备注">
        <n-input v-model:value="editLiabilityForm.remark">
          <template #suffix>
            <span text="gray-500/50">选填</span>
          </template>
        </n-input>
      </n-form-item>
      <template #footer>
        <n-button :loading="loading" type="success" @click="handleSaveLiability">
          保存
        </n-button>
      </template>
    </n-modal>
  </ScrollableContent>
</template>

<script setup>
import {
  getMyProperty,
  setPropertyAsset,
  setPropertyLiability,
} from "@/api/user/property";

const loading = ref(true);
const property = ref({});
async function getPropertyData() {
  loading.value = true;
  const { data } = await getMyProperty().finally(() => (loading.value = false));
  property.value = data;
}
onMounted(getPropertyData);

//编辑
const [showEditAssetModal, toggleEditAsset] = useToggle();
const editAssetForm = ref({
  asset: 0.0,
  remark: "",
  assetId: null,
});
function handleEditAsset(asset) {
  editAssetForm.value = {
    asset: asset.asset,
    remark: asset.remark,
    assetId: asset.id,
  };
  toggleEditAsset();
}
function handleSaveAsset() {
  loading.value = true;
  setPropertyAsset(unref(editAssetForm))
    .then(() => {
      toggleEditAsset();
      return getPropertyData();
    })
    .finally(() => (loading.value = false));
}

const [showEditLiabilityModal, toggleEditLiability] = useToggle();
const editLiabilityForm = ref({
  liability: 0.0,
  remark: "",
  liabilityId: null,
});
function handleEditLiability(liability) {
  editLiabilityForm.value = {
    liability: liability.liability,
    remark: liability.remark,
    liabilityId: liability.id,
  };
  toggleEditLiability();
}
function handleSaveLiability() {
  loading.value = true;
  setPropertyLiability(unref(editLiabilityForm))
    .then(() => {
      toggleEditLiability();
      return getPropertyData();
    })
    .finally(() => (loading.value = false));
}

//TODO 新增资产
</script>

<style lang="scss" scoped></style>

<route>
{
  "name":"PropertyIndex"
}
</route>
