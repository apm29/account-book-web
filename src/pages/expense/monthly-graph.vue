<template>
  <ScrollableContent>
    <n-list p="!x-5 !y-4">
      <n-h1>{{ dayjs(yearMonth).format("YYYY年MM月账单") }}</n-h1>
      <n-divider />
      <n-space items="start">
        <LabeledNumber
          title="本月结余"
          :number="expenseView.surplusNumber"
        ></LabeledNumber>
        <LabeledNumber
          title="上月结余"
          :number="expenseView.surplusLastMonthNumber"
          text="gray-500/60"
        ></LabeledNumber>
      </n-space>
      <BasicCharts w="80vw" h="40" :option="expenseOptions"> </BasicCharts>
      <n-divider />
      <n-h2>支出类型</n-h2>
      <n-space>
        <BasicCharts w="50vw" h="60" :option="expenditureTypedOptions"> </BasicCharts>
        <n-table flex="grow" size="tiny" p="x-2">
          <thead>
            <tr>
              <th align="center" min="w-12vw">占比</th>
              <th text="center" min="w-12vw">金额</th>
              <th text="center" min="w-5vw">类型</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="typed of expenseView.typedExpenditures">
              <td>
                {{
                  (typed.expenditureNumber / expenseView.expenditureNumber).toFixed(4) *
                  100
                }}
                %
              </td>
              <td>{{ typed.expenditureNumber.toFixed(2) }}</td>
              <td>{{ typed.typeName }}</td>
            </tr>
          </tbody>
        </n-table>
      </n-space>
      <n-h2>支出排行</n-h2>
      <n-list-item v-for="(topExpenditure, index) of expenseView.topExpenditures">
        <template #prefix>
          <div flex="~" items="center">
            <n-text type="info">{{ index + 1 }}</n-text>
            <div bg="gray-300/50" rounded="full" m="2" p="1">
              <i :class="topExpenditure.type.icon" text="3xl"></i>
            </div>
          </div>
        </template>
        <div>
          <n-text> {{ topExpenditure.type.name }} </n-text>
          <div text="gray-500/50">
            {{ dayjs(topExpenditure.expenseTime).format("MM月DD日") }}
          </div>
        </div>
        <template #suffix>
          <n-text> -{{ topExpenditure.amount }} </n-text>
        </template>
      </n-list-item>
    </n-list>
  </ScrollableContent>
</template>

<script setup>
import dayjs from "dayjs";
import { findMonthlyTypedAndRankeExpenseGraphView } from "~/api/statistics";

const props = defineProps({
  yearMonth: {
    type: String,
    default: () => {
      return dayjs().format("YYYY-MM");
    },
  },
});
const { yearMonth } = toRefs(props);
const expenseView = ref({
  expenditureNumber: 0.0,
  incomeNumber: 0.0,
  surplusNumber: 0.0,
  surplusLastMonthNumber: 0.0,
  typedExpenditures: [],
  topExpenditures: [],
  timeSequencedExpenditures: [],
  timeSequencedIncomes: [],
  topIncome: [],
  halfYearMonthlyGroupedExpenditure: [],
});

const expenseOptions = computed(() => ({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    left: "5%",
    right: "10%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "value",
    show: false,
  },
  yAxis: {
    type: "category",
    data: ["收入", "支出"],
    axisTick: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: "rgba(107, 114, 128, 0.6)",
      },
    },
  },
  backgroundColor: "transparent",
  series: [
    {
      name: yearMonth.value,
      type: "bar",
      showBackground: true,
      label: {
        show: true,
        position: "right",
        textBorderColor: "transparent",
        fontWeight: "bold",
        formatter: "{b}{c}元",
      },
      backgroundStyle: {
        borderRadius: [0, 5, 5, 0], //（顺时针左上，右上，右下，左下）
        shadowColor: "rgba(0, 0, 0, 0.5)",
      },
      itemStyle: {
        borderRadius: [0, 5, 5, 0], //（顺时针左上，右上，右下，左下）
      },
      data: [
        {
          value: unref(expenseView).incomeNumber,
          itemStyle: {
            color: "#d4f265",
          },
        },
        {
          value: unref(expenseView).expenditureNumber,
          itemStyle: {
            color: "#8a86f2",
          },
        },
      ],
    },
  ],
}));

const expenditureTypedOptions = computed(() => ({
  tooltip: {
    trigger: "item",
  },
  legend: {
    type: "scroll",
    orient: "vertical",
    right: 10,
    top: 20,
    bottom: 20,
    data: unref(expenseView).typedExpenditures.map((it) => ({
      name: it.typeName,
      icon: "roundRect",
    })),
  },
  series: [
    {
      name: "支出类型",
      type: "pie",
      radius: ["60%", "90%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "20",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: unref(expenseView).typedExpenditures.map((it) => ({
        name: it.typeName,
        value: it.expenditureNumber,
      })),
    },
  ],
}));

onMounted(() => {
  findMonthlyTypedAndRankeExpenseGraphView({
    yearMonth: dayjs(unref(yearMonth)).format("YYYY-MM"),
  }).then((res) => {
    expenseView.value = res.data;
  });
});
</script>

<style lang="scss" scoped></style>
<route>
{
  "name":"MonthlyExpenseGraph"
}
</route>
