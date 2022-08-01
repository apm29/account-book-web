<template>
  <div flex="~" items="end" gap="x-4">
    <n-tooltip trigger="hover">
      <template #trigger>
        <n-button tertiary circle @click="prevMonth">
          <template #icon>
            <i i-carbon-chevron-left></i>
          </template>
        </n-button>
      </template>
      上一年
    </n-tooltip>
    <n-date-picker v-model:value="yearTimestamp" type="year" />
    <n-tooltip trigger="hover">
      <template #trigger>
        <n-button tertiary circle @click="nextMonth">
          <template #icon>
            <i i-carbon-chevron-right></i>
          </template>
        </n-button>
      </template>
      下一年
    </n-tooltip>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
const props = defineProps({
  year: {
    type: String,
    default: () => {
      return dayjs().format("YYYY");
    },
  },
});

const emits = defineEmits(["update:year"]);

const yearTimestamp = computed({
  get: () => dayjs(props.year).valueOf(),
  set: (val) => {
    emits("update:year", dayjs(val).format("YYYY"));
  },
});

function prevMonth() {
  yearTimestamp.value = dayjs(yearTimestamp.value).subtract(1, "year").valueOf();
}

function nextMonth() {
  yearTimestamp.value = dayjs(yearTimestamp.value).add(1, "year").valueOf();
}
</script>

<style lang="scss" scoped></style>
