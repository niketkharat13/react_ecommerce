import React from 'react';
import {
    Col,
    Card,
    Button
} from 'react-bootstrap';
import { Icon, InlineIcon } from '@iconify/react';
import shoppingCartOutlined from '@iconify/icons-ant-design/shopping-cart-outlined';
import {Link} from 'react-router-dom';
const ProductCard = props => {
    return(
        <Col lg="4" sm="12" md="4">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.img} alt={props.title}/>
                <Card.Body>
                    <Card.Title><Link to={{
                        pathname:"/product_details",
                        aboutProps:{
                            product:props.product
                        }
                    }}>{props.title}</Link></Card.Title>
                    <div style={{ display: 'flex',justifyContent: 'space-between',alignItems:'center'}}>
                        <Card.Text style={{marginBottom:'0'}}>
                            Price: ${Math.ceil(props.price)} 
                        </Card.Text>
                        <Button className="btn btn-primary" style={{ float: 'right'}} onClick={() => props.addcart(props.product)}>
                            <a><Icon icon={shoppingCartOutlined}/></a>
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}
export default ProductCard;