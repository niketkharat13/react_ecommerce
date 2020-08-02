import React ,{Component, Suspense} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Layout from './templates/Layout/Layout';
import Loader from './components/Loader/Loader';
const Home = React.lazy(() => import('./containers/home/Home'));
const CheckoutContainer = React.lazy(() => import('./containers/checkout/Checkout'));
const CartContainer = React.lazy(() => import('./containers/my-cart/Cart'));
const DetailsContainer = React.lazy(() => import('./containers/details/Details'));
class App extends Component {
  render(){
    let routes = (
      <Suspense fallback={<Loader/>}>
        <Switch>
          <Route path="/checkout" component={CheckoutContainer} />
          <Route path="/my-cart" component={CartContainer} />
          <Route path="/product_details" component={DetailsContainer} />
          <Route path="/" component={Home} />
        </Switch>
      </Suspense>
    )
    return(
      <Layout>
        {routes}
      </Layout>
    )
  }
}
export default App;
