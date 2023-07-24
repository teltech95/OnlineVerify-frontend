import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

function Login() {
    const {loginUser, error} = useAuth()

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
                            <h1 className="display-5 mb-0">Login</h1>
                            <div className="subheading-1 mb-5">
                            to continue to app
                            </div>
                        </div>
                        <form onSubmit={loginUser}>
                            {error ? (
                                <div class="alert alert-danger" role="alert">{error}</div> 
                            ) : (
                                <p></p>
                            )}
                            <div className="mb-4">
                                <label>Email:</label>
                                <input type="email" name="username" className="form-control" required/>
                            </div>
                            <div className="mb-4">
                                <label>Password:</label>
                                <input type="password" name="password" className="form-control" required/>
                            </div>
                            
                            <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                            <a
                                className="small fw-500 text-decoration-none"
                                
                            >
                                Forgot Password?
                            </a>
                            <button
                                className="btn btn-primary mdc-ripple-upgraded"
                                type="submit"
                            >
                                Login
                            </button>
                            </div>
                        </form>
                        </div>
                    </div>
                    <div className="text-center mb-5">
                        <Link className="small fw-500 text-decoration-none link-white" to="/register">Need an account? Sign up!</Link>

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

export default Login;
