import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "user",
  storage: sessionStorage,
});

export const UserAtom = atom({
  key: "userinfo",
  default: {
    nickname: "",
    email: "",
  },
  effects_UNSTABLE: [persistAtom],
});
