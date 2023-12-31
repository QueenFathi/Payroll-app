import { FaEdit, FaSearch } from "react-icons/fa";
import { data } from "../api";
import { useState } from "react";
import { Modal } from "react-bootstrap";

export default function Payroll() {
  const [addShow, setAddShow] = useState(false);

  const handleAddClose = () => setAddShow(false);
  const handleAddShow = () => setAddShow(true);

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${month} ${year}`;
  };

  const staffDataElements = data?.map((data) => (
    <tr key={data?.id} className="text-nowrap">
      <td>{data?.id}</td>
      <td>
        {data?.firstName} {data?.lastName}
      </td>
      <td>{data?.basic}</td>
      <td>{data?.transport}</td>
      <td>{data?.health}</td>
      <td>{data?.children}</td>
      <td>{data?.overtime}</td>
      <td>{data?.bonus}</td>
      <td>{data?.tax}</td>
      <td>{data?.loan}</td>
      <td>{data?.advance}</td>
      <td>{data?.absence}</td>
      <td>{data?.pension}</td>
      <td>{data?.total}</td>
      <button className="btn editbtn bg-success text-white py-1" onClick={handleAddShow}>
        <FaEdit /> edit
      </button>
    </tr>
  ));

  return (
    <div className="payroll">
      <Modal centered show={addShow} onHide={handleAddClose}>
        <Modal.Header closeButton>Add Staff Data</Modal.Header>
        <Modal.Body>
          <h5>Edit Payroll Details</h5>
          <form>
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id=""
                name=""
                value=""
                required
              />
              <label htmlFor=""></label>
            </div>
            <button className="btn btn-primary">Save Changes</button>
          </form>
        </Modal.Body>
      </Modal>
      <div className="bg-light rounded pt-3 pb-2 px-3">
        <h3>{dateBuilder(new Date())} Payroll</h3>
      </div>
      <div className="mt-4 d-flex">
        <button type="button" className="btn btn-sm btn-outline-secondary me-auto">
          Suspended Employees <span className="badge text-bg-secondary">0</span>
        </button>
        <button
            className="btn me-1 rounded-circle"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSearch"
            aria-controls="navbarSearch"
            aria-expanded="false"
            aria-label="Toggle search"
          >
            <FaSearch />
        </button>
        <select
          className="form-select py-1 border-secondary"
          style={{ width: "150px" }}
        >
          <option selected>Sort By</option>
          <option>Name</option>
          <option>Basic Salary</option>
          <option>Net Pay</option>
        </select>
      </div>
      <div id="navbarSearch" className="navbar-search mt-2 w-100 collapse">
        <input
          className="form-control w-100 border-secondary"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
      </div>
      <div className="mytable mt-4 table-responsive">
        <table className="table table-bordered border-dark table-hover text-nowrap">
          <thead>
            <tr>
              <th className="fs-6" 
                scope="col" 
                colSpan={2}
              >
                Employee details
              </th>
              <th
                className="fs-6 table-success text-center"
                scope="col"
                colSpan={5}
              >
                Earnings
              </th>
              <th className="fs-6 table-info" scope="col">
                Additions
              </th>
              <th
                className="fs-6 table-danger text-center"
                scope="col"
                colSpan={5}
              >
                Deductions
              </th>
              <th className="fs-6 table-primary" scope="col">
                NetPay
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fw-semibold text-secondary">ID</td>
              <td className="fw-semibold text-secondary">Name</td>
              <td className="fw-semibold text-secondary">Basic Salary</td>
              <td className="fw-semibold text-secondary">
                Transport Allowance
              </td>
              <td className="fw-semibold text-secondary">
                Health & Safety Allowance
              </td>
              <td className="fw-semibold text-secondary">
                Children/Education Allowance
              </td>
              <td className="fw-semibold text-secondary">Overtime</td>
              <td className="fw-semibold text-secondary">Bonuses/Incentives</td>
              <td className="fw-semibold text-secondary">PAYE tax</td>
              <td className="fw-semibold text-secondary">Loans</td>
              <td className="fw-semibold text-secondary">Salary Advance</td>
              <td className="fw-semibold text-secondary">Absence/Lateness</td>
              <td className="fw-semibold text-secondary">Pension Savings</td>
              <td className="fw-semibold text-secondary">Total</td>
            </tr>
            {staffDataElements}
          </tbody>
        </table>
      </div>
      <div className="my-4">
        <button className="d-flex ms-auto me-0 px-4 fs-5 btn btn-success">
          Submit Payroll
        </button>
      </div>
    </div>
  );
}
