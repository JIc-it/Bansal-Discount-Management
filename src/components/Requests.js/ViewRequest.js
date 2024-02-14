import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useState, useEffect } from "react";
import employee from "../../../src/assets/Images/icons/employee-icon.png";
import success from "../../../src/assets/Images/icons/success.png";
import discountIcon from "../../../src/assets/Images/icons/discount-icon.png";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ViewRequest({
  data,
  open,
  setOpen,
  hasUpdate,
  setHasUpdate,
  permissionForRequestOrder,
  setIsRefetch,
  isRefetch,
}) {
  const handleCloseOffcanvas = () => {
    setOpen(false);
  };
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
            #121121212121{" "}
            <span style={{ fontWeight: 400, fontSize: "12px", color: "#ccc" }}>
              12 JAN 2024
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
              className="status-requests"
              style={{
                color: "#a8cf45",
                background: "#f9f9f9",
                height: "20px",
                marginRight: "10px",
                position: "relative",
                top: "4px",
              }}
            >
              <div
                className="mx-2 square-dot"
                style={{ background: "#a8cf45" }}
              ></div>
              Approved
            </span>
            <button className="btn btn-light btn-sm">
              <img src={employee} alt="" />
              <span className="mx-1">Employee</span>
            </button>
          </div>
          <div className="status-message-oofcanvas my-3">
            <img src={success} alt="success" />
            <div className="status-label mx-4">
              <div className="title">Appreved Request.</div>
              <span>This request has been approved.</span>
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
                  <span className="name">Outpatient</span>
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
                  <span className="name">Vikas Tiwari</span>
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
                    RS 50,000 /-
                  </span>
                </div>
                <div className="patient-label">
                  <span className="label">Discount (50%):</span>
                  <span className="name" style={{ color: "#28A138" }}>
                    RS 12,500 /-
                  </span>
                </div>

                <div className="total-amount-discount ">
                  <img src={discountIcon} alt="discountIcon" />
                  <div className="mx-4">
                    <div className="total-amount-label">
                      Total After Discount
                    </div>
                    <div className="total-amount">37500/-</div>
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
                  <h4>12 JAN, 2024</h4>
                </div>
              </div>
              <div className="col-md-6">
                <div className="tentative-details">
                  <span>Referred By:</span>
                  <h4>Rahul Choudhary</h4>
                </div>
              </div>
              <div className="col-md-6">
                <div className="tentative-details">
                  <span>Treatment Description:</span>
                  <h4>Routine check-up</h4>
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
                  <h4>RS 25000/-</h4>
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
