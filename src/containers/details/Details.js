import React, { Component } from "react";
import {
    Container,
    Row,
    Col
} from 'react-bootstrap';
import { connect } from 'react-redux';
import {Button} from 'react-bootstrap';
import * as actionType from '../../store/action/index';
import {Link} from 'react-router-dom';
class Details extends Component {
    render(){
        let product = this.props.location.aboutProps;
        let p_data= null;
        if (product !== undefined){
            p_data = <div>
                    <h1 style={{ textAlign: 'center' }}> Product Detail</h1>
                    <Row>
                    <Col lg="4">
                        <img style={{ width: '100%' }} src={this.props.location.aboutProps.product.image} alt="" className="" />
                    </Col>
                    <Col lg="8" style={{ marginTop: '100px' }}>
                        <Row>
                            <h1>{this.props.location.aboutProps.product.title} </h1>
                            <p>{this.props.location.aboutProps.product.description} </p>
                            <p>Price - {this.props.location.aboutProps.product.price} </p>
                        </Row>
                        <Button onClick={() => this.props.onAddCart(this.props.location.aboutProps.product)}>Add to cart</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to="/" className="btn btn-danger text-white">Go to Home</Link>
                    </Col>
            </Row>
            </div>
        }
        return(
            <Container>
                {p_data}
            </Container>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddCart: (product) => dispatch(actionType.add_to_cart(product))
    }
}   
export default connect(false, mapDispatchToProps)(Details);