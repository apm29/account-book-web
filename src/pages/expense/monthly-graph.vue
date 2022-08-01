<template>
  <ScrollableContent>
    <n-list p="!x-5 !y-4">
      <n-h1 flex="~">
        {{ dayjs(yearMonth).format("YYYY年MM月账单") }}
        <div flex="grow"></div>
        <MonthSelector v-model:yearMonth="yearMonth" />
      </n-h1>
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
        <n-table flex="grow" size="tiny">
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
                  (
                    (typed.expenditureNumber / expenseView.expenditureNumber) *
                    100
                  ).toFixed(2)
                }}
                %
              </td>
              <td>{{ typed.expenditureNumber.toFixed(2) }}</td>
              <td>{{ typed.typeName }}</td>
            </tr>
          </tbody>
        </n-table>
      </n-space>
      <n-divider />
      <n-h2>支出排行</n-h2>
      <n-list-item v-for="(topExpenditure, index) of expenseView.topExpenditures">
        <template #prefix>
          <div flex="~" items="center" gap="x-3" font="bold">
            <n-text type="info">{{ index + 1 }}</n-text>
            <ExpenseTypeIcon :icon="topExpenditure.type.icon"></ExpenseTypeIcon>
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
      <n-h2>支出趋势</n-h2>
      <BasicCharts :option="expenditureTrendsOptions" w="90vw" h="80" />
      <n-divider />
      <n-h2>月支出对比</n-h2>
      <BasicCharts :option="expenditureMonthTrendsOptions" w="90vw" h="80" />
    </n-list>
  </ScrollableContent>
</template>

<script setup>
import dayjs from "dayjs";
import { findMonthlyTypedAndRankeExpenseGraphView } from "~/api/statistics";
import ExpenseTypeIcon from "~/components/widget/ExpenseTypeIcon.vue";

const yearMonth = ref(dayjs().format("YYYY-MM"));

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
  backgroundColor: "transparent",
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

const expenditureTrendsOptions = computed(() => ({
  tooltip: {
    trigger: "axis",
  },
  backgroundColor: "transparent",
  grid: {
    left: 64,
    right: 64,
    top: 30,
    bottom: 32,
  },
  xAxis: {
    type: "category",
    data: Array.from({ length: dayjs(unref(yearMonth)).daysInMonth() }).map(
      (_, index) => `${index + 1}日`
    ),
    axisTick: {
      show: false,
    },
    axisLabel: {
      interval: 3,
    },
    boundaryGap: false,
  },
  yAxis: {
    type: "value",
    axisLine: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
  },
  series: [
    {
      type: "line",
      data: Array.from({ length: dayjs(unref(yearMonth)).daysInMonth() }).map(
        (_, index) => {
          const dayOfMonth = index + 1;
          const find = expenseView.value.timeSequencedExpenditures.find(
            (detail) => dayjs(detail.descriptionOfRange).date() === dayOfMonth
          );
          return find ? find.expenditure : 0;
        }
      ),
      smooth: true,
      name: "当日支出",
      markLine: {
        data: [
          { type: "average", name: "Avg" },
          { type: "max", name: "Avg" },
        ],
      },
    },
  ],
}));
const expenditureMonthTrendsOptions = computed(() => ({
  backgroundColor: "transparent",
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: expenseView.value.halfYearMonthlyGroupedExpenditure.map(
        (it) => it.descriptionOfRange
      ),
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(107, 114, 128, 0.6)",
        },
      },
    },
  ],
  yAxis: [
    {
      type: "value",
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: "月支出",
      type: "bar",
      barWidth: "30",
      data: expenseView.value.halfYearMonthlyGroupedExpenditure.map(
        (it) => it.expenditure
      ),
      label: {
        show: true,
        position: "top",
        textBorderColor: "transparent",
        fontWeight: "bold",
        formatter: "{c}元",
      },
      itemStyle: {
        borderRadius: [8, 8, 0, 0], //（顺时针左上，右上，右下，左下）
      },
    },
  ],
}));
const getViewData = function () {
  findMonthlyTypedAndRankeExpenseGraphView({
    yearMonth: dayjs(unref(yearMonth)).format("YYYY-MM"),
  }).then((res) => {
    expenseView.value = res.data;
  });
};
onMounted(getViewData);
watch(yearMonth, getViewData);
</script>

<style lang="scss" scoped></style>
<route>
{
  "name":"MonthlyExpenseGraph"
}
</route>
