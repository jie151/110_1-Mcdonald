export default function Option(props){

    const cookieData = props.cookieData
    const chinese = props.chinese
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
                                    <h3>{(chinese) ?("主餐"):("Main meal")}: {item.f_name}</h3>
                                    {console.log("item.f_name", item.f_name)}
                                    <h3>{(chinese) ?("飲料1"):("Drink1")}: {item.d_name1}</h3>
                                    <h3>({item.d_customize1})</h3>
                                    <h3>{(chinese) ?("飲料2"):("Drink2")}: {item.d_name2}</h3>
                                    <h3>({item.d_customize2})</h3>
                                    <h3>{(chinese) ?("配餐"):("Side")}: {item.s_name}</h3>
                                    <h3>{(chinese) ?("加點"):("Add discount product")}: {item.a_name}</h3>
                                    <h3>{(chinese) ?("價格"):("Price")}: ${item.totalPrice}</h3>
                                    <h3>-------------------------------</h3>
                                    <h2>&nbsp;</h2>
                                </div>
                                }
                        
                            </div>
                        
                        );
                    }
                    
                    else if(item.category_id === 2 || item.category_id === 3){
                        if(item.set === 1){
                            return(
                                <div className="list">{
                                    <div className="item"> 
                                        {console.log("option23")}
                                        <h3>{(chinese) ?("主餐"):("Main meal")}: {item.f_name}</h3>
                                        <h3>({item.f_customize.sauce}, {item.f_customize.lettuce})</h3>
                                        <h3>{(chinese) ?("價格"):("Price")}: ${item.totalPrice}</h3>
                                        <h3>-------------------------------</h3>
                                        <h2>&nbsp;</h2>
                                    </div>
                                }
                                </div>
                            );
                        }
                        else if(item.set === 2){
                            return (
                                <div className="list">{
                                    <div className="item"> 
                                        {console.log("option23")}
                                        <h3>{(chinese) ?("主餐"):("Main meal")}: {item.f_name}</h3>
                                        <h3>({item.f_customize.sauce}, {item.f_customize.lettuce})</h3>
                                        {console.log("item.f_name", item.f_name)}
                                        <h3>{(chinese) ?("飲料"):("Drink")}: {item.d_name}</h3>
                                        <h3>({item.d_customize})</h3>
                                        <h3>{(chinese) ?("配餐"):("Side")}: {item.s_name}</h3>
                                        <h3>({item.s_customize})</h3>
                                        <h3>{(chinese) ?("加點"):("Add discount product")}: {item.a_name}</h3>
                                        <h3>{(chinese) ?("價格"):("Price")}: ${item.totalPrice}</h3>
                                        <h3>-------------------------------</h3>
                                        <h2>&nbsp;</h2>
                                    </div>
                                }
                                </div>
                            );
                        }
                    }
                    else{
                        return(
                            <div className="item">
                                {console.log("optionelse")}
                                <h3>{(chinese) ?("主餐"):("Main meal")}: {item.f_name}</h3>
                                <h3>({item.f_customize})</h3>
                                <h3>{(chinese) ?("價格"):("Price")}: ${item.totalPrice}</h3>
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