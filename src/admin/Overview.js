import { FaCalendarAlt, FaMoneyCheck, FaMoneyCheckAlt, FaUserCheck, FaUserFriends } from 'react-icons/fa'
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../config/fireConfig';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
  
function Card({bigtext, smalltext, color, icon}) {
    return(
        <div className='card me-2 rounded text-center border-0 py-4 text-bg-light'>
            <div className='row ps-4'>
                <div className={`col-3 h2 rounded-circle text-bg-${color} d-flex align-items-center justify-content-center`} style={{width: '50px', height: '50px'}}>
                    {icon}
                </div>
                <div className='col-9'>
                    <h1>{bigtext}</h1>
                    <p>{smalltext}</p>
                </div>
            </div>
        </div>
    )
}

export default function Overview() {
    const [date, setDate] = useState(new Date());
    const [salaryData, setSalaryData] = useState([]);
    const [staffData, setStaffData] = useState([]);
    const [value, onChange] = useState(new Date());

    useEffect(() => {
        const getData = async () => {
            var salarydata = []
            const querySnapshot = await getDocs(collection(db, "salary"));
            querySnapshot.forEach((doc) => {
                salarydata.push(doc.data())
            });
            setSalaryData(salarydata)
        }
        getData()
    }, [])

    useEffect(() => {
        const getData = async () => {
            var staffdata = []
            const querySnapshot = await getDocs(collection(db, "staffs"));
            querySnapshot.forEach((doc) => {
                staffdata.push(doc.data())
            });
            setStaffData(staffdata)
        }
        getData()
    }, [])

    const salaryChartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Salary for previous months',
          },
        },
    };

    const staffChartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Total Employees',
          },
        },
    };

    const departmentChartOptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Departments',
          },
        },
    }

    var salary = []
    if (salaryData) {
        salary = Object.values(salaryData);
    }
    const labels = salary.map(s => s.month);
    
    const salaryChartData = {
        labels,
        datasets: [
          {
            label: 'Gross Salary',
            data: salary.map(s => s.gross),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Net Salary',
            data: salary.map(s => s.net),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
    };

    let totalEmployees = staffData.length
    let activeEmployees = 0;
    let suspendedEmployees = 0;

    if(staffData) {
        for (const obj of staffData) {
            if (obj.status === true) {
                activeEmployees++;
            } else if (obj.status === false) {
                suspendedEmployees++;
            }
        }
    }

    const staffChartData = {
        labels: ['Active', 'Suspended'],
        datasets: [
          {
            label: 'Employees Data',
            data: [activeEmployees, suspendedEmployees],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
    };

    const departmentCounts = {};

    if(staffData) {for (const obj of staffData) {
    const name = obj.department;
    if (departmentCounts[name]) {
        departmentCounts[name]++;
    } else {
        departmentCounts[name] = 1;
    }
    }}

    const departmentChartData = {
        labels: Object.keys(departmentCounts),
        datasets: [
          {
            label: 'Departments',
            data: Object.values(departmentCounts),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
    };

    const staffDataElements = staffData?.map((data) => (
        <tr key={data.id} className="text-nowrap">
            <td>{data.id}</td>
            <td>{data?.firstName} {data?.lastName}</td>
            <td>{data?.email}</td>
            <td>{data?.department}</td>
            <td>{data?.designation}</td>
            <td>{data.basicSalary}</td>
        </tr>
    ))

    return(
        <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 px-3 mb-3 rounded bg-light">
                <h2 className="h2">Overview</h2>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group me-2">
                        <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                    </div>
                    <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1" >
                        <FaCalendarAlt /> <DatePicker closeOnScroll={true} selected={date} onChange={(date)=> setDate(date)} className='border-0 bg-light rounded' />
                    </button>
                </div>
            </div>
            <div className='container-lg'>
                <div className='row card-group'>
                    <Card bigtext={totalEmployees} smalltext={'Total Employees'} color={'success'} icon={<FaUserFriends />} />
                    <Card bigtext={activeEmployees} smalltext={'Active Employees'} color={'dark'} icon={<FaUserCheck />} />
                    <Card bigtext={'1,450,000'} smalltext={'Gross Pay for previous month'} color={'secondary'} icon={<FaMoneyCheck />} />
                    <Card bigtext={'1,080,000'} smalltext={'Net Pay for previous Month'} color={'danger'} icon={<FaMoneyCheckAlt />} />
                </div>
            </div>
            <div className=''>
                <div className='row'>
                    <div className='col-md-8'>
                        <div className='me-1 bg-light rounded px-2 mt-4'>
                            <Bar options={salaryChartOptions} data={salaryChartData} />
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='ms-1 bg-light rounded p-4 mt-4'>
                            <Doughnut options={staffChartOptions} data={staffChartData} />
                        </div>
                    </div>
                </div>
            </div>
            <div className=''>
                <div className='row'>
                    <div className='col-md-4'>
                        <div className='ms-1 bg-light rounded p-4 mt-4'>
                            <Pie options={departmentChartOptions} data={departmentChartData} />
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <div className='ms-1 bg-light rounded p-4 mt-4'>
                            <h5 className='py-2'>Required Actions</h5>
                            <div>
                                <p className='bg-white p-3 rounded'>Approve 3 employee timesheet</p>
                                <p className='bg-white p-3 rounded'>Approve Vacation for 2 employees</p>
                                <p className='bg-white p-3 rounded'>Approve 2 employee timesheet</p>
                                <p className='bg-white p-3 rounded'>Approve Sick Leave for John Doe</p>
                            </div>
                            <h6 className='text-center'>View All</h6>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <Calendar className='bg-light rounded border-0 mt-4'
                            onChange={onChange}
                            value={value}
                        />
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <div className='row'>
                    <div className='col-md-12 rounded bg-light'>
                        <h4 className='px-2 pt-2 pb-lg-2'>Employee Information</h4>
                        <div className="table-responsive">
                            <table className="table table-borderless table-light">
                                <thead className='border-bottom border-dark'>
                                    <tr>
                                        <th scope='col'>ID</th>
                                        <th scope='col'>Name</th>
                                        <th scope='col'>Email</th>
                                        <th scope='col'>DepartMent</th>
                                        <th scope='col'>Designation</th>
                                        <th scope='col'>Basic Salary</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {staffDataElements}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}