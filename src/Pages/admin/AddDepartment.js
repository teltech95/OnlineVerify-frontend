import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import baseURL from "../../Constant/BaseURL";
import axios from "axios";

function AddDepartment() {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
          fetch(`${baseURL}/api/departments/`, {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({
              name: name,
              company: company,
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              console.log(res)
              if (res.name) {
                setLoading(false)
                seName("");
                setCompany("");
                setSuccess("Department created successfully")
                
                //navigate(from, { replace: true });
              } else {
                setLoading(false)
                console.log(res);
                if (res?.name) {
                  setError(res?.name);
                } else if (res?.company) {
                  setError(res?.company)
                } else {
                  setError("registeration failed");
                }
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
            <h1 className="text-white py-3 mb-0 display-6">Add Department</h1>
          </div>
        </div>
      </header>
      <div className="container-xl p-5">
      <div className="d-flex justify-content-between align-items-end">
          <h2 className="display-6 mb-0"></h2>
          <div className="text-end">
          <Link
              className="btn btn-danger text-white mdc-ripple-upgraded"
              to="/uploads-departments"
            >
              Bulk Upload
            </Link>
            
          </div>
        </div>
        <hr className="mt-2 mb-5" />
        <div className="row gx-5">
            <div className="col-xl-12 col-lg-12 mb-5">
                <div className="card card-raised mb-5">
                    <div className="card-body p-5">
                        <h1 className="display-6 mb-0">Department information</h1>
                        <div className="subheading-1 mb-2">
                        Fill the form below
                        </div>
                        <form onSubmit={handleSubmit}>
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
                            <div className="mb-4">
                                <label>Department:</label>
                                <input type="text" name="name" className="form-control" required value={name} onChange={(e) => {seName(e.target.value);}}/>
                            </div>
                            
                            <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                            <a
                                className="small fw-500 text-decoration-none"
                                
                            >
                              {loading ? <p>processing...</p> : <p></p>}
                                
                            </a>

                            <button
                                className="btn btn-info mdc-ripple-upgraded"
                                type="submit"
                                disabled={
                                  !name || !company ? true : false
                              }
                            >
                                Submit
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </main>
  )
}

export default AddDepartment