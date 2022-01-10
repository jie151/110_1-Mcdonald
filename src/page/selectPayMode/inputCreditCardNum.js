import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import "./inputCreditCardNum.css"
import Button from '@material-ui/core/Button';

var separate = new Array();

function InputCardNum({language}) {

  const [creditCard, setcreditCard] = useState("");
  const [checkans, setCheckans] = useState("");
  const [sum, setSum] = useState(0)

  useEffect(() => {
    if(sum % 10 ===0 && sum !== 0)
    {
      setCheckans(true);
    }
  }, [sum])

  var chinese =true;
    if (language === "English")
    {
        chinese = false;
    }

  function handleClick() {
    console.log("creditcard", creditCard);
    separate = creditCard.split("").map(Number);
    check();
    console.log("array", separate);
    console.log("handleClick 2", checkans)
  }

  function check(){
    console.log("before", separate);
    for(let i=0;i<16;i++){
      if(i%2===0){
        separate[i]=separate[i]*2;
      }
      else if(i%2===1){
        separate[i]=separate[i]*1;
      }
    }
    console.log("i->", separate);

    for(let i=0;i<16;i++){
      separate[i]=separate[i]/10+separate[i]%10;
    }
    console.log("plus", separate);
    var sumtemp = 0;
    for(let i=0;i<16;i++){
      separate[i]=parseInt(separate[i]);
      sumtemp = sumtemp +separate[i];
      console.log("for separate[i]", separate[i]);
      console.log("for sumtemp", sumtemp);  
    }
    setSum(sumtemp)
    console.log("int", separate);
    console.log("sum", sum);
    //console.log("sum", sum)
    if(sum%10===0 && sum !== 0){
      setCheckans(true);
    }
    else if(sum%10 !== 0){
      setCheckans(false);
    }
    console.log("check", checkans);
  }
  
  function handleChange(e) {
    setcreditCard(e.target.value);
    separate = e.target.value.split("").map(Number);
    check()
    console.log("handleChange", checkans)
  }

  return (
    <div className='inputCreditNum' >
      <br/> <br/> <br/>
      <center><h2 className='inputCreditNum_h1' >{(chinese)?("請輸入信用卡卡號: "):("Please enter the credit card number: ")} </h2><br/></center>
      <input className='inputbox' value={creditCard} onChange={handleChange} maxLength="16"/>
      
      <Link to={(checkans)?"/printOrderList":"/wrongNum"}>
        <Button onClick={handleClick} variant='outlined'  className="finishbt">{(chinese)?("確認"):("confirm")}</Button>
      </Link>
      
      
    </div>
  );
}

export default InputCardNum;

/*
<Link to={`/${checkans}`}>
        <button onClick={handleClick} className="finishbt" component={Link} to={`/${checkans}`}>確認</button>
      </Link>
      {checkans?checkRight():checkWrong()}
*/