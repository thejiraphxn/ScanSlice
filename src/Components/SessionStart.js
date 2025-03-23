import React, {useState, useEffect} from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios';
import {useLocation, useNavigate, useParams, useSearchParams, Link} from "react-router-dom";



export default function SessionStart() {
    const {SessionID} = useParams();
    const navigate = useNavigate();


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
                    navigate(`/UserOrder/${SessionID}`);
                } else{
                    navigate(`/NotFound`);
                }
            console.log(res);
        } catch (err) {
            console.error(err);
        }
      };

    useEffect(() => {
        SessionCheck();

       
    
    }, [])
    


    return (
        <>
        </>
    )
    }
