import React, {useState, useEffect} from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios';
import {useLocation, useNavigate, useParams, useSearchParams, Link} from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

export default function MyCart({MovePage}) {
    const {SessionID} = useParams();
    const [InOrderLists, setInOrderLists] = useState({
        OrderInfo: {},
        Lists: []
    });
    const [Clicked, setClicked] = useState(false);
    const MySwal = withReactContent(Swal);
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

    const RequestMyCart = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/ViewCurrentlyCart/${SessionID}`,
                {
                    headers: {
                        'Ngrok-Skip-Browser-Warning': 'true'
                    }
                }
            );
                if(res.data.Status == true){
                    setInOrderLists(res.data.Results);
                } 
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    };

    const OrderNow = async (OrderKey) => {
        MySwal.fire({
            title: 'ต้องการยืนยันออเดอร์ไหม',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'สั่งอาหารเดี๋ยวนี้ !',
            cancelButtonText: 'แก้ไขรายการอาหาร !',
          }).then(async(result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/OrderStatesChange/${OrderKey}/start`, {
                        headers: {
                            'Ngrok-Skip-Browser-Warning': 'true'
                        }
                    });
                        if(res.data.Status == true){
                            SwalShow(true, res.data.Results[0])
                            setClicked(true);
                            MovePage();
                        } 
                    console.log(res);
                } catch (err) {
                    console.error(err);
                }
            } 
          });
    };

    const DeleteItemInCart = async (ProductKey) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/DeleteItemInCart/${ProductKey}`,{
                headers: {
                    'Ngrok-Skip-Browser-Warning': 'true'
                }
            });
                if(res.data.Status == true){
                    SwalShow(true, res.data.Results[0]);
                    setClicked(true);
                } 
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    };

    const onEventDetected = () => {
        setClicked(true);
    }

    useEffect(() => {
        RequestMyCart();
        if(Clicked == true){
            RequestMyCart();
            setClicked(false);
        }
    
    }, [Clicked])

    return (
        <div onClick={onEventDetected}>
            {
                InOrderLists.Lists.length > 0 && InOrderLists.Lists.map((list, i) => (
                    <div className="row" onClick={() => setClicked(true)} key={i}>
                        <div className="col-12">
                            <div className="card card-body">
                                <div className="row">
                                    <div className="col-4">
                                        <img src={list.FoodImage} alt="" className="img-fluid img-with-border" />
                                    </div>
                                    <div className="col-8">
                                        <div className="row">
                                            <div className="col-9">
                                                <h3 className="text-start">
                                                    {list.od_name}
                                                </h3>
                                                <h6 className="text-secondary">
                                                    ฿{parseFloat(list.od_price).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    {' '} x{list.od_quantity}
                                                </h6>
                                                <h6 className="text-success">
                                                    ฿{parseFloat(list.od_subtotal).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </h6>
                                            </div>
                                            <div className="col-3 pe-3" align="right" onClick={() => DeleteItemInCart(list.od_product_key)}>
                                                <span className="badge rounded-pill text-bg-danger cursor-pointer">
                                                    <i className="bi bi-trash" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }

            {
                InOrderLists.Lists.length > 0 && (
                    <div className="row">
                        <div className="col-12">
                            <Button className='btn-light col-12 mt-3' size={'lg'} onClick={() => OrderNow(InOrderLists.OrderInfo.o_order_key)}>
                                สั่งอาหารเดี๋ยวนี้
                            </Button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
