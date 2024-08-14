import { atom } from "recoil";

export const UserAtom = atom({
  key: "userinfo",
  default: {
    nickname: "",
    email: "",
  },
});
