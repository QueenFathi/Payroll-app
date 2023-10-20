import { FaCalendarAlt, FaChartLine, FaChartPie, FaMoneyCheck, FaMoneyCheckAlt } from 'react-icons/fa'
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
import { Doughnut } from 'react-chartjs-2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';

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
        <div className='card me-2 rounded text-center border-0 pt-4 pb-2 text-bg-light'>
            <div className='row ps-4'>
                <div className={`col-3 h2 rounded-circle text-bg-${color} d-flex align-items-center justify-content-center`} style={{width: '50px', height: '50px'}}>
                    {icon}
                </div>
                <div className='col-9'>
                    <h3>{bigtext}</h3>
                    <p><small>{smalltext}</small></p>
                </div>
            </div>
        </div>
    )
}

export default function Dashboard() {
    const [date, setDate] = useState(new Date());

    const ChartOptions = {
        responsive: true,
    };

    const ChartData = {
        datasets: [
          {
            label: 'Leaves',
            data: [5, 15],
            backgroundColor: [
              'rgba(25, 135, 84, 0.9)',
              'rgba(25, 135, 84, 0.7)',
            ],
            borderColor: [
              'rgba(25, 135, 84, 1)',
              'rgba(25, 135, 84, 0.8)',
            ],
            borderWidth: 1,
          },
        ],
    };

    var currentTime = new Date();
    var currentHour = currentTime.getHours();
    var currentMinute = currentTime.getMinutes().toString().padStart(2, "0");

    let period = "AM";

    if (currentHour >= 12) {
    period = "PM";
    if (currentHour > 12) {
        currentHour -= 12;
    }
    }
    const time = `${currentHour}:${currentMinute} ${period}`;


    return(
        <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center bg-light rounded px-3 pt-3 pb-2">
                <h1 className="h2">Dashboard</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1" >
                    <FaCalendarAlt /> <DatePicker closeOnScroll={true} selected={date} onChange={(date)=> setDate(date)} className='border-0 bg-light rounded' />
                </button>
                </div>
            </div>
            <div className='container-lg mt-4'>
                <div className='row card-group'>
                    <Card bigtext={'150'} smalltext={'Total Hours Worked'} color={'success'} icon={<FaChartLine />} />
                    <Card bigtext={'0'} smalltext={'Used Leave'} color={'success'} icon={<FaChartPie />} />
                    <Card bigtext={'150,000'} smalltext={'Gross Pay for previous month'} color={'success'} icon={<FaMoneyCheck />} />
                    <Card bigtext={'180,000'} smalltext={'Net Pay for previous Month'} color={'success'} icon={<FaMoneyCheckAlt />} />
                </div>
            </div>
            <div className='container-lg mt-4'>
                <div className='row'>
                    <div className='px-0 col-md-6'>
                        <div className='bg-light rounded pt-2 pb-4 px-2 me-2 mb-2'>
                            <h5>Annual Leaves</h5>
                            <div className='row card-group'>
                                <div className='col-3'>
                                    <div className='bg-light card border-0'>
                                        <Doughnut options={ChartOptions} data={ChartData} />
                                    </div>
                                </div>
                                <div className='col-3'>
                                    <div className='pt-4 bg-light text-center card border-0'>
                                        <h1 style={{color: 'rgba(25, 135, 84, 1)'}}>5</h1>
                                        <p>Remaining</p>
                                    </div>
                                </div>
                                <div className='col-3'>
                                    <div className='pt-4 bg-light text-center card border-0'>
                                        <h1 style={{color: 'rgba(25, 135, 84, 0.8)'}}>15</h1>
                                        <p>Taken</p>
                                    </div>
                                </div>
                                <div className='col-3'>
                                    <div className='pt-4 bg-light text-center card border-0'>
                                        <h1>20</h1>
                                        <p>Total</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='px-0 col-md-6 bg-light rounded mb-2'>
                        <div className='p-4'>
                            <h5>Check In/Out</h5>
                            <div className='d-flex justify-content-between'>
                                <div className='pt-4'>
                                    <h1>00:00 <small>Hrs</small></h1>
                                    <p>Now is {time}</p>
                                </div>
                                <div className='align-self-center pe-4'>
                                    <button className='btn btn-success rounded-pill px-4 fs-4'>Check In</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-none'>
                Calendar amd To-do list
            </div>
        </div>
    )
}