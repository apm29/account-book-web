<template>
  <n-select
    :value="value"
    @update:value="$emit('update:value', $event)"
    :options="options"
    placeholder="选择图标"
    v-bind="$attrs"
  ></n-select>
</template>

<script setup>
import carbon from "~/assets/json/icons/carbon.json";

defineProps({
  value: [String, Array],
});

const emits = defineEmits(["update:value"]);
function renderIcon(icon) {
  return () =>
    h(
      "div",
      {
        class: ["text-sm flex gap-x-4 items-center"],
      },
      [h("i", { class: [icon, "text-3xl"] }), h("span", null, icon)]
    );
}
const options = ref(
  carbon.map((icon) => ({
    label: renderIcon(icon),
    value: icon,
  }))
);
</script>

<style lang="scss" scoped></style>
