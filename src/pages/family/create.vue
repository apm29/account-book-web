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
        <n-input
          w="!400px"
          size="large"
          round
          placeholder="家庭名称"
          v-model:value="familyName"
        />
      </n-form-item>
      <n-button
        type="success"
        w="!400px"
        round
        :loading="loading"
        @click="handleCreateFamily"
      >
        创建家庭
      </n-button>
    </div>
  </ScrollableContent>
</template>

<script setup>
import { createFamily } from "@/api/family";
import ScrollableContent from "@/components/ScrollableContent.vue";
import { useMessage, useDialog } from "naive-ui";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
const familyName = ref();
const loading = ref();
const message = useMessage();
const dialog = useDialog();
const router = useRouter();
const route = useRoute();
function handleCreateFamily() {
  if (!familyName.value) {
    return message.error("请输入家庭名称");
  }
  createFamily({
    familyName: unref(familyName),
  }).then(() => {
    dialog.success({
      title: "成功",
      content: "家庭已创建",
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
  "name":"FamilyCreate"
}
</route>
