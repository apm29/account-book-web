<template>
  <n-dropdown v-if="userInfo" @select="handleSelect" :options="options" trigger="click">
    <n-avatar circle :src="userInfo.photo" cursor="pointer"> </n-avatar>
  </n-dropdown>
  <h3 v-else text="sm orange-400" cursor="pointer" @click="handleLogin">未登录</h3>
</template>

<script setup>
import { useAppStore } from "@/store";
import { h } from "vue";
import { useRouter } from "vue-router";
import MenuIcons from "./MenuIcons.vue";

const appStore = useAppStore();
const userInfo = computed(() => appStore.userInfo);
const router = useRouter();
function handleLogin() {
  appStore.logoutUser();
  router.push({
    name: "Login",
  });
}

const options = [
  {
    label: "登出",
    key: "logout",
    icon: () => h(MenuIcons, { icon: "i-carbon-logout" }),
  },
];
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
