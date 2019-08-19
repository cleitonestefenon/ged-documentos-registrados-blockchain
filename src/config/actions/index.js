import { SHOW_NOTIFICATION, CLOSE_NOTIFICATION } from "config/reducers/notification";

import { store } from 'App'

export const showNotification = action => ({
  type: SHOW_NOTIFICATION,
  open: true,
  message: action.message,
  variant: action.variant,
  autoHideDuration: action.autoHideDuration,
  handleClose: () => store.dispatch(closeNotification())
});

export const closeNotification = () => ({
  type: CLOSE_NOTIFICATION,
  open: false,
});
