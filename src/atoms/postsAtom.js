import { atom } from "recoil";

export const postsState = atom({
    key: 'postsState',
    default: [],
    dangerouslyAllowMutability: true
})