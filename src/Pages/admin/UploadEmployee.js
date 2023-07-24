
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import baseURL from "../../Constant/BaseURL";
import axios from "axios";

function UploadEmployee() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [name, seName] = useState("");
    const [company, setCompany] = useState("");

    const [loading, setLoading] = useState(false);

    const [companies, setCompanies] = useState(null);
    const [files, setFiles] = useState(null);


    useEffect(() => {
        axios.get(`${baseURL}/api/company/`).then((response) => {
        setCompanies(response.data);
        //   console.log(response.data)
        });
    }, []);

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     setLoading(true)
    //     const formData = new FormData();
    //     formData.append("file", files);
    //     const config = {
    //       headers: {
    //         "content-type": "multipart/form-data",
    //       },
    //     };
    //     axios({
    //       method: "post",
    //       url: `${baseURL}/api/emp-files/`,
    //       data: formData,
    //       headers: { "Content-Type": "multipart/form-data" },
    //     })
    //       .then(function (response) {
    //         //handle success
    //         setSuccess("File successfully uploaded")
    //         setLoading(false)
    //         console.log(response);
    //       })
    //       .catch(function (response) {
    //         //handle error
    //         setError("Somtheng went wrong")
    //         console.log(response);
    //         setLoading(false)

    //       });
    // };
    const fileHandler = (event) => {
        event.preventDefault();
        setLoading(true)
        const formData = new FormData();
        formData.append("file", event.target.files[0]);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        axios({
          method: "post",
          url: `${baseURL}/api/emp-files/`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(function (response) {
            //handle success
            setSuccess("File successfully uploaded")
            setLoading(false)
            console.log(response);
            console.log(response);
          })
          .catch(function (response) {
            //handle error
            setError("Somtheng went wrong")
            console.log(response);
            setLoading(false)
            console.log(response);
          });
      };

  return (
    <main>
      <header className="bg-info">
        <div className="container-xl px-5">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="text-white py-3 mb-0 display-6">Bulk uploads -  Employees</h1>
          </div>
        </div>
      </header>
      <div className="container-xl p-5">
        
        <hr className="mt-2 mb-5" />
        <div className="row gx-5">
          <div className="col-xl-6 col-lg-6 mb-5">
            <div className="card card-raised mb-5">
              <div className="card-body p-5">
                <h1 className="display-6 mb-0">Employee files</h1>
                <div className="subheading-1 mb-2">supported files -- csv, excel</div>
                <form >
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
                  {/* <div className="mb-4">
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
                  </div> */}
                  <div className="mb-4">
                    <label>Select file:</label>
                    <input 
                        className="form-control"
                        type="file"
                        name="file" 
                        id="exampleFile" 
                        onChange={(e) => fileHandler(e)}
                        // onChange={(e) => {setFiles(e.target.value);}}
                    />
                  </div>

                  <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                    <a className="small fw-500 text-decoration-none">
                      {loading ? <p>processing...</p> : <p></p>}
                    </a>

                    {/* <button
                      className="btn btn-info mdc-ripple-upgraded"
                      type="submit"
                      disabled={!files ? true : false}
                    >
                      Submit
                    </button> */}
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

export default UploadEmployee;
