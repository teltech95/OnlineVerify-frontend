import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import baseURL from "../../Constant/BaseURL";
import axios from "axios";

export default function Employee() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, seName] = useState(null);
  const [employ, setEmploy] = useState("");

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const [employees, setEmployee] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/api/employees/`).then((response) => {
      setEmployee(response.data);
      //   console.log(response.data)
    });
  }, []);

  const handleDelete = async (index,e) => {
    e.preventDefault();
    //setLoading(true)
    const id = Number(index)
    axios
      .delete(`${baseURL}/api/employees/${id}/`)
        .then(() => {
          setSuccess("employee deleted!");
          setEmployee(employees.filter((v, i) => i !== index));

          //setEmploy(null)
      });

  };


  const handleSearch = (event) => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  const data = {
    // nodes: employees.filter((item) =>
    //   item.full_name.includes(search)
    // ),
  };

  return (
    <main>
      <header className="bg-info">
        <div className="container-xl px-5">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="text-white py-3 mb-0 display-6">Manage Employees</h1>
          </div>
        </div>
      </header>
      <div className="container-xl p-5">
        <div className="d-flex justify-content-between align-items-end">
          <h2 className="display-6 mb-0"></h2>
          <div className="text-end">
            <Link
              className="btn btn-danger text-white mdc-ripple-upgraded"
              to="/uploads-employees"
            >
              Bulk Uploads
            </Link>
            <Link
              className="btn btn-info text-white mdc-ripple-upgraded"
              to="/add-employee"
            >
              Add Employee
            </Link>
          </div>
        </div>

        <hr className="mt-2 mb-5" />
        <div className="row gx-5">
        {error ? (
            <div class="alert alert-danger" role="alert">{error}</div> 
        ) : (
            <p></p>
        )}
        {success ? (
            <div class="alert alert-info" role="alert">{success}</div> 
        ) : (
            <p></p>
        )}
          <div className="col-xl-12 col-lg-12 mb-5">
            <div className="card card-raised mb-5">
              <div className="card-header bg-transparent px-4">
                <div
                  className="d-flex justify-content-between
                            align-items-center"
                >
                  <div className="me-4">
                    <h2 className="display-6 mb-0">Employees</h2>
                    <div className="card-text">List of Employees</div>
                  </div>
                  <div className="d-flex gap-2"></div>
                </div>
              </div>
              <div className="card-body p-4">
                <div
                  className="datatable-wrapper datatable-loading
                            no-footer sortable searchable fixed-columns
                            search-results"
                >
                  <div className="">
                    <form action="" method="GET">
                      <div className="mb-3 row">
                        <div className="col-sm-10">
                          <input
                            className="datatable-input form-control"
                            placeholder="Search by name..."
                            title="Search within table"
                            aria-controls="datatablesSimple"
                            value=""
                            name="search_query"
                            id="search" type="text" onChange={handleSearch}
                          />
                        </div>
                        <div className="col-sm-2 ">
                          <button
                            type="submit"
                            className="btn btn-primary form-control mdc-ripple-upgraded"
                          >
                            search
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="datatable-container">
                    <table class="table table-bordered" data={data}>
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col"> name</th>
                          <th scope="col">ec number</th>
                          <th scope="col">email</th>
                          <th scope="col">address</th>
                          <th scope="col">position</th>
                          <th scope="col">year started</th>
                          <th scope="col">year left</th>

                        </tr>
                      </thead>
                      <tbody>
                        {employees?.map(
                          ({
                            id,
                            full_name,
                            ec_number,
                            email,
                            address,
                            position,
                            year_started,
                            year_left
                          }) => {
                            return (
                              <tr key={id}>
                                <th scope="row">{id}</th>
                                <td>{full_name}</td>
                                <td>{ec_number}</td>
                                <td>{email}</td>
                                <td>{address}</td>
                                <td>{position}</td>
                                <td>{year_started}</td>
                                <td>{year_left}</td>
                                <td>
                                  <button >Update</button>
                                  <button onClick={e => handleDelete(id,e)}>Delete</button>
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="datatable-bottom">
                    <div className="datatable-info"></div>
                    <nav className="datatable-pagination"></nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
