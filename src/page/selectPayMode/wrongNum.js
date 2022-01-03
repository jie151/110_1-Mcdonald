import React, { useState } from 'react'
import { Link } from "react-router-dom";
import "./inputCreditCardNum"
import Button from '@material-ui/core/Button';


export default function getCreditCardTF(){
    return(
        <div className ="inputCreditNum" >
        
        <center><h2 className='inputCreditNum_h1' >錯誤訊息 Error!</h2></center><br/>
        
        <center><h2>輸入之信用卡卡號為不正確之號碼，請重新輸入。</h2></center><br/>
        <center><h3>The credit card number is not existd, please enter again.</h3></center><br/>
    
        <Link to="/inputCardNum">
            <center><Button className="enterAgainbt" variant='outlined' color="secondary">重新輸入</Button></center><br/>
        </Link>
    </div>
    );
}