
export default function Option(props){

    const cookieData = props.cookieData
    console.log("all cookieData.js => cookieData", cookieData);

    return(

        <div>
            {
                cookieData.order_list.map((item) => {
                    console.log("items.category_id",item.category_id);
                    if(item.category_id === 1){
                        console.log("items.category_id",item);
                        
                        return (
                            
                            <div className="list">
                                {
                                <div className="item"> 
                                    {console.log("option1")}
                                    
                                    <h3>主餐(main meal): {item.f_name}</h3>
                                    {console.log("item.f_name", item.f_name)}
                                    <h3>飲料1(drink1): {item.d_name1}({item.d_customize1})</h3>
                                    <h3> </h3>
                                    <h3>飲料2(drink2): {item.d_name2}({item.d_customize2})</h3>
                                    <h3> </h3>
                                    <h3>配餐(side): {item.s_name}</h3>
                                    <h3>加點(add discount product): {item.a_name}</h3>
                                    <h3>價格(Price): ${item.totalPrice}</h3>
                                    <h3>-------------------------------</h3>
                                    <h2>&nbsp;</h2>
                                </div>
                                }
                        
                            </div>
                        
                        );
                    }
                    
                    else if(item.category_id === 2 || item.category_id === 3){
                        
                        return (
                            <div className="list">{
                                <div className="item"> 
                                    {console.log("option23")}
                                    <h3>主餐(main meal): {item.f_name}({item.f_customize.sauce}, {item.f_customize.lectture})</h3>
                                    <h3> </h3>
                                    <h3>飲料(drink): {item.d_name}({item.d_customize})</h3>
                                    <h3> </h3>
                                    <h3>配餐(side): {item.s_name}({item.s_customize})</h3>
                                    <h3> </h3>
                                    <h3>加點(add discount product): {item.a_name}</h3>
                                    <h3>價格(Price): ${item.totalPrice}</h3>
                                    <h3>-------------------------------</h3>
                                    <h2>&nbsp;</h2>
                                </div>
                            }
                            </div>
                            );
                    }
                    else{
                        return(
                            <div className="item">
                                {console.log("optionelse")}
                                <h3>主餐(main meal): {item.f_name}({item.f_customize})</h3>
                                <h3> </h3>
                                <h3>價格(Price): ${item.totalPrice}</h3>
                                <h3>-------------------------------</h3>
                                <h2>&nbsp;</h2>
                            </div>
                        );
                    }
                    
                })
            }
        </div>
    );
    
}


/*

*/