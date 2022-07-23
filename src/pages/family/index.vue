<template>
  <ScrollableContent>
    <ListSkeleton :loading="loading">
      <n-list v-if="pagedData && pagedData.length" p="!x-4 !y-6">
        <template #header>
          <div flex="~">
            <n-text>我加入的家庭</n-text>
            <div flex="grow"></div>
            <n-button text type="primary" @click="handleCreate">
              <template #icon>
                <i i-carbon:add></i>
              </template>
              创建家庭
            </n-button>
          </div>
        </template>
        <n-thing v-for="family of pagedData" m="t-12">
          <template #avatar>
            <i text="2xl" i-carbon:group-access></i>
          </template>
          <template #header>
            {{ family.name }}
            <n-gradient-text type="success">#{{ family.hash }}</n-gradient-text>
          </template>
          <template #header-extra>
            <n-text type="info">
              创建于
              <n-time
                :time="0"
                :to="dayjs().subtract(dayjs(family.createTime)).valueOf()"
                type="relative"
              />
            </n-text>
          </template>
          <template #footer>
            <transition-group>
              <div v-for="member of family.members" :key="member.id">
                <n-avatar round :src="member.userDetail.photo" bordered> </n-avatar>
                <n-gradient-text type="info" :size="8">{{ member.name }}</n-gradient-text>
              </div>
            </transition-group>
          </template>
          <template #action>
            <n-space>
              <n-button size="small" type="success">
                <template #icon>
                  <i i-carbon:chart-area> </i>
                </template>
                统计
              </n-button>
              <n-button size="small" type="error">
                <template #icon>
                  <i i-carbon:dog-walker> </i>
                </template>
                离开
              </n-button>
            </n-space>
          </template>
        </n-thing>
      </n-list>
      <n-result
        v-else
        status="info"
        title="暂未加入家庭"
        description="创建一个新家庭或者加入一个家庭"
        p="6"
      >
        <template #footer>
          <div flex="~" justify="center" gap="x-4">
            <n-button @click="handleCreate"> 创建自己的家庭 </n-button>
            <n-button
              @click="
                $router.push({ name: 'FamilyJoin', query: { redirect: 'FamilyIndex' } })
              "
            >
              加入家庭
            </n-button>
          </div>
        </template>
      </n-result>
    </ListSkeleton>
  </ScrollableContent>
</template>

<script setup>
import { selectPagedFamily } from "@/api/family";
import { onActivated, unref } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";

const familyName = ref();
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
  const { data } = await selectPagedFamily({
    familyName: unref(familyName),
    pageNo: unref(pageNo),
    pageSize: unref(pageSize),
  }).finally(() => (loading.value = false));
  pagedData.value = data.content || [];
  total.value = data.totalElements;
}
onMounted(getPagedData);
onActivated(getPagedData);

const router = useRouter();
function handleCreate() {
  router.push({ name: "FamilyCreate", query: { redirect: "FamilyIndex" } });
}
</script>

<style lang="scss" scoped></style>

<route>
{
  "name":"FamilyIndex"
}
</route>
