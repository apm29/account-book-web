<template>
  <ScrollableContent>
    <div
      w="full"
      h="[calc(100vh-55px)]"
      flex="~ col"
      gap="y-6"
      justify="center"
      items="center"
    >
      <i i-carbon:table-built text="6xl"></i>
      <n-form-item label="请输入模板名称" min="!w-400px">
        <n-select
          min="!w-400px"
          filterable
          :options="templates"
          :loading="loading"
          clearable
          remote
          @search="handleSearch"
          placeholder="按模板名称"
          v-model:value="budgetTemplateId"
        />
      </n-form-item>

      <n-form-item label="请选择预算月份">
        <n-date-picker min="!w-400px" v-model:value="yearMonth" type="month" clearable />
      </n-form-item>
      <n-form-item label="请输入预算名称">
        <n-input
          min="!w-400px"
          clearable
          placeholder="预算名称"
          v-model:value="budgetTitle"
        >
          <template #suffix>
            <span text="gray-500/50">选填</span>
          </template>
        </n-input>
      </n-form-item>
      <n-form-item>
        <n-button
          min="!w-400px"
          type="primary"
          ghost
          :disabled="!budgetTemplateId || !yearMonth"
          @click="handleCreate"
          :loading="creating"
          block
        >
          创建
        </n-button>
      </n-form-item>
    </div>
  </ScrollableContent>
</template>

<script setup>
import { createBudgetFromTemplate, searchBudgetTemplate } from "~/api/budget";
import dayjs from "dayjs";
import ScrollableContent from "~/components/ScrollableContent.vue";
import { useDebounceFn } from "@vueuse/core";
import { useMessage, useDialog } from "naive-ui";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
const budgetTemplateId = ref();
const yearMonth = ref(new Date().getTime());
const budgetTitle = ref();
const defaultYear = computed(() => {
  return dayjs(unref(yearMonth)).format("YYYY年");
});
//设置默认预算标题
watch(
  yearMonth,
  function () {
    budgetTitle.value = dayjs(unref(yearMonth)).format("YYYY年MM月预算表");
  },
  { immediate: true }
);

const loading = ref();
const creating = ref();
const message = useMessage();
const dialog = useDialog();
const router = useRouter();
const route = useRoute();
const templates = ref([]);
function templateSearch(query) {
  if (!query) {
    return;
  }
  loading.value = true;
  searchBudgetTemplate(query)
    .then((res) => {
      templates.value = res.data.map((it) => ({
        label: `${it.budgetName} (${it.budgetYearMonthName})`,
        value: it.id,
      }));
    })
    .finally(() => (loading.value = false));
}
const handleSearch = useDebounceFn(templateSearch, 800);
onMounted(() => templateSearch(unref(defaultYear)));

function handleCreate() {
  creating.value = true;
  createBudgetFromTemplate({
    budgetTemplateId: unref(budgetTemplateId),
    budgetTitle: unref(budgetTitle),
    yearMonth: dayjs(unref(yearMonth)).format("YYYY-MM"),
  })
    .then(() => {
      dialog.success({
        title: "成功",
        content: "已创建预算",
        positiveText: "前往查看",
        onPositiveClick: () => {
          router.replace({
            name: route.query?.redirect || "BudgetIndex",
          });
        },
      });
    })
    .finally(() => {
      creating.value = false;
    });
}
</script>

<style lang="scss" scoped></style>
<route>
{
  "name":"BudgetCreateFromTemplate"
}
</route>
