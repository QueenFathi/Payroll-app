import { FaCalendarAlt } from 'react-icons/fa'

function Card({bigtext, smalltext, color}) {
    return(
        <div className={`card me-2 rounded text-center py-4 text-bg-${color}`}>
            <h1>{bigtext}</h1>
            <p>{smalltext}</p>
        </div>
    )
}

export default function Overview() {
    return(
        <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                    <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                </div>
                <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1">
                    <FaCalendarAlt /> This Month
                </button>
                </div>
            </div>
            <div className='container-lg'>
                <div className='row card-group'>
                    <Card bigtext={'30'} smalltext={'Total Staffs'} color={'primary'} />
                    <Card bigtext={'29'} smalltext={'Active Staffs'} color={'dark'} />
                    <Card bigtext={'1,450,000'} smalltext={'Gross Pay for previous month'} color={'success'} />
                    <Card bigtext={'1,080,000'} smalltext={'Net Pay for previous Month'} color={'danger'} />
                </div>
            </div>
        </div>
    )
}