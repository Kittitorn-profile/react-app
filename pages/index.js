import React, { useState, useContext, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { DataContext } from "../context";
import * as moment from "moment";
import { values } from "mobx";

const Home = () => {
  const dataContext = useContext(DataContext);
  const [text, setText] = useState("");
  const [textSearch, setTextSearch] = useState("");
  const [count, setCount] = useState(0, "count");

  const handleSearch = (value) => {
    console.log("in value", value);
    let obj = dataContext.list.find((search) => search.name === value);
    console.log("obj", obj);
  };

  const handleRemove = (id) => {
    console.log("in handleRemove", id);
    // dataContext.setList(id);
  };

  const handleAdd = (value, id) => {
    if (value) {
      const time = moment().format();
      dataContext.setList(value, id, time);
      setCount(count + 1);
    }
    setText("");
  };

  React.useEffect(() => {
    const cc = localStorage.getItem("myData");
    console.log("cc", cc);
  }, [dataContext.list]);

  return (
    <div className={styles.layout}>
      <div className="">
        <div className="row justify-content-center">
          <div className="col-10">
            <div>
              <div>Search Data list</div>
              <div className="input-group mb-3 p-0">
                <input
                  type="text"
                  className="form-control"
                  placeholder="search"
                  aria-describedby="basic-addon2"
                  onChange={(e) => setTextSearch(e.target.value)}
                  value={textSearch}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => handleSearch(textSearch)}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div className="row justify-content-end p-3">
              <div className="col-2 w-100 p-0">
                <button
                  type="button"
                  className="btn btn-primary w-100 "
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                >
                  Add Todo +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-10">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th colSpan="4">Name Todo</th>
                <th colSpan="1">Edit</th>
                <th colSpan="1">Delete</th>
              </tr>
            </thead>
            <tbody>
              {dataContext &&
                dataContext.list.map((i, index) => (
                  <tr>
                    <th scope="row">{i.id}</th>
                    <td colSpan="4">{i.name}</td>
                    <td colSpan="1">
                      <button type="button" className="btn btn-warning">
                        Edit
                      </button>
                    </td>
                    <td colSpan="1">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleRemove(i.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Add Todo
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter todo"
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  handleAdd(text, count);
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
