import { Modal } from 'react-bootstrap'
import { useState } from 'react'
import { FaCheck } from 'react-icons/fa'

export default function Timesheet() {
    const [show, setShow] = useState(false)

    const handleClose = () => {
        setShow(false)
    }
    const handleShow = (data) => {
        setShow(true)
    }

    return(
        <div>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>Weekly Timesheet</Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col'>
                            <p>Week start: 11/09/2023</p>
                            <p>Regular Hours: 9 hours</p>
                            <p>Department: Production</p>
                        </div>
                        <div className='col'>
                            <p>Employee: John Doe</p>
                            <p>Supervisor: John Doe</p>
                            <p>Designation: Production Manager</p>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Days</th>
                                    <th>Sign In</th>
                                    <th>Sign Out</th>
                                    <th>Overtime Hours</th>
                                    <th>Casual/Sick Leave</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Monday</td>
                                    <td>8:00</td>
                                    <td>5:00</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>
                                <tr>
                                    <td>Tuesday</td>
                                    <td>8:00</td>
                                    <td>5:00</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>
                                <tr>
                                    <td>Wednesday</td>
                                    <td>8:00</td>
                                    <td>5:00</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>
                                <tr>
                                    <td>Thursday</td>
                                    <td>8:00</td>
                                    <td>5:00</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>
                                <tr>
                                    <td>Friday</td>
                                    <td>8:00</td>
                                    <td>5:00</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>
                                <tr>
                                    <td>Saturday</td>
                                    <td>8:00</td>
                                    <td>5:00</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>
                                <tr>
                                    <td>Sunday</td>
                                    <td>8:00</td>
                                    <td>5:00</td>
                                    <td>0</td>
                                    <td>0</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-success'>Approve</button>
                    <button className='btn btn-danger'>Decline</button>
                </Modal.Footer>
            </Modal>
            <div>
                <div className='text-center bg-light rounded px-3 pt-3 pb-2'>
                    <h2 className="fw-bold">New In</h2>
                </div>
                <div className="table-responsive small mt-4 rounded">
                    <table className="table text-nowrap table-light">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Department</th>
                                <th scope="col">Designation</th>
                                <th scope="col">Date Received</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1,007</td>
                                <td>John Doe</td>
                                <td>Production</td>
                                <td>Production Manager</td>
                                <td>24/09/2023</td>
                                <td><button onClick={() => handleShow()} className="btn btn-success py-1 px-4">View</button></td>
                            </tr>
                            <tr>
                                <td>1,007</td>
                                <td>John Doe</td>
                                <td>Production</td>
                                <td>Production Manager</td>
                                <td>24/09/2023</td>
                                <td><button className="btn btn-success py-1 px-4">View</button></td>
                            </tr>
                            <tr>
                                <td>1,007</td>
                                <td>John Doe</td>
                                <td>Production</td>
                                <td>Production Manager</td>
                                <td>24/09/2023</td>
                                <td><button className="btn btn-success py-1 px-4">View</button></td>
                            </tr>
                            <tr>
                                <td>1,007</td>
                                <td>John Doe</td>
                                <td>Production</td>
                                <td>Production Manager</td>
                                <td>24/09/2023</td>
                                <td><button className="btn btn-success py-1 px-4">View</button></td>
                            </tr>
                            <tr>
                                <td>1,007</td>
                                <td>John Doe</td>
                                <td>Production</td>
                                <td>Production Manager</td>
                                <td>24/09/2023</td>
                                <td><button className="btn btn-success py-1 px-4">View</button></td>
                            </tr>
                            <tr>
                                <td>1,007</td>
                                <td>John Doe</td>
                                <td>Production</td>
                                <td>Production Manager</td>
                                <td>24/09/2023</td>
                                <td><button className="btn btn-success py-1 px-4">View</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <div className='text-center mt-4 bg-light rounded px-3 pt-3 pb-2'>
                    <h2 className="fw-bold">Approved</h2>
                </div>
                <div className="table-responsive small rounded mt-4">
                    <table className="table table-light">
                    <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Department</th>
                                <th scope="col">Designation</th>
                                <th scope="col">Date Received</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1,007</td>
                                <td>John Doe</td>
                                <td>Production</td>
                                <td>Production Manager</td>
                                <td>24/09/2023</td>
                                <td><FaCheck /> Approved</td>
                            </tr>
                            <tr>
                                <td>1,007</td>
                                <td>John Doe</td>
                                <td>Production</td>
                                <td>Production Manager</td>
                                <td>24/09/2023</td>
                                <td><FaCheck /> Approved</td>
                            </tr>
                            <tr>
                                <td>1,007</td>
                                <td>John Doe</td>
                                <td>Production</td>
                                <td>Production Manager</td>
                                <td>24/09/2023</td>
                                <td><FaCheck /> Approved</td>
                            </tr>
                            <tr>
                                <td>1,007</td>
                                <td>John Doe</td>
                                <td>Production</td>
                                <td>Production Manager</td>
                                <td>24/09/2023</td>
                                <td><FaCheck /> Approved</td>
                            </tr>
                            <tr>
                                <td>1,007</td>
                                <td>John Doe</td>
                                <td>Production</td>
                                <td>Production Manager</td>
                                <td>24/09/2023</td>
                                <td><FaCheck /> Approved</td>
                            </tr>
                            <tr>
                                <td>1,007</td>
                                <td>John Doe</td>
                                <td>Production</td>
                                <td>Production Manager</td>
                                <td>24/09/2023</td>
                                <td><FaCheck /> Approved</td>
                            </tr>
                            <tr>
                                <td>1,007</td>
                                <td>John Doe</td>
                                <td>Production</td>
                                <td>Production Manager</td>
                                <td>24/09/2023</td>
                                <td><FaCheck /> Approved</td>
                            </tr>
                            <tr>
                                <td>1,007</td>
                                <td>John Doe</td>
                                <td>Production</td>
                                <td>Production Manager</td>
                                <td>24/09/2023</td>
                                <td><FaCheck /> Approved</td>
                            </tr>
                            <tr>
                                <td>1,007</td>
                                <td>John Doe</td>
                                <td>Production</td>
                                <td>Production Manager</td>
                                <td>24/09/2023</td>
                                <td><FaCheck /> Approved</td>
                            </tr>
                            <tr>
                                <td>1,007</td>
                                <td>John Doe</td>
                                <td>Production</td>
                                <td>Production Manager</td>
                                <td>24/09/2023</td>
                                <td><FaCheck /> Approved</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}