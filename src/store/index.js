import { defineStore } from "pinia";
import { localToken } from "~/composables";
import { getUserInfo } from "~/api/authentication/login";

export const useAppStore = defineStore("app-state", {
  state: () => {
    return {
      token: localToken,
      userInfo: ref(),
    };
  },
  actions: {
    logoutUser() {
      this.userInfo = null;
      this.token = null;
    },

    loginUser(userInfo, token) {
      this.userInfo = userInfo;
      this.token = token;
    },
    async loginUserByToken(token) {
      this.token = token;
      const { data } = await getUserInfo()
      this.userInfo = data;
    },
  },
});
