import { useCallback, useContext, useEffect } from "react";
import Notifications from "components/Notifications/Notifications";
import { useDispatch } from "react-redux";
import {
  getActiveUserTasks,
  getFinishedUserTasks,
} from "actions/catalogs/userTasks";
import NotificationsContext from "contexts/NotificationsContext";
import useUserTasks from "hooks/useUserTasks";

export default function NotificationsContainer() {
  const dispatch = useDispatch();
  const { notificationsIsShown, setNotificationsIsShown } =
    useContext(NotificationsContext);

  const getTasks = useCallback(() => {
    dispatch(getActiveUserTasks());
    dispatch(getFinishedUserTasks());
  }, [dispatch]);

  const connect = useUserTasks(getTasks);

  useEffect(() => {
    if (notificationsIsShown) {
      getTasks();
      connect();
    }
  }, [connect, getTasks, notificationsIsShown]);

  return (
    <Notifications
      isShown={notificationsIsShown}
      setIsShown={setNotificationsIsShown}
    />
  );
}
