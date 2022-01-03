import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withCookies, Cookies } from "react-cookie";
import Button from '@material-ui/core/Button';
import './intro.css';
import './mealsetting.css';
import SetMealCN from './SingleorMealEN';
import foodFromDB from './foodFromDB';
import ShareBoxEN from './shareBoxEN';
import ShareBoxCN from './shareBoxCN';
import SelectSetOrSingleEN from './selectSetOrSingleEN';
import SelectSetOrSingleCN from './selectSetOrSingleCN';
import SingleEN from './singleEN';
import SingleCN from './singleCN';
import { Link } from "react-router-dom"


class Foodintro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category_id: parseInt(this.props.category_id),
            f_id: parseInt(this.props.f_id),
            user_ID: parseInt(this.props.user_ID),
            categoryPath: this.props.categoryPath,
        };
    }

    componentDidMount() {
        if (this.props.category_id === undefined) {
            this.run(this.props.category_id);
        }

        if (this.props.f_id === undefined) {
            this.run(this.props.f_id);
        }
        if (this.props.user_ID === undefined) {
            this.run(this.props.user_ID);
        }
        if (this.props.language === undefined) {
            this.run(this.props.language);
        }
    }
    render() {
        // console.log(this.state.f_id);
        // if(this.props.language === "中文"){

        // }
        if (this.props.language === "English") {

            if (this.state.category_id === 1) {
                return (
                    <div className='foodIntro'>
                        <Link to="/cart">
                            <img alt='cart' className="cart_img" src={require('./images/cart.png')} />
                        </Link>
                        <Link to={`/classification/${this.state.categoryPath}`}>
                            <Button className='button_back_to_menu' variant='outlined'>Back to menu</Button>
                        </Link>

                        <ShareBoxEN f_id={this.state.f_id} category_id={this.state.category_id} user_ID={this.state.user_ID} />

                    </div>

                );
            }
            else if (this.state.category_id === 2 || this.state.category_id === 3) {
                return (
                    <div className='foodIntro'>
                        <Link to="/cart">
                            <img alt='cart' className="cart_img" src={require('./images/cart.png')} />
                        </Link>
                        <Link to={`/classification/${this.state.categoryPath}`}>
                            <Button className='button_back_to_menu' variant='outlined'>Back to menu</Button>
                        </Link>
                        <SelectSetOrSingleEN f_id={this.state.f_id} category_id={this.state.category_id} user_ID={this.state.user_ID} />

                    </div>

                );
            }
            // else if (this.props.category_id === 4 || this.props.category_id === 5 || this.props.category_id === 6 || this.props.category_id === 7 || this.props.category_id === 11) {
            else {
                return (
                    <div className='foodIntro'>
                        <Link to="/cart">
                            <img alt='cart' className="cart_img" src={require('./images/cart.png')} />
                        </Link>
                        <Link to={`/classification/${this.state.categoryPath}`}>
                            <Button className='button_back_to_menu' variant='outlined' >Back to menu</Button>
                        </Link>
                        <SingleEN f_id={this.state.f_id} category_id={this.state.category_id} user_ID={this.state.user_ID} />

                    </div>

                )
            }
        }
        else {
            if (this.state.category_id === 1) {
                return (
                    <div className='foodIntro'>
                        <Link to="/cart">
                            <img alt='cart' className="cart_img" src={require('./images/cart.png')} />
                        </Link>
                        <Link to={`/classification/${this.state.categoryPath}`}>
                            <Button className='button_back_to_menu' variant='outlined' >回到菜單</Button>
                        </Link>

                        <ShareBoxCN f_id={this.state.f_id} category_id={this.state.category_id} user_ID={this.state.user_ID} />

                    </div>

                );
            }
            else if (this.state.category_id === 2 || this.state.category_id === 3) {
                return (
                    <div className='foodIntro'>
                        <Link to="/cart">
                            <img alt='cart' className="cart_img" src={require('./images/cart.png')} />
                        </Link>
                        <Link to={`/classification/${this.state.categoryPath}`}>
                            <Button className='button_back_to_menu' variant='outlined'>回到菜單</Button>
                        </Link>
                        <SelectSetOrSingleCN f_id={this.state.f_id} category_id={this.state.category_id} user_ID={this.state.user_ID} />

                    </div>

                );
            }
            // else if (this.props.category_id === 4 || this.props.category_id === 5 || this.props.category_id === 6 || this.props.category_id === 7 || this.props.category_id === 11) {
            else {
                return (
                    <div className='foodIntro'>
                        <Link to="/cart">
                            <img alt='cart' className="cart_img" src={require('./images/cart.png')} />
                        </Link>
                        <Link to={`/classification/${this.state.categoryPath}`}>
                            <Button className='button_back_to_menu' variant='outlined'>回到菜單</Button>
                        </Link>
                        <SingleCN f_id={this.state.f_id} category_id={this.state.category_id} user_ID={this.state.user_ID} />

                    </div>

                )
            }
        }
    }

}
export default withCookies(Foodintro);

