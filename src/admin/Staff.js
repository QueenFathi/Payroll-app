import { FaPlus, FaSearch, FaFilter, FaShare, FaDownload } from 'react-icons/fa'
import{ staffdata } from '../api'
import { Modal } from 'react-bootstrap'
import { useState } from 'react'

export default function Staff() {
    const [show, setShow] = useState(false)
    const [modalData, setModalData] = useState(null)

    const handleClose = () => {
        setShow(false)
        setModalData(null)
    }
    const handleShow = (data) => {
        setShow(true)
        setModalData(data)
    }

    const staffDataElements = staffdata.map(data => (
        <tr key={data.id} className='text-nowrap'>
            <td><input type='checkbox' id='k'/></td>
            <td>{data.id}</td>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.department}</td>
            <td>{data.designation}</td>
            <td><button onClick={() => handleShow(data)} className='btn'>View details</button></td>
            <td><button className='btn btn-primary py-1'>Delete Staff</button></td>
        </tr>
    ))

    return(
        <div className='mt-3 staff'>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>Staff Details</Modal.Header>
                <Modal.Body>
                    <p>Name: {modalData?.name}</p>
                    <p>Email Adress: {modalData?.email}</p>
                    <p>Department: {modalData?.department}</p>
                    <p>Designation: {modalData?.designation}</p>
                    <p>Contact Adress: {modalData?.email}</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-primary' onClick={handleClose}>Close</button>
                </Modal.Footer>
            </Modal>
            <div className='py-3 px-4'>
                <div className='d-flex'>
                    <h4 className='me-auto'>Employee Information</h4>
                    <button className='btn btn-outline-secondary text-dark rounded-circle me-2'><FaPlus /></button>
                    <button className='btn me-1 rounded-circle' type="button" data-bs-toggle="collapse" data-bs-target="#navbarSearch" aria-controls="navbarSearch" aria-expanded="false" aria-label="Toggle search"><FaSearch /></button>
                    <button className='btn me-1 rounded-circle'><FaFilter /></button>
                    <button className='btn me-1 rounded-circle'><FaShare /></button>
                    <button className='btn rounded-circle'><FaDownload /></button>
                </div>
                <div id="navbarSearch" class="navbar-search mt-2 w-100 collapse">
                    <input class="form-control w-100 border-secondary" type="text" placeholder="Search" aria-label="Search" />
                </div>
            </div>
            <div class="mytable table-responsive small">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th scope="col">id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email Adress</th>
                            <th scope="col">Department</th>
                            <th scope="col">Designation</th>
                            <th scope="col">Action</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffDataElements}
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}