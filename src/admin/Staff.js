import {
  FaPlus,
  FaSearch,
  FaFilter,
  FaShare,
  FaDownload,
} from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../config/fireConfig";
import { toast } from "react-toastify";

export default function Staff() {
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
  const handleAddShow = (data) => setAddShow(true);

  const handleDelete = async (email) => {
    if (window.confirm("Are you sure you want to delete this staff?")) {
      await deleteDoc(doc(db, "staffs", email))
        .then(() => {
          toast.success("Staff Deleted");
        })
        .catch((err) => toast.error(err.code));
    }
  };

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
      <td>
        <button onClick={() => handleDetailShow(data)} className="btn btn-success">
          View details
        </button>
      </td>
      <td>
        <button
          className="btn btn-primary py-1"
          onClick={() => handleDelete(data?.email)}
        >
          Delete Staff
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
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={handleDetailClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
      <Modal centered show={addShow} onHide={handleAddClose}>
        <Modal.Header closeButton>Add Staff Data</Modal.Header>
        <Modal.Body>
          <h5>Fill in all details on the new staff</h5>
          <form>
            <div className="form-floating mb-2">
              <input type="text" className="form-control" id="firstName" name="firstName" required />
              <label for='firstName'>First Name</label>
            </div>
            <div className="form-floating mb-2">
              <input type="text" className="form-control" id="lastName" name="lastName" required />
              <label for='lastName'>Last Name</label>
            </div>
            <div className="form-floating mb-2">
              <input type="email" className="form-control" id="email" name="email" required />
              <label for='email'>Email Address</label>
            </div>
            <div className="form-floating mb-2">
              <input type="text" className="form-control" id="department" name="department" required />
              <label for='department'>Department</label>
            </div>
            <div className="form-floating mb-2">
              <input type="text" className="form-control" id="designation" name="designation" required />
              <label for='designation'>Designation</label>
            </div>
            <div className="form-floating mb-2">
              <input type="text" className="form-control" id="phone" name="phone" required />
              <label for='phone'>Phone Number</label>
            </div>
            <div className="form-floating mb-2">
              <input type="text" className="form-control" id="address" name="address" required />
              <label for='address'>Contact Adress</label>
            </div>
            <button className="btn btn-primary">
              Add
            </button>
          </form>
        </Modal.Body>
      </Modal>
      <div className="py-3 px-4">
        <div className="d-flex">
          <h4 className="me-auto">Employee Information</h4>
          <button onClick={handleAddShow} className="btn btn-outline-secondary text-dark rounded-circle me-2">
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
          <select className="form-select py-1 border-secondary" style={{width: '150px'}}>
            <option selected>Sort By</option>
            <option>First Name</option>
            <option>Department</option>
          </select>
        </div>
        <div id="navbarSearch" class="navbar-search mt-2 w-100 collapse">
          <input
            class="form-control w-100 border-secondary"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
        </div>
      </div>
      <div class="mytable table-responsive small">
        <table class="table table-hover">
          <thead>
            <tr>
              <th></th>
              <th scope="col">Staff ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email Adress</th>
              <th scope="col">Department</th>
              <th scope="col">Designation</th>
              <th scope="col">Action</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>{staffDataElements}</tbody>
        </table>
      </div>
    </div>
  );
}
