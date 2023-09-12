export default function Payslip() {
    return(
        <div>
            <div className='header my-5'>
                <div className='text-center pb-4'>
                    <h3>Company Name</h3>
                    <p>No 21, Ladoke Akintola Street, New Bodija, Ibadan, Oyo State</p>
                    <h5>Payslip for the period of September 2023</h5>
                </div>
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
                                        <td>Pay Date</td>
                                        <td> 29/9/2023</td>
                                    </tr>
                                    <tr>
                                        <td>Account No</td>
                                        <td>1234567890</td>
                                    </tr>
                                    <tr>
                                        <td>Earned Leave</td>
                                        <td>0</td>
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
                                        <td>Days Worked</td>
                                        <td>22</td>
                                    </tr>
                                    <tr>
                                        <td>Absence</td>
                                        <td>0</td>
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

            <div className='calculations'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className="table-responsive large">
                            <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Earnings</th>
                                    <th scope="col">Amount</th>
                                </tr>
                            </thead>
                                <tbody>
                                    <tr>
                                        <td>Basic Salary</td>
                                        <td>50,000</td>
                                    </tr>
                                    <tr>
                                        <td>Transport Allowance</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Health and Safety Allowance</td>
                                        <td>10,000</td>
                                    </tr>
                                    <tr>
                                        <td>Children/Education Allowance</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Overtime Allowance</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Bonuses & Incentives</td>
                                        <td>2,000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="table-responsive large">
                            <table className="table"><thead>
                                <tr>
                                    <th scope="col">Deductions</th>
                                    <th scope="col">Amount</th>
                                </tr>
                            </thead>
                                <tbody>
                                    <tr>
                                        <td>PAYE tax</td>
                                        <td>10,150</td>
                                    </tr>
                                    <tr>
                                        <td>Loans</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Salary Advance</td>
                                        <td>22,000</td>
                                    </tr>
                                    <tr>
                                        <td>Absence/Lateness</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>Pension Savings</td>
                                        <td>5,000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className='total'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className="table-responsive large">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Total Earnings</th>
                                        <th className='fs-5'>90,500</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="table-responsive large">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Total Deductions</th>
                                        <th className='fs-5'>20,500</th>
                                    </tr>
                                    <tr>
                                        <th>Net Salary</th>
                                        <th className='fs-4'>30,500</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-4'>
                <button className='d-flex ms-auto me-lg-5 px-4 btn btn-primary'>Print Payslip</button>
            </div>
        </div>
    )
}