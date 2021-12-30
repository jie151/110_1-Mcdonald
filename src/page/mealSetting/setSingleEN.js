
import React, { Component } from 'react';
import { instanceOf, PropTypes } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import drinkFromDB from './drinkFromDB.js';
import CustomizeFromDB from './CustomizeFromDB';
import foodFromDB from './foodFromDB.js';
import './mealsetting.css'
import './intro.css'
import sideFromDB from './sideFromDB.js';
import AddFromDB from './AddFromDB.js';

// import FontAwesome from 'react-fontawesome';
import './intro.css'
import './mealsetting.css'
const colors = [
    { value: 'red', text: 'Red' },
    { value: 'yellow', text: 'Yellow' },
    { value: 'blue', text: 'Blue' }
];
class SetSingleEN extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_ID: this.props.user_ID,
            totalPrice: 0,
        };

        // 為了讓 `this` 能在 callback 中被使用，這裡的綁定是必要的：

        this.handleAddtoCart = this.handleAddtoCart.bind(this);
    }

    componentDidMount() {
        if (this.props.food === undefined) {
            this.run(this.props.food);
        };
        if (this.props.user_ID === undefined) {
            this.run(this.props.user_ID);
        };
        if (this.props.category_id === undefined) {
            this.run(this.props.category_id);
        };


    }
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };

    handleAddtoCart = event => {
        const { cookies } = this.props;
        // var da = {
        //     order_id: "ID",
        //     place: 'place',
        //     language: '中文',
        //     order_list: [
        //         {
        //             f_name: "this.state.food.f_name",
        //             d_name: "this.state.drink",
        //             d_customize: "this.state.drinkCustomize",
        //             d_price: "this.state.drinkPrice",
        //             s_name: " this.state.sid",
        //             s_customize: "this.state.sideCustomize",
        //             s_price: " this.state.sidePrice",
        //             totalPrice: " this.state.totalPrice"
        //         },
        //         {
        //             f_name: "this.state.food.f_name",
        //             d_name: "this.state.drink",
        //             d_customize: "this.state.drinkCustomize",
        //             d_price: "this.state.drinkPrice",
        //             s_name: "this.state.side",
        //             s_customize: "this.state.sideCustomize",
        //             s_price: "this.state.sidePrice",
        //             totalPrice: "this.state.totalPrice"
        //         }
        //     ],
        //     total: 0,
        // }
        // cookies.set(this.props.user_ID, JSON.stringify(da), { path: "/" });
        var cookieDataTemp = JSON.stringify(cookies.get(this.props.user_ID));
        var cookieData = JSON.parse(cookieDataTemp);
        console.log(cookieData);


        event.preventDefault();
        var data = {
            f_name: this.props.food.f_name_EN,
            f_customize: '正常',
            totalPrice: event.currentTarget.value,
            category_id: this.props.category_id
        }
        cookieData.order_list.push(data);
        cookieData.total = cookieData.total + parseInt(data.totalPrice);

        console.log("setSingleEN",cookieData.order_list);

        try {
            cookies.set(this.props.user_ID, JSON.stringify(cookieData), { path: "/" });

        }
        catch (err) {
            console.log(err);
        }

        var cookieDataRE = JSON.stringify(cookies.get(this.props.user_ID));
        var cookieDataresult = JSON.parse(cookieDataRE);
        console.log(cookieDataresult);
    };
    
    // this.state.drinkPrice + this.state.sidePrice + this.state.food.price

    render() {

        var totalprice;
        totalprice = this.props.food.price;
        return (
            <div class="wrapper">
                <table><tr><td>
                    <article class="td5" >

                    </article>
                </td>
                    <td>



                        <article class="td6">
                            <h2 class="extra">Your Order &emsp;&emsp;&emsp;&emsp;&emsp;</h2>
                            <ul class="list">
                                <li className='lii'>{this.props.food.f_name_EN}</li>
                            </ul>

                            <br /><br />
                            <h2>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Total Price&emsp;$ {totalprice}</h2>
                            <br /><br />
                            <Button className='select_button' value={totalprice} onClick={this.handleAddtoCart}>
                                Add to Cart
                            </Button>
                        </article>
                    </td>
                    <td>
                        <article class="td7" >

                        </article>
                    </td>
                </tr>
                </table>


            </div>

        )


    }
}

export default withCookies(SetSingleEN)
