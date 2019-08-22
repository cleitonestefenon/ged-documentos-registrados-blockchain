import { SHOW_NOTIFICATION } from "config/reducers/notification";

export const showNotification = action => ({
  type: SHOW_NOTIFICATION,
  message: action.message,
  variant: action.variant,
  autoHideDuration: action.autoHideDuration,
  timestamp: new Date().getTime(),
  callback: action.callback
});
