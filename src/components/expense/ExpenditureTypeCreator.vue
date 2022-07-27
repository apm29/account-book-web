<template>
  <n-popover trigger="click" v-model:show="show">
    <template #trigger>
      <slot>
        <n-button ghost size="small" dashed @click="toggle">
          <template #icon>
            <i i-carbon:add-alt></i>
          </template>
          新建类型
        </n-button>
      </slot>
    </template>
    <n-form-item label="图标与名称">
      <n-input-group>
        <n-select v-model:value="form.icon" w="!6rem" :options="iconSelection">
        </n-select>
        <n-input
          @keyup.enter="handleCreate"
          v-model:value="form.expenditureName"
          w="!12rem"
        >
        </n-input>
        <n-button :loading="loading" type="success" ghost @click="handleCreate">
          创建
        </n-button>
      </n-input-group>
    </n-form-item>
  </n-popover>
</template>

<script setup>
import { createExpenditureType } from "~/api/expense";

const emits = defineEmits(["created"]);
const [show, toggle] = useToggle();
const form = ref({
  icon: "i-ant-design:money-collect-outlined",
  expenditureName: null,
});
const icons = [
  "i-ant-design:credit-card-twotone",
  "i-mdi:cash-100",
  "i-ant-design:credit-card-twotone",
  "i-ant-design:alipay-outlined",
  "i-carbon:logo-wechat",
  "i-ant-design:stock-outlined",
  "i-ant-design:money-collect-outlined",
];
function renderIcon(icon) {
  return () => h("i", { class: [icon, "text-2xl"] });
}
const iconSelection = icons.map((icon) => ({
  label: renderIcon(icon),
  value: icon,
}));
const loading = ref();
function handleCreate() {
  loading.value = true;
  createExpenditureType(unref(form))
    .then((res) => {
      emits("created", res.data);
      toggle();
    })
    .finally(() => (loading.value = false));
}
</script>

<style lang="scss" scoped></style>
