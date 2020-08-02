import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'
const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Home</NavigationItem>
        {/* {props.isAuthenticated ? <NavigationItem link="/order">Order</NavigationItem> : null}
        {
            !props.isAuthenticated ?
                <NavigationItem link="/auth">Authentication</NavigationItem>
                : <NavigationItem link="/logout">Log out</NavigationItem>
        } */}
        <NavigationItem link="/my-cart">My cart</NavigationItem>
        <NavigationItem link="/checkout">Checkout</NavigationItem>
    </ul>
);
export default NavigationItems