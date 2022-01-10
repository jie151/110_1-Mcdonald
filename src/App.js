import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes,Link, Route } from 'react-router-dom';
import {db_config} from "./page/component/firebaseConfig";
import  {collection, getDocs} from "firebase/firestore";
import OrderSettingPage from './page/orderSetting/orderSettingPage';
import GetClassificationData from './page/selectClassification/getClassificationData';
//import Top12 from './page/selectClassification/top12';
//import {Category, Food, Food_Category} from "./page/selectClassification/data"
import {Food_Category} from "./page/selectClassification/data"
import Cart from './page/cart/Cart';

import { makeStyles } from '@material-ui/core/styles';
import Foodintro from "./page/mealSetting/foodintro";

import InputCardNum from "./page/selectPayMode/inputCreditCardNum";
import SelectPayMode from "./page/selectPayMode/selectPayMode";
import WrongNum from "./page/selectPayMode/wrongNum";
import PrintOrderList from "./page/selectPayMode/printOrderList";


function App() {

  const [CookieID, setCookieID] = useState("");
  const [f_id, setF_id] = useState("");
  const [category_id, setCategory_id]=useState("");
  const [language, setLanguage] = useState("中文")
  const [categoryPath, setCategoryPath] = useState("Signature")

  const [Food, setFood] = useState([]);
  const [Category, setCategory] = useState([]);
  const foodCollectionRef = collection(db_config, "Food");
  const categoryCollectionRef = collection(db_config, "Category");
  const food_categoryCollectionRef = collection(db_config, "Food_Category");
  
  useEffect (() => {
    const getFood = async() => {
      const data = await getDocs(foodCollectionRef);
      setFood(data.docs.map((doc) => ({...doc.data(), id:doc.id}) ));
    }
    const getCategory = async() => {
      const data = await getDocs(categoryCollectionRef);
      setCategory(data.docs.map((doc) => ({...doc.data(), id:doc.id}) ));
    }
    getFood();
    getCategory();
  }, []);

  function handleLanguage(newValue)
  {
    setLanguage(newValue);
    console.log("app.js => language", newValue);
  }
  function handleClick(newValue)
  {
    setCookieID(newValue);
    console.log("app.js => cookie id:", newValue);
  }
  function handleClick_order(newValue)
  {
    setF_id(newValue);
    console.log("app.js => f_id:", newValue);
  }
  function handleClick_category_id(newValue)
  {
    setCategory_id(newValue);
    console.log("app.js => category_id:", newValue);
  }
  function handleClick_SetPath (newValue) {
    setCategoryPath(newValue);
    console.log("app.js => category_path", newValue);
  }
  //<Route path="/cart" exact element= {<Cart user_ID={CookieID} />}/>
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route path="/" exact element= {<OrderSettingPage onClick={handleClick} handleLanguageClick={handleLanguage}/>}/>
          <Route path="/cart" exact element= {<Cart user_ID={CookieID} categoryPath = {categoryPath} />}/>
          <Route path="/selectPayMode" exact element= {<SelectPayMode language={language}/>}/>
          <Route path="/inputCardNum" exact element= {<InputCardNum language={language}/>}/>
          <Route path="/wrongNum" exact element= {<WrongNum language={language}/>}/>
          <Route path="/printOrderList" exact element= {<PrintOrderList Name = {CookieID} language={language}/>}/>

          {Category.map(c => (
                <Route key={c.category_id} path={`/classification/${c.path}`} exact 
                  element = {
                    <GetClassificationData
                      food_category={Food_Category} 
                      food = {Food} 
                      category={Category} 
                      categoryId={c.category_id} 
                      categoryName={c.category} 
                      categoryNameEN={c.category_EN}
                      name={CookieID} 
                      onClick_GetfID={handleClick_order}
                      onClick_GetCategoryId={handleClick_category_id}
                      onClick_SetPath={ handleClick_SetPath}
                      language = {language} 
                      />
                  } 
                />
          ))}
          {Food.map(f => (
            <Route path={`/classification/${f.f_id}`} exact
            element = {
              < Foodintro
                category_id = {category_id}
                f_id = {f_id}
                user_ID = {CookieID}
                language = {language}
                categoryPath = {categoryPath}
              />
            }
            />
          ))}
          
        </Routes>
          <Link to="/">
            <img alt='mcdonalds logo' className="mcdonalds_img" src={require('./page/mealSetting/images/mcdonalds_logo.jpg')}/>
          </Link>
          


      </Router>
  
    </div>
  );
}

export default App;

////{console.log("onClick cookieid: ", CookieID)}
/*
<img alt='mcdonalds logo' className="mcdonalds_img" src="https://www.mcdonalds.com/etc/designs/mcd/tw/zh-tw/_jcr_content/logo/image.img.jpg/1639407613995.jpg"/>
<Route path="/classification/top" exact 
            element = {
              <Top12
                      food_category={Food_Category} 
                      food = {Food} 
                      category={Category} 
                      name={CookieID}
                      onClick_GetfID={handleClick_order} />} 
              />
*/