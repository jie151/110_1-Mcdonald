import React from 'react';
import { withCookies } from "react-cookie";
import Button from '@material-ui/core/Button';
import './intro.css';
import './mealsetting.css';
import SetMealCN from './SingleorMealCN';
import foodFromDB from './foodFromDB';
class SelectSetOrSingleCN extends React.Component {
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
        console.log(this.state.f_id);

        return (
            <div className="Ibody" >
                <div className="Ititle"></div>
                <div className="Ibox">
                    <div className="Ipicture">
                    </div>
                    <div className="inner">
                        <div classsName="wrapper">
                            <h2 classsName="extra">About {this.state.food['f_name']}</h2>
                            <img src={this.state.food.picture} classsName="fleft" alt="" />
                            <div className="deteail_text">
                                <div className='foodname'>
                                    <p>{this.state.food['f_name']}&emsp;&emsp;&emsp;&emsp;NT.{this.state.food['price']} 起</p>
                                </div>
                                <br />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleSingleSubmit}
                                >
                                    單點
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleMealSubmit}
                                >
                                    套餐
                                </Button>

                                <p>.</p>
                            </div>
                            <h2 classsName="link">詳細資訊</h2>
                            <div classsName="clear"></div>
                            <div>< SetMealCN message={this.state.singleormeal} food={this.state.food} category_id={this.props.category_id} user_ID={this.props.user_ID} /></div>

                        </div>
                    </div>
                </div>
            </div>


        );
    }

}
export default withCookies(SelectSetOrSingleCN);