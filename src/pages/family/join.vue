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
      <i i-carbon:group-access text="6xl"></i>
      <n-form-item label="请输入家庭名称:">
        <n-input-group type="primary" ghost>
          <n-button size="large" type="primary"> 名称搜索 </n-button>
          <n-select
            w="!400px"
            size="large"
            filterable
            :options="families"
            :loading="loading"
            clearable
            remote
            @search="handleSearch"
            placeholder="按家庭名称"
            v-model:value="familyId"
          />
          <n-button
            size="large"
            type="primary"
            ghost
            :disabled="!familyId"
            @click="handleJoin"
          >
            加入
          </n-button>
        </n-input-group>
      </n-form-item>
    </div>
  </ScrollableContent>
</template>

<script setup>
import { joinFamily, searchFamily } from "@/api/family";
import ScrollableContent from "@/components/ScrollableContent.vue";
import { useDebounceFn } from "@vueuse/core";
import { useMessage, useDialog } from "naive-ui";
import { unref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
const familyId = ref();
const loading = ref();
const message = useMessage();
const dialog = useDialog();
const router = useRouter();
const route = useRoute();
const families = ref([]);
function familySearch(query) {
  if (!query) {
    return;
  }
  loading.value = true;
  searchFamily(query)
    .then((res) => {
      families.value = res.data.map((it) => ({
        label: `${it.name} #${it.hash}`,
        value: it.id,
      }));
    })
    .finally(() => (loading.value = false));
}
const handleSearch = useDebounceFn(familySearch, 800);

function handleJoin() {
  joinFamily({ familyId: unref(familyId) }).then(() => {
    dialog.success({
      title: "成功",
      content: "已加入家庭",
      positiveText: "前往查看",
      onPositiveClick: () => {
        router.replace({
          name: route.query?.redirect || "FamilyIndex",
        });
      },
    });
  });
}
</script>

<style lang="scss" scoped></style>
<route>
{
  "name":"FamilyJoin"
}
</route>
