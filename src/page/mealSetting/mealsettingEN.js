import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withCookies, Cookies } from "react-cookie";
import Button from '@material-ui/core/Button';
import './intro.css';
import './mealsetting.css';
import SetMealEN from './SingleorMealEN';
import foodFromDB from './foodFromDB';
class MealSettingEN extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            singleormeal: '2',//meal
            food: {},
            f_id: this.props.f_id
        };

        // 為了讓 `this` 能在 callback 中被使用，這裡的綁定是必要的：
        this.handleSingleSubmit = this.handleSingleSubmit.bind(this);
        this.handleMealSubmit = this.handleMealSubmit.bind(this);
    }
    componentDidMount() {
        var self = this;

        if (this.props.f_id === undefined) {
            this.run(this.props.f_id);
        }
        if (this.props.user_ID === undefined) {
            this.run(this.props.user_ID);
        }
        if (this.props.category_id === undefined) {
            this.run(this.props.category_id);
        };
        setdata(self);
        async function setdata(self) {
            try {
                const foodtemp = await foodFromDB(self.props.f_id.toString(10));
                await self.setState({ food: foodtemp });
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    // const[SingleorMeal, setSingleorMeal] = React.useState(1);
    handleSingleSubmit() {
        this.setState({ singleormeal: '1' });

    }
    handleMealSubmit() {
        this.setState({ singleormeal: '2' });

    }

    render() {
        console.log(this.state);

        return (
            <div className="Ibody" >
                <div className="Ititle"></div>
                <div className="Ibox">
                    <div className="Ipicture">
                    </div>
                    <div classsName="inner">
                        <div classsName="wrapper">
                            <h2 classsName="extra">About &emsp;{this.state.food['f_name_EN']}</h2>
                            <img src={this.state.food.picture} classsName="fleft" alt="" />
                            <div className="deteail_text">
                                <div className='foodname'>
                                    <p>{this.state.food['f_name_EN']}&emsp;&emsp;&emsp;&emsp;NT.{this.state.food['price']} UP</p>
                                </div>
                                <br />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleSingleSubmit}
                                >
                                    SINGLE
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleMealSubmit}
                                >
                                    MEAL
                                </Button>

                                <p>.</p>
                            </div>
                            <h2 classsName="link">more about us</h2>
                            <div classsName="clear"></div>
                            <div>< SetMealEN message={this.state.singleormeal} category_id={this.props.category_id} food={this.state.food} user_ID={this.props.user_ID}  /></div>

                        </div>
                    </div>
                </div>
            </div>


        );
    }

}
export default withCookies(MealSettingEN);

{/* <label>
                                單點或套餐:
                                <select className='select' value={color} onChange={handleChange}>
                                    {colors.map(item => {
                                        return (<option key={item.value} value={item.value}>{item.text}</option>);
                                    })}
                                </select>
                            </label> */}