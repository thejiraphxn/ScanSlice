import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import ImageCropper from './ImageCropper';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import ShortText from './Text';


export default function MenuManagement() {
    const [FoodList, setFoodList] = useState({
        FoodName: '',
        FoodCategory: '',
        FoodDescription: '',
        FoodPrice: '',
        FoodImage: ''
    });
    const MySwal = withReactContent(Swal);
    const [DisableButton, setDisableButton] = useState(false);
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
    const [ReRender, setReRender] = useState(false);

    function handleChange(event) {
        
        const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab', '.'];
        const isNumberKey = event.key >= '0' && event.key <= '9';
    
        if (!allowedKeys.includes(event.key) && !isNumberKey) {
            event.preventDefault();
        } 
        
    }

    const onSetCropped = (ImageCropped) => {
        setFoodList((prevData) => ({
            ...prevData,
            FoodImage: ImageCropped,
        }));
        console.log('Image', ImageCropped);
    }

    const InsertNewFoodList = async(e) => {
        e.preventDefault();
        setDisableButton(true);
        console.log(FoodList);
        if(!FoodList.FoodCategory || !FoodList.FoodName || !FoodList.FoodPrice || FoodList <= 0 || !FoodList.FoodImage || FoodList.FoodImage == null){
            SwalShow(false, 'กรุณาตรวจสอบข้อมูลให้ถูกต้อง');
            return;
        } else{
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_SERVER}/InsertNewFoodList`, FoodList, 
                {
                    headers: {
                        'Ngrok-Skip-Browser-Warning': 'true'
                    }
                });
                if(res.data.Status == true){
                    SwalShow(true, res.data.Results[0]);
                    setFoodList({
                        FoodName: '',
                        FoodCategory: '',
                        FoodDescription: '',
                        FoodPrice: '',
                        FoodImage: ''
                    });
                    setDisableButton(false);
                    setReRender(true);
                } else{
                    SwalShow(true, res.data.Results[0]);
                    setDisableButton(false);
                }
                console.log(res);
            } catch (err) {
                console.error(err);
            }
        }
        console.log(FoodList)
    }

    const onChangeFoodList = (e) => {
        const { name, value } = e.target;
        setFoodList((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        console.log(name, value);
    }

    const resetComponentReturnfunc = () => {
        setReRender(false);
    }

    
    return (
        <>
            <div className="container-fluid bg-res2 pb-5 vh-120" style={{
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
                                จัดการรายการอาหาร
                            </h2>

                            <div className="col-md-12 mb-3 mt-3">
                                <Link className="col-12 btn-lg btn btn-light" to='/Home'>
                                    <i className="bi bi-house-door-fill" /> หน้าแรก
                                </Link>
                            </div>

                            <div className="col-12">
                                <div className="card card-body">
                                        <div className="row">
                                            <div className="col-12">
                                                <ImageCropper setImageCropped={onSetCropped} resetComponent={ReRender} resetComponentReturn={resetComponentReturnfunc} />
                                            </div>
                                            <div className="col-md-12">
                                                <label>ชื่ออาหาร</label>
                                                <input type="text" name="FoodName" onChange={onChangeFoodList} value={FoodList.FoodName} className="form-control mb-2" />
                                            </div>
                                            <div className="col-md-6">
                                                <label>ราคาอาหาร / รายการ</label>
                                                <input type="text" name="FoodPrice" onChange={(e) => onChangeFoodList(e)} onKeyDown={(e) => handleChange(e)} value={FoodList.FoodPrice} className="form-control mb-2" />
                                            </div>
                                            <div className="col-md-6">
                                                <label>หมวดหมู่</label>
                                                <select className='form-select' onChange={(e) => onChangeFoodList(e)} value={FoodList.FoodCategory} name="FoodCategory">
                                                    <option value="">โปรดเลือกรายการ</option>
                                                    <option value="Appetizer">อาหารเรียกน้ำย่อย</option>
                                                    <option value="NewYorkPizza">พิซซ่า</option>
                                                    <option value="Pasta">พาสต้า</option>
                                                </select>
                                            </div>
                                            <div className="col-md-12">
                                                <label>รายละเอียด</label>
                                                <textarea name="FoodDescription" value={FoodList.FoodDescription} onChange={onChangeFoodList} className='form-control'/>
                                            </div>
                                            <div className="col-12">
                                                <Button className="btn-secondary col-12 mt-3" disabled={DisableButton} onClick={(e) => {InsertNewFoodList(e)}}>
                                                    เพิ่มรายการอาหาร
                                                </Button>
                                            </div>
                                        </div>
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
