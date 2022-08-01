<template>
  <div>
    <!-- <div flex="~ wrap" items="center" gap="x-2 y-1">
      <n-tag
        checkable
        @click="handleEditIcon(expenditureType)"
        v-for="expenditureType of expenditureTypes"
        :checked="expenditureType.id === editTypeForm.id"
      >
        {{ expenditureType.name }}
        <template #avatar>
          <i :class="expenditureType.icon"></i>
        </template>
      </n-tag>
    </div>
    <CarbonIconSelector filterable clearable v-model:value="editTypeForm.icon" />
    <n-button @click="handleSave">SAVE</n-button> -->
  </div>
</template>

<script setup>
// import { unref } from "vue";
// import { useExpenditureTypes, remote } from "~/composables";
// //类型字典
// const {
//   expenditureTypes,
//   getExpenditureTypes,
//   getExpenditureTypeNameById,
//   getExpenditureTypeIconById,
// } = useExpenditureTypes();
// onMounted(getExpenditureTypes);

// const editTypeForm = ref({});
// function handleEditIcon(expenditureType) {
//   editTypeForm.value = { ...expenditureType };
// }

// function handleSave() {
//   remote
//     .postForm({
//       url: "/account-book/expense/expenditure-type/update",
//       data: unref(editTypeForm),
//     })
//     .then(() => {
//       getExpenditureTypes();
//     });
// }
</script>

<style lang="scss" scoped></style>
