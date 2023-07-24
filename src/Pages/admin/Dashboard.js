import React, {useState, useEffect} from "react";
import baseURL from '../../Constant/BaseURL'
import axios from "axios";

export default function Dashboard() {
  const [companies, setCompanies] = useState(0);
  const [employee, setEmployee] = useState(0);


  useEffect(() => {
    axios.get(`${baseURL}/api/company/`).then((response) => {
      const comp  = response.data
      setCompanies(comp.length);
    });
  }, []);

  useEffect(() => {
    axios.get(`${baseURL}/api/employees/`).then((response) => {
      const comp  = response.data
      setEmployee(comp.length);
    });
  }, []);
  return (
    <main>
      <header className="bg-info">
        <div className="container-xl px-5">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="text-white py-3 mb-0 display-6">Dashboard</h1>
            
          </div>
        </div>
      </header>
      <div className="container-xl p-5">
      <div className="row gx-5">
            <div className="col-md-6 mb-5">
                <div className="card card-raised border-start
                    border-primary border-4">
                    <div className="card-body px-4">
                        <div className="d-flex
                            justify-content-between
                            align-items-center mb-2">
                            <div className="me-2">
                                <div className="display-5">{companies}</div>
                                <div className="card-text">
                                    <a className="small stretched-link text-reset text-decoration-none" >
                                        Companies
                                    </a> 
                                </div>
                            </div>
                            <div className="icon-circle bg-primary
                                text-white"><i className="material-icons">policy</i></div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="col-md-6 mb-5">
                <div className="card card-raised border-start
                    border-warning border-4">
                    <div className="card-body px-4">
                        <div className="d-flex
                            justify-content-between
                            align-items-center mb-2">
                            <div className="me-2">
                                <div className="display-5">{employee}</div>
                                <div className="card-text">
                                    <a className="small stretched-link text-reset text-decoration-none">
                                        Employees
                                    </a> 
                                </div>
                            </div>
                            <div className="icon-circle bg-warning
                                text-white"><i className="material-icons">group_add</i></div>
                        </div>
                       
                    </div>
                </div>
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
                    <table id="datatablesSimple" className="datatable-table">
                      <thead>
                        <tr style={{fontSize: "12px", backgroundColor: "#0063b2", color: "#fff"}}>
                          <th
                            data-sortable="true"
                            style={{width: "4.268215417106653%"}}>
                            <a href="#" className="datatable-sorter">
                              Created At
                            </a>
                          </th>
                          <th
                            data-sortable="true"
                            aria-sort="ascending"
                            className="datatable-ascending"
                            style={{width: "15.522703273495248%"}}>
                            <a href="#" className="datatable-sorter">
                              Code
                            </a>
                          </th>
                          <th
                            data-sortable="true"
                            style={{width: "25.46145723336853%"}}>
                            <a href="#" className="datatable-sorter">
                              Full Name
                            </a>
                          </th>

                          <th
                            data-sortable="true"
                            style={{width: "13.621964097148892%"}} >
                            <a href="#" className="datatable-sorter">
                              Gender
                            </a>
                          </th>
                          {/* <th
                            data-sortable="true"
                            style="width: 13.125659978880677%;">
                            <a href="#" className="datatable-sorter">
                              Relationship
                            </a>
                          </th>
                          <th
                            data-sortable="true"
                            style="width:
                                                35.125659978880677%;"
                          >
                            <a href="#" className="datatable-sorter">
                              Payment Status
                            </a>
                          </th>

                          <th
                            data-sortable="true"
                            style="width:
                                                    13.621964097148892%;"
                          >
                            <a href="#" className="datatable-sorter">
                              Action
                            </a>
                          </th> */}
                        </tr>
                      </thead>
                      <tbody></tbody>
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
