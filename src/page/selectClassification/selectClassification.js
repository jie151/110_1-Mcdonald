import React from "react";
import {Link} from "react-router-dom"
import "./selectClassification.css"
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function SelectClassification(props)
{
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const Category = props.category;
    const Name = props.name;
    console.log("selectClassification => CookieID:", Name)
    const language = props.language;
    var chinese = true;
    if (language === "English"){
        chinese = false;
    }
    
    return(
        <div className="select_menu_button">
        <div >
            <Button
                id="demo-positioned-button"
                className="menu-button"
                aria-controls="demo-positioned-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleMenuClick}
                size="large"
                variant="outlined"
                color="secondary"
            >
                <h2 color="secondary">{(chinese)?"菜單":"Menu"}</h2>
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
            >
                {Category.map(c => {
                    if (language === "中文")
                    {
                        return (
                            <Link key={c.category_id} to={`/classification/${c.path}` }>
                                <MenuItem className="classification_Button" key={c.category_id}><Button >{c.category}</Button></MenuItem> 
                            </Link>
                        )
                    }
                    return (
                            <Link key={c.category_id} to={`/classification/${c.path}` }>
                                <MenuItem className="classification_Button" key={c.category_id}><Button>{c.category_EN}</Button></MenuItem>
                            </Link>
                    )   
                })}   
            </Menu>
            </div>
        </div>
    );
}

/*
<Link to="/classification/top">
                    <button className="classification_Button">Top 12</button>
            </Link>
<nav>
                {Category.map(c => {
                    if (language === "中文")
                    {
                        return (
                            <Link key={c.category_id} to={`/classification/${c.path}` }>
                                <button className="classification_Button" key={c.category_id}>{c.category}</button> 
                            
                            
                            </Link>
                        )
                    }
                    return (
                            <Link key={c.category_id} to={`/classification/${c.path}` }>
                            <button className="classification_Button" key={c.category_id}>{c.category_EN}</button>
                            </Link>
                    )   
                })}
</nav>
*/