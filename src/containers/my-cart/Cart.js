import React, { Component } from "react";
import * as actionType from '../../store/action/index';
import { connect } from 'react-redux';
import classes from "./Cart.module.css";
import {Link} from 'react-router-dom';
import { Icon } from '@iconify/react';
import deleteOutlined from '@iconify/icons-ant-design/delete-outlined';
class Cart extends Component {
    componentDidMount(){
        this.props.loadcart();
    }
    loadCart(){
        let data = this.props.cart;
        let productCarts = data.map((el, ind) => {
            return <tr key={"cart_item__"+el.id}>
                <td>{ind + 1}</td>
                <td>{el.title}</td>
                <td><img src={el.image} className={classes.product_img} alt={el.title} /></td>
                <td><a style={{fontSize:'25px',color:'red'}} onClick={() => this.props.remove_from_cart(el.id)}><Icon icon={deleteOutlined} /></a></td>
                <td>{el.price}</td>
            </tr>
        });
        return productCarts;
    }
    render() {
        return (
            <div>
                <h1 style={{textAlign:'center'}}>My Cart</h1>
                <table border="1" className="table">
                    <thead>
                        <tr className={classes.table_head}>
                            <td>#</td>
                            <td>Name</td>
                            <td>Image</td>
                            <td>Action</td>
                            <td>Price</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.loadCart()}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="4"></td>
                            <td>Grand Total : ${this.props.price}</td>
                        </tr>
                    </tfoot>
                </table>
                <Link className="btn btn-danger text-white" style={{ float: 'left', marginLeft: '50px'}} to="/">Continue Shopping</Link>
                <Link className="btn btn-warning text-white" style={{ float: 'right', marginRight: '50px' }} to="/checkout" disabled>Proceed to checkout</Link>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        cart: state.Cart_Reducer.carts,
        price: state.Cart_Reducer.total,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        remove_from_cart: (p_id) => dispatch(actionType.remove_from_cart(p_id)),
        loadcart: ()=> dispatch(actionType.load_cart())
    }
}   
export default connect(mapStateToProps, mapDispatchToProps)(Cart);