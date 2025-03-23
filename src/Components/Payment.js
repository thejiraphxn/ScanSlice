import React, {useState, useEffect} from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios';
import {useLocation, useNavigate, useParams, useSearchParams, Link} from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import ProgressBar from './ProgressBar';

export default function Payment() {
    const [DisableButtonStates, setDisableButtonStates] = useState(false);
    const [AllCustomerInSession, setAllCustomerInSession] = useState([]);
    const MySwal = withReactContent(Swal);
    const [Clicked, setClicked] = useState(false);
    const SwalShow = (status, message) => {
        if(status == true){
            MySwal.fire({
                title: 'สำเร็จ',
                text: message,
                icon: 'success'
            })
        } else{
            MySwal.fire({
                title: 'ไม่สำเร็จ',
                text: message,
                icon: 'error'
            })
        }
    };


    const RequestCustomerInSession = async() => {
        setClicked(true);
        const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/AllCustomerInSession`, {
            headers: {
                'Ngrok-Skip-Browser-Warning': 'true'
              }
        });
            if(res.data.Status == true){
                console.log(res.data)
                setAllCustomerInSession(res.data.Results);
                // SwalShow(true, res.data.Results[0])
                setClicked(false);
                // setButtonDisableState(false);
            } 
    }

    const ChangeStatusSession = async(SessionID) => {
        setDisableButtonStates(true);
        setClicked(true);
        const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/ChangeStatusSession/${SessionID}`, {
            headers: {
                'Ngrok-Skip-Browser-Warning': 'true'
            }
        });
            if(res.data.Status == true){
                SwalShow(true, res.data.Results[0]);
                RequestCustomerInSession();
                setClicked(false);
                setDisableButtonStates(false);
            } 
    }

    useEffect(() => {
        RequestCustomerInSession();
        setInterval(() => {
            RequestCustomerInSession();
        }, 30000);
        // if(Clicked == true){
        //     RequestCustomerInSession();
        //     setClicked(false);
        // }
    }, [])
    

    return (
        <>
            <div className="container-fluid bg-res2 pb-5 vh-full" onClick={() => RequestCustomerInSession()} style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/Background/bg.jpeg)`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top center',
                backgroundAttachment: 'fixed'
            }} >
                <div className="row pt-3">
                    <div className="col"></div>
                    <div className="col-md-6 pt-3">
                        <h1 className='text-center title mb-5'>
                            ScanSlice<br/>
                            <span className='h3 text-white'>The Pizza Homemade</span>
                        </h1>
                        <h2 className='ibm-plex-sans-thai-medium white-color'>
                            จัดการรายการอาหาร
                        </h2>
                        <div className="row">
                            <div className="col-md-12 mb-3 mt-3">
                                <Link className="col-12 btn-lg btn btn-light" to='/Home'>
                                    <i className="bi bi-house-door-fill" /> หน้าแรก
                                </Link>
                            </div>
                            <div className="col-12">
                                {
                                    AllCustomerInSession.length > 0 && AllCustomerInSession.map((List, i) => (
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="card card-body">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <h3 className="text-secondary">
                                                                {List.tb_name}
                                                            </h3>
                                                        </div>
                                                        <div className="col-6">
                                                            <h3 className="text-success text-end">
                                                                ฿{List.cis_table_total}
                                                            </h3>
                                                        </div>
                                                        <div className="col-12">
                                                            <h5 className="text-secondary">
                                                                ออเดอร์ทั้งหมด
                                                            </h5>
                                                            <ul className="list-group">
                                                               {
                                                                    List.OrderOfSession.length > 0 && List.OrderOfSession.map((oList, j) => (
                                                                        <li className="list-group-item" key={j}>
                                                                            <div className="row">
                                                                                <div className="col-12 pt-2">
                                                                                    <ProgressBar States={oList.o_states}/>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row pt-2">
                                                                                <div className="col-8">
                                                                                    <h5 className="text-secondary">
                                                                                        #{oList.o_order_key}
                                                                                    </h5>
                                                                                </div>
                                                                                <div className="col-4" align="right">
                                                                                    <h5 className="text-success">
                                                                                        ฿{oList.o_total}
                                                                                    </h5>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col-12">
                                                                                    {
                                                                                        oList.ItemInOrder.length > 0 && oList.ItemInOrder.map((ItemLists, k) => (
                                                                                            <>
                                                                                                <div className="row mt-3">
                                                                                                    <div className="col-8">
                                                                                                        <p className="text-secondary">
                                                                                                            x{ItemLists.od_quantity} {' '}
                                                                                                            {ItemLists.od_name}
                                                                                                        </p>
                                                                                                    </div>
                                                                                                    <div className="col-4" align="right">
                                                                                                        <p className="text-success">
                                                                                                           ฿{ItemLists.od_price}
                                                                                                        </p>
                                                                                                    </div>
                                                                                                    <div className="col-12">
                                                                                                        <hr className='mb-2' style={{marginTop: '0rem'}}/>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </>
                                                                                        ))
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    ))
                                                               }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                        {
                                                            List.AllStatusFinish == true && List.cis_status == 'in-process' && (
                                                                <div className="row mt-3">
                                                                    <div className="col-12">
                                                                        <Button onClick={() => ChangeStatusSession(List.cis_session_id)} disabled={DisableButtonStates} className="col-12 btn-secondary" size={'lg'}>
                                                                                ชำระเงินออเดอร์นี้
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            List.cis_status == 'finish' && (
                                                                <div className="row mt-3">
                                                                    <div className="col-12">
                                                                        <Button className="col-12 btn-success" size={'lg'}>
                                                                                ชำระเงินแล้ว
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </>
    )
    }
