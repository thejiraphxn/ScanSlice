import React, { useRef, useState, useEffect } from 'react';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { Button } from 'react-bootstrap';

const ImageCropper = ({setImageCropped, resetComponent, resetComponentReturn}) => {
  const cropperRef = useRef(null);
  const [image, setImage] = useState(null);
  const [Cropped, setCropped] = useState(null);
  const fileInputRef = useRef(null);
  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
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

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      console.log(cropper.getCroppedCanvas().toDataURL());
      setCropped(cropper.getCroppedCanvas().toDataURL());
      setImageCropped(cropper.getCroppedCanvas().toDataURL());
      SwalShow(true, 'บันทึกภาพแล้ว')
    }
  };

  useEffect(() => {
    if (resetComponent) {
        setCropped(null);
        setImage(null); 
        setImageCropped(null);
        clearFileInput();
        resetComponentReturn();
    }
}, [resetComponent]);

  // const KeepOriginal = () => {
  //   if (fileRaw) {
  //     setImage(URL.createObjectURL(fileRaw));
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       console.log(reader.result)
  //       const dataUrl = reader.result; 
  //       setCropped(dataUrl);
  //       setImageCropped(dataUrl);
  //     };
  //     reader.readAsDataURL(fileRaw);
  //   }
  //   SwalShow(true, 'บันทึกภาพแล้ว')
  // };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result)
        const dataUrl = reader.result; // This is the Base64 string
        setCropped(dataUrl);
        setImageCropped(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {
        image && (
          <div className="row">
            <div className="col-4">
              <img src={Cropped} className='img-fluid img-with-border' alt="" />
            </div>
            <div className="col-8">
                <Cropper
                  className='img-fluid'
                  src={image}
                  // Cropper.js options
                  initialAspectRatio={1}
                  aspectRatio={1}
                  guides={true}
                  ref={cropperRef}
                  viewMode={0}
                  dragMode="move"
                  // crop={onCrop}
                />
            </div>
          </div>
        )
      }
      <label htmlFor="">เลือกไฟล์ภาพ</label>
      <input type="file" accept="image/*" ref={fileInputRef} className='form-control mb-2' onChange={onFileChange} />
      {
        image && (
          <div className="row">
            {/* <div className="col-6">
              <button className='btn btn-secondary col-12 mt-2 mb-3' onClick={KeepOriginal}>Keep Original</button>
            </div> */}
            <div className="col-12">
              <button className='btn btn-secondary col-12 mt-2 mb-3' onClick={onCrop}>Crop</button>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default ImageCropper;
