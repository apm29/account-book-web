<template>
  <div w="screen" h="screen" flex="~ col" justify="center" items="center">
    <n-form
      ref="formRef"
      label-placement="left"
      :model="formData"
      :rules="rules"
      size="medium"
    >
      <n-form-item path="phone">
        <n-input v-model:value="formData.phone" placeholder="电话号码" />
      </n-form-item>
      <n-form-item path="password">
        <n-input
          v-model:value="formData.password"
          placeholder="密码"
          type="password"
          show-password-on="mousedown"
        />
      </n-form-item>
      <n-form-item>
        <n-button block type="success">
          <!-- <n-image width="20" src="/logo.png" /> -->
          login
        </n-button>
      </n-form-item>
    </n-form>

    <n-button text @click="toggleDark">
      <i :class="isDark ? 'i-mdi-brightness-7' : 'i-mdi-brightness-7'"></i>
    </n-button>
  </div>
</template>
<script setup>
import { useAppStore } from "~/store";
import { toggleDark, isDark } from "~/composables";
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
const formData = ref({
  password: null,
  phone: null,
});
</script>
<style scoped></style>
<route>
{
  "name": "Login"
}
</route>
