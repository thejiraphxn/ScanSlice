import React from 'react'

export default function ProgressBar({States}) {
    const OrderProgressPattern = {
        'order': ['0%', '0%', '0%'],
        'start': ['100%', '0%', '0%'],
        'process': ['100%', '100%', '0%'],
        'finish': ['100%', '100%', '100%']
    }

    return (
        <div className="row mb-2">
            <div className="col-4">
                <div className="progress" role="progressbar" aria-label="Example with label">
                    <div className="progress-bar bg-warning text-dark" style={{width: `${OrderProgressPattern[States][0]}`}} >
                        {'รอรับออเดอร์'}
                    </div>
                </div>
            </div>
            <div className="col-4">
                <div className="progress" role="progressbar" aria-label="Example with label">
                    <div className="progress-bar" style={{width: `${OrderProgressPattern[States][1]}`}} >
                        {'กำลังปรุงอาหาร'}
                    </div>
                </div>
            </div>
            <div className="col-4">
                <div className="progress" role="progressbar" aria-label="Example with label">
                    <div className="progress-bar bg-success" style={{width: `${OrderProgressPattern[States][2]}`}} >
                        {'ออเดอร์สำเร็จ'}
                    </div>
                </div>
            </div>
        </div>
    )
}
