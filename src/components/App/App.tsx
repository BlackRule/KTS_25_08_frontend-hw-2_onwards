import { Navigate, Route, Routes } from 'react-router-dom'
import  Header  from 'components/Header'
import {ROUTES} from 'config/routes'
import Login from 'pages/Login/Login'
import Products from 'pages/Products'
import Signup from 'pages/Signup/Signup'
import User from 'pages/User/User'
import Cart from 'pages/Cart/Cart'
import Categories from 'pages/Categories'
import {useQueryParamsStoreInit} from 'stores/RootStore/hooks/useQueryParamsStoreInit'
import styles from './App.module.scss'
import About from "../../pages/About/About";

const App = () => {
  useQueryParamsStoreInit()
  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/cart" element={<Cart/>}/>
        {ROUTES.product.routes}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
