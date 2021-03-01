import styles from "../styles/Home.module.css";
import * as moment from "moment";

const Home = () => {
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
                  <button class="btn btn-outline-secondary w-100" type="button">
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
                  DateTime
                </th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td colSpan="2">Mark</td>
                <td colSpan="1">{moment().format("DD-MM-YYYY, h:mm:ss")}</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
