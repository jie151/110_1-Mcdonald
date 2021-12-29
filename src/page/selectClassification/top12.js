import React from "react";
import SelectClassification from "./selectClassification";
import "./selectClassification";
import ReadCookie from "../component/cookie";

export default function Top12 (props) {

    const Category = props.category;
    const Food = props.food;
    const Name = props.name;
    const cookieData = ReadCookie(Name);
    const language = cookieData.language;
    //const language ="English"
    const top = Food.sort(function(a, b){return  b.count - a.count});
    var topArray = [];
    
    for(let i = 0; 9 > i; i++)
    {
        topArray.push(top[i]);
    }

    function hangleClick(e) {
        console.log("getClassifictionData =>  f_id:",e.target.value);
        props.onClick_GetfID(e.target.value);
        
    }

    return (
        <div>
            <SelectClassification name={Name} category={Category}/>

            <h1>Top9</h1>

            <div className="card_all">
                {topArray.map(meal => {
                    if (language === "中文"){
                        return (
                        <div className="card" key={meal.f_id}>
                            <img src={meal.picture} title={meal.f_name} alt={meal.f_name}/>
                            <p>{meal.f_name}</p>
                            <p>f_id : {meal.f_id}, count: {meal.count}</p>
                            <div className="card_cost_button">
                                <div className="card_cost">${meal.price}</div>
                                <button className="card_button" value={meal.f_id} onClick={hangleClick}>點餐</button>
                            </div>
                        </div>
                    )}
                    return (
                        <div className="card" key={meal.f_id}>
                            <img src={meal.picture} title={meal.f_name_EN} alt={meal.f_name_EN}/>
                            <p>{meal.f_name_EN}</p>
                            <p>f_id : {meal.f_id}, count: {meal.count}</p>
                            <div className="card_cost_button">
                                <div className="card_cost">${meal.price}</div>
                                <button className="card_button" value={meal.f_id} onClick={hangleClick}>Order</button>
                            </div>
                        </div>
                    )
                    
                })}
            </div>
        </div>
    )
}