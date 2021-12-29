import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./orderSettingPage.css"
import { Cookies } from "react-cookie";


export default function OrderSettingPage({onClick, handleLanguageClick})
{
    const [place, setPlace] = useState("內用");
    const [language, setLanguage] = useState("中文");
    const [eatIn, setEatIn] = useState(true);
    const [chinese, setChinese] = useState(true);

    useEffect(() => {
        if (language === "中文") {
            setChinese(true);
            if (place === "Take Out") {
                setPlace("外帶");
                setEatIn(false);
            }
            else if (place === "Eat In") {
                setPlace("內用");
                setEatIn(true);
            }
        }
        else  {
            setChinese(false);
            if (place === "內用") {
                setPlace("Eat In");
                setEatIn(true);
            }
            else if (place === "外帶") {
                setPlace("Take Out");
                setEatIn(false);
            }
        }

        console.log("language", language);
        console.log("place", place);
    }, [language, place, eatIn])

    function selectPlace(e) {
        if (language === "English") {
            if (e.target.value === "內用") {
                setPlace("Eat In");
                setEatIn(true);
            }
            else {
                setPlace("Take Out");
                setEatIn(false);
            }
        }
        else {
            setPlace(e.target.value);
            if (e.target.value === "內用") {
                setEatIn(true);
            }
            else {
                setEatIn(false);
            }
        }
    }

    function selectLanguage(e) {
        setLanguage(e.target.value);
    }


    function getRandomInt(max) { //create cookie id
        return Math.floor(Math.random() * max);
    }
    
    function hangleClick() {

        const Name  = getRandomInt(1000);  
        const value = {language:language,place :place, order_list: [], total: 0,} //cookie value
        const cookies = new Cookies();

        try {
            cookies.set(`${Name}`, JSON.stringify(value),{path:'/'});
            onClick(Name); //pass cookie to app.js
            handleLanguageClick(language)
            console.log("create a cookieID", Name);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="orderSetting">
            <p>請選擇用餐方式</p>
            <div className="place-button">
                <button className={eatIn?"EatInTrue":"EatInFalse"} size="large" value= "內用" onClick={selectPlace}>內用<br/>Eat In</button>
                <button className={eatIn?"EatInFalse":"EatInTrue"}size="large" value= "外帶" onClick={selectPlace}>外帶<br/>Take Out</button>
            </div>
                
            <p>選擇語言</p>
            <div className="language-button">
                <button className={chinese?"chineseTrue":"chineseFalse"} value="中文" onClick={selectLanguage}>中文</button>
                <button className={chinese?"chineseFalse":"chineseTrue"} value="English" onClick={selectLanguage}>English</button>
            </div>
            <Link to="/classification/Signature" >
                <button className="next-button" onClick={hangleClick}>NEXT</button>
            </Link>
           
        </div>
    );
}