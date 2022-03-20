import Login from "../auth/Login";
import Register from "../auth/Register";
import Home from "../Home";
import About from "./About";
import Cart from "./Cart";
import ProductDetail from "./collection/ProductDetail";
import ViewCategories from "./collection/ViewCategories";
import ViewProduct from "./collection/ViewProduct";
import Contact from "./Contact";

const publicRouteList = [
    {path:"/",  exact:true, name:"Home", component:Home},
    {path:"/about",  exact:true, name:"About", component:About},
    {path:"/contact",  exact:true, name:"Contact", component:Contact},
    {path:"/login",  exact:true, name:"Contact", component:Login},
    {path:"/register",  exact:true, name:"Contact", component:Register},
    {path:"/collection",  exact:true, name:"ViewCategories", component:ViewCategories},
    {path:"/collection/:slug",  exact:true, name:"ViewProduct", component:ViewProduct},
    {path:"/collection/:category/:product",  exact:true, name:"ProductDetail", component:ProductDetail},
    {path:"/cart",  exact:true, name:"Cart", component:Cart},
]


export default publicRouteList