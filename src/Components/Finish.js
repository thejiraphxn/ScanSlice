import React, { useEffect } from 'react'

function Finish() {
  useEffect(() => {
    localStorage.removeItem('SessionKey');
    localStorage.removeItem('TableKey');
    localStorage.removeItem('TableNumber');
  }, [])
  
  return (
    <>
        <section className="py-3 py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
        <div className="container">
            <div className="row">
            <div className="col-12">
                <div className="text-center">
                <h2 className="d-flex justify-content-center align-items-center gap-2 mb-4">
                    <span className="display-1 fw-bold smktitle">Thank you !</span>
                </h2>
                <h3 className="h2 mb-2 smktitle">ชำระเงินเรียบร้อยแล้ว</h3>
                </div>
            </div>
            </div>
        </div>
        </section>
    </>
  )
}

export default Finish