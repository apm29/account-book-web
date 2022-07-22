<template>
  <div
    class="register-page"
    w="screen"
    h="screen"
    flex="~ col"
    justify="center"
    items="center"
    space="y-6"
  >
    <AppTitle></AppTitle>
    <div
      backdrop-filter="~ blur-xl"
      border="~ green-600 dark:green-300"
      rounded="~"
      p="x-5 y-3"
    >
      <n-form
        ref="formRef"
        label-placement="left"
        :model="registerForm"
        :rules="rules"
        size="medium"
        autocomplete="off"
      >
        <n-form-item path="phone">
          <n-input
            v-model:value="registerForm.phone"
            placeholder="电话号码"
            :input-props="{ type: 'tel' }"
          />
        </n-form-item>
        <n-form-item path="captcha">
          <n-input v-model:value="registerForm.captcha" placeholder="验证码">
            <template #suffix>
              <n-button v-if="!isActive" text type="success" @click="handleSendCaptcha">
                SEND
              </n-button>
              <n-text v-else type="success"> {{ count }}(S) </n-text>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item>
          <n-button block type="success" @click="handleRegister(formRef)" relative="~">
            REGISTER
            <i i="carbon-arrow-right" absolute="~" right="4"></i>
          </n-button>
        </n-form-item>
      </n-form>
    </div>

    <div space="x-3">
      <DarkToggle></DarkToggle>
      <n-popover trigger="hover" placement="bottom">
        <template #trigger>
          <n-button circle tertiary type="primary" @click="handleLogin">
            <div i="carbon-arrow-up-left" />
          </n-button>
        </template>
        登录
      </n-popover>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from "~/store";
import { unref } from "vue";
import { useCounter, useIntervalFn } from "@vueuse/core";
import { registerByPhone } from "~/api/authentication/login";
import DarkToggle from "~/components/DarkToggle.vue";
const router = useRouter();
const route = useRoute();
const appStore = useAppStore();
const rules = {
  phone: {
    required: true,
    message: "请输入电话号码",
    trigger: ["input", "blur"],
  },
  captcha: {
    required: true,
    message: "请输入验证码",
    trigger: ["input", "blur"],
  },
};
const registerForm = ref({
  captcha: null,
  phone: route.query.phone,
});

const formRef = ref();
const message = useMessage();
function handleRegister(form) {
  form.validate((errors) => {
    if (errors) {
      console.log(errors);
      message.error("请填写完整");
    } else {
      registerByPhone(unref(registerForm)).then((res) => {
        appStore.loginUser(res.data, res.token);
        router.replace({
          name: "Home",
        });
      });
    }
  });
}

const { count, inc, dec, set, reset } = useCounter(30, { min: 0, max: 30 });
const { pause, resume, isActive } = useIntervalFn(
  () => {
    dec();
    if (count.value === 0) {
      pause();
    }
  },
  1000,
  { immediate: false }
);
function handleSendCaptcha() {
  if (!unref(registerForm).phone) {
    return message.error("请填写电话");
  }
  message.success("验证码已发送");
  reset();
  resume();
}

function handleLogin() {
  router.replace({
    name: "Login",
  });
}
</script>
<route>
{
  "name": "Register"
}
</route>

<style lang="scss">
.register-page {
  input:-webkit-autofill {
    text-fill-color: #222;
    -webkit-text-fill-color: rgba(44, 44, 44, 90);
    -webkit-box-shadow: 0 0 10000px 0 #fff inset !important;
  }
}
.dark {
  .register-page {
    input:-webkit-autofill {
      text-fill-color: #222;
      -webkit-text-fill-color: rgba(222, 222, 222, 50);
      -webkit-box-shadow: 0 0 10000px 0 rgb(30, 30, 33) inset !important;
    }
  }
}
</style>
