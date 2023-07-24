import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import baseURL from "../../Constant/BaseURL";
import axios from "axios";

export default function Company() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, seName] = useState("");
  const [company, setCompany] = useState("");

  const [loading, setLoading] = useState(false);

  const [companies, setCompanies] = useState(null);

  useEffect(() => {
      axios.get(`${baseURL}/api/company/`).then((response) => {
      setCompanies(response.data);
      //   console.log(response.data)
      });
  }, []);

  return (
    <main>
      <header className="bg-info">
        <div className="container-xl px-5">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="text-white py-3 mb-0 display-6">Manage Company</h1>
          </div>
        </div>
      </header>
      <div className="container-xl p-5">
        <div className="d-flex justify-content-between align-items-end">
          <h2 className="display-6 mb-0"></h2>
          <div className="text-end">
            <Link
              className="btn btn-danger text-white mdc-ripple-upgraded"
              to="/add-department"
            >
              Add Department
            </Link>
            <Link
              className="btn btn-info text-white mdc-ripple-upgraded"
              to="/add-company"
            >
              Add Company
            </Link>
          </div>
        </div>

        <hr className="mt-2 mb-5" />
        <div className="row gx-5">
          <div className="col-xl-12 col-lg-12 mb-5">
            <div className="card card-raised mb-5">
              <div className="card-header bg-transparent px-4">
                <div
                  className="d-flex justify-content-between
                            align-items-center"
                >
                  <div className="me-4">
                    <h2 className="display-6 mb-0">Company</h2>
                    <div className="card-text">List of Companies</div>
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
                            type="search"
                            title="Search within table"
                            aria-controls="datatablesSimple"
                            value=""
                            name="search_query"
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
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Company name</th>
                          <th scope="col">Date of registarion</th>
                          <th scope="col">Registration number</th>
                          <th scope="col">Address</th>
                          <th scope="col">Contact person</th>
                          <th scope="col">Action</th>

                        </tr>
                      </thead>
                      <tbody>
                      {companies?.map(({ id, name, date_of_registarion, registration_number, address, contact_person }) => {
                          return (
                              
                              <tr key={id}>
                              <th scope="row">{id}</th>
                              <td>{name}</td>
                              <td>{date_of_registarion}</td>
                              <td>{registration_number}</td>
                              <td>{address}</td>
                              <td>{contact_person}</td>

                              <td>
                                <button>Update</button>
                                <button>Delete</button>

                              </td>
                              
                            </tr>
                          );
                          })}
                        
                        
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
