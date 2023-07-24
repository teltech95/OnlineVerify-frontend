import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import baseURL from "../../Constant/BaseURL";
import axios from "axios";

function AddEmployee() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, seName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [ecnumber, setEcnumber] = useState("");
  const [position, setPosition] = useState("");
  const [yearstarted, setYearstarted] = useState("");
  const [department, setDepartment] = useState("");

  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState("");

  const [companies, setCompanies] = useState(null);
  const [departments, setDepartments] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/api/company/`).then((response) => {
      setCompanies(response.data);
      //   console.log(response.data)
    });
  }, []);

  useEffect(() => {
    axios.get(`${baseURL}/api/departments/`).then((response) => {
      setDepartments(response.data);
      //   console.log(response.data)
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      fetch(`${baseURL}/api/employees/`, {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({
          company: company,
          department: department,
          full_name: name,
          ec_number: ecnumber,
          email: email,
          address: address,
          position: position,
          year_started: yearstarted,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res.id)
          if (res.full_name) {
            setLoading(false)
            seName("");
            setEmail("");
            setEcnumber("")
            setAddress("");
            setPosition("");
            setYearstarted("")
            setSuccess("Company created successfully");
            console.log("user created successfully");
            //navigate(from, { replace: true });
          } else {
            setLoading(false);
            console.log(res);
            setError("registeration failed");

            // if (res?.registration_number) {
            //   setError(res.registration_number);
            // } else if (res?.name) {
            //   setError(res?.name);
            // } else {
            //   setError("registeration failed");
            // }
          }
        });
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setError("no server response");
      } else if (err?.response?.status === 409) {
        setError("company already exist");
      } else {
        setError("registeration failed");
      }
    }
  };
  return (
    <main>
      <header className="bg-info">
        <div className="container-xl px-5">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="text-white py-3 mb-0 display-6">Add Employee</h1>
          </div>
        </div>
      </header>
      <div className="container-xl p-5">
        <hr className="mt-2 mb-5" />
        <div className="row gx-5">
          <div className="col-xl-12 col-lg-12 mb-5">
            <div className="card card-raised mb-5">
              <div className="card-body p-5">
                <h1 className="display-6 mb-0">Employee details</h1>
                <div className="subheading-1 mb-2">Fill the form below</div>
                <form onSubmit={handleSubmit}>
                  {error ? (
                    <div class="alert alert-danger" role="alert">
                      {error}
                    </div>
                  ) : (
                    <p></p>
                  )}
                  {success ? (
                    <div class="alert alert-info" role="alert">
                      {success}
                    </div>
                  ) : (
                    <p></p>
                  )}

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label htmlFor="Company">Company:</label>
                        <select
                          onChange={(e) => setCompany(e.target.value)}
                          className="form-select"
                        >
                          {companies?.map(({ id, name }) => {
                            return (
                              <option key={id} value={id}>
                                {name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label htmlFor="Department">Department:</label>
                        <select
                          onChange={(e) => setDepartment(e.target.value)}
                          className="form-select"
                        >
                          {departments?.map(({ id, name }) => {
                            return (
                              <option key={id} value={id}>
                                {name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label>Full name:</label>
                        <input
                          type="text"
                          name="fullname"
                          className="form-control"
                          required
                          value={name}
                          onChange={(e) => {
                            seName(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label>Email:</label>
                        <input
                          type="text"
                          name="email"
                          className="form-control"
                          required
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label>Position:</label>
                        <input
                          type="text"
                          name="position"
                          className="form-control"
                          required
                          value={position}
                          onChange={(e) => {
                            setPosition(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-4">
                        <label>Ec number:</label>
                        <input
                          type="text"
                          name="ecnumber"
                          className="form-control"
                          required
                          value={ecnumber}
                          onChange={(e) => {
                            setEcnumber(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label>Address:</label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      required
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <label>Year started:</label>
                    <input
                      type="text"
                      name="yearstarted"
                      className="form-control"
                      required
                      value={yearstarted}
                      onChange={(e) => {
                        setYearstarted(e.target.value);
                      }}
                    />
                  </div>

                  <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                    <a className="small fw-500 text-decoration-none">
                      {loading ? <p>processing...</p> : <p></p>}
                    </a>

                    <button
                      className="btn btn-info mdc-ripple-upgraded"
                      type="submit"
                      disabled={
                        !name ||
                        !email ||
                        !address ||
                        !address ||
                        !ecnumber ||
                        !position ||
                        !yearstarted ||
                        !department ||
                        !company
                          ? true
                          : false
                      }
                    >
                      Add new record
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AddEmployee;
