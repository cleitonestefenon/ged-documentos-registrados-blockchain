import { KEY_STORAGE } from "common/localstorage/const";

export const isAuthenticated = () => {
      return sessionStorage.getItem(KEY_STORAGE.TOKEN) != null;
}
