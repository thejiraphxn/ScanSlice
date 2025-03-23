import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {QRCodeCanvas} from 'qrcode.react';
import {QRCodeSVG} from 'qrcode.react';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';




export default function QRGenerator() {
    let location = window.location.href;
    const [QRCodeGenerated, setQRCodeGenerated] = useState('');
    const [AllTable, setAllTable] = useState([]);
    const [ButtonDisable, setButtonDisable] = useState(false);
    const [FRONTEND_URL, setFRONTEND_URL] = useState(process.env.REACT_APP_API_GLOBAL_FRONTEND_URL);

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

    const RequestQRCode = async (TableKey) => {
        setButtonDisable(true);
        if(TableKey > 10 || TableKey < 1){
            setButtonDisable(false);
            return;
        } else{
            try{
                const response = await axios.post(`${process.env.REACT_APP_API_SERVER}/QRCodeGenerator`, {
                    TableKey: TableKey
                },
                {
                    headers: {
                        'Ngrok-Skip-Browser-Warning': 'true'
                      }
                });
                if(response.data.Status == true){
                    setButtonDisable(false);
                    console.log(response.data);
                    setQRCodeGenerated(response.data.Results.cis_session_id);
                    SwalShow(true, 'สร้างแล้ว');
                } 
            } catch(err){
                console.error(err);
            }
        }

    }



    useEffect(() => {
        console.log(location, location.includes('localhost'), FRONTEND_URL, location.split('/')[2]);
        // if(location.includes('localhost')){
        //     setFRONTEND_URL('http://192.168.1.102:3000');
        // } else{
        //     setFRONTEND_URL(`https://${location.split('/')[2]}`);
        // }


        const RequestAllTable = async () => {
            try{
                const response = await axios({
                    url: `${process.env.REACT_APP_API_SERVER}/AllTable`,
                    method: "GET",
                    headers: {
                        'Ngrok-Skip-Browser-Warning': 'true'
                    }
                });
                if(response.data.Status == true){
                    console.log(response.data);
                    setAllTable(response.data.Results);
                } 
            } catch(err){
                console.error(err);
            }
        }
        
        RequestAllTable();


    }, [])
    


    
    return (
        <>
            <div className="container-fluid bg-res2 vh-120 " style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/assets/Background/bg.jpeg)`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top center',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                minHeight: '100vh',
            }} >
                <div className="row pt-3">
                    <div className="col"></div>
                    <div className="col-md-6 pt-3">
                        <h1 className='text-center title mb-5'>
                            ScanSlice<br/>
                            <span className='h3 text-white'>The Pizza Homemade</span>
                        </h1>
                        <div className="row">
                            <h2 className='ibm-plex-sans-thai-medium white-color'>
                                เลือกโต๊ะอาหาร
                            </h2>
                            <div className="col-md-12 mb-3 mt-3">
                                <Link className="col-12 btn-lg btn btn-light" to='/Home'>
                                    <i className="bi bi-house-door-fill" /> หน้าแรก
                                </Link>
                            </div>

                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                        {
                                            QRCodeGenerated ? (
                                                <QRCodeSVG className="rounded img-fluid" width="100%" value={`${FRONTEND_URL}/SessionStart/${QRCodeGenerated}`} />
                                            ) : (
                                                <img src={`${process.env.PUBLIC_URL}/assets/qrbg/white.jpg`} className='img-fluid rounded' />
                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="row pt-3">
                                    {
                                        AllTable.length > 0 ? (
                                            AllTable.map((table, i) => (
                                                <div className="col-6" key={i}>
                                                    <Button key={i} variant="light" disabled={ButtonDisable} className="col-12 mb-4" size="lg" onClick={() => RequestQRCode(table.tb_key)}>
                                                        {table.tb_name}
                                                    </Button>
                                                </div>
                                            ))
                                        ) : null
                                    }
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </>
    )
}
