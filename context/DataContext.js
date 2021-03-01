import { createContext } from "react";
import { action, observable } from "mobx";
import { useStaticRendering } from "mobx-react-lite";

const isServer = !process.browser;
useStaticRendering(isServer);

class DataContext {
  @observable list = [];

  @observable id = null;

  @observable text = "";

  @action setList = (value, id, time) => {
    const data = {
      id: id,
      name: value,
      dateTime: time,
    };
    this.list.push(data);
  };
}

const ModalStoreContext = createContext(new DataContext());
export default ModalStoreContext;
