import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import UserDetail from "./components/UserDetail/userDetail";
import AdminPost from "./containers/Admin/adminPost";
import AdminEdit from "./components/CrudProduct/editProduct";
import AuthForm from "./components/LogIn-Register/authform.jsx";
import AdminCatalog from "./containers/Admin/adminCatalog";
import CompleteCatalog from "./containers/CompleteCatalog/completeCatalog";
import Home from "./containers/Home/index.jsx";
import DetailProduct from "./components/ProductDetail/productDetail";
import PostCategory from "./components/CrudCategory/categoryPost.jsx";
import CategoryEdit from "./components/CrudCategory/categoryEdit.jsx";
import AddCategory from "./containers/AllCategories/allCategory.jsx";
import About from "./containers/About/about";
// import Cart from "./components/Cart/cart"
import UserTableEdit from "./components/UserEdit/usersTableEdit";
import UserEdit from "./components/UserEdit/userEdit";
import UsersTable from "./components/UsersTable/usersTable";
import AdminAction from "./components/AdminAction/adminAction";
import UserPassword from "./components/UserEdit/userPassword";
import Whishlist from './components/Whishlist/whishlist';
import Reviews from "./components/ProductReviews/reviews";
import AddReview from "./components/ProductReviews/addReview";
import MercadoPago from "./containers/MercadoPago/mercadoPago";
import HomePagoAcreditado from "./containers/HomePagoAcreditado/homePagoAcreditado";
import NewCart from "./components/Cart/newCart";
import NewCartNotLogged from './components/Cart/newCartNotLogged';
import OrdersTable from "./components/OrderTable/orderTable";
import OrderState from "./components/OrderTable/orderState";
import AddAddressForm from './components/UserEdit/addAddressForm';
//import NewUserForm from "./components/LogIn-Register/newUserForm.jsx"
import HistorialCompras from "./containers/HistorialCompras/historialCompras"
import CarroDetallado from "./containers/CarroDetallado/carroDetallado"
import TshirtFeature from "./components/T-Shirt/tshirtFeature";
import CustomCatalog from "./components/Catalog/customCatalog";


export default function Routes() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  return (
    <Switch>
      {/*>>>>>>>>>>>>>>> USER ROUTES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/}

      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/shop">
        <CompleteCatalog />
      </Route>
      <Route exact path="/product/:id">
        <DetailProduct />
      </Route>
      <Route exact path="/myProfile">
        <UserDetail />
      </Route>
      <Route exact path ='/whishlist/:id'>
        <Whishlist/>
      </Route>
      <Route exact path="/about">
        <About />
      </Route>
      {/* <Route exact path="/cart">
        <Cart/>
      </Route> */}
      <Route exact path="/reviews/:id">
        <Reviews />
      </Route>
      <Route exact path="/reviews/add/:id">
        <AddReview />
      </Route>
      <Route exact path="/payment/:id" component={MercadoPago} />
      <Route exact path="/home/:userId" component={HomePagoAcreditado} />
      <Route exact path="/carts/:userId" component={HistorialCompras} />
      <Route exact path="/detalle/:idCarro/usuario/:userId" component={CarroDetallado} />
      <Route exact path="/design">
        <TshirtFeature />
      </Route>
      <Route exact path="/custom">
        <CustomCatalog />
      </Route>
      <Route exact path="/MyProfile/addAddress/:id">
        <AddAddressForm />
      </Route>
      <Route exact path="/cart">
        <NewCartNotLogged />
      </Route>
      <Route exact path="/auth">
        <AuthForm />
      </Route>
      <Route exact path="/myProfile/Edit/:id">
        <UserEdit />
      </Route>
      <Route
        exact
        path="/cart/:id"
        render={({ match }) => <NewCart id={match.params.id} />}
      />
      <Route exact path="/users/password/:id">
        <UserPassword />
      </Route>
      {/*>>>>>>>>>>>>>>> ADMIN ROUTES <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<*/}
      {user?.result?.isAdmin && 
      <div>
      <Route exact path="/admin">
        <AdminCatalog />
      </Route>
      <Route exact path="/editProduct/:id">
        <AdminEdit />
      </Route>
      <Route exact path="/post">
        <AdminPost />
      </Route>
      <Route exact path="/categories">
        <AddCategory />
      </Route>
      <Route exact path="/postCategory">
        <PostCategory />
      </Route>
      <Route exact path="/editCategory/:id">
        <CategoryEdit />
      </Route>
      <Route exact path="/Admin/Actions">
        <AdminAction />
      </Route>
      <Route exact path="/users/">
        <UsersTable />
      </Route>
      <Route exact path="/users/edit/:id">
        <UserTableEdit />
      </Route>
      <Route exact path="/orders">
        <OrdersTable />
      </Route>
      <Route exact path="/orders/state/:id">
        <OrderState />
      </Route>
      </div>}
    </Switch>
  );
}
