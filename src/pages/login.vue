<template>
  <div
    class="login-page"
    w="screen"
    h="screen"
    flex="~ col"
    justify="center"
    items="center"
    space="y-6"
  >
    <h1 text="2xl">FC Note</h1>
    <div
      backdrop-filter="~ blur-xl"
      border="~ green-600 dark:green-300"
      rounded="~"
      p="x-5 y-3"
    >
      <n-form
        ref="formRef"
        label-placement="left"
        :model="loginForm"
        :rules="rules"
        size="medium"
        autocomplete="off"
      >
        <n-form-item path="phone">
          <n-input
            v-model:value="loginForm.phone"
            placeholder="电话号码"
            :input-props="{ type: 'tel' }"
          />
        </n-form-item>
        <n-form-item path="password">
          <n-input
            v-model:value="loginForm.password"
            placeholder="密码"
            type="password"
            show-password-on="mousedown"
          />
        </n-form-item>
        <n-form-item>
          <n-button block type="success" @click="handleLogin" relative="~">
            LOGIN
            <i i="carbon-arrow-right" absolute="~" right="4"></i>
          </n-button>
        </n-form-item>
      </n-form>
    </div>

    <div space="x-3">
      <n-popover trigger="hover" placement="bottom">
        <template #trigger>
          <n-button circle tertiary type="primary" @click="toggleDark">
            <div i="carbon-sun dark:carbon-moon" />
          </n-button>
        </template>
        {{ isDark ? "深色模式" : "浅色模式" }}
      </n-popover>
      <n-popover trigger="hover" placement="bottom">
        <template #trigger>
          <n-button circle tertiary type="primary" @click="handleRegister">
            <div i="carbon-user-follow" />
          </n-button>
        </template>
        注册新用户
      </n-popover>
    </div>
  </div>
</template>
<script setup>
import { useAppStore } from "~/store";
import { toggleDark, remote, isDark } from "~/composables";
const store = useAppStore();
const rules = {
  phone: {
    required: true,
    message: "请输入电话号码",
    trigger: ["input"],
  },
  password: {
    required: true,
    message: "请输入密码",
    trigger: ["input"],
  },
};
const loginForm = ref({
  password: null,
  phone: null,
});

function handleLogin() {
  remote.postForm({
    url: "/java/user/login",
  });
}

function handleRegister() {}
</script>
<style scoped></style>
<route>
{
  "name": "Login"
}
</route>
<style lang="scss">
.login-page {
  input:-webkit-autofill {
    text-fill-color: #222;
    -webkit-text-fill-color: rgba(44, 44, 44, 90);
    -webkit-box-shadow: 0 0 10000px 0 #fff inset !important;
  }
}
.dark {
  .login-page {
    input:-webkit-autofill {
      text-fill-color: #222;
      -webkit-text-fill-color: rgba(222, 222, 222, 50);
      -webkit-box-shadow: 0 0 10000px 0 #222 inset !important;
    }
  }
}
</style>
