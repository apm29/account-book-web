<template>
  <ScrollableContent>
    <n-list p="!x-4 !y-5">
      <div flex="~" items="center" gap="x-12">
        <n-popselect
          flex="shrink-0"
          v-model:value="type"
          :options="options"
          trigger="hover"
          m="x-auto"
        >
          <n-h2
            cursor="pointer"
            text="!3xl"
            m="!b-0"
            whitespace="nowrap"
            flex="inline"
            items="center"
          >
            {{ typeName }}
            <i i-carbon:caret-down />
          </n-h2>
        </n-popselect>
        <n-tabs type="segment" max="w-72">
          <n-tab name="weekly"> 周 </n-tab>
          <n-tab name="monthly"> 月 </n-tab>
          <n-tab name="annually"> 年 </n-tab>
        </n-tabs>
      </div>
    </n-list>
  </ScrollableContent>
</template>

<script setup>
import { unref } from "vue";

const type = ref();
const typeName = computed(() => {
  return options.find((it) => it.value == unref(type))?.label ?? "全部";
});
const options = [
  {
    label: "支出",
    value: 1000,
  },
  {
    label: "收入",
    value: 2000,
  },
];
</script>

<style lang="scss" scoped></style>

<route>
{
  "name":"GraphIndex"
}
</route>
