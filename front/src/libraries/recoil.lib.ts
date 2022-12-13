import { atom } from "recoil";

export const emailManage = atom({
  key: "emailManage",
  default: "",
});

export const passwordManage = atom({
  key: "passwordManage",
  default: "",
});

export const tokenManage = atom({
  key: "tokenManage",
  default: "",
});

export const clientidManage = atom({
  key: "clientidManage",
  default: "",
});

export const countManage = atom({
  key: "countManage",
  default: "",
});

export const loginManage = atom({
  key: "loginManage",
  default: false,
});
