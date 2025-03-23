import React, {useState, useEffect} from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios';
import {useLocation, useNavigate, useParams, useSearchParams, Link} from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import ShortText from './Text';


export default function ProductShow() {
    const {SessionID} = useParams();
    const [Menu, setMenu] = useState([]);
    const [ViewMoreDescription, setViewMoreDescription] = useState('');

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

    const RequestMenu = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/AllMenu`, {
                headers: {
                    'Ngrok-Skip-Browser-Warning': 'true'
                }
            });
            if(res.data.Status == true){
                setMenu(res.data.Results);
            } 
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    };

    const AddToCart = async (ProductKey, SessionID) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_SERVER}/AddToCart`,{
                ProductKey: ProductKey,
                SessionID: SessionID
            }, {
                headers: {
                    'Ngrok-Skip-Browser-Warning': 'true'
                }
            });
                if(res.data.Status == true){
                    SwalShow(true, res.data.Results[0]);
                } 
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    };

    

    useEffect(() => {
        RequestMenu();
    
    }, [])
    


  return (
    <>
    {
        Menu.length > 0 ? (
            Menu.map((list, i) => (
                <div className="row" key={i}>
                    <div className="col-12">
                        <div className="card card-body">
                            <div className="row">
                                <div className="col-4">
                                    <img src={list.FoodImage} alt="" className="img-fluid img-with-border" />
                                </div>
                                <div className="col-8">
                                    <div className="row">
                                        <div className="col-9">
                                            <h4 className="text-start">
                                                {list.p_name}<br/>
                                                {
                                                    list.p_product_key == ViewMoreDescription ? (
                                                        <>
                                                            <label className='fs-6 text-secondary'>
                                                                {list.p_description}
                                                            </label>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <label className='fs-6 text-secondary'>
                                                                {ShortText(list.p_description, 25)} 
                                                            </label>
                                                            <label className='fs-6 text-primary cursor-pointer' onClick={() => setViewMoreDescription(list.p_product_key)}>
                                                                เพิ่มเติม
                                                            </label>
                                                        </>
                                                    )
                                                }
                                            </h4>
                                        </div>
                                        <div className="col-3 pe-3" align="right">
                                            <span className="badge rounded-pill text-bg-primary cursor-pointer" onClick={() => AddToCart(list.p_product_key, SessionID)}>
                                                <i className="bi bi-cart-plus" />
                                            </span>
                                        </div>
                                    </div>
                                    <h6 className="text-success">
                                        ฿{parseFloat(list.p_price).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2 })} / ถาด
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
        ) : null
    }
    </>
  )
}
