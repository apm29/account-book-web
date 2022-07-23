import { remote } from "~/composables";

export function searchFamily(search) {
  return remote.postForm({
    url: "/account-book/family/search",
    data: {
      familyName: search,
    },
  });
}

export function selectPagedFamily({ familyName, pageNo, pageSize }) {
  return remote.postForm({
    url: "/account-book/family/selectPaged",
    data: {
      familyName,
      pageNo,
      pageSize,
    },
  });
}

export function createFamily({ familyName }) {
  return remote.postForm({
    url: "/account-book/family/create",
    data: {
      familyName,
    },
  });
}

export function joinFamily({ familyId }) {
  return remote.postForm({
    url: "/account-book/family/join",
    data: {
      familyId,
    },
  });
}
