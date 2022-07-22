<template>
  <BasicCharts :option="option"></BasicCharts>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  title: String,
});

const { data, title } = toRefs(props);

const option = computed(() => ({
  backgroundColor: "transparent",
  title: {
    text: unref(title),
    textStyle: {
      fontSize: 16,
    },
    left: "center",
    top: "0",
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      type: "line",
      data: unref(data),
      smooth: true,
    },
  ],
}));
</script>

<style lang="scss" scoped></style>
