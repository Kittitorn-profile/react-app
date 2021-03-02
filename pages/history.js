import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/Home.module.css";
import * as moment from "moment";
import { DataContext } from "../context";

const History = () => {
  const dataContext = useContext(DataContext);

  const handleClear = () => {
    dataContext.clearStore();
    dataContext.getListHistoryAll();
    location.reload();
  };

  useEffect(() => {
    dataContext.getListHistoryAll();
  }, [dataContext]);

  return (
    <div className={styles.layout}>
      <div className="row justify-content-center">
        <div className="col-10">
          <div className="row justify-content-between p-3">
            <div className="col-7 w-100 p-0">
              <div>Log Todo List All</div>
            </div>
            <div className="col-5 w-100 p-0">
              <div className="row">
                <div className="col-5 pr-2 w-100">
                  <button class="btn btn-outline-secondary w-100" type="button">
                    Sort by newUpdate
                  </button>
                </div>
                <div className="col-7 pr-2 w-100">
                  <button
                    class="btn btn-outline-secondary w-100"
                    type="button"
                    onClick={handleClear}
                  >
                    Clear History
                  </button>
                </div>
              </div>
            </div>
          </div>

          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col" colSpan="2">
                  Todo name
                </th>
                <th scope="col" colSpan="1">
                  Create Date
                </th>
                <th scope="col" colSpan="1">
                  Update Date
                </th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            {dataContext.listTodoStore && (
              <tbody>
                {dataContext.listTodoStore &&
                  dataContext.listTodoStore.map((i, index) => (
                    <tr>
                      <th scope="row">{i.id}</th>
                      <td colSpan="2">{i.name}</td>
                      <td colSpan="1">
                        {moment(i.create_date).format("DD-MM-YYYY, h:mm:ss")}
                      </td>
                      <td colSpan="1">
                        {i.update_date
                          ? moment(i.update_date).format("DD-MM-YYYY, h:mm:ss")
                          : "-"}
                      </td>
                      <td>{i.status ? i.status : "-"}</td>
                    </tr>
                  ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
