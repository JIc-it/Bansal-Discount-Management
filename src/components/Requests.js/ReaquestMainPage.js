import React, { useState } from "react";
import employee from "../../../src/assets/Images/icons/employee-icon.png";
import nonEmployee from "../../../src/assets/Images/icons/non-employee.png";
import exportIcon from "../../../src/assets/Images/icons/export.png";
import ViewRequest from "./ViewRequest";

const ReaquestMainPage = () => {
  const [openViewRequest, setOpenViewRequest] = useState(false);

  const handleViewClick = (order) => {
    setOpenViewRequest(true);
  };

  return (
    <div className="content-body" style={{ marginLeft: 246 }}>
      {/* row */}
      <div className="container">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body p-0">
              <div className="request-header">
                <div className="overview">
                  <div className="title">Requests Overview</div>
                  <span className="request-description">
                    View all pending, approved, and rejected requests from users
                    in one centralized location.
                  </span>
                </div>
                <div className="export-button-area">
                  <button className="export-button btn btn-sm" type="button">
                    <img src={exportIcon} alt="exportIcon" />
                    <span className="mx-2">Export</span>
                  </button>
                </div>
              </div>
              <hr />
              <div className="table-responsive active-projects task-table">
                <div className="row">
                  <div className="col-4">
                    <div
                      className="input-group mb-3"
                      style={{ paddingTop: 15, paddingLeft: 15 }}
                    >
                      <div
                        className="position-relative mx-2"
                        style={{ width: "100%" }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          style={{ marginRight: 10 }}
                          placeholder="Search..."
                          aria-label="Search..."
                          aria-describedby="search-button"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          style={{
                            position: "absolute",
                            top: "20%",
                            right: "5%",
                            cursor: "pointer",
                          }}
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9.58342 2.29199C5.55634 2.29199 2.29175 5.55658 2.29175 9.58366C2.29175 13.6107 5.55634 16.8753 9.58342 16.8753C13.6105 16.8753 16.8751 13.6107 16.8751 9.58366C16.8751 5.55658 13.6105 2.29199 9.58342 2.29199ZM1.04175 9.58366C1.04175 4.86623 4.86598 1.04199 9.58342 1.04199C14.3008 1.04199 18.1251 4.86623 18.1251 9.58366C18.1251 11.7174 17.3427 13.6684 16.0491 15.1655L18.7754 17.8917C19.0194 18.1358 19.0194 18.5315 18.7754 18.7756C18.5313 19.0197 18.1356 19.0197 17.8915 18.7756L15.1653 16.0494C13.6682 17.3429 11.7172 18.1253 9.58342 18.1253C4.86598 18.1253 1.04175 14.3011 1.04175 9.58366Z"
                            fill="#525252"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="status_dropdown">
                      <select
                        type="text"
                        style={{ minWidth: 200 }}
                        className="form-select mb-3 status_selector"
                      >
                        <option value="" disabled selected>
                          All Status
                        </option>
                        <option value="All">All</option>
                        <option value="1">Accepted</option>
                        <option value="2">Completed</option>
                        <option value="3">Pending</option>
                        <option value="4">Rejected</option>
                      </select>
                    </div>
                  </div>
                  <table id="list-tbl" class="table">
                    <thead>
                      <tr>
                        <th>Bill Number</th>
                        <th>Patient Name</th>
                        <th>Request Name (MOD)</th>
                        <th>Discount Type</th>
                        <th>Original Bill Amount</th>
                        <th>Discount Amount</th>
                        <th>Approval Authority</th>
                        <th>Status</th>
                        <th className="text-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {currentItems.length > 0 ? (
                    currentItems.map((order) => ( */}
                      <tr
                      // key={order.id}
                      >
                        <td>
                          <h6>1234</h6>
                        </td>
                        <td>
                          <h6>Arun</h6>
                        </td>
                        <td>
                          <h6>Arjun</h6>
                        </td>
                        <td>
                          <button className="btn btn-light btn-sm">
                            <img src={employee} alt="" />
                            <span className="mx-1">Employee</span>
                          </button>
                        </td>
                        <td>
                          <h6>RS 1000/-</h6>
                        </td>

                        <td>
                          <h6>
                            RS 1000/-{" "}
                            <span style={{ color: "#A8CF45" }}>(20%)</span>{" "}
                          </h6>
                        </td>
                        <td>
                          <h6>Patel</h6>
                        </td>
                        <td>
                          <span
                            className="status-requests"
                            style={{ color: "#a8cf45", background: "#f9f9f9" }}
                          >
                            <div
                              className="mx-2 square-dot"
                              style={{ background: "#a8cf45" }}
                            ></div>
                            Approved
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => handleViewClick()}
                          >
                            View Request
                          </button>
                        </td>
                      </tr>
                      <tr
                      // key={order.id}
                      >
                        <td>
                          <h6>1234</h6>
                        </td>
                        <td>
                          <h6>Arun</h6>
                        </td>
                        <td>
                          <h6>Arjun</h6>
                        </td>
                        <td>
                          <button className="btn btn-light btn-sm">
                            <img src={nonEmployee} alt="" />
                            <span className="mx-1">Non Employee</span>
                          </button>
                        </td>
                        <td>
                          <h6>RS 1000/-</h6>
                        </td>

                        <td>
                          <h6>
                            RS 1000/-{" "}
                            <span style={{ color: "#A8CF45" }}>(20%)</span>{" "}
                          </h6>
                        </td>
                        <td>
                          <h6>Patel</h6>
                        </td>
                        <td>
                          <span
                            className="status-requests"
                            style={{ color: "#004F8F", background: "#DEF0FC" }}
                          >
                            <div
                              className="mx-2 square-dot"
                              style={{ background: "#004F8F" }}
                            ></div>
                            Completed
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-primary btn-sm">
                            View Request
                          </button>
                        </td>
                      </tr>
                      <tr
                      // key={order.id}
                      >
                        <td>
                          <h6>1234</h6>
                        </td>
                        <td>
                          <h6>Arun</h6>
                        </td>
                        <td>
                          <h6>Arjun</h6>
                        </td>
                        <td>
                          <button className="btn btn-light btn-sm">
                            <img src={nonEmployee} alt="" />
                            <span className="mx-1">Non Employee</span>
                          </button>
                        </td>
                        <td>
                          <h6>RS 1000/-</h6>
                        </td>

                        <td>
                          <h6>
                            RS 1000/-{" "}
                            <span style={{ color: "#A8CF45" }}>(20%)</span>{" "}
                          </h6>
                        </td>
                        <td>
                          <h6>Patel</h6>
                        </td>
                        <td>
                          <span
                            className="status-requests"
                            style={{
                              color: "#890B0B",
                              background: " #F8E2E2     ",
                            }}
                          >
                            <div
                              className="mx-2 square-dot"
                              style={{ background: "#890B0B" }}
                            ></div>
                            Rejected
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-primary btn-sm">
                            View Request
                          </button>
                        </td>
                      </tr>
                      <tr
                      // key={order.id}
                      >
                        <td>
                          <h6>1234</h6>
                        </td>
                        <td>
                          <h6>Arun</h6>
                        </td>
                        <td>
                          <h6>Arjun</h6>
                        </td>
                        <td>
                          <button className="btn btn-light btn-sm">
                            <img src={nonEmployee} alt="" />
                            <span className="mx-1">Non Employee</span>
                          </button>
                        </td>
                        <td>
                          <h6>RS 1000/-</h6>
                        </td>

                        <td>
                          <h6>
                            RS 1000/-{" "}
                            <span style={{ color: "#A8CF45" }}>(20%)</span>{" "}
                          </h6>
                        </td>
                        <td>
                          <h6>Patel</h6>
                        </td>
                        <td>
                          <span
                            className="status-requests"
                            style={{
                              color: "#A75400",
                              background: " #FCECDA  ",
                            }}
                          >
                            <div
                              className="mx-2 square-dot"
                              style={{ background: "#A75400" }}
                            ></div>
                            Pending
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-primary btn-sm">
                            View Request
                          </button>
                        </td>
                      </tr>
                      {/* ))
                  ) : (
                    <tr>
                      <td colSpan="5">No orders available</td>
                    </tr>
                  )} */}
                    </tbody>
                  </table>
                </div>
                <div className="col-12">
                  <div className="btn-group" style={{ float: "right" }}>
                    <button
                      className="btn btn-light btn-sm"
                      // onClick={handlePreviousPage}
                      // disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    &nbsp;
                    <button
                      className="btn btn-light btn-sm"
                      // onClick={handleNextPage}
                      // disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openViewRequest && (
        <ViewRequest open={openViewRequest} setOpen={setOpenViewRequest} />
      )}
    </div>
  );
};

export default ReaquestMainPage;
