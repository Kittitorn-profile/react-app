import { createContext } from "react";
import { action, observable } from "mobx";
import { useStaticRendering } from "mobx-react-lite";
import storejs from "store";

class DataContext {
  @observable list = [];

  @observable id = 1;

  @observable name = "";

  @observable create_date = "";

  @observable update_date = "";

  constructor() {
    this.list = storejs.get("listTodo");
  }

  @action getListAll = () => {
    this.list = storejs.get("listTodo");
  };

  @action addList = async (value, id, time) => {
    let dataAll = storejs.get("listTodo");
    let idNew = id + 1;
    const data = {
      id: idNew,
      name: value,
      create_date: time,
      update_date: "",
      status: "",
    };

    if (!dataAll) {
      let dataNew = [];
      dataNew.push(data);
      this.list = dataNew;
    } else {
      dataAll.push(data);
      this.list = dataAll;
    }
    storejs.set("listTodo", this.list);
  };

  @action remove = (id) => {
    let dataAll = storejs.get("listTodo");

    let dataRemove = dataAll.find((search) => search.name === textSearch);
    console.log("dataRemove", dataRemove);

    // this.list.splice(index, 1);
    // storejs.set("listTodo", this.list);
  };

  @action clearStore = () => {
    this.list = [];
    storejs.set("listTodo", this.list);
  };

  @action searchStore = (textSearch) => {
    let dataAll = storejs.get("listTodo");
    this.list = dataAll.find((search) => search.name === textSearch);
    console.log("this.list", this.list);
  };
}

const ModalStoreContext = createContext(new DataContext());
export default ModalStoreContext;
