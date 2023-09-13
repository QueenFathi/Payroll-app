import { useState } from 'react'
import img from '../img.jpeg'
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Modal } from 'react-bootstrap'

export default function Profile() {
    const [passwordShow, setPasswordShow] = useState(false)
    const [passwordChangeShow, setPasswordChangeShow] = useState(false)
    const [passwordConfirmChangeShow, setPasswordConfirmChangeShow] = useState(false)
    const [passwordChangeModal, setPasswordChangeModal] = useState(false)
    const [avatarChangeModal, setAvatarChangeModal] = useState(false)

    const handlePasswordShow = () => setPasswordShow(!passwordShow)
    const handlePasswordChangeShow = (e) => {
        e.preventDefault()
        setPasswordChangeShow(!passwordChangeShow)
    }
    const handlePasswordConfirmChangeShow = (e) => {
        e.preventDefault()
        setPasswordConfirmChangeShow(!passwordConfirmChangeShow)
    }
    
    const handleAvatarChangeModalShow = () => setAvatarChangeModal(true)
    const handleAvatarChangeModalClose =() => setAvatarChangeModal(false)
    const handlePasswordChangeModalShow = () => setPasswordChangeModal(true)
    const handlepasswordChangeModalClose =() => setPasswordChangeModal(false)
    return(
        <div className='container-lg my-4'>
            <h5>Account Information</h5>
            <hr></hr>
            <div className='row d-flexflex align-items-center'>
                    <div className='col-5 col-md-3 col-lg-2'>
                        <img className='rounded-circle border-dark w-100' src={img} alt='profilepic' />
                    </div>
                    <div className='col-7 col-md-9 col-lg-10'>
                        <button className='btn btn-outline-dark me-3' onClick={handleAvatarChangeModalShow}>Change</button>
                        <button className='btn btn-secondary'>Remove</button>
                    </div>
            </div>
            <Modal centered show={avatarChangeModal} onHide={handleAvatarChangeModalClose}>
                <Modal.Header closeButton>Change Profile Pic</Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-4">
                            <input
                                type="file"
                                className="form-control"
                                required
                            />
                        </div>
                        <button className="btn btn-primary d-flex justify-self-end ms-auto me-1">Change</button>
                    </form>
                </Modal.Body>
            </Modal>
            <hr></hr>
            <div>
                <h5>Personal Information</h5>
                <div className='row'>
                    <div className='col-sm-6'>
                        <div className="table-responsive small">
                            <table className="table table-borderless table-sm">
                                <tbody>
                                    <tr>
                                        <td>Name</td>
                                        <td>John Doe</td>
                                    </tr>
                                    <tr>
                                        <td>Department</td>
                                        <td>Production</td>
                                    </tr>
                                    <tr>
                                        <td>Email Adress</td>
                                        <td>johndoe@gmail.com</td>
                                    </tr>
                                    <tr>
                                        <td>Account No</td>
                                        <td>1234567890</td>
                                    </tr>
                                    <tr>
                                        <td>Date Joined</td>
                                        <td>03/03/2023</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='col-sm-6'>
                        <div className="table-responsive small">
                            <table className="table table-borderless table-sm">
                                <tbody>
                                    <tr>
                                        <td>Employee Id</td>
                                        <td>1015</td>
                                    </tr>
                                    <tr>
                                        <td>Designation</td>
                                        <td>Production Manager</td>
                                    </tr>
                                    <tr>
                                        <td>Employment Type</td>
                                        <td>Full Time</td>
                                    </tr>
                                    <tr>
                                        <td>Basic Salary</td>
                                        <td>#22,000</td>
                                    </tr>
                                    <tr>
                                        <td>Casual Leave</td>
                                        <td>0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <hr></hr>
            <h5>Password</h5>
            <div>
                <p>Password: {passwordShow ? "password" : '**********'}
                <button className='btn' onClick={handlePasswordShow}>{passwordShow ? <FaEyeSlash /> : <FaEye />}</button></p>
                <div><button className='btn btn-primary' onClick={handlePasswordChangeModalShow}>Change</button></div>
            </div>
            <Modal centered show={passwordChangeModal} onHide={handlepasswordChangeModalClose}>
                <Modal.Header closeButton>Change Password</Modal.Header>
                <Modal.Body>
                <form>
                    <div className="form-floating mb-2">
                        <input
                            type={passwordChangeShow ? "text" : "password"}
                            className="form-control position-relative rounded-0 border-0 border-bottom"
                            id="password"
                            name="password"
                            required
                        />
                        <label for="password">Password</label>
                        <button className='btn position-absolute bottom-0 end-0' style={{zIndex : "2"}} onClick={handlePasswordChangeShow}>{passwordShow ? <FaEyeSlash /> : <FaEye />}</button>
                    </div>
                    <div className="form-floating mb-2">
                        <input
                            type={passwordConfirmChangeShow ? "text" : "password"}
                            className="form-control position-relative rounded-0 border-0 border-bottom"
                            id="confirmpassword"
                            name="confirmpassword"
                            required
                        />
                        <label for="confirmpassword">Confirm Password</label>
                        <button className='btn position-absolute bottom-0 end-0' onClick={handlePasswordConfirmChangeShow}>{passwordShow ? <FaEyeSlash /> : <FaEye />}</button>
                    </div>
                    <button className="btn btn-primary mt-4 d-flex justify-self-end ms-auto me-1">Change</button>
                </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}