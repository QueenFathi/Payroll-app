import { FaCalendarAlt } from 'react-icons/fa'

function Card({bigtext, smalltext, color}) {
    return(
        <div className={`card me-2 text-center py-5 text-bg-${color}`}>
            <h1>{bigtext}</h1>
            <p>{smalltext}</p>
        </div>
    )
}

export default function Dashboard() {
    return(
        <div>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Dashboard</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1">
                    <FaCalendarAlt /> This Month
                </button>
                </div>
            </div>
            <div className='container-lg'>
                <div className='row card-group'>
                    <Card bigtext={'150,000'} smalltext={'Gross Pay for previous month'} color={'success'} />
                    <Card bigtext={'180,000'} smalltext={'Net Pay for previous Month'} color={'danger'} />
                </div>
            </div>
        </div>
    )
}