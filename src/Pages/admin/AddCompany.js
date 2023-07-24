import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import baseURL from "../../Constant/BaseURL";
import axios from "axios";

function AddCompany() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [dateofregistarion, setDateofregistarion] = useState("");
    const [regnumber, setRegnumber] = useState("");
    const [address, setAddress] = useState("");
    const [contactperson, setContactperson] = useState("");
    const [company, setCompany] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
          fetch(`${baseURL}/api/company/`, {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({
              name: company,
              date_of_registarion: dateofregistarion,
              registration_number: regnumber,
              address:address,
              contact_person:contactperson
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              //console.log(res)
              if (res.success) {
                setLoading(false)
                setRegnumber("");
                setDateofregistarion("");
                setAddress("");
                setContactperson("");
                setSuccess("Company created successfully")
                console.log("user created successfully");
                //navigate(from, { replace: true });
              } else {
                setLoading(false)
                console.log(res);
                if (res?.registration_number) {
                  setError(res.registration_number);
                } else if (res?.name) {
                  setError(res?.name)
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
            <h1 className="text-white py-3 mb-0 display-6">Add Company</h1>
          </div>
        </div>
      </header>
      <div className="container-xl p-5">
        <hr className="mt-2 mb-5" />
        <div className="row gx-5">
            <div className="col-xl-12 col-lg-12 mb-5">
                <div className="card card-raised mb-5">
                    <div className="card-body p-5">
                        <h1 className="display-6 mb-0">Company information</h1>
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
                                <label>Company name:</label>
                                <input type="text" name="company" className="form-control" required value={company} onChange={(e) => {setCompany(e.target.value);}} />
                            
                            </div>
                            <div className="mb-4">
                                <label>Date of registarion:</label>
                                <input type="text" name="date_of_registarion" className="form-control" required placeholder="02/02/2020" value={dateofregistarion} onChange={(e) => {setDateofregistarion(e.target.value);}}/>
                            </div>
                            <div className="mb-4">
                                <label>Registration number:</label>
                                <input type="text" name="registration_number" className="form-control" required value={regnumber} onChange={(e) => {setRegnumber(e.target.value);}}/>
                            </div>
                            <div className="mb-4">
                                <label>Address:</label>
                                <input type="text" name="address" className="form-control" required value={address} onChange={(e) => {setAddress(e.target.value);}}/>
                            </div>

                            <div className="mb-4">
                                <label>Contact person:</label>
                                <input type="text" name="contact_person" className="form-control" required value={contactperson} onChange={(e) => {setContactperson(e.target.value);}} />
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
                                  !contactperson || !company || !address || !regnumber || !dateofregistarion ? true : false
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
  );
}

export default AddCompany;
