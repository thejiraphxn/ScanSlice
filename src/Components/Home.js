import React from 'react'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import YouTube from "react-youtube";



export default function Home() {
  return (
    <>
        <div className="bg-res2 pb-5 vh-full" style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/Background/bg.jpeg)`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top center',
            backgroundAttachment: 'fixed'
        }} >
            <div className="container-fluid pt-3">
                <div className="row">
                    <div className="col"></div>
                    <div className="col-md-6 pt-3">
                        <h1 className='text-center title mb-5'>
                            ScanSlice<br/>
                            <span className='h3 text-white'>The Pizza Homemade</span>
                        </h1>
                        <div className="row">
                            <div className="row">
                                {/* <iframe className="embed-responsive-item" id="ytplayer" type="text/html" width="640" height="360" src="https://www.youtube.com/embed/wX8foM1z7S0?&autoplay=1&loop=1&rel=0&showinfo=0&color=white" frameborder="0" allowfullscreen></iframe> */}
                                <div style={{backgroundColor: "white", paddingTop: "11rem", paddingBottom: "11rem", borderRadius: "1.5rem"}} className='d-flex justify-content-center'>
                                    Video Preview
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-md-6">
                                    <Link className="col-12 btn-lg btn btn-light mb-3" to='/ViewAllOrder'>
                                        <i className="bi bi-zoom-in" /> ดูออเดอร์ทั้งหมด
                                    </Link>
                                </div>
                                <div className="col-md-6">
                                    <Link className="col-12 btn-lg btn btn-light mb-3" to='/QRGenerator'>
                                        <i className="bi bi-qr-code" /> สร้างคิวอาร์โค้ดสั่งอาหาร
                                    </Link>
                                </div>
                                <div className="col-md-6">
                                    <Link className="col-12 btn-lg btn btn-light mb-3" to='/MenuManagement'>
                                        <i className="bi bi-list" /> จัดการรายการอาหาร
                                    </Link>
                                </div>
                                <div className="col-md-6">
                                    <Link className="col-12 btn-lg btn btn-light mb-3" to='/Payment'>
                                        <i className="bi bi-wallet" /> ชำระเงิน
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </div>
    </>
  )
}
