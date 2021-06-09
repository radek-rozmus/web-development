import AppFirestoreStorage from "../interfaaces/AppFirestoreStorage";
import AppLocalStorage from "../interfaaces/AppLocalStorage";

const storageGuard = (
  storage: AppLocalStorage | AppFirestoreStorage,
  todoLocal: any,
  todoGlobal: any
) => {
  if (storage instanceof AppLocalStorage) {
    todoLocal();
  } else {
    todoGlobal();
  }
};
export default storageGuard;
