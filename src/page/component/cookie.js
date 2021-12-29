import { Cookies } from "react-cookie";

export default function ReadCookie(Name) {    
    const cookies = new Cookies();
    try{
     var cookieDataTemp=JSON.stringify(cookies.get(`${Name}`));
     var cookieData=JSON.parse(cookieDataTemp);
     return cookieData;
    }
    catch(err){
     console.log(err);   
    }   
}