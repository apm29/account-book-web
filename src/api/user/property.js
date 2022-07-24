import { remote } from "~/composables";

export function getMyProperty() {
  return remote.postForm({
    url: "/account-book/property/mine",
  });
}

export function setPropertyAsset({ asset, assetId, remark }) {
  return remote.postForm({
    url: "/account-book/property/asset/edit",
    data: {
      asset,
      assetId,
      remark,
    },
  });
}

export function setPropertyLiability({ liability, liabilityId, remark }) {
  return remote.postForm({
    url: "/account-book/property/liability/edit",
    data: {
      liability,
      liabilityId,
      remark,
    },
  });
}
