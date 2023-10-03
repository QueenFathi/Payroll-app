import { FaPlus, FaSearch } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../config/fireConfig";
import { toast } from "react-toastify";

export default function Employee() {
  const [detailShow, setDetailShow] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [tableData, setTableData] = useState(null);

  const getTabledata = () => {
    const q = query(collection(db, "staffs"));
    onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setTableData(data);
    });
  };

  useEffect(() => {
    getTabledata();
  }, []);

  const handleDetailClose = () => {
    setDetailShow(false);
    setModalData(null);
  };
  const handleDetailShow = (data) => {
    setDetailShow(true);
    setModalData(data);
  };

  const handleAddClose = () => setAddShow(false);
  const handleAddShow = () => setAddShow(true);

  const handleDelete = async (email) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      await deleteDoc(doc(db, "staffs", email))
        .then(() => {
          toast.success("Staff Deleted");
        })
        .catch((err) => toast.error(err.code));
    }
  };
  const staffID = () => {
    let highestValueObject = tableData?.reduce((prev, current) => {
      return Number(prev.id) > Number(current.id) ? prev : current;
    });
    let tempNum = Number(highestValueObject?.id) + 1;
    return tempNum?.toString()?.padStart(4, "0");
  };
  const handleAddStaff = async (e) => {
    e.preventDefault();

    await setDoc(doc(db, "staffs", e.target.email.value.trim()), {
      firstName: e.target.firstName.value.trim(),
      lastName: e.target.lastName.value.trim(),
      email: e.target.email.value.trim(),
      department: e.target.department.value.trim(),
      designation: e.target.designation.value.trim(),
      phone: e.target.phone.value.trim(),
      address: e.target.address.value.trim(),
      avatar: "",
      status:true,
      accountNo: e.target.accountNo.value.trim(),
      dateJoined: e.target.date.value,
      basicSalary: e.target.salary.value.trim(),
      employmentType: e.target.employmentType.value,
      id: staffID(),
    })
      .then(() => {
        toast.success("Staff Created");
        setAddShow(false);
      })
      .catch((err) => toast.error(err.code));
  };
  const handleSuspendStaff = async (email, status) => {
    await setDoc(
      doc(db, "staffs", email),
      {
        status: !status,
      },
      { merge: true }
    )
      .then(() => {
        toast.success("Staff Status Changed");
      })
      .catch((err) => toast.error(err.code));
  };

  function sortData(e) {
    const query = e.target.value
    var updatedData = []
    if(tableData){
      updatedData=[...tableData]
    }
    if (query === "lastName") {
      updatedData = updatedData?.sort((a, b) => {
        const nameA = a.lastName.toLowerCase();
        const nameB = b.lastName.toLowerCase();
      
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        return 0;
      });
    } else if (query === "department") {
      updatedData = updatedData?.sort((a, b) => {
        const nameA = a.department.toLowerCase();
        const nameB = b.department.toLowerCase();
      
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        return 0;
      });
    } else if (query === "status") {
      updatedData = updatedData?.sort((a, b) => 
        b.status - a.status
      );
    } else if (query === "id") {
      updatedData = updatedData?.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
      
        return 0;
      });
    }
    setTableData(updatedData)
  }

  const staffDataElements = tableData?.map((data) => (
    <tr key={data.id} className="text-nowrap">
      <td>
        <input type="checkbox" id="k" />
      </td>
      <td>{data?.id}</td>
      <td>{data?.firstName}</td>
      <td>{data?.lastName}</td>
      <td>{data?.email}</td>
      <td>{data?.department}</td>
      <td>{data?.designation}</td>
      <td>{data?.status ? "Active" : "Suspended"}</td>
      <td className="d-flex justify-content-evenly">
        <button
          onClick={() => handleDetailShow(data)}
          className="btn btn-success"
        >
          View
        </button>
        <button
          className="btn btn-primary py-1"
          onClick={() => handleSuspendStaff(data?.email, data?.status)}
        >
          {data?.status ? "Suspend" : "Activate"}
        </button>
        <button
          className="btn btn-danger py-1"
          onClick={() => handleDelete(data?.email)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  

  return (
    <div className="mt-3 staff">
      <Modal centered show={detailShow} onHide={handleDetailClose}>
        <Modal.Header closeButton>Staff Details</Modal.Header>
        <Modal.Body>
          <p>First Name: {modalData?.firstName}</p>
          <p>Last Name: {modalData?.lastName}</p>
          <p>Email Adress: {modalData?.email}</p>
          <p>Department: {modalData?.department}</p>
          <p>Designation: {modalData?.designation}</p>
          <p>Contact Adress: {modalData?.address}</p>
          <p>Phone Number: {modalData?.phone}</p>
          <p>Account Number: {modalData?.accountNo}</p>
          <p>Date Joined: {modalData?.dateJoined}</p>
          <p>Basic Salary: {modalData?.basicSalary}</p>
          <p>Employment Type: {modalData?.employmentType}</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleDetailClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
      <Modal centered show={addShow} onHide={handleAddClose}>
        <Modal.Header closeButton>Add Employee Data</Modal.Header>
        <Modal.Body>
          <h5>Fill in all details of the new employee</h5>
          <form onSubmit={handleAddStaff}>
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                required
              />
              <label for="firstName">First Name</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                required
              />
              <label for="lastName">Last Name</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
              />
              <label for="email">Email Address</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="department"
                name="department"
                required
              />
              <label for="department">Department</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="designation"
                name="designation"
                required
              />
              <label for="designation">Designation</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                required
              />
              <label for="phone">Phone Number</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                required
              />
              <label for="address">Contact Adress</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="accountNo"
                name="accountNo"
                required
              />
              <label for="accountNo">Account Number</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                required
              />
              <label for="date">Date Joined</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="salary"
                name="salary"
                required
              />
              <label for="salary">Basic Salary</label>
            </div>
            <select className="form-select" name="employmentType">
              <option selected>Employment Type</option>
              <option value="Part Time">Part Time</option>
              <option value="Full Time">Full Time</option>
            </select>
            <button className="btn btn-primary d-flex justify-self-end ms-auto mt-2">
              Add Employee
            </button>
          </form>
        </Modal.Body>
      </Modal>
      <div className="pt-3 pb-2 px-3 bg-light rounded">
        <div className="d-flex">
          <h3 className="me-auto">Employee Information</h3>
          <button
            onClick={handleAddShow}
            className="btn btn-outline-secondary text-dark rounded-circle me-2"
          >
            <FaPlus />
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
            onChange={sortData}
          >
            <option selected>Sort By</option>
            <option value={"id"}>Employee ID</option>
            <option value={"lastName"}>Last Name</option>
            <option value={"department"}>Department</option>
            <option value={"status"}>Status</option>
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
      </div>
      <div className="mytable table-responsive small mt-4">
        <table className="table table-hover">
          <thead>
            <tr>
              <th></th>
              <th scope="col">Employee ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email Adress</th>
              <th scope="col">Department</th>
              <th scope="col">Designation</th>
              <th scope="col">Status</th>
              <th scope="col" className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>{staffDataElements}</tbody>
        </table>
      </div>
    </div>
  );
}
