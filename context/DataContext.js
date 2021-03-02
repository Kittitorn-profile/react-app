import { createContext } from "react";
import { action, observable } from "mobx";
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

  @observable status = "";

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

  @action getListById = (id) => {
    let result = storejs.get("listTodo");
    return result.filter((up) => {
      if (up.id === id) {
        this.id = up.id;
        this.name = up.name;
        this.create_date = up.create_date;
        this.update_date = up.update_date;
        this.status = up.status;
      }
    });
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

    if (oldData && oldData.length === 0) {
      storejs.set("history", this.list);
    } else {
    }
    storejs.set("history", this.list);
    storejs.set("listTodo", this.list);
  };

  @action updateList = async (id, value, createDate) => {
    let dataNew = [];
    let dataAll = storejs.get("listTodo");
    let datalist = dataAll && dataAll.filter((re) => re.id !== id);
    const data = {
      id: id,
      name: value,
      create_date: createDate,
      update_date: new Date(),
      status: "UPDATE",
    };
    dataNew.push(data);
    let newarray = datalist.concat(dataNew);
    let soryArray = newarray.sort(function (a, b) {
      return a.id - b.id || a.name.localeCompare(b.name);
    });
    storejs.set("listTodo", soryArray);
    storejs.set("history", soryArray);
  };

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
