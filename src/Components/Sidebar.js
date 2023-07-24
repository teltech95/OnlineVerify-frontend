import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div id="layoutDrawer_nav">
      <nav
        className="drawer accordion drawer-light bg-white"
        id="drawerAccordion"
      >
        <div className="drawer-menu">
          <div className="nav">
            <div className="drawer-menu-heading">Dashboard</div>

            <Link className="nav-link mdc-ripple-upgraded " to="/dashboard">
              <div className="nav-link-icon">
                <i className="material-icons">language</i>
              </div>
              Overview
            </Link>
            <Link className="nav-link mdc-ripple-upgraded " to="/employees">
              <div className="nav-link-icon">
                <i className="material-icons">dashboard</i>
              </div>
              Employees
            </Link>
            <Link className="nav-link mdc-ripple-upgraded " to="/company">
              <div className="nav-link-icon">
                <i className="material-icons">layers</i>
              </div>
              Companies
            </Link>
          </div>
        </div>
        <div className="drawer-footer border-top">
          <div className="d-flex align-items-center">
            <i className="material-icons text-muted">account_circle</i>
            <div className="ms-3">
              <div className="caption">Logged in as:</div>
              <div className="small fw-500">User</div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
