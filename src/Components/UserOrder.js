import React, {useState, useEffect} from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios';
import {useLocation, useNavigate, useParams, useSearchParams, Link} from "react-router-dom";
import ProductShow from './ProductShow';
import MyOrder from './MyOrder';
import MyCart from './MyCart';
import Finish from './Finish';



export default function SessionStart() {
    const {SessionID} = useParams();
    const navigate = useNavigate();
    const [PageState, setPageState] = useState('Menu');
    const [UnSession, setUnSession] = useState(false);




    const SessionCheck = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_SERVER}/SessionAuth/${SessionID}`, {
                headers: {
                    'Ngrok-Skip-Browser-Warning': 'true'
                }
            });
                if(res.data.Status == true){
                    localStorage.setItem('SessionKey', res.data.Results.cis_session_id);
                    localStorage.setItem('TableKey', res.data.Results.cis_table_key);
                    localStorage.setItem('TableNumber', res.data.Results.tb_name);
                } else{
                    setUnSession(true);
                }
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    };

    

    useEffect(() => {
        SessionCheck();

        const handleEvent = (event) => {
            SessionCheck();
        };
    
        const events = ['click', 'keydown'];
        events.forEach((eventType) =>
            document.addEventListener(eventType, handleEvent)
        );
    
        // Cleanup event listeners on unmount
        return () => {
            events.forEach((eventType) =>
                document.removeEventListener(eventType, handleEvent)
            );
        };
    
    }, [])
    


    return (
        <>
        {
            UnSession == false ? (
                <div className="container-fluid bg-res2 pb-5 vh-120" style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/assets/Background/bg.jpeg)`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top center',
                    backgroundAttachment: 'fixed',
                    backgroundSize: 'cover',
                    minHeight: '100vh',
                }} >
                    <div className="row pt-3 pb-5">
                        <div className="col"></div>
                        <div className="col-md-6 pt-3">
                            <h1 className='text-center title mb-2'>
                                ScanSlice<br/>
                                <span className='h3 text-white'>The Pizza Homemade</span>
                            </h1>
                            <h3 className='text-center ibm-plex-sans-thai-medium white-color mb-5'>
                                สั่งอาหาร
                            </h3>
                            <div className="row mt-3">
                                <div className="col-10">
                                    <h3 className="ibm-plex-sans-thai-medium white-color">
                                        {localStorage.getItem('TableNumber')} ({localStorage.getItem('TableKey')})
                                    </h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <Button size="lg" onClick={() => setPageState('Menu')} className={`col-12 btn-light ${PageState == "Menu" ? "active" : "" }`}>
                                        <i className="bi bi-list responsive-dt" /> 
                                        <div className='responsive-mb'>
                                            <i className="bi bi-list" /> รายการอาหาร
                                        </div>
                                    </Button>
                                </div>
                                <div className="col-4">
                                    <Button size="lg" onClick={() => setPageState('AllOrder')} className={`col-12 btn-light ${PageState == "AllOrder" ? "active" : "" }`}>
                                        <i className="bi bi-file-earmark-text responsive-dt" />
                                        <div className='responsive-mb'>
                                            <i className="bi bi-file-earmark-text" /> ออเดอร์ทั้งหมด
                                        </div>
                                    </Button>
                                </div>
                                <div className="col-4">
                                    <Button size="lg" onClick={() => setPageState('Cart')} className={`col-12 btn-light ${PageState == "Cart" ? "active" : "" }`}>
                                        <i className="bi bi-cart-plus responsive-dt" />
                                        <div className='responsive-mb'>
                                            <i className="bi bi-cart-plus" /> ตะกร้าสินค้า
                                        </div>
                                    </Button>
                                </div>
                            </div>

                            {
                                PageState == 'Menu' ? (
                                    <ProductShow />
                                ) : PageState == 'AllOrder' ? (
                                    <MyOrder />
                                ) : PageState == 'Cart' ? (
                                    <MyCart MovePage={() => setPageState('AllOrder')} />
                                ) : null
                                
                            }
                            
                        </div>
                        <div className="col"></div>
                    </div>
                </div>
                ) : (
                    <Finish/>
                )
        }
        </>
    )
    }
