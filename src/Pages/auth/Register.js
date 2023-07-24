import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import baseURL from "../../Constant/BaseURL";
import axios from "axios";

function Register() {
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/signin";
  const [name, setName] = useState("");
//   const [validName, setValidName] = useState(false);

  const [password, setPassword] = useState("");
  const [validPass, setValidPass] = useState(false);
  const [matchPassword, setMatchPassword] = useState("");
  const [checkMatch, setCheckMatch] = useState(false);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [companies, setCompanies] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/api/company/`).then((response) => {
      setCompanies(response.data);
      //   console.log(response.data)
    });
  }, []);

//   useEffect(() => {
//     // eslint-disable-next-line
//     setValidName(USER_REGEX.test(name));
//   }, [name]);

  useEffect(() => {
    // eslint-disable-next-line
    const result = PWD_REGEX.test(password);
    setValidPass(result);
    const match = password === matchPassword;
    setCheckMatch(match);
  }, [password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validPass && matchPassword) {
      try {
        fetch(`${baseURL}/api/register`, {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify({
            company: company,
            email: email,
            password: password,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            //console.log(res)
            if (res.success) {
              setName("");
              setPassword("");
              setEmail("");
              setSuccess("User created successfully")
              console.log("user created successfully");
              //navigate(from, { replace: true });
            } else {
              console.log(res?.email);
              setError(res?.email);
            }
          });
      } catch (err) {
        console.log(err);
        if (!err?.response) {
          setError("no server response");
        } else if (err?.response?.status === 409) {
          setError("employee already exist");
        } else {
          setError("registeration failed");
        }
      }
    }
  };
  return (
    <div className="bg-info">
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-8">
                  <div className="card card-raised shadow-10 mt-5 mt-xl-10 mb-4">
                    <div className="card-body p-5">
                      <div className="text-center">
                        {/* <img
                          className="mb-3"
                          src="assets/img/icons/background.svg"
                          alt="..."
                          style={{ height: "48px" }}
                        /> */}
                        <h1 className="display-5 mb-0">Create Account</h1>
                        <div className="subheading-1 mb-5">
                          to continue to app
                        </div>
                      </div>
                      <form onSubmit={handleSubmit}>
                        {error ? (
                          <div className="alert alert-danger" role="alert">
                            {error}
                          </div>
                        ) : (
                          <p></p>
                        )}

                        {success ? (
                          <div className="alert alert-success" role="alert">
                            {success}
                          </div>
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
                          <label htmlFor="email">Email:</label>
                          <input
                            autoComplete="off"
                            type="email"
                            value={email}
                            className="form-control"
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                            required
                          />
                        </div>
                        <div className="mb-4 ">
                          <label>Password:</label>
                          <input
                            type="password"
                            value={password}
                            className={
                              validPass ? "form-control" : "form-control error"
                            }
                            autoComplete="off"
                            onChange={(e) => {
                              setPassword(e.target.value);
                            }}
                            required
                          />
                          <p>
                            8 to 24 characters.
                            <br />
                            Must include uppercase and lowercase letters, a
                            number and a special character.
                            <br />
                          </p>
                        </div>
                        <div className="mb-4">
                            
                            <label htmlFor="matchpassword">
                                Confirm Password
                            </label>
                            <input
                                className={checkMatch ? "form-control" : "form-control error"}
                                type="password"
                                autoComplete="off"
                                onChange={(e) => setMatchPassword(e.target.value)}
                                value={matchPassword}
                                required
                            />
                            <p>Must match password</p>
                            
                        </div>

                        <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                          <a className="small fw-500 text-decoration-none">
                            Forgot Password?
                          </a>
                          <button
                            disabled={
                                !email || !company || !validPass || !checkMatch ? true : false
                            }
                            className="btn btn-primary mdc-ripple-upgraded"
                            type="submit"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="text-center mb-5">
                    <Link
                      className="small fw-500 text-decoration-none link-white"
                      to="/signin"
                    >
                      Already have an account? Login!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <div id="layoutAuthentication_footer">
          <footer className="p-4">
            <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between small">
              <div className="me-sm-3 mb-2 mb-sm-0">
                <div className="fw-500 text-white">
                  Copyright © Online Verify 2023
                </div>
              </div>
              <div className="ms-sm-3">
                <a className="fw-500 text-decoration-none link-white" href="#!">
                  Privacy
                </a>
                <a
                  className="fw-500 text-decoration-none link-white mx-4"
                  href="#!"
                >
                  Terms
                </a>
                <a className="fw-500 text-decoration-none link-white" href="#!">
                  Help
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Register;
