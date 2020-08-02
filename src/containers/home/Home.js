import React, { Component } from "react";
import axios from 'axios';
import {
    Container,
    Row
} from 'react-bootstrap';
import { connect } from 'react-redux';
import Card from '../../components/Card/Card';
import * as actionType from '../../store/action/index';
import productsData from '../../api/products.json';
class Home extends Component {
    state = {
        products: productsData
    }
    // componentDidMount(){
    //     axios.get('https://fakestoreapi.com/products').then(res => {
    //         let productsData = res.data;
    //         this.setState({products: productsData});
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }
    loadProducts = () =>{
        let data = this.state.products.map(product => {
            return <Card key={product.id} img={product.image} price={product.price} title={product.title} product={product} addcart={this.props.onAddCart}/>
        });
        return data;
    }
    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center', marginBottom: '50px', marginTop: '50px'}}>Welcome to our shopping app</h1>
                <Container>
                    <Row>
                        {
                            this.loadProducts()
                        }
                    </Row>
                </Container>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddCart: (product) => dispatch(actionType.add_to_cart(product))
    }
}   
export default connect(false, mapDispatchToProps)(Home);