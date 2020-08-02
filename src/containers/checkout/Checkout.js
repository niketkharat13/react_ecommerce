import React, { Component } from "react";
import { connect } from 'react-redux';
import classes from './Checkout.module.css';
import Input from '../../components/Input/Input';
import {Link} from 'react-router-dom';
import * as actionCreaters from '../../store/action/index';
import {
    updateState,
    checkValidity
} from '../../shared/utility';
class Checkout extends Component{
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 35
                },
                valid: false,
                touched: false
            },
            address: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea',
                    placeholder: 'Enter your address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            paymentMode: {
                elementType: 'select',
                elementConfig: {
                    options: [{
                        value: '1',
                        displayValue: 'Online'
                    }, {
                        value: '2',
                        displayValue: 'COD'
                    }]
                },
                value: '',
                valid: true,
                validation: {},
                touched: false
            },
            email: {
                elementType: 'input',

                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your E-Mail'
                },
                value: '',
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            },
            phoneNumber: {
                elementType: 'input',

                elementConfig: {
                    type: 'tel',
                    placeholder: 'Enter your phone #'
                },
                value: '',
                valid: false,
                validation: {
                    required: true,
                    minLength: 10,
                    maxLength: 12
                },
                touched: false
            }
        },
        formValid: false,
        price: 0
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }
    submitHandler = (event) => {
        event.preventDefault();
        const customer_details = {};
        for (let i in this.state.orderForm) {
            customer_details[i] = this.state.orderForm[i].value;
        }
        const newObj = {
            customer_details,
            products: this.props.products,
            price: this.props.total
        }
        console.log(newObj);
        this.props.orderSubmit(newObj);
        this.props.history.push("/");
    }
    inputHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateState(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            touched: true,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation)
        });
        const updatedForm = updateState(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        })
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let k in updatedForm) {
            formIsValid = updatedForm[k].valid && formIsValid;
        }
        this.setState({
            orderForm: updatedForm,
            formValid: formIsValid
        });

    }
    render(){
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.submitHandler}>
                {
                    formElementArray.map(ele => (
                        <Input key={ele.id}
                            elementType={ele.config.elementType}
                            elementConfig={ele.config.elementConfig}
                            value={ele.config.elementConfig.value}
                            valid={!ele.config.valid}
                            validation={ele.config.validation}
                            touched={ele.config.touched}
                            changed={(event) => this.inputHandler(event, ele.id)}
                        />
                    ))
                }
                <div style={{padding:'10px'}}>
                    <button className="btn btn-success" style={{float:'right'}} disabled={!this.state.formValid}>Submit</button>
                    <Link className="btn btn-danger" to="/my-cart" style={{ float: 'left' }}>Go to Cart</Link>
                </div>
            </form>
        )
        return(
            <div className={classes.ContactData}>
                <h4>Checkout Form</h4>
                {form}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        products: state.Cart_Reducer.carts,
        total: state.Cart_Reducer.total
    }
}
const mapDispatchToProps = dispatch => {
    return {
        orderSubmit: (orderData) => dispatch(actionCreaters.purchase_init(orderData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
