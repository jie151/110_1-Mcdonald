import React, { useState } from 'react'
import './selectPayMode.css'
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

export default function SelectPayMode(){
    return(
        <>
        <div className="choose">
            <center><h3>請選擇付款方式</h3></center>
            <h2>&nbsp;</h2>
            <center><h3>Please choose a payment method</h3></center>
        </div>
        
        <div>
        <img className="cashimg" alt='Cashing' src="https://cdn-icons-png.flaticon.com/512/2488/2488749.png" />
        </div>
        <div>
        <img className="cardimg" alt='creditCard' src="https://cdn-icons-png.flaticon.com/512/633/633611.png" />
        </div>

        <Link to="/printOrderList">
            <Button type="submit" variant="contained" color="primary" className="payInCashbt">櫃台結帳</Button>
        </Link>
        
        <Link to="/inputCardNum">
            <Button type="submit" variant="contained" color="primary" className="payWithCardbt">信用卡付款</Button>
        </Link>
    </>
    );
}

