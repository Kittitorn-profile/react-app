import React, { useState, useContext, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { DataContext } from "../context";

const Home = () => {
  const dataContext = useContext(DataContext);
  const [text, setText] = useState("");
  const [textNew, setTextNew] = useState("");
  const [textSearch, setTextSearch] = useState("");
  const [active, setActive] = useState(false);

  const handleSearch = (value) => {
    dataContext.searchStore(value);
    dataContext.getListAll();
  };

  const handleRemove = async (id) => {
    await dataContext.remove(id);
    dataContext.getListAll();
    location.reload();
  };

  const handleGetUpdate = async (id) => {
    await dataContext.getListById(id);
    setTextNew(dataContext.name);
    setActive(true);
  };

  const handleUpdate = async (value) => {
    await dataContext.updateList(
      dataContext.id,
      value,
      dataContext.create_date
    );
    dataContext.getListAll();
    location.reload();
  };

  const handleAdd = (value) => {
    if (value) {
      if (dataContext.list && dataContext.list.length > 0) {
        const lastItem =
          dataContext.list.length !== 0 &&
          dataContext.list[dataContext.list.length - 1];
        dataContext.addList(value, lastItem.id + 1);
      } else {
        dataContext.addList(value, 1);
      }
    }
    setText("");
  };

  const handleClear = () => {
    dataContext.clearStore();
    dataContext.getListHistoryAll();
    location.reload();
  };

  useEffect(() => {
    dataContext.getListAll();
  }, [dataContext]);

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

            <div className="row justify-content-center p-3">
              <div className="col-10 w-100 pl-0">
                <input
                  type="email"
                  className="form-control w-100"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Todo"
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                />
              </div>
              <div className="col-2 w-100 p-0">
                <button
                  className="btn btn-primary w-100 "
                  type="button"
                  onClick={() => {
                    handleAdd(text);
                  }}
                >
                  Add +
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

            {dataContext.list && (
              <tbody>
                {dataContext.list.length > 0 &&
                  dataContext.list.map((i, index) => (
                    <tr>
                      <th scope="row">{i.id}</th>
                      <td colSpan="4 ">
                        <div className=" w-100">
                          {dataContext.id === i.id ? (
                            <>
                              {active ? (
                                <input
                                  type="email"
                                  className="form-control w-100"
                                  id="exampleInputEmail1"
                                  aria-describedby="emailHelp"
                                  placeholder="Enter Todo"
                                  onChange={(e) => setTextNew(e.target.value)}
                                  value={textNew}
                                />
                              ) : (
                                <div>{i.name}</div>
                              )}
                            </>
                          ) : (
                            <div>{i.name}</div>
                          )}
                        </div>
                      </td>
                      <td colSpan="1">
                        {dataContext.id === i.id ? (
                          <>
                            {active ? (
                              <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => handleUpdate(textNew)}
                              >
                                Save
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-warning"
                                onClick={() => handleGetUpdate(i.id)}
                              >
                                Edit
                              </button>
                            )}
                          </>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => handleGetUpdate(i.id)}
                          >
                            Edit
                          </button>
                        )}
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
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
