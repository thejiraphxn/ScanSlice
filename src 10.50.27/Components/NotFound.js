import React from 'react'

function NotFound() {
  return (
    <>
        <section className="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
        <div className="container">
            <div className="row">
            <div className="col-12">
                <div className="text-center">
                <h2 className="d-flex justify-content-center align-items-center gap-2 mb-4">
                    <span className="display-1 fw-bold smktitle">4</span>
                    <i className="bi bi-exclamation-circle-fill text-danger display-4 smktitle"></i>
                    <span className="display-1 fw-bold bsb-flip-h smktitle">4</span>
                </h2>
                <h3 className="h2 mb-2 smktitle">ไม่มีเพจที่คุณร้องขอ</h3>
                </div>
            </div>
            </div>
        </div>
        </section>
    </>
  )
}

export default NotFound