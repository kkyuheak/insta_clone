import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "user",
  storage: sessionStorage,
});

interface UserInfo {
  nickname: string;
  email: string;
  id: string;
}

export const UserAtom = atom<UserInfo>({
  key: "userinfo",
  default: {
    nickname: "",
    email: "",
    id: "",
  },
  effects_UNSTABLE: [persistAtom],
});
