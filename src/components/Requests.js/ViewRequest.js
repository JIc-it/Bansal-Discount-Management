import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState, useEffect } from "react";
import employee from "../../../src/assets/Images/icons/employee-icon.png";
import nonEmployee from "../../../src/assets/Images/icons/non-employee.png";
import success from "../../../src/assets/Images/icons/success.png";
import reject from "../../../src/assets/Images/icons/reject-cross-icon.png";
import pending from "../../../src/assets/Images/icons/pending.png";
import completed from "../../../src/assets/Images/icons/completed.png";
import discountIcon from "../../../src/assets/Images/icons/discount-icon.png";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getIndivitualDiscountRequest } from "../../axiosHandle/discountRequestService";
import { convertDateFormat } from "../../helper";

export default function ViewRequest({
  data,
  open,
  setOpen,
  hasUpdate,
  setHasUpdate,
  permissionForRequestOrder,
  setIsRefetch,
  isRefetch,
  requestListData,
}) {
  // const [requestListData, setRequestListData] = useState();

  const handleCloseOffcanvas = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   getIndivitualDiscountRequest(requestId)
  //     .then((data) => {
  //       console.log(" Request  by id", data);
  //       setRequestListData(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching profile:", error);
  //     });
  // }, [requestId]);

  const calculatedDiscountPercentage = (
    (requestListData?.discount_amount / requestListData?.bill_amount) *
    100
  ).toFixed();

  return (
    <>
      <Offcanvas
        show={open}
        onHide={handleCloseOffcanvas}
        placement="end"
        style={{ overflow: "auto" }}
        className="request-offcanvas"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {requestListData?.request_id}
            <span
              style={{ fontWeight: 400, fontSize: "12px", color: "#ccc" }}
              className="mx-2"
            >
              {requestListData?.created_at &&
                convertDateFormat(requestListData?.created_at)}
            </span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <div className="container">
          <div
            style={{
              display: "flex",
            }}
          >
            <span
              className="status-requests request-status-button"
              style={{
                color:
                  requestListData && requestListData?.status == "Approved"
                    ? "#a8cf45"
                    : requestListData?.status == "Pending"
                    ? "#A75400"
                    : requestListData?.status == "Rejected"
                    ? "#890B0B"
                    : requestListData?.status == "Completed"
                    ? "#004F8F"
                    : "",
                background:
                  requestListData && requestListData?.status == "Approved"
                    ? "#f9f9f9"
                    : requestListData?.status == "Pending"
                    ? "#FCECDA"
                    : requestListData?.status == "Rejected"
                    ? "#F8E2E2"
                    : requestListData?.status == "Completed"
                    ? "#DEF0FC"
                    : "",
              }}
            >
              <div
                className="mx-2 square-dot"
                style={{
                  background:
                    requestListData && requestListData?.status == "Approved"
                      ? "#a8cf45"
                      : requestListData?.status == "Pending"
                      ? "#A75400"
                      : requestListData?.status == "Rejected"
                      ? "#890B0B"
                      : requestListData?.status == "Completed"
                      ? "#004F8F"
                      : "",
                }}
              ></div>
              {requestListData && requestListData?.status}
            </span>
            <button className="btn btn-light btn-sm">
              <img
                src={
                  requestListData &&
                  requestListData?.relation_type === "Employee"
                    ? employee
                    : nonEmployee
                }
                alt=""
              />
              <span className="mx-1">
                {requestListData && requestListData?.relation_type}
              </span>
            </button>
          </div>
          <div
            className="status-message-oofcanvas my-3"
            style={{
              background:
                requestListData && requestListData?.status == "Approved"
                  ? "#a8cf45"
                  : requestListData?.status == "Pending"
                  ? "#A75400"
                  : requestListData?.status == "Rejected"
                  ? "#F8E2E2"
                  : requestListData?.status == "Completed"
                  ? "#DEF0FC"
                  : "",
              border:
                requestListData && requestListData?.status == "Approved"
                  ? "#a8cf45"
                  : requestListData?.status == "Pending"
                  ? "#A75400"
                  : requestListData?.status == "Rejected"
                  ? "1px solid #D21C1C"
                  : requestListData?.status == "Completed"
                  ? "1px solid #0172CB"
                  : "",
            }}
          >
            <img
              src={
                requestListData && requestListData?.status == "Approved"
                  ? success
                  : requestListData?.status == "Pending"
                  ? pending
                  : requestListData?.status == "Rejected"
                  ? reject
                  : requestListData?.status == "Completed"
                  ? completed
                  : ""
              }
              alt="success"
            />
            <div className="status-label mx-4">
              <div
                className="title"
                style={{
                  color:
                    requestListData && requestListData?.status == "Approved"
                      ? "#276831"
                      : requestListData?.status == "Pending"
                      ? " #A75400"
                      : requestListData?.status == "Rejected"
                      ? "#890B0B"
                      : requestListData?.status == "Completed"
                      ? "#004F8F"
                      : "",
                }}
              >
                {requestListData && requestListData?.status == "Approved"
                  ? "Approved Request."
                  : requestListData?.status == "Pending"
                  ? "Pending Request"
                  : requestListData?.status == "Rejected"
                  ? "Rejected Request"
                  : requestListData?.status == "Completed"
                  ? "Completed Request"
                  : ""}
              </div>
              <span style={{ color: "#000" }}>
                {" "}
                {requestListData && requestListData?.status == "Approved"
                  ? "This request has been approved."
                  : requestListData?.status == "Pending"
                  ? "This request is currently pending approval."
                  : requestListData?.status == "Rejected"
                  ? "This request has been rejected and will not proceed further."
                  : requestListData?.status == "Completed"
                  ? "This request has been processed and completed successfully."
                  : ""}{" "}
              </span>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-md-6">
              <div className="patient-details patient-details-bg">
                <div className="patient-label">
                  <span className="label">Patient:</span>
                  <span className="name">Jayshri Tiwari</span>
                </div>
                <div className="patient-label">
                  <span className="label">Patient Visit Type:</span>
                  <span className="name">
                    {requestListData?.patient_visit_type}
                  </span>
                </div>
                <div className="patient-label">
                  <span className="label">Doctor:</span>
                  <span className="name">Rahul Choudhary</span>
                </div>
                <div className="patient-label">
                  <span className="label">Admission Date:</span>
                  <span className="name">04 OCT, 2023</span>
                </div>
                <div className="patient-label">
                  <span className="label">Initiated By:</span>
                  <span className="name">
                    {requestListData?.initiated_by?.name}
                  </span>
                </div>
                <div className="patient-label">
                  <span className="label">Accepted By:</span>
                  <span className="name">Vishwas Patel</span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="patient-details discount-details-bg">
                <div className="patient-label">
                  <span className="label">Original Amount:</span>
                  <span className="name" style={{ color: "#000" }}>
                    {` RS ${requestListData?.bill_amount} /-`}
                  </span>
                </div>
                <div className="patient-label">
                  <span className="label">
                    Discount (${calculatedDiscountPercentage || 0}%):
                  </span>
                  <span className="name" style={{ color: "#28A138" }}>
                    {` RS ${requestListData?.discount_amount}/-`}
                  </span>
                </div>

                <div className="total-amount-discount ">
                  <img src={discountIcon} alt="discountIcon" />
                  <div className="mx-4">
                    <div className="total-amount-label">
                      Total After Discount
                    </div>
                    <div className="total-amount">{`${requestListData?.final_amount}/-`}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              border: " 1px solid #E0E6F1",
              borderRadius: "5px",
              padding: "10px",
            }}
            className="my-3"
          >
            <div className="row">
              <div className="col-md-6">
                <div className="tentative-details">
                  <span>Tentative Discharge Date:</span>
                  <h4>
                    {" "}
                    {requestListData?.discharge_date &&
                      convertDateFormat(requestListData?.discharge_date)}
                  </h4>
                </div>
              </div>
              <div className="col-md-6">
                <div className="tentative-details">
                  <span>Referred By:</span>
                  <h4>{requestListData?.referred_by || "-"}</h4>
                </div>
              </div>
              <div className="col-md-6">
                <div className="tentative-details">
                  <span>Treatment Description:</span>
                  <h4> {requestListData?.treatment_description || "-"}</h4>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              border:
                requestListData &&
                requestListData?.relation_type != "Employee" &&
                " 1px solid #E0E6F1",
              borderRadius:
                requestListData &&
                requestListData?.relation_type != "Employee" &&
                "5px",
              padding: "10px",
            }}
            className={`${
              requestListData &&
              requestListData?.relation_type != "Employee" &&
              "my-3"
            }`}
          >
            {requestListData &&
              requestListData?.relation_type != "Employee" && (
                <div className="row">
                  <div className="col-md-6">
                    <div className="tentative-details">
                      <span>Patient Category:</span>
                      <h4>Employee</h4>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="tentative-details">
                      <span>Employer:</span>
                      <h4>Bansal News</h4>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="tentative-details">
                      <span>Employee Name:</span>
                      <h4>Jayshri Tiwari</h4>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="tentative-details">
                      <span>Employee ID:</span>
                      <h4>252352344</h4>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="tentative-details">
                      <span>ID Card Photo:</span>
                      <br />
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ background: " #0BA0DC", border: "none" }}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              )}
          </div>

          <div
            style={{
              border: " 1px solid #E0E6F1",
              borderRadius: "5px",
              padding: "10px",
            }}
            className="my-3"
          >
            <div className="row">
              <div className="col-md-6">
                <div className="tentative-details">
                  <span>Total Paid Amount to Date</span>
                  <h4>{`RS ${requestListData?.final_amount}/-`}</h4>
                  <span>08 OCT, 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Offcanvas>
    </>
  );
}
