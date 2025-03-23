import React, {useState, useEffect} from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios';
import {useLocation, useNavigate, useParams, useSearchParams, Link} from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import ProgressBar from './ProgressBar';
// import WebSocket from "ws";



export default function ViewAllOrder() {
    const [AllOrder, setAllOrder] = useState([]);
    const [ButtonDisableState, setButtonDisableState] = useState(false);
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

    const ChangeStates = async (OrderKey, States) => {
        setButtonDisableState(true);
        if(!States && !OrderKey){
            return;
        }

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/OrderStatesChange/${OrderKey}/${States}`, {
                headers: {
                    'Ngrok-Skip-Browser-Warning': 'true'
                }
            });
                if(res.data.Status == true){
                    SwalShow(true, res.data.Results[0])
                    setClicked(true);
                    setButtonDisableState(false);
                } 
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    };

    const RequestAllOrder = async() => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/AllOrder`, {
                headers: {
                    'Ngrok-Skip-Browser-Warning': 'true'
                }
            });
                if(res.data.Status == true){
                    console.log(res.data);
                    setAllOrder(res.data.Results);
                } 
            console.log(res);
        } catch (err) {
            console.error(err);
        }

    }

    useEffect(() => {
        RequestAllOrder();
        setInterval(() => {
            RequestAllOrder();
        }, 30000);
        if(Clicked){
            RequestAllOrder();
            setClicked(false);
        }
    }, [Clicked])
    

    return (

        <>
            <div className="container-fluid bg-res2 pb-5 vh-100" onClick={() => setClicked(true)} style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/Background/bg.jpeg)`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top center',
                backgroundAttachment: 'fixed'
            }} >
                <div className="row pt-3">
                    <div className="col"></div>
                    <div className="col-md-6 pt-3 pb-5">
                        <h1 className='text-center title mb-2'>
                            ScanSlice<br/>
                            <span className='h3 text-white'>The Pizza Homemade</span>
                        </h1>
                        <h3 className='text-center ibm-plex-sans-thai-medium white-color mb-5'>
                            สั่งอาหาร
                        </h3>
                        <Link className="col-12 btn-lg btn btn-light" to='/Home'>
                            <i className="bi bi-house-door-fill" /> หน้าแรก
                        </Link>
                        {
                            AllOrder.length > 0 && AllOrder.map((list, i) => (
                                <div className="row" key={i}>
                                    <div className="col-12">
                                        <div className="card card-body">
                                            <div className="row">
                                                <div className="col-12">
                                                    <ProgressBar States={list.o_states}/>
                                                </div>
                                                <div className="col-10">
                                                    <h3 className="text-secondary">
                                                        รายการอาหารของ : {list.tb_name}{' - '}{`(${list.tb_key})`}
                                                    </h3>
                                                </div>
                                                <div className="col-2" align="right">
                                                    <span className="badge rounded-pill text-bg-success">
                                                        ฿{list.o_total}
                                                    </span>
                                                </div>
                                            </div>
                                            <ul className="list-group">
                                                {
                                                    list.OrderLists.length > 0 && list.OrderLists.map((oList, k) => (
                                                        <li className="list-group-item" key={k}>
                                                            <div className="row">
                                                                <div className="col-6">
                                                                    <h5 className='text-secondary'>
                                                                        {k+1}. {" "}
                                                                        {oList.od_name}
                                                                    </h5>
                                                                </div>
                                                                <div className="col-6" align="right">
                                                                    <h5 className='text-success'>
                                                                        {`(x${oList.od_quantity})`} {' - '}
                                                                        ฿{oList.od_price}
                                                                    </h5>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                            <div className="row mt-3">
                                                <div className="col-12">
                                                {
                                                    list.o_states == 'start' ? (
                                                        <Button className="btn-warning col-12" disabled={ButtonDisableState} size={'lg'} onClick={() => ChangeStates(list.o_order_key, 'process')}>
                                                            รับออเดอร์เดี๋ยวนี้
                                                        </Button>
                                                    ) : list.o_states == 'process' ? (
                                                        <Button className="btn-primary col-12" disabled={ButtonDisableState} size={'lg'} onClick={() => ChangeStates(list.o_order_key, 'finish')}>
                                                            ปรุงอาหารสำเร็จแล้ว
                                                        </Button>
                                                    ) : list.o_states == 'finish' ? (
                                                        <Button className="btn-success col-12" size={'lg'}>
                                                            ออเดอร์สำเร็จแล้ว
                                                        </Button>
                                                    ) : null
                                                }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </>
    )
    }
