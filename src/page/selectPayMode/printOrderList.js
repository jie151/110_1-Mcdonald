import React, { useState } from 'react'
import { Link, useLinkClickHandler } from "react-router-dom";
import {Cookies} from "react-cookie";
import "./printOrderList.css"
import Option from './cookieData';
import Button from '@material-ui/core/Button';
import db from '../component/connect';
var da = {
    order_id: "ID",
    place: 'place',
    order_list: [
        {
            f_name: "11111",
            f_customize: { sauce: "this.state.sauceCustomize", lectture: "this.state.lettuceCustomize" },
            d_name: "this.state.drink",
            d_customize: "this.state.drinkCustomize",
            d_price: "this.state.drinkPrice",
            s_name: " this.state.sid",
            s_customize: "this.state.sideCustomize",
            s_price: " this.state.sidePrice",
            a_name: "a_name",
            totalPrice: "this.state.totalPrice",
            category_id: "2"
        },
        {
            f_name: "22222",
            f_customize: { sauce: "this.state.sauceCustomize", lectture: "this.state.lettuceCustomize" },
            d_name: "this.state.drink",
            d_customize: "this.state.drinkCustomize",
            d_price: "this.state.drinkPrice",
            s_name: "this.state.side",
            s_customize: "this.state.sideCustomize",
            s_price: "this.state.sidePrice",
            a_name: "a_name",
            totalPrice: "this.state.totalPrice",
            category_id: "3"
        },
        {
            f_name: "33333",
            d_name1: "this.state.drink1",
            d_name2: "this.state.drink2",
            d_customize1: "this.state.drinkCustomize1",
            d_customize2: "this.state.drinkCustomize2",
            s_name: "this.state.side",
            totalPrice: "event.currentTarget.value",
            a_name: "this.state.add",
            category_id: "1"
        },
        {
            f_name: "44444",
            f_customize: '正常',
            totalPrice: "event.currentTarget.value",
            category_id: "4"
        }
    ],
    total: 0,
}

function hangleClick() {

    const Name  = "111";
    const value = da //cookie value
    const cookies = new Cookies();

    try {
        cookies.set(`${Name}`, JSON.stringify(value),{path:'/'});
        
        console.log("create a cookieID", Name);
    }
    catch (err) {
        console.log(err);
    }
}

function ReadCookie(Name) {    
    const cookies = new Cookies();
    try{
        var cookieDataTemp=JSON.stringify(cookies.get(`${Name}`));
        var cookieData=JSON.parse(cookieDataTemp);
        console.log("cookies", cookieData);
        return cookieData;
    }
    catch(err){
        console.log(err);   
    }   
}

export default function PrintOrderList(props){

    const Name = props.Name;
    console.log("printOrderList.js CookieID => ",Name);
    var cookieData = ReadCookie(Name);
    console.log("data", cookieData);
    var count = 0;
    for (var i in cookieData) {
        if (cookieData.hasOwnProperty(i)) count++;
    }
    console.log("cookieData length", count);
    var cookieBol = false;
    if (count > 3)
    {
        cookieBol = true;
        console.log("cookieBol", cookieBol);
        
    }
    function handleFinalClick () 
    {
        db.collection("OrderTotal").doc(`${Name}`).set({cookieData});
        console.log("print");
    }
    return(
        <>
        <br/>
        <center><h2>用餐地點 (dining place) : {cookieData.place}</h2></center><br/>
        <center><h2>點餐明細 : </h2></center>
        {(cookieBol)? (<Option cookieData={cookieData}/>) :("cookie error")}
        
        <center><h2>總金額 (totalPrice) : ${cookieData.total}</h2></center>
        <h2>&nbsp;</h2>
        <Link to="/">
        <center><Button type="submit" variant="contained" color="primary" className="finishbt" onClick={handleFinalClick}>完成</Button></center>
        </Link>
        <h2>&nbsp;</h2>
        </>
        
    );
}