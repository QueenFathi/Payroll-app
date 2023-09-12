import { FaEdit } from "react-icons/fa";

export default function Payroll() {
    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${month} ${year}`
    }

    return(
        <div className="payroll">
            <div className="mt-5">
                <h4>{dateBuilder(new Date())} Payroll</h4>
            </div>
            <div className="mt-4 d-flex justify-content-between">   
                <button type="button" className="btn btn-sm btn-outline-secondary">Suspended Employees <span className="badge text-bg-secondary">0</span></button>
                <select className="form-select py-1 border-secondary" style={{width: '150px'}}>
                    <option selected>Filter By</option>
                    <option>Name</option>
                    <option>Basic Salary</option>
                    <option>Net Pay</option>
                </select>
            </div>
            <div className="mytable mt-4 table-responsive">
                <table className="table table-bordered border-dark table-hover text-nowrap">
                    <thead>
                        <tr>
                            <th className='fs-6' scope="col">Names</th>
                            <th className="fs-6 table-info text-center" scope="col" colSpan={5}>Earnings</th>
                            <th className="fs-6 table-success" scope="col">Additions</th>
                            <th className="fs-6 table-danger text-center" scope="col" colSpan={5}>Deductions</th>
                            <th className='fs-6 table-primary' scope="col">NetPay</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='fw-semibold text-secondary'>Name</td>
                            <td className="fw-semibold text-secondary">Basic Salary</td>
                            <td className="fw-semibold text-secondary">Transport Allowance</td>
                            <td className="fw-semibold text-secondary">Health & Safety Allowance</td>
                            <td className="fw-semibold text-secondary">Children/Education Allowance</td>
                            <td className="fw-semibold text-secondary">Overtime</td>
                            <td className="fw-semibold text-secondary">Bonuses/Incentives</td>
                            <td className="fw-semibold text-secondary">PAYE tax</td>
                            <td className="fw-semibold text-secondary">Loans</td>
                            <td className="fw-semibold text-secondary">Salary Advance</td>
                            <td className="fw-semibold text-secondary">Absence/Lateness</td>
                            <td className="fw-semibold text-secondary">Pension Savings</td>
                            <td className='fw-semibold text-secondary'>Total</td>
                        </tr>
                        <tr>
                            <td>John Doe</td>
                            <td>70,000</td>
                            <td>0</td>
                            <td>20,000</td>
                            <td>3,000</td>
                            <td>0</td>
                            <td>2,000</td>
                            <td>3,000</td>
                            <td>0</td>
                            <td>10,000</td>
                            <td>0</td>
                            <td>0</td>
                            <td>89,000</td>
                            <button className='btn editbtn bg-primary text-white py-1'><FaEdit /> edit</button>
                        </tr>
                        <tr>
                            <td>John Doe</td>
                            <td>70,000</td>
                            <td>0</td>
                            <td>20,000</td>
                            <td>3,000</td>
                            <td>0</td>
                            <td>2,000</td>
                            <td>3,000</td>
                            <td>0</td>
                            <td>10,000</td>
                            <td>0</td>
                            <td>0</td>
                            <td>89,000</td>
                            <button className='btn editbtn bg-primary text-white py-1'><FaEdit /> edit</button>
                        </tr>
                        <tr>
                            <td>John Doe</td>
                            <td>70,000</td>
                            <td>0</td>
                            <td>20,000</td>
                            <td>3,000</td>
                            <td>0</td>
                            <td>2,000</td>
                            <td>3,000</td>
                            <td>0</td>
                            <td>10,000</td>
                            <td>0</td>
                            <td>0</td>
                            <td>89,000</td>
                            <button className='btn editbtn bg-primary text-white py-1'><FaEdit /> edit</button>
                        </tr>
                        <tr>
                            <td>John Doe</td>
                            <td>70,000</td>
                            <td>0</td>
                            <td>20,000</td>
                            <td>3,000</td>
                            <td>0</td>
                            <td>2,000</td>
                            <td>3,000</td>
                            <td>0</td>
                            <td>10,000</td>
                            <td>0</td>
                            <td>0</td>
                            <td>89,000</td>
                            <button className='btn editbtn bg-primary text-white py-1'><FaEdit /> edit</button>
                        </tr>
                        <tr className="table-secondary">
                            <td className="text-end">Total Amount</td>
                            <td>70,000</td>
                            <td>0</td>
                            <td>20,000</td>
                            <td>3,000</td>
                            <td>0</td>
                            <td>2,000</td>
                            <td>3,000</td>
                            <td>0</td>
                            <td>10,000</td>
                            <td>0</td>
                            <td>0</td>
                            <td>89,000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='my-4'>
                <button className='d-flex ms-auto me-0 px-4 fs-5 btn btn-primary'>Submit Payroll</button>
            </div>
        </div>
    )
}