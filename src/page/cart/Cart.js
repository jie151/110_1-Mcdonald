import React, { Component } from 'react';
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import "./cart.css";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom"


class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cookieData: {},
            cart: [],
            newPrice: undefined,
            categoryPath: this.props.categoryPath
            //user_ID: 100,   //order_id
        };

        this.deleteCookieCartData = this.deleteCookieCartData.bind(this);
        this.cleanCookieCartData = this.cleanCookieCartData.bind(this);
    }

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };

    componentDidMount() {
        const { cookies } = this.props;
        //console.log(this.props);

        if (this.props.user_ID === undefined) {
            this.run(this.props.user_ID);
        }

        //readCookie
        const self = this;
        getCookieCartData(self);

        if (this.state.cart === undefined) {
            this.run(this.state.cart);
        }

        async function getCookieCartData(self) {
            try {
                var cookieDataTemp = JSON.stringify(cookies.get(self.props.user_ID));
                var cookieData = JSON.parse(cookieDataTemp);
                await self.setState({
                    cookieData: cookieData,
                    cart: cookieData.order_list,
                    newPrice: cookieData.total
                });
                if (self.state.cart === undefined) {
                    this.run(self.state.cart);
                }
                console.log("readCookie", cookieData);
                return cookieData;
            }
            catch (err) {
                console.log(err);
            }
        }

        //setCookie
        function setCookieCartData(Name, Value) {
            var cookieDataTemp = JSON.stringify(cookies.get(this.props.user_ID));
            var cookieData = JSON.parse(cookieDataTemp);
            console.log(cookieData);

            //event.preventDefault();
            var data = {
                f_name: this.props.food.f_name,
                f_customize: '正常',
                //cookieData.total = cookieData.total + parseInt(data.totalPrice);
            }
            cookieData.order_list = this.state.cart;
            cookieData.total = cookieData.total + data.totalPrice;
            // console.log(cookieData.order_list);

            try {
                cookies.set(this.props.user_ID, JSON.stringify(cookieData), { path: "/" });

            }
            catch (err) {
                console.log(err);
            }
            var cookieDataRE = JSON.stringify(cookies.get(this.props.user_ID));
            var cookieDataresult = JSON.parse(cookieDataRE);
            console.log(cookieDataresult);
        }

    }

    a = () => {
        const { cookies } = this.props;
        var da = {
            language: "中文",
            place: 'place',
            order_list: [
                {
                    number: 2,
                    f_name: "麥香魚",
                    f_customize:
                    {
                        sauce: "醬多",
                        lectture: "正常",
                    },
                    d_name: "可樂",
                    d_customize: "去冰",
                    d_price: "this.state.drinkPrice",
                    s_name: "薯條",
                    s_customize: "正常",
                    s_price: " this.state.sidePrice",
                    a_name: "無",
                    totalPrice: 99,
                    category_id: 3
                },
                {
                    f_name: "快樂分享餐",
                    d_name1: "可樂",
                    d_name2: "雪碧",
                    d_customize1: "去冰",
                    d_customize2: "正常",
                    s_name: "薯條",
                    totalPrice: 366,
                    a_name: "無",
                    category_id: 1
                },
                {
                    f_name: "勁辣雞腿堡",
                    f_customize:
                    {
                        sauce: "正常",
                        lectture: "正常"
                    },
                    d_name: "雪碧",
                    d_customize: "正常",
                    d_price: "this.state.drinkPrice",
                    s_name: "麥克雞塊",
                    s_customize: "糖醋醬",
                    s_price: "this.state.sidePrice",
                    a_name: "無",
                    totalPrice: 110,
                    category_id: 3
                },
                {
                    f_name: "安格斯黑牛堡",
                    f_customize:
                    {
                        sauce: "正常",
                        lectture: "正常"
                    },
                    d_name: "雪碧",
                    d_customize: "正常",
                    d_price: "this.state.drinkPrice",
                    s_name: "薯條",
                    s_customize: "正常",
                    s_price: "this.state.sidePrice",
                    a_name: "無",
                    totalPrice: 110,
                    category_id: 2
                }
            ],
            total: 446,
        }
        cookies.set(110, JSON.stringify(da), { path: "/" });
    }

    /*delete data one by one*/
    deleteCookieCartData = (event) => {
        if (this.state.cookieData.language === '中文') {
            alert('刪除成功!!');
        }
        else {
            alert('Delete succrssfully!!');
        }
        console.log(typeof (event.currentTarget.value));
        console.log("delete one");
        const newvalue = this.state.cart
        newvalue.filter(item => item.number === parseInt(event.currentTarget.value));
        console.log(newvalue)


        this.setState({
            cart: this.state.cart.filter(cart => cart.number !== parseInt(event.currentTarget.value))
        })
    }

    /*delete all data*/
    cleanCookieCartData = () => {
        if (this.state.cookieData.language === '中文') {
            alert('清空購物車成功!!');
        }
        else {
            alert('Remove all succrssfully!!');
        }
        console.log("clean");

        this.setState({
            cart: [],
            newPrice: 0
        })
        //setCookie(this.state.user_ID, cart);
    }

    setOrderList = () => {
        console.log("set order and jump to pay page");
        const { cookies } = this.props;

        var cookieDataTemp = JSON.stringify(cookies.get(`${this.props.user_ID}`));
        var cookieData = JSON.parse(cookieDataTemp);
        console.log(cookieData);


        cookieData.order_list = this.state.cart;
        cookieData.total = this.state.newPrice;


        try {
            cookies.set(this.props.user_ID, JSON.stringify(cookieData), { path: "/" });

        }
        catch (err) {
            console.log(err);
        }

        var cookieDataRE = JSON.stringify(cookies.get(this.props.user_ID));
        var cookieDataresult = JSON.parse(cookieDataRE);
        console.log(cookieDataresult);
        // const newvalue = this.state.cart
        // newvalue.find(item => item.f_name === event.currentTarget.value);
        // console.log(newvalue)
    }

    Display(data, index) {
        /*delete data one by one*/
        const { cookies } = this.props;
        this.deleteCookieCartData = (event) => {
            if (this.state.cookieData.language === '中文') {
                alert('刪除成功!!');
            }
            else {
                alert('Delete succrssfully!!');
            }
            console.log(typeof (event.currentTarget.value));
            console.log("delete one");
            const newvalue = this.state.cart
            const newcart = newvalue.find(item => item.number === parseInt(event.currentTarget.value));
            console.log(newcart);

            this.setState({
                cart: this.state.cart.filter(cart => cart.number !== parseInt(event.currentTarget.value)),
                newPrice: this.state.newPrice - newcart.totalPrice
            })
            //console.log(this.state.newPrice );
        }
        //console.log(data.category_id);
        if (data.category_id === 1) {
            if (this.state.cookieData.language === "中文") {
                //console.log(data.f_name);
                return (
                    <tr className='cartItem' id={index}>
                        <tr>
                            <th >{index + 1}</th>
                            <td width="250" >{data.f_name}</td>
                            <td>$ {data.totalPrice}</td>
                            <Button className='removeX_Cart' variant="outlined" color="secondary" key={data.f_id} value={data.number} onClick={this.deleteCookieCartData} removeitem={this.deleteCookieCartData}>
                                X
                            </ Button>
                        </tr>
                        <tr className='drink' align="center">
                            <td ></td>
                            <td width="125">-{data.d_name1}</td>
                            <td width="125">({data.d_customize1})</td>
                        </tr>
                        <tr className='drink' align="center">
                            <td ></td>
                            <td width="125">-{data.d_name2}</td>
                            <td width="125">({data.d_customize2})</td>
                        </tr>
                        <tr className='side' align="center">
                            <td ></td>
                            <td width="125">-{data.s_name}</td>
                        </tr>
                        <tr className='add' align="center">
                            <td ></td>
                            <td width="125">-加價購 : {data.a_name}</td>
                            <td width="125"></td>
                        </tr>

                    </tr>

                );
            }
            else {
                return (
                    <tr className='cartItem' id={index}>
                        <tr>
                            <th >{index + 1}</th>
                            <td width="250" >{data.f_name}</td>
                            <td>$ {data.totalPrice}</td>
                            <Button className='removeX_Cart' variant="outlined" color="secondary" key={data.f_id} value={data.number} onClick={this.deleteCookieCartData} removeitem={this.deleteCookieCartData}>
                                X
                            </ Button>
                        </tr>
                        <tr className='drink' align="center">
                            <td ></td>
                            <td width="125">-{data.d_name1}</td>
                            <td width="125">({data.d_customize1})</td>
                        </tr>
                        <tr className='drink' align="center">
                            <td ></td>
                            <td width="125">-{data.d_name2}</td>
                            <td width="125">({data.d_customize2})</td>
                        </tr>
                        <tr className='side' align="center">
                            <td ></td>
                            <td width="125">-{data.s_name}</td>
                        </tr>
                        <tr className='add' align="center">
                            <td ></td>
                            <td width="125">-add : {data.a_name}</td>
                            <td width="125"></td>
                        </tr>

                    </tr>
                );

            }

        }
        else {
            if (this.state.cookieData.language === "中文") {
                if (data.set === 1) {
                    return (
                        <tr className='cartItem' id={index}>
                            <tr>
                                <th scope="row" key="{data0}">{index + 1}</th>
                                <td width="250" key="{data1}">{data.f_name}</td>
                                <td key="{data2}">{data.f_customize.sauce}  {data.f_customize.lettuce}</td>
                                <td>$ {data.totalPrice}</td>
                                <Button className='removeX_Cart' variant="outlined" color="secondary" key={data.f_id} value={data.number} onClick={this.deleteCookieCartData} removeitem={this.deleteCookieCartData}>
                                    X
                                </ Button>
                            </tr>
                        </tr>
                    );
                }
                else {
                    return (

                        <tr className='cartItem' id={index}>
                            <tr>
                                <th scope="row" key="{data0}">{index + 1}</th>
                                <td width="250" key="{data1}">{data.f_name}</td>
                                <td key="{data2}">{data.f_customize.sauce}  {data.f_customize.lettuce}</td>
                                <td>$ {data.totalPrice}</td>
                                <Button className='removeX_Cart' variant="outlined" color="secondary" key={data.f_id} value={data.number} onClick={this.deleteCookieCartData} removeitem={this.deleteCookieCartData}>
                                    X
                                </ Button>
                            </tr>
                            <tr className='drink' align="center">
                                <td key="{data0.1}"></td>
                                <td width="100" key="{data3}"></td>
                                <td width="125" key="{data4}">-{data.d_name}</td>
                                <td width="125" key="{data5}">({data.d_customize})</td>
                            </tr>
                            <tr className='side' align="center">
                                <td key="{data0.2}"></td>
                                <td width="100" key="{data6}"></td>
                                <td width="125" key="{data7}">-{data.s_name}</td>
                                <td width="125" key="{data8}">({data.s_customize})</td>
                            </tr>
                            <tr className='add' align="center">
                                <td key="{data0.3}"></td>
                                <td width="100" key="{data9}"></td>
                                <td width="125" key="{data10}">-加價購 : {data.a_name}</td>
                                <td width="125" key="{data11}"></td>
                            </tr>

                        </tr>
                    );
                }
            }
            else {
                if (data.set === 1) {
                    return (

                        <tr className='cartItem' id={index}>
                            <tr>
                                <th scope="row" key="{data0}">{index + 1}</th>
                                <td width="250" key="{data1}">{data.f_name}</td>
                                <td key="{data2}">{data.f_customize.sauce}  {data.f_customize.lettuce}</td>
                                <td>$ {data.totalPrice}</td>
                                <Button className='removeX_Cart' variant="outlined" color="secondary" key={data.f_id} value={data.f_name} onClick={this.deleteCookieCartData} removeitem={this.deleteCookieCartData}>
                                    X
                                </ Button>
                            </tr>
                        </tr>
                    );
                }
                else {
                    return (

                        <tr className='cartItem' id={index}>
                            <tr>
                                <th scope="row" key="{data0}">{index + 1}</th>
                                <td width="250" key="{data1}">{data.f_name}</td>
                                <td key="{data2}">{data.f_customize.sauce}  {data.f_customize.lettuce}</td>
                                <td>$ {data.totalPrice}</td>
                                <Button className='removeX_Cart' variant="outlined" color="secondary" key={data.f_id} value={data.f_name} onClick={this.deleteCookieCartData} removeitem={this.deleteCookieCartData}>
                                    X
                                </ Button>
                            </tr>
                            <tr className='drink' align="center">
                                <td key="{data0.1}"></td>
                                <td width="100" key="{data3}"></td>
                                <td width="125" key="{data4}">-{data.d_name}</td>
                                <td width="125" key="{data5}">({data.d_customize})</td>
                            </tr>
                            <tr className='side' align="center">
                                <td key="{data0.2}"></td>
                                <td width="100" key="{data6}"></td>
                                <td width="125" key="{data7}">-{data.s_name}</td>
                                <td width="125" key="{data8}">({data.s_customize})</td>
                            </tr>
                            <tr className='add' align="center">
                                <td key="{data0.3}"></td>
                                <td width="100" key="{data9}"></td>
                                <td width="125" key="{data10}">-add : {data.a_name}</td>
                                <td width="125" key="{data11}"></td>
                            </tr>

                        </tr>
                    );
                }
            }

        }
    }


    render() {
        console.log(this.props.user_ID);
        console.log("yyy", this.state.cart);
        console.log(this.state.cookieData.language);

        if (this.state.cookieData.language === "中文") {
            return (
                <div className="cartBody">
                    <div className='top'>
                        <img alt='mcdonalds logo' className="mcdonalds_img" src={require('../mealSetting/images/mcdonalds_logo.jpg')} />
                    </div>

                    <div className="back">
                        <Link to={`/classification/${this.state.categoryPath}`}>
                            <Button onClick={this.setOrderList} variant='outlined' color="primary" >回到菜單</Button>
                        </Link><br /><br />
                        <h3>購物車</h3><br /><br />
                        {/* {<Button onClick={this.a}>A</Button>} */}
                        <div>
                            <div>
                                {(this.state.cart).map((data, index) => (
                                    this.Display(data, index)
                                ))}
                            </div>
                        </div>
                        <div className="text-right" align="right">總價 :{this.state.newPrice} 元</div>
                        <Button className='clean' variant="contained" color="secondary" onClick={this.cleanCookieCartData} >清空購物車</Button><br /><br />
                        <Link to="/selectPayMode">
                            <Button className='pay' variant="contained" color="primary" onClick={this.setOrderList}>確認訂單</Button>{' '}
                        </Link>

                    </div>
                </div >
            );
        }
        else {
            return (
                <div className="cartBody">
                    <div className='top'>
                        <img alt='mcdonalds logo' className="mcdonalds_img" src={require('../mealSetting/images/mcdonalds_logo.jpg')} />
                    </div>

                    <div className="back">
                        <Link to={`/classification/${this.state.categoryPath}`}>
                            <Button onClick={this.setOrderList} >Back to menu</Button>
                        </Link><br /><br />
                        <h3>My Order</h3><br /><br />

                        {/* {<Button onClick={this.a}>A</Button>} */}
                        <div>
                            <div>
                                {(this.state.cart).map((data, index) => (
                                    this.Display(data, index)
                                ))}
                            </div>
                        </div>
                        <div className="text-right" align="right">total :${this.state.newPrice}</div>
                        <Button className='clean' variant="contained" color="error" onClick={this.cleanCookieCartData} >Remove All</Button><br /><br />
                        <Link to="/selectPayMode">
                            <Button className='pay' variant="contained" color="primary" onClick={this.setOrderList}>Confirm Order</Button>{' '}
                        </Link>

                    </div>
                </div >
            );
        }
    }

}


//

export default withCookies(Cart);