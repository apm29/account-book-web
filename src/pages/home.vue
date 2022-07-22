<template>
  <div p="x-3 y-4">
    <n-thing>
      <template #avatar>
        <n-avatar>
          <n-icon>
            <i i-carbon:money />
          </n-icon>
        </n-avatar>
      </template>
      <template #header> 货币 </template>
      <template #header-extra>
        <n-button circle size="small">
          <template #icon>
            <i i-carbon:money />
          </template>
        </n-button>
      </template>
      <template #description> 描述 </template>
      货币是为了提高交易效率而用于交换的中介商品。货币有多种形式，如贝壳粮食等自然物、金属纸张等加工品、银行卡信用卡等磁条卡、移动支付加密货币等APP。
      <template #footer> 尾部 </template>
      <template #action>
        <n-space>
          <n-button size="small">
            <template #icon>
              <n-icon>
                <i i-carbon:money />
              </n-icon>
            </template>
            1 块钱
          </n-button>
          <n-button size="small">
            <template #icon>
              <n-icon>
                <i i-carbon:money />
              </n-icon>
            </template>
            10 块钱
          </n-button>
          <n-button size="small">
            <template #icon>
              <n-icon>
                <i i-carbon:money />
              </n-icon>
            </template>
            100 块钱
          </n-button>
        </n-space>
      </template>
    </n-thing>
    <button btn @click="router.back">Back</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>
<route>
{
  "name": "Home"
}
</route>
