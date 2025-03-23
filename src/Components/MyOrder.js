import React, {useState, useEffect} from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios';
import {useLocation, useNavigate, useParams, useSearchParams, Link} from "react-router-dom";
import ProgressBar from './ProgressBar';


export default function MyOrder() {
    const {SessionID} = useParams();
    const [AllOrder, setAllOrder] = useState([]);
    const [Clicked, setClicked] = useState(false);
    const [InOrderLists, setInOrderLists] = useState({
        OrderKey: '',
        OrderInfo: {},
        Lists: []
    });
    const [UserView, setUserView] = useState('AllOrder');

    const RequestMyOrder = async () => {
        try {
          const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/MyOrder/${SessionID}`, {
                headers: {
                    'Ngrok-Skip-Browser-Warning': 'true'
                }
            });
                if(res.data.Status == true){
                    setAllOrder(res.data.Results);
                } 
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    };

    const RequestShowInOrder = async (OrderKey) => {
        setUserView('InOrder');
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/InOrderShow/${OrderKey}`, {
                headers: {
                    'Ngrok-Skip-Browser-Warning': 'true'
                }
            });
                if(res.data.Status == true){
                    setInOrderLists(res.data.Results);
                } 
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        RequestMyOrder();
        setInterval(() => {
            RequestMyOrder();
        }, 30000);
        if(Clicked){
            RequestMyOrder();
            setClicked(false);
        }
    }, [Clicked])

    return (
        <>
            {
                UserView == 'AllOrder' ? (
                    <div className="row" onClick={() => setClicked(true)}>
                        <h5 className='mt-3 white-color'>เรียงลำดับจากออเดอร์ล่าสุดขึ้นก่อน</h5>
                        {
                            AllOrder.length > 0 && AllOrder.map((list, i) => (
                                <div className="col-12">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <ProgressBar States={list.o_states}/>
                                            <h5 className="card-title">
                                                #{list.o_order_key}
                                            </h5>
                                            <h6 className="text-success">
                                                ฿{parseFloat(list.o_total).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </h6>
                                            <Button onClick={() => RequestShowInOrder(list.o_order_key)} className="col-12 btn btn-secondary">
                                                ดูรายละเอียดเพิ่มเติม
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : UserView == 'InOrder' ? (
                    <div className="row">
                        <h5 className='mt-3 white-color'>รายการอาหารจากออเดอร์ </h5>
                        <div className="col-12 mt-3">
                            <Button onClick={() => setUserView('AllOrder')} size='lg' className="col-12 btn btn-light">
                                กลับ
                            </Button>
                        </div>
                        <div className="col-12">
                            <div className="card card-body">
                                <div className="row">
                                    <div className="col-12">
                                        <h5 className="card-title text-secondary">
                                            No. #{InOrderLists.OrderInfo.o_order_key}
                                        </h5>

                                        <hr />
                                        <p className="card-title text-success">
                                            รวมเป็นเงิน {' '}
                                                {parseFloat(InOrderLists.OrderInfo.o_total-(InOrderLists.OrderInfo.o_total*0.07)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            {' '} บาท
                                        </p>
                                        <p className="card-title text-success">
                                            ภาษีมูลค่าเพิ่ม {' '}
                                                {parseFloat(InOrderLists.OrderInfo.o_total*0.07).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            {' '} บาท
                                        </p>
                                        <p className="card-title text-success">
                                            ยอดรวมทั้งหมด {' '}
                                                {parseFloat(InOrderLists.OrderInfo.o_total).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            {' '} บาท
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            {
                                InOrderLists.Lists.length > 0 && InOrderLists.Lists.map((list, i) => (
                                    <div className="row" key={i}>
                                        <div className="col-12">
                                            <div className="card card-body">
                                                <div className="row">
                                                    <div className="col-4">
                                                        <img src={`${list.p_image}`} alt="" className="img-fluid img-with-border" />
                                                    </div>
                                                    <div className="col-8">
                                                        <h3 className="text-start">
                                                            {list.p_name}
                                                        </h3>
                                                        <h5 className="text-secondary">
                                                            ฿{parseFloat(list.od_price).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                            {' '} x{list.od_quantity}
                                                        </h5>
                                                        <h5 className="text-success">
                                                            ฿{parseFloat(list.od_subtotal).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            
                        </div>
                    </div>
                ) : null
            }
        </>
    )
}
