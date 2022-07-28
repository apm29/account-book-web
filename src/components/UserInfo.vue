<template>
  <n-dropdown v-if="userInfo" @select="handleSelect" :options="options" trigger="click">
    <n-avatar :size="32" circle :src="userInfo.userDetail?.photo" cursor="pointer">
    </n-avatar>
  </n-dropdown>
  <h3 v-else text="sm orange-400" cursor="pointer" @click="handleLogin">未登录</h3>
</template>

<script setup>
import { useAppStore } from "~/store";
import { h } from "vue";
import { useRouter } from "vue-router";

const appStore = useAppStore();
const userInfo = computed(() => appStore.userInfo);
const router = useRouter();
function handleLogin() {
  appStore.logoutUser();
  router.push({
    name: "Login",
  });
}

const options = computed(() => [
  {
    label: userInfo.value.name,
    key: "info",
    disabled: true,
    icon: () => h("i", { class: "i-carbon:user-avatar-filled" }),
  },
  {
    label: "登出",
    key: "logout",
    icon: () => h("i", { class: "i-carbon-logout" }),
  },
]);
function handleSelect(key) {
  switch (key) {
    case "logout":
      handleLogin();
      return;
    default:
      return;
  }
}
</script>

<style lang="scss" scoped></style>
