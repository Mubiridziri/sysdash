import { createContext } from "react";

const NotificationsContext = createContext({
  notificationsIsShown: false,
  setNotificationsIsShown: () => {},
});

export default NotificationsContext;
