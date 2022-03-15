import AddCategory from "./admin/AddCategory"
import Dashboard from "./admin/Dashboard"
import EditCategory from "./admin/EditCategory"
import Addproduct from "./admin/product/AddProduct"
import EditProduct from "./admin/product/EditProduct"
import Products from "./admin/product/Products"

import Profile from "./admin/Profile"
import { ShowCategory } from "./admin/showCategory"

const routes = [
    { path:'/admin', exact:true, name:"Admin"},
    { path: "/admin/dashboard",exact: true, name:"Dashboard", component: Dashboard},
    { path: '/admin/profile', exact: true, name:'Profile', component: Profile},
    { path: '/admin/add-category', exact: true, name:'AddCategory', component: AddCategory},
    { path: '/admin/show-category', exact: true, name:'ShowCategory', component: ShowCategory},
    { path: '/admin/edit-category/:id', exact: true, name:'EditCategory', component: EditCategory},
    { path: '/admin/add-product', exact: true, name:'AddProducts', component: Addproduct },
    { path: '/admin/edit-product/:id', exact: true, name:'AddProducts', component: EditProduct },
    { path: '/admin/products', exact: true, name:'Products', component: Products },
]

export default routes