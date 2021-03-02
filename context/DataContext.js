import { createContext } from "react";
import { action, observable } from "mobx";
import { useStaticRendering } from "mobx-react-lite";
import storejs from "store";

class listData {
  @observable id = null;

  @observable name = "";

  @observable create_date = "";

  @observable update_date = "";

  @observable status = "";

  constructor(item) {
    this.id = item.id;
    this.name = item.name;
    this.create_date = item.create_date;
    this.update_date = item.update_date;
    this.status = item.status;
  }
}

class DataContext {
  @observable list = [];

  @observable listTodoStore = [];

  @observable id = 0;

  @observable name = "";

  @observable create_date = "";

  @observable update_date = "";

  constructor() {
    this.list = storejs.get("listTodo");
    this.listTodoStore = storejs.get("history");
  }

  @action getListAll = () => {
    let result = storejs.get("listTodo");
    if (result) {
      this.list = result.map((item) => new listData(item));
    } else {
      this.list = result;
    }
  };

  @action getListHistoryAll = () => {
    let result = storejs.get("history");
    if (result) {
      this.listTodoStore = result.map((item) => new listData(item));
    } else {
      this.listTodoStore = result;
    }
  };

  @action addList = (value, newId) => {
    let dataAll = storejs.get("listTodo");
    let oldData = storejs.get("history");

    const data = {
      id: newId,
      name: value,
      create_date: new Date(),
      update_date: "",
      status: "CREATE",
    };

    if (!dataAll) {
      let dataNew = [];
      dataNew.push(data);
      this.list = dataNew;
    } else {
      dataAll.push(data);
      this.list = dataAll;
    }

    storejs.set("history", this.list);
    storejs.set("listTodo", this.list);
  };

  // @action updateList = async (value) => {
  //   let dataAll = storejs.get("listTodo");

  //   const data = {
  //     id: 1,
  //     name: value,
  //     create_date: new Date(),
  //     update_date: "",
  //     status: "CREATE",
  //   };

  //   if (!dataAll) {
  //     let dataNew = [];

  //     dataNew.push(data);
  //     this.list = dataNew;
  //   } else {
  //     dataAll.push(data);
  //     this.list = dataAll;
  //   }
  //   storejs.set("listTodo", this.list);
  //   storejs.set("history", this.list);
  // };

  @action remove = (id) => {
    let dataRemove = this.list.filter((re) => re.id !== id);
    this.list = dataRemove;
    storejs.set("listTodo", this.list);
  };

  @action clearStore = () => {
    storejs.set("listTodo", []);
    storejs.set("history", []);
  };

  @action searchStore = (textSearch) => {
    let dataAll = storejs.get("listTodo");
    this.list = dataAll.find((search) => search.name === textSearch);
  };
}

const ModalStoreContext = createContext(new DataContext());
export default ModalStoreContext;
