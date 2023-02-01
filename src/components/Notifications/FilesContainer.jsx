import Files from "components/Notifications/Files";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserTasks } from "actions/catalogs/userTasks";

export default function FilesContainer() {
  const finishedFiles = useSelector((state) => state.userTasks.finished);
  const dispatch = useDispatch();
  const hideHandler = (ids) => dispatch(deleteUserTasks(ids));

  return <Files files={finishedFiles} hideHandler={hideHandler} />;
}
