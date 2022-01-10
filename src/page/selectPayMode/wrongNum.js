import React, { useState } from 'react'
import { Link } from "react-router-dom";
import "./inputCreditCardNum"
import Button from '@material-ui/core/Button';


export default function WrongNum({language}){
    
    var chinese = true;
    if (language === "English")
    {
        chinese = false;
    }

    return(
        <div className ="inputCreditNum" >
        <center><h2 className='inputCreditNum_h1' >{(chinese)?("錯誤訊息") : ("Error!")} </h2></center><br/>
        
        <center><h2>{(chinese)?("輸入之信用卡卡號為不正確之號碼，請重新輸入。") : ("The credit card number is not existd, please try again.")}</h2></center><br/>
        
    
        <Link to="/inputCardNum">
            <center><Button className="enterAgainbt" variant='outlined' color="secondary">{(chinese)?("請重新輸入"): ("please try again")}</Button></center><br/>
        </Link>
    </div>
    );
}