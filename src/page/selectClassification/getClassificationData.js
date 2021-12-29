import React from "react";
import {Food_Category} from "./data";
import SelectClassification from './selectClassification';
import "./selectClassification.css"
import {Link} from "react-router-dom"

export default function GetClassificationData(props) {

    const Food = props.food;
    const Category = props.category;
    const categoryId = props.categoryId;
    const categoryName = props.categoryName;
    const categoryNameEN = props.categoryNameEN;
    const Name = props.name;

    const language = props.language;
    var categoryPath = "";

    for(let i = 0; 12> 0; i++)
    {
        if (categoryId === Category[i].category_id)
        {
            categoryPath=Category[i].path;
            break;
        }
    }

    console.log("getClassificationData => cookie:", Name);

    const numFood_category = Food_Category.length;
    const numFood = Food.length;
    var meals =[];
    var chinese= true; 
    
    //console.log("cookieData", cookieData);
    //const language ="English"

    if (language === "English") {
        chinese = false;
    }
   
    for(let i = 0; numFood_category > i; i++) {
        if (Food_Category[i].category_id === categoryId) {
            //console.log("i", Food_category[i].f_id);
            
            for(let j = 0; numFood> j; j++)  {
                if(Food[j].f_id === Food_Category[i].f_id) {
                    meals.push(Food[j]);
                    break;
                }
            }
        }
    }

    function hangleClick(e) {
        console.log("getClassifictionData =>  f_id:",e.target.value);
        props.onClick_GetfID(e.target.value);
        props.onClick_GetCategoryId(categoryId);
    }

    return (
        <div>
            <SelectClassification name={Name} category={Category} language={language}/>

            <h2>{chinese? categoryName:categoryNameEN }</h2>

            <div className="card_all">
                {meals.map(meal => {
                    if (language === "中文"){
                        return (
                        <div className="card" key={meal.f_id}>
                            <img src={meal.picture} title={meal.f_name} alt={meal.f_name}/>
                            <p>{meal.f_name}</p>
                            <div className="card_cost_button">
                                <div className="card_cost">${meal.price}</div>
                                <Link to={`/classification/${meal.f_id}`}>
                                    <button className="card_button" value={meal.f_id} onClick={hangleClick} variant="outlined">點餐</button>
                                </Link>
                                
                            </div>
                        </div>
                    )}
                    return (
                        <div className="card" key={meal.f_id}>
                            <img src={meal.picture} title={meal.f_name_EN} alt={meal.f_name_EN}/>
                            <p>{meal.f_name_EN}</p>
                            <div className="card_cost_button">
                                <div className="card_cost">${meal.price}</div>
                                <Link to={`/classification/${meal.f_id}`}>
                                    <button className="card_button" value={meal.f_id} onClick={hangleClick} variant="outlined">Order</button>
                                </Link>
                            </div>
                        </div>
                    )
                    
                })}
            </div>
        </div>
    )
}