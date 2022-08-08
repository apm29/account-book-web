<template>
  <ScrollableContent>
    <ListSkeleton :loading="loading">
      <n-list v-if="pagedData && pagedData.length" p="!x-4 !t-6">
        <template #header>
          <div flex="~">
            <n-text>我的预算</n-text>
            <div flex="grow"></div>
            <n-button text type="primary" @click="handleCreate">
              <template #icon>
                <i i-carbon:add></i>
              </template>
              创建预算
            </n-button>
            <n-button text type="primary" @click="handleCreateFromTemplate">
              <template #icon>
                <i i-carbon:add></i>
              </template>
              从模板创建
            </n-button>
          </div>
        </template>

        <n-scrollbar
          style="max-height: 300px"
          w="![calc(100vw-40px)]"
          x-scrollable
          m="b-2"
          v-for="budget of pagedData"
        >
          <n-h2 space="x-3">
            <span m="r-6">{{ budget.budgetName }}</span>
            <n-button size="tiny" ghost type="success" @click="handleEdit(budget.id)">
              <template #icon>
                <i i-carbon:edit></i>
              </template>
              编辑预算
            </n-button>
            <n-button
              size="tiny"
              ghost
              type="success"
              @click="handleViewChartDetail(budget.budgetYearMonthName)"
            >
              <template #icon>
                <i i-carbon:chart-area-smooth></i>
              </template>
              预算图表
            </n-button>
            <n-popconfirm @positive-click="handleDelete(budget.id)">
              确认删除该月预算吗?
              <template #trigger>
                <n-button size="tiny" ghost type="error">
                  <template #icon>
                    <i i-carbon:task-remove></i>
                  </template>
                  删除预算
                </n-button>
              </template>
            </n-popconfirm>
            <n-text type="info" text="xs">
              创建于
              <n-time
                :time="0"
                :to="dayjs().subtract(dayjs(budget.createTime)).valueOf()"
                type="relative"
              />
            </n-text>
            <n-text type="info" text="xs">
              更新于
              <n-time
                :time="0"
                :to="dayjs().subtract(dayjs(budget.updateTime)).valueOf()"
                type="relative"
              />
            </n-text>
          </n-h2>
          <n-table p="b-5" w="![calc(100vw-5rem)]" overflow="auto">
            <thead>
              <tr>
                <th min="w-6rem">
                  <n-text type="success">类型</n-text>
                </th>
                <th
                  min="w-4rem"
                  class="group"
                  v-for="budgetDetail of budget.budgetDetails"
                  :key="budgetDetail.id"
                >
                  <div flex="~" items="center">
                    {{ budgetDetail.budgetExpenditure.name }}
                    <n-popconfirm @positive-click="handleDeleteDetail(budgetDetail.id)">
                      <template #trigger>
                        <n-button type="error" text class="group-hover:visible" invisible>
                          <template #icon>
                            <i i-carbon:task-remove />
                          </template>
                        </n-button>
                      </template>
                      删除该项预算吗
                    </n-popconfirm>
                  </div>
                </th>
                <th min="w-6rem">
                  <n-text type="warning">总计</n-text>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <n-text type="success">预算金额</n-text>
                </td>
                <td
                  v-for="budgetDetail of budget.budgetDetails"
                  :key="budgetDetail.id"
                  class="group"
                >
                  <div flex="~" items="center">
                    {{ budgetDetail.budgetNumber.toFixed(2) }}
                    <n-button
                      @click="handleEditDetail(budgetDetail)"
                      type="primary"
                      text
                      class="group-hover:visible"
                      invisible
                    >
                      <template #icon>
                        <i i-carbon:edit />
                      </template>
                    </n-button>
                  </div>
                </td>
                <td>
                  {{ budget.budgetTotal.toFixed(2) }}
                </td>
              </tr>
              <tr>
                <td>
                  <n-text type="success">备注</n-text>
                </td>
                <td
                  v-for="budgetDetail of budget.budgetDetails"
                  :key="budgetDetail.id"
                  class="group"
                >
                  <div flex="~" items="center" text="gray-600/50 sm">
                    {{ budgetDetail.remark }}
                  </div>
                </td>
              </tr>
            </tbody>
          </n-table>
        </n-scrollbar>
      </n-list>
      <n-result
        v-else
        status="info"
        title="暂未创建预算"
        description="创建一个预算或者从模板套用"
        p="6"
      >
        <template #footer>
          <div flex="~" justify="center" gap="x-4">
            <n-button @click="handleCreate"> 创建自己的预算 </n-button>
            <n-button @click="handleCreateFromTemplate"> 从模板创建 </n-button>
          </div>
        </template>
      </n-result>
    </ListSkeleton>
    <n-modal
      preset="card"
      title="编辑资产"
      :style="{ width: '480px' }"
      size="huge"
      v-model:show="showEditDetail"
    >
      <BudgetDetailEditor
        v-model:expenditureTypeId="budgetDetailForm.budgetExpenditure.id"
        v-model:budgetNumber="budgetDetailForm.budgetNumber"
        v-model:remark="budgetDetailForm.remark"
        v-model:budgetDetailId="budgetDetailForm.id"
        @saved="handleDetailSaved"
      ></BudgetDetailEditor>
    </n-modal>
  </ScrollableContent>
</template>

<script setup>
import { getPagedBudgets, deleteBudgetDetail, deleteBudget } from "~/api/budget";
import { useRouter } from "vue-router";
import dayjs from "dayjs";

const budgetTitle = ref();
const loading = ref(true);
const total = ref(0);
const pageNo = ref(1);
const pageSize = ref(30);
const pagedData = ref([]);
async function getPagedData({ refresh } = {}) {
  if (refresh) {
    total.value = 0;
    pageNo.value = 1;
    pagedData.value = [];
  }
  loading.value = true;
  const { data } = await getPagedBudgets({
    budgetTitle: unref(budgetTitle),
    pageNo: unref(pageNo),
    pageSize: unref(pageSize),
  }).finally(() => (loading.value = false));
  pagedData.value = data.content || [];
  total.value = data.totalElements;
}
onMounted(getPagedData);

const router = useRouter();
function handleCreateFromTemplate() {
  router.push({
    name: "BudgetCreateFromTemplate",
    query: {
      redirect: "BudgetIndex",
    },
  });
}
function handleCreate() {
  router.push({
    name: "BudgetCreate",
    query: {
      redirect: "BudgetIndex",
    },
  });
}

function handleEdit(budgetId) {
  router.push({
    name: "BudgetCreate",
    query: {
      redirect: "BudgetIndex",
      budgetId,
    },
  });
}

function handleViewChartDetail(budgetYearMonthName) {
  router.push({
    name: "BugdetMonthlyGraph",
    query: {
      yearMonth: budgetYearMonthName,
    },
  });
}

//编辑单项
const [showEditDetail, toggleEditDetail] = useToggle();
const budgetDetailForm = ref({});
function handleEditDetail(budgetDetail) {
  budgetDetailForm.value = { ...budgetDetail };
  toggleEditDetail();
}
function handleDetailSaved() {
  toggleEditDetail();
  getPagedData();
}

//删除
function handleDeleteDetail(id) {
  deleteBudgetDetail(id).then((res) => {
    getPagedData();
  });
}
function handleDelete(id) {
  deleteBudget(id).then((res) => {
    getPagedData();
  });
}
</script>

<style lang="scss" scoped></style>

<route>
{
  "name":"BudgetIndex"
}
</route>
