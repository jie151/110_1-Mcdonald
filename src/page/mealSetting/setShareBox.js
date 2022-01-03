
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
import ShareFromDB from './shareFromDB'

// import FontAwesome from 'react-fontawesome';
import './intro.css'
import './mealsetting.css'
const colors = [
    { value: 'red', text: 'Red' },
    { value: 'yellow', text: 'Yellow' },
    { value: 'blue', text: 'Blue' }
];
class SetShareBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_ID: this.props.user_ID,
            shareList: [],
            add: undefined,
            addList: [],
            addPrice: 0,

            drinkopen1: false,
            drinkCustomizeopen1: false,
            drinkopen2: false,
            drinkCustomizeopen2: false,

            sideCustomizeopen: false,
            side: undefined,
            sideCustomize: '正常',

            drinkList: [],
            drinkCustomizeList1: [],
            drink1: '中杯可口可樂',
            drinkCustomize1: "冰塊正常",
            drinkPrice1: 0,
            food: undefined,

            drinkCustomizeList2: [],
            drink2: '中杯可口可樂',
            drinkCustomize2: "冰塊正常",
            drinkPrice2: 0,

            totalPrice: 0,
        };



        this.handleAddChange = this.handleAddChange.bind(this);
        this.handleAddClose = this.handleAddClose.bind(this);
        this.handleAddOpen = this.handleAddOpen.bind(this);


        this.handleDrinkChange1 = this.handleDrinkChange1.bind(this);
        this.handleDrinkClose1 = this.handleDrinkClose1.bind(this);
        this.handleDrinkOpen1 = this.handleDrinkOpen1.bind(this);
        this.handledrinkCustomizeChange1 = this.handledrinkCustomizeChange1.bind(this);
        this.handledrinkCustomizeClose1 = this.handledrinkCustomizeClose1.bind(this);
        this.handledrinkCustomizeOpen1 = this.handledrinkCustomizeOpen1.bind(this);

        this.handleDrinkChange2 = this.handleDrinkChange2.bind(this);
        this.handleDrinkClose2 = this.handleDrinkClose2.bind(this);
        this.handleDrinkOpen2 = this.handleDrinkOpen2.bind(this);
        this.handledrinkCustomizeChange2 = this.handledrinkCustomizeChange2.bind(this);
        this.handledrinkCustomizeClose2 = this.handledrinkCustomizeClose2.bind(this);
        this.handledrinkCustomizeOpen2 = this.handledrinkCustomizeOpen2.bind(this);

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

        var self = this;

        getMealData(self);

        async function getMealData(self) {
            try {
                console.log("setShareBox.js => set start");

                const sharetemp = await ShareFromDB(self.props.f_id);
                const sharetemp1 = await ShareFromDB(self.props.f_id);

                console.log("setShareBox.js => after set start");

                await self.setState({ shareList: sharetemp });

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
                // console.log(Addtemp);

                const sauceCustomizetemp = await CustomizeFromDB(self.props.food.customize_kind_id.toString(10));
                await self.setState({ sauceCustomizeList: sauceCustomizetemp });

                const lettuceCustomizetemp = await CustomizeFromDB('4');
                await self.setState({ lettuceCustomizeList: lettuceCustomizetemp });

                await self.setState({ drinkCustomizeList: drinkCustomizetemp });
                var sidetemp = await sharetemp;
                var arrAdd = 0;
                for (var j = 0; j < sidetemp.length - arrAdd; j++) {
                    if (sidetemp[j].f_id === 49) {
                        sidetemp.splice(j, 1);
                        arrAdd++;
                    }
                    if (sidetemp[j].f_id > 100) {
                        sidetemp.splice(j, 1);
                        arrAdd++;
                    }
                }
                var sidet = sidetemp.find(function (e) {
                    return e.f_id > 0;
                });
                var s_name = sidet.s_name + "  * " + sidet.box_count;
                await self.setState({ side: s_name });

                var sidetemp1 = await sharetemp1;
                var sidet1 = sidetemp1.find(function (e) {
                    return e.f_id > 100;
                });

                await self.setState({ food: sidet1.s_name });


                const sideCustomizetemp = await CustomizeFromDB('0');
                await self.setState({ sideCustomizeList: sideCustomizetemp });

                await console.log("set esetShareBox.js => set end");
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

        data = {
            f_name: this.props.food.f_name,
            d_name1: this.state.drink1,
            d_name2: this.state.drink2,
            d_customize1: this.state.drinkCustomize1,
            d_customize2: this.state.drinkCustomize2,
            s_name: this.state.side,
            totalPrice: event.currentTarget.value,
            a_name: this.state.add,
            category_id: this.props.category_id
        }


        try {
            cookies.set(this.props.user_ID, JSON.stringify(data), { path: "/" });

        }
        catch (err) {
            console.log(err);
        }

        var cookieDataTemp = JSON.stringify(cookies.get(`${this.state.user_ID}`));
        var cookieData = JSON.parse(cookieDataTemp);
        console.log(cookieData);
    };

    //
    handleAddChange = event => {
        this.setState({
            add: this.state.addList[event.target.value - 1].a_name,
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

    handleDrinkChange1 = event => {

        this.setState({
            drink1: this.state.drinkList[event.target.value].f_name,
            drinkPrice1: this.state.drinkList[event.target.value].price - 38,

        });
        const cu_id = this.state.drinkList[event.target.value].customize_kind_id.toString(10)
        var drinkCustomizetemp = undefined;
        CustomizeFromDB(cu_id).then( //呼叫函式建立Promise
            (value) => {//成功的話會呼叫這裡
                drinkCustomizetemp = value;
            }).then(() => {
                this.setState({ drinkCustomizeList1: drinkCustomizetemp });
                console.log(drinkCustomizetemp);
            })
    };

    handleDrinkClose1 = () => {
        this.setState({ drinkopen1: false });
        console.log(this.state.drinkopen1);
    };

    handleDrinkOpen1 = () => {
        this.setState({ drinkopen1: true });
        console.log(this.state.drinkopen1);
    };
    handledrinkCustomizeChange1 = event => {
        this.setState({ drinkCustomize1: this.state.drinkCustomizeList1[event.target.value - 1].option_name });
        console.log(event.target.value);
    };

    handledrinkCustomizeClose1 = () => {
        this.setState({ drinkCustomizeopen1: false });
        console.log(this.state.drinkCustomizeopen1);
    };

    handledrinkCustomizeOpen1 = () => {
        this.setState({ drinkCustomizeopen1: true });
        console.log(this.state.drinkCustomizeopen1);
    };
    handleDrinkChange2 = event => {

        this.setState({
            drink2: this.state.drinkList[event.target.value].f_name,
            drinkPrice2: this.state.drinkList[event.target.value].price - 38,

        });
        const cu_id = this.state.drinkList[event.target.value].customize_kind_id.toString(10)
        var drinkCustomizetemp = undefined;
        CustomizeFromDB(cu_id).then( //呼叫函式建立Promise
            (value) => {//成功的話會呼叫這裡
                drinkCustomizetemp = value;
            }).then(() => {
                this.setState({ drinkCustomizeList2: drinkCustomizetemp });
                console.log(drinkCustomizetemp);
            })
    };

    handleDrinkClose2 = () => {
        this.setState({ drinkopen2: false });
        console.log(this.state.drinkopen2);
    };

    handleDrinkOpen2 = () => {
        this.setState({ drinkopen2: true });
        console.log(this.state.drinkopen2);
    };
    handledrinkCustomizeChange2 = event => {
        this.setState({ drinkCustomize2: this.state.drinkCustomizeList2[event.target.value - 1].option_name });
        console.log(event.target.value);
    };

    handledrinkCustomizeClose2 = () => {
        this.setState({ drinkCustomizeopen2: false });
        console.log(this.state.drinkCustomizeopen2);
    };

    handledrinkCustomizeOpen2 = () => {
        this.setState({ drinkCustomizeopen2: true });
        console.log(this.state.drinkCustomizeopen2);
    };
    handleSideChange = event => {
        this.setState({
            side: this.state.sideList[event.target.value - 1].s_name,
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
        this.setState({ sideCustomize: this.state.sideCustomizeList[event.target.value - 1].option_name });
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
        console.log(this.state.food);
        var totalprice;
        //meal

        totalprice = this.state.drinkPrice1 + this.state.drinkPrice2 + this.state.addPrice + this.props.food.price;
        return (
            <div class="wrapper">
                <table>
                    <tr>
                        <td className='td1'>



                            <article class="col-1">




                                <div class="clear"></div>
                            </article>
                            <article class="col-1">
                                <dl class="list-2">
                                    <dd>.</dd>
                                    <dt>Drink Customize</dt>
                                    <dd>.</dd>

                                </dl>
                                <Button className='select_button' onClick={this.handleDrinkOpen1}>
                                    Select Drink&emsp;&emsp;
                                </Button>
                                <FormControl className='select_formControl'>
                                    <InputLabel id="demo-controlled-open-select-label"></InputLabel>
                                    <Select
                                        labelId="demo-controlled-open-select-label"
                                        id="demo-controlled-open-select"
                                        open={this.state.drinkopen1}
                                        onClose={this.handleDrinkClose1}
                                        onOpen={this.handleDrinkOpen1}
                                        value={this.state.drink1}
                                    >
                                        <div className="links">
                                            <div className="storeChange">
                                                {this.state.drinkList.map((item, i) => (
                                                    <MenuItem onClick={this.handleDrinkChange1} value={i} >
                                                        + ${item.price - 38}&emsp;{item.f_name}
                                                    </MenuItem>
                                                ))}
                                            </div>
                                        </div>
                                    </Select>
                                </FormControl>
                                <Button className='select_button' onClick={this.handledrinkCustomizeOpen1}>
                                    &emsp;&emsp;Select Drink Customize&emsp;
                                </Button>
                                <FormControl className='select_formControl'>
                                    <InputLabel id="demo-controlled-open-select-label"></InputLabel>
                                    <Select
                                        labelId="demo-controlled-open-select-label"
                                        id="demo-controlled-open-select"
                                        open={this.state.drinkCustomizeopen1}
                                        onClose={this.handledrinkCustomizeClose1}
                                        onOpen={this.handledrinkCustomizeOpen1}
                                        value={this.state.drinkCustomize1}

                                    >
                                        <div className="links">
                                            <div className="storeChange">
                                                {this.state.drinkCustomizeList1.map((item) => (
                                                    <MenuItem onClick={this.handledrinkCustomizeChange1} value={item.option_id} >
                                                        {item.option_name}&emsp;
                                                    </MenuItem>
                                                ))}
                                            </div>
                                        </div>
                                    </Select>
                                </FormControl>


                                <div class="clear"></div>
                            </article>
                            <article class="col-1">
                                <dl class="list-2">
                                    <dd>.</dd>
                                    <dt>Drink Customize</dt>
                                    <dd>.</dd>

                                </dl>
                                <Button className='select_button' onClick={this.handleDrinkOpen2}>
                                    Select Drink&emsp;&emsp;
                                </Button>
                                <FormControl className='select_formControl'>
                                    <InputLabel id="demo-controlled-open-select-label"></InputLabel>
                                    <Select
                                        labelId="demo-controlled-open-select-label"
                                        id="demo-controlled-open-select"
                                        open={this.state.drinkopen2}
                                        onClose={this.handleDrinkClose2}
                                        onOpen={this.handleDrinkOpen2}
                                        value={this.state.drink2}
                                    >
                                        <div className="links">
                                            <div className="storeChange">
                                                {this.state.drinkList.map((item, i) => (
                                                    <MenuItem onClick={this.handleDrinkChange2} value={i} >
                                                        + ${item.price - 38}&emsp;{item.f_name}
                                                    </MenuItem>
                                                ))}
                                            </div>
                                        </div>
                                    </Select>
                                </FormControl>
                                <Button className='select_button' onClick={this.handledrinkCustomizeOpen2}>
                                    &emsp;&emsp;Select Drink Customize&emsp;
                                </Button>
                                <FormControl className='select_formControl'>
                                    <InputLabel id="demo-controlled-open-select-label"></InputLabel>
                                    <Select
                                        labelId="demo-controlled-open-select-label"
                                        id="demo-controlled-open-select"
                                        open={this.state.drinkCustomizeopen2}
                                        onClose={this.handledrinkCustomizeClose2}
                                        onOpen={this.handledrinkCustomizeOpen2}
                                        value={this.state.drinkCustomize2}

                                    >
                                        <div className="links">
                                            <div className="storeChange">
                                                {this.state.drinkCustomizeList2.map((item) => (
                                                    <MenuItem onClick={this.handledrinkCustomizeChange2} value={item.option_id} >
                                                        {item.option_name}&emsp;
                                                    </MenuItem>
                                                ))}
                                            </div>
                                        </div>
                                    </Select>
                                </FormControl>


                                <div class="clear"></div>
                            </article>

                            <article class="col-2">
                                <dl class="list-2">
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
                                                        ${item.price}&emsp;{item.a_name}
                                                    </MenuItem>
                                                ))}
                                            </div>
                                        </div>
                                    </Select>
                                </FormControl>
                            </article>
                        </td>
                        <td class="td2">
                            <h2 class="extra">Your Order &emsp;&emsp;&emsp;&emsp;&emsp;</h2>
                            <ul class="list">
                                <li className='lii'>{this.props.food.f_name}<br />&emsp;- {this.state.food}</li>
                                <li className='lii'>{this.state.side}</li>
                                <li className='lii'>{this.state.drink1}<br />&emsp;- {this.state.drinkCustomize1}</li>
                                <li className='lii'>{this.state.drink2}<br />&emsp;- {this.state.drinkCustomize2}</li>
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
}

export default withCookies(SetShareBox)
