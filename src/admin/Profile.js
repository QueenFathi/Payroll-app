import img from '../img.jpeg'
import { FaEye } from "react-icons/fa"

export default function Profile() {
    return(
        <div className='container-lg my-4'>
            <h5>Account Information</h5>
            <hr></hr>
            <div className='row d-flexflex align-items-center'>
                    <div className='col-5 col-md-3 col-lg-2'>
                        <img className='rounded-circle border-dark w-100' src={img} alt='profilepic' />
                    </div>
                    <div className='col-7 col-md-9 col-lg-10'>
                        <button className='btn btn-outline-dark me-3'>Change</button>
                        <button className='btn btn-secondary'>Remove</button>
                    </div>
            </div>
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
                <p>Password: **********
                <button className='btn'><FaEye /></button></p>
                <div><button className='btn btn-primary'>Change</button></div>
            </div>
        </div>
    )
}