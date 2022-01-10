
import React from 'react';
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import drinkFromDB from './drinkFromDB.js';
import CustomizeFromDB from './CustomizeFromDB';
import './mealsetting.css'
import './intro.css'
import sideFromDB from './sideFromDB.js';
import AddFromDB from './AddFromDB.js';

// import FontAwesome from 'react-fontawesome';
import './intro.css'
import './mealsetting.css'

class SetMealEN extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_ID: undefined,
            sauceCustomizeopen: false,
            sauceCustomize: "sauce normal",
            sauceCustomizeList: [],
            lettuceCustomizeopen: false,
            lettuceCustomize: "lettuce normal",
            lettuceCustomizeList: [],
            addopen: false,
            add: undefined,
            addList: [],
            addPrice: 0,
            drinkopen: false,
            drinkCustomizeopen: false,
            sideopen: false,
            sideCustomizeopen: false,
            drinkList: [],
            drinkCustomizeList: [],
            drink: 'Coca-Cola(M)',
            drinkCustomize: "ice normal",
            drinkPrice: 0,
            sideList: [],
            sideCustomizeList: [],
            side: 'Side-McCrispy Leg/Thigh+Fires(M)',
            sideCustomize: "normal",
            sidePrice: 0,
            totalPrice: 0,
        };

        // 為了讓 `this` 能在 callback 中被使用，這裡的綁定是必要的：
        this.handleSauceCustomizeChange = this.handleSauceCustomizeChange.bind(this);
        this.handleSauceCustomizeClose = this.handleSauceCustomizeClose.bind(this);
        this.handleSauceCustomizeOpen = this.handleSauceCustomizeOpen.bind(this);

        this.handleLettuceCustomizeChange = this.handleLettuceCustomizeChange.bind(this);
        this.handleLettuceCustomizeClose = this.handleLettuceCustomizeClose.bind(this);
        this.handleLettuceCustomizeOpen = this.handleLettuceCustomizeOpen.bind(this);

        this.handleAddChange = this.handleAddChange.bind(this);
        this.handleAddClose = this.handleAddClose.bind(this);
        this.handleAddOpen = this.handleAddOpen.bind(this);


        this.handleDrinkChange = this.handleDrinkChange.bind(this);
        this.handleDrinkClose = this.handleDrinkClose.bind(this);
        this.handleDrinkOpen = this.handleDrinkOpen.bind(this);
        this.handledrinkCustomizeChange = this.handledrinkCustomizeChange.bind(this);
        this.handledrinkCustomizeClose = this.handledrinkCustomizeClose.bind(this);
        this.handledrinkCustomizeOpen = this.handledrinkCustomizeOpen.bind(this);

        this.handleSideChange = this.handleSideChange.bind(this);
        this.handleSideClose = this.handleSideClose.bind(this);
        this.handleSideOpen = this.handleSideOpen.bind(this);
        this.handleSideCustomizeChange = this.handleSideCustomizeChange.bind(this);
        this.handleSideCustomizeClose = this.handleSideCustomizeClose.bind(this);
        this.handleSideCustomizeOpen = this.handleSideCustomizeOpen.bind(this);
        this.handleAddtoCart = this.handleAddtoCart.bind(this);
    }

    componentDidMount() {
        if (this.props.user_ID === undefined) {
            this.run(this.props.user_ID);
        };
        if (this.props.food === undefined) {
            this.run(this.props.food);
        };
        if (this.props.category_id === undefined) {
            this.run(this.props.category_id);
        };

        var self = this;

        getMealData(self);

        async function getMealData(self) {
            try {
                console.log("set start");
                await self.setState({ user_ID: self.props.user_ID });


                const drinktemp = await drinkFromDB();
                //remove small size drink
                var arrAd = 0;
                for (var i = 0; i < drinktemp.length - arrAd; i++) {

                    if (i === 10 || i === (13 - arrAd) || i === (16 - arrAd) || i === (19 - arrAd) || i === (22 - arrAd) || i === (25 - arrAd)) {

                        drinktemp.splice(i, 1);
                        arrAd++;
                    }

                }
                drinktemp.splice(9, 1);

                await self.setState({ drinkList: drinktemp });
                const drinkCustomizetemp = await CustomizeFromDB('0');

                const Addtemp = await AddFromDB();
                await self.setState({ addList: Addtemp });
                console.log(Addtemp);

                const sauceCustomizetemp = await CustomizeFromDB('1');
                await self.setState({ sauceCustomizeList: sauceCustomizetemp });

                const lettuceCustomizetemp = await CustomizeFromDB('4');
                await self.setState({ lettuceCustomizeList: lettuceCustomizetemp });

                await self.setState({ drinkCustomizeList: drinkCustomizetemp });
                const sidetemp = await sideFromDB(self.props.food.customize_kind_id.toString(10));

                await self.setState({ sideList: sidetemp });
                const sideCustomizetemp = await CustomizeFromDB('0');
                await self.setState({ sideCustomizeList: sideCustomizetemp });

                await console.log("set end");
            }
            catch (err) {
                console.log(err);
            }
        }
    }
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };

    handleAddtoCart = event => {
        const { cookies } = this.props;
        var data = undefined;
        event.preventDefault();
        var cookieDataTemp = JSON.stringify(cookies.get(`${this.props.user_ID}`));
        var cookieData = JSON.parse(cookieDataTemp);
        console.log(cookieData);
        const orderLenth = cookieData.order_list.length;
        var ordernumber;
        try {
            ordernumber = cookieData.order_list[orderLenth - 1].number + 1;
        }
        catch (err) {
            ordernumber = 0;
        }


        if (this.props.message === '2') {
            data = {
                number: ordernumber,
                f_name: this.props.food.f_name_EN,
                f_customize: { sauce: this.state.sauceCustomize, lectture: this.state.lettuceCustomize },
                d_name: this.state.drink,
                d_customize: this.state.drinkCustomize,
                d_price: this.state.drinkPrice,
                s_name: this.state.side,
                s_customize: this.state.sideCustomize,
                s_price: this.state.sidePrice,
                totalPrice: event.currentTarget.value,
                a_name: this.state.add,
                category_id: this.props.category_id,
                set: 2
            }
        }
        else {
            data = {
                number: ordernumber,
                f_name: this.props.food.f_name_EN,
                f_customize: { sauce: this.state.sauceCustomize, lectture: this.state.lettuceCustomize, pickles: this.state.picklesCustomize },
                totalPrice: event.currentTarget.value,
                category_id: this.props.category_id,
                set: 1
            }
        }
        cookieData.order_list.push(data);
        cookieData.total = cookieData.total + parseInt(data.totalPrice);

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


    };
    handleSauceCustomizeChange = event => {
        this.setState({ sauceCustomize: this.state.sauceCustomizeList[event.target.value - 1].option_EN });
        console.log(event.target.value);
    };

    handleSauceCustomizeClose = () => {
        this.setState({ sauceCustomizeopen: false });
        console.log(this.state.sauceCustomizeopen);
    };

    handleSauceCustomizeOpen = () => {
        this.setState({ sauceCustomizeopen: true });
        console.log(this.state.sauceCustomizeopen);
    };
    //
    handleLettuceCustomizeChange = event => {
        this.setState({ lettuceCustomize: this.state.lettuceCustomizeList[event.target.value - 1].option_EN });
        console.log(event.target.value);
    };

    handleLettuceCustomizeClose = () => {
        this.setState({ lettuceCustomizeopen: false });
        console.log(this.state.lettuceCustomizeopen);
    };

    handleLettuceCustomizeOpen = () => {
        this.setState({ lettuceCustomizeopen: true });
        console.log(this.state.lettuceCustomizeopen);
    };
    //
    handleAddChange = event => {
        this.setState({
            add: this.state.addList[event.target.value - 1].a_name_EN,
            addPrice: this.state.addList[event.target.value - 1].price
        });
        console.log(event.target.value);
    };

    handleAddClose = () => {
        this.setState({ addopen: false });
        console.log(this.state.addopen);
    };

    handleAddOpen = () => {
        this.setState({ addopen: true });
        console.log(this.state.addopen);
    };
    //

    handleDrinkChange = event => {

        this.setState({
            drink: this.state.drinkList[event.target.value].f_name_EN,
            drinkPrice: this.state.drinkList[event.target.value].price - 38,

        });
        const cu_id = this.state.drinkList[event.target.value].customize_kind_id.toString(10)
        var drinkCustomizetemp = undefined;
        CustomizeFromDB(cu_id).then( //呼叫函式建立Promise
            (value) => {//成功的話會呼叫這裡
                drinkCustomizetemp = value;
            }).then(() => {
                this.setState({ drinkCustomizeList: drinkCustomizetemp });
                console.log(drinkCustomizetemp);
            })
    };

    handleDrinkClose = () => {
        this.setState({ drinkopen: false });
        console.log(this.state.drinkopen);
    };

    handleDrinkOpen = () => {
        this.setState({ drinkopen: true });
        console.log(this.state.drinkopen);
    };
    handledrinkCustomizeChange = event => {
        this.setState({ drinkCustomize: this.state.drinkCustomizeList[event.target.value - 1].option_EN });
        console.log(event.target.value);
    };

    handledrinkCustomizeClose = () => {
        this.setState({ drinkCustomizeopen: false });
        console.log(this.state.drinkCustomizeopen);
    };

    handledrinkCustomizeOpen = () => {
        this.setState({ drinkCustomizeopen: true });
        console.log(this.state.drinkCustomizeopen);
    };
    handleSideChange = event => {
        this.setState({
            side: this.state.sideList[event.target.value - 1].s_name_EN,
            sidePrice: this.state.sideList[event.target.value - 1].price
        });
        var sideCustomizetemp = undefined;
        if (this.state.sideList[event.target.value - 1].s_id === 1 || this.state.sideList[event.target.value - 1].s_id === 7) {
            CustomizeFromDB('5').then( //呼叫函式建立Promise
                (value) => {//成功的話會呼叫這裡
                    sideCustomizetemp = value;
                }).then(() => {
                    this.setState({ sideCustomizeList: sideCustomizetemp });
                    console.log(sideCustomizetemp);
                })
        }
        console.log(this.state.sideList);
    };

    handleSideClose = () => {
        this.setState({ sideopen: false });
        console.log(this.state.sideopen);
    };

    handleSideOpen = () => {
        this.setState({ sideopen: true });
        console.log(this.state.sidekopen);
    };
    handleSideCustomizeChange = event => {
        this.setState({ sideCustomize: this.state.sideCustomizeList[event.target.value - 1].option_EN });
        console.log(event.target.value);
    };

    handleSideCustomizeClose = () => {
        this.setState({ sideCustomizeopen: false });
        console.log(this.state.sideCustomizeopen);
    };

    handleSideCustomizeOpen = () => {
        this.setState({ sideCustomizeopen: true });
        console.log(this.state.sideCustomizeopen);
    };

    // this.state.drinkPrice + this.state.sidePrice + this.state.food.price

    render() {
        console.log(this.state);

        var totalprice;
        //meal
        if (this.props.message === '2') {
            totalprice = this.state.drinkPrice + this.state.sidePrice + this.state.addPrice + this.props.food.price + 115;
            return (
                <div className="wrapper">
                    <table>
                        <tr>
                            <td className='td1'>

                                <article className="col-1">
                                    <h2 className="extra">Our Customize</h2>
                                    <dl className="list-2">
                                        <dt>Main Meal Customize</dt>
                                        <dd>.</dd>

                                    </dl>
                                    <Button className='select_button' onClick={this.handleSauceCustomizeOpen}>
                                        Sauce&emsp;&emsp;
                                    </Button>
                                    <FormControl className='select_formControl'>
                                        <InputLabel id="demo-controlled-open-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            open={this.state.sauceCustomizeopen}
                                            onClose={this.handleSauceCustomizeClose}
                                            onOpen={this.handleSauceCustomizeOpen}
                                            value={this.state.sauceCustomize}
                                        >
                                            <div className="links">
                                                <div className="storeChange">
                                                    {this.state.sauceCustomizeList.map((item) => (
                                                        <MenuItem onClick={this.handleSauceCustomizeChange} value={item.option_id} >
                                                            {item.option_EN}&emsp;
                                                        </MenuItem>
                                                    ))}
                                                </div>
                                            </div>
                                        </Select>
                                    </FormControl>
                                    <Button className='select_button' onClick={this.handleLettuceCustomizeOpen}>
                                        &emsp;Lettuce&emsp;&emsp;
                                    </Button>
                                    <FormControl className='select_formControl'>
                                        <InputLabel id="demo-controlled-open-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            open={this.state.lettuceCustomizeopen}
                                            onClose={this.handleLettuceCustomizeClose}
                                            onOpen={this.handleLettuceCustomizeOpen}
                                            value={this.state.lettuceCustomize}
                                        >
                                            <div className="links">
                                                <div className="storeChange">
                                                    {this.state.lettuceCustomizeList.map((item) => (
                                                        <MenuItem onClick={this.handleLettuceCustomizeChange} value={item.option_id} >
                                                            {item.option_EN}&emsp;
                                                        </MenuItem>
                                                    ))}
                                                </div>
                                            </div>
                                        </Select>
                                    </FormControl>
                                </article>

                                <article className="col-1">




                                    <div className="clear"></div>
                                </article>
                                <article className="col-1">
                                    <dl className="list-2">
                                        <dd>.</dd>
                                        <dt>Drink Customize</dt>
                                        <dd>.</dd>

                                    </dl>
                                    <Button className='select_button' onClick={this.handleDrinkOpen}>
                                        Select Drink&emsp;&emsp;
                                    </Button>
                                    <FormControl className='select_formControl'>
                                        <InputLabel id="demo-controlled-open-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            open={this.state.drinkopen}
                                            onClose={this.handleDrinkClose}
                                            onOpen={this.handleDrinkOpen}
                                            value={this.state.drink}
                                        >
                                            <div className="links">
                                                <div className="storeChange">
                                                    {this.state.drinkList.map((item, i) => (
                                                        <MenuItem onClick={this.handleDrinkChange} value={i} >
                                                            + ${item.price - 38}&emsp;{item.f_name_EN}
                                                        </MenuItem>
                                                    ))}
                                                </div>
                                            </div>
                                        </Select>
                                    </FormControl>
                                    <Button className='select_button' onClick={this.handledrinkCustomizeOpen}>
                                        &emsp;&emsp;Select Drink Customize&emsp;
                                    </Button>
                                    <FormControl className='select_formControl'>
                                        <InputLabel id="demo-controlled-open-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            open={this.state.drinkCustomizeopen}
                                            onClose={this.handledrinkCustomizeClose}
                                            onOpen={this.handledrinkCustomizeOpen}
                                            value={this.state.drinkCustomize}

                                        >
                                            <div className="links">
                                                <div className="storeChange">
                                                    {this.state.drinkCustomizeList.map((item) => (
                                                        <MenuItem onClick={this.handledrinkCustomizeChange} value={item.option_id} >
                                                            {item.option_EN}&emsp;
                                                        </MenuItem>
                                                    ))}
                                                </div>
                                            </div>
                                        </Select>
                                    </FormControl>
                                    <dl className="list-2">
                                        <dd>.</dd>
                                        <dt>Side Customize</dt>
                                        <dd>.</dd>

                                    </dl>

                                    <div className="clear"></div>
                                </article>
                                <article className="col-2">

                                    <Button className='select_button' onClick={this.handleSideOpen}>
                                        Select Side&emsp;&emsp;
                                    </Button>
                                    <FormControl className='select_formControl'>
                                        <InputLabel id="demo-controlled-open-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            open={this.state.sideopen}
                                            onClose={this.handleSideClose}
                                            onOpen={this.handleSideOpen}
                                            value={this.state.side}

                                        >
                                            <div className="links">
                                                <div className="storeChange">
                                                    {this.state.sideList.map((item) => (
                                                        <MenuItem onClick={this.handleSideChange} value={item.s_id} >
                                                            ${item.price}&emsp;{item.s_name_EN}
                                                        </MenuItem>
                                                    ))}
                                                </div>
                                            </div>
                                        </Select>
                                    </FormControl>
                                    <Button className='select_button' value={totalprice} onClick={this.handleSideCustomizeOpen}>
                                        Select Side Customize&emsp;&emsp;
                                    </Button>
                                    <FormControl className='select_formControl'>
                                        <InputLabel id="demo-controlled-open-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            open={this.state.sideCustomizeopen}
                                            onClose={this.handleSideCustomizeClose}
                                            onOpen={this.handleSideCustomizeOpen}
                                            value={this.state.sideCustomize}

                                        >
                                            <div className="links">
                                                <div className="storeChange">
                                                    {this.state.sideCustomizeList.map((item) => (
                                                        <MenuItem onClick={this.handleSideCustomizeChange} value={item.option_id} >
                                                            {item.option_EN}&emsp;
                                                        </MenuItem>
                                                    ))}
                                                </div>
                                            </div>
                                        </Select>
                                    </FormControl>
                                    <br /><br /><div></div>
                                </article>
                                <article className="col-2">
                                    <dl className="list-2">
                                        <dd>.</dd>
                                        <dt>Select discount product</dt>
                                        <dd>.</dd>


                                    </dl>

                                    <Button className='select_button' onClick={this.handleAddOpen}>
                                        Add discount product&emsp;&emsp;
                                    </Button>
                                    <FormControl className='select_formControl'>
                                        <InputLabel id="demo-controlled-open-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            open={this.state.addopen}
                                            onClose={this.handleAddClose}
                                            onOpen={this.handleAddOpen}
                                            value={this.state.add}

                                        >
                                            <div className="links">
                                                <div className="storeChange">
                                                    {this.state.addList.map((item) => (
                                                        <MenuItem onClick={this.handleAddChange} value={item.a_id} >
                                                            ${item.price}&emsp;{item.a_name_EN}
                                                        </MenuItem>
                                                    ))}
                                                </div>
                                            </div>
                                        </Select>
                                    </FormControl>
                                </article>
                            </td>
                            <td className="td2">
                                <h2 className="extra">Your Order &emsp;&emsp;&emsp;&emsp;&emsp;</h2>
                                <ul className="list">
                                    <li className='lii'>{this.props.food.f_name_EN}<br />&emsp;- {this.state.sauceCustomize}<br />&emsp;- {this.state.lettuceCustomize}</li>
                                    <li className='lii'>{this.state.drink}<br />&emsp;- {this.state.drinkCustomize}</li>
                                    <li className='lii'>{this.state.side}<br />&emsp;- {this.state.sideCustomize}</li>
                                    <li className='lii'>{this.state.add}</li>
                                </ul>
                                <br /><br />
                                <h2>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Total Price&emsp;$ {totalprice}</h2>
                                <br /><br />
                                <Button className='select_button' value={totalprice} onClick={this.handleAddtoCart}>
                                    Add to Cart
                                </Button>

                            </td>
                        </tr>
                    </table >
                </div >
            );
        }
        //single
        else {
            totalprice = this.props.food.price;
            return (
                <div className="wrapper">
                    <table><tr><td>
                        <article className="td3" >
                            <h2 className="extra">Our Customize</h2>
                            <dl className="list-2">

                                <dt>Select main Customize</dt>
                                <dd>.</dd>


                            </dl>
                            <Button className='select_button' onClick={this.handleDrinkOpen}>
                                main Customize List&emsp;&emsp;
                            </Button>
                            <FormControl className='select_formControl'>
                                <InputLabel id="demo-controlled-open-select-label"></InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={this.state.sauceCustomizeopen}
                                    onClose={this.handleSauceCustomizeClose}
                                    onOpen={this.handleSauceCustomizeOpen}
                                    value={this.state.sauceCustomize}
                                >
                                    <div className="links">
                                        <div className="storeChange">
                                            {this.state.sauceCustomizeList.map((item) => (
                                                <MenuItem onClick={this.handleSauceCustomizeChange} value={item.option_id} >
                                                    {item.option_EN}&emsp;
                                                </MenuItem>
                                            ))}
                                        </div>
                                    </div>
                                </Select>
                            </FormControl>
                            <Button className='select_button' onClick={this.handleLettuceCustomizeOpen}>
                                &emsp;Lettuce&emsp;&emsp;
                            </Button>
                            <FormControl className='select_formControl'>
                                <InputLabel id="demo-controlled-open-select-label"></InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={this.state.lettuceCustomizeopen}
                                    onClose={this.handleLettuceCustomizeClose}
                                    onOpen={this.handleLettuceCustomizeOpen}
                                    value={this.state.lettuceCustomize}
                                >
                                    <div className="links">
                                        <div className="storeChange">
                                            {this.state.lettuceCustomizeList.map((item) => (
                                                <MenuItem onClick={this.handleLettuceCustomizeChange} value={item.option_id} >
                                                    {item.option_EN}&emsp;
                                                </MenuItem>
                                            ))}
                                        </div>
                                    </div>
                                </Select>
                            </FormControl>
                        </article>
                    </td>
                        <td>



                            <article className="td4">
                                <h2 className="extra">Your Order &emsp;&emsp;&emsp;&emsp;&emsp;</h2>
                                <ul className="list">
                                    <li className='lii'>{this.props.food.f_name_EN}<br />&emsp;- {this.state.sauceCustomize}<br />&emsp;- {this.state.lettuceCustomize}</li>
                                </ul>

                                <br /><br />
                                <h2>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Total Price&emsp;$ {totalprice}</h2>
                                <br /><br />
                                <Button className='select_button' value={totalprice} onClick={this.handleAddtoCart}>
                                    Add to Cart
                                </Button>
                            </article>
                        </td>
                    </tr>
                    </table>


                </div>

            )
        }

    }
}

export default withCookies(SetMealEN)
