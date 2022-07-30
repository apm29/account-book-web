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
      上个月
    </n-tooltip>
    <n-date-picker v-model:value="yearMonthTimestamp" type="month" />
    <n-tooltip trigger="hover">
      <template #trigger>
        <n-button tertiary circle @click="nextMonth">
          <template #icon>
            <i i-carbon-chevron-right></i>
          </template>
        </n-button>
      </template>
      下个月
    </n-tooltip>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
const props = defineProps({
  yearMonth: {
    type: String,
    default: () => {
      return dayjs().format("YYYY-MM");
    },
  },
});

const emits = defineEmits(["update:yearMonth"]);

const yearMonthTimestamp = computed({
  get: () => dayjs(props.yearMonth).valueOf(),
  set: (val) => {
    emits("update:yearMonth", dayjs(val).format("YYYY-MM"));
  },
});

function prevMonth() {
  yearMonthTimestamp.value = dayjs(yearMonthTimestamp.value).subtract(1, "M").valueOf();
}

function nextMonth() {
  yearMonthTimestamp.value = dayjs(yearMonthTimestamp.value).add(1, "M").valueOf();
}
</script>

<style lang="scss" scoped></style>
