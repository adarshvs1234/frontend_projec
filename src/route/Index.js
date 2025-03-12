import React from 'react'
import {BrowserRouter, Route,  Routes} from "react-router-dom"
import Home from '../pages/Home'
import Login from '../pages/Login'
import Transaction from '../pages/Transaction'
import Sign from '../compoents/Sign'
import Transactions from '../pages/Transactions'
import Categorylis from '../pages/Categorylis'
import Prof from '../pages/Prof'
import Changep from '../pages/Changep'
import Changen from '../pages/Changen'
import Categorytransac from '../pages/Categorytransac'
import TransacUpdate from '../pages/TransacUpdate'
import Errorpage from '../pages/Errorpage'
import { useSelector } from 'react-redux'
import ErrorPage2 from '../pages/ErrorPage2'
  




const Index = () => {
  const user = useSelector((state)=>state.auth.user)
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Sign/>}/>
    </Routes>
    
    {user?
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/transaction' element={<Transaction/>}/>
    <Route path='/alltransaction' element={<Transactions/>}/>
    <Route path='/transactionupdate/:id' element={<TransacUpdate/>}/>
    
   
   
    <Route path='/categorylist' element={<Categorylis/>}/>
    <Route path='/categorytrans/:id' element={<Categorytransac/>}/>

    
    
    <Route path='/profile' element={<Prof/>}/>
    <Route path='/password' element={<Changep/>}/>
    <Route path='/name' element={<Changen/>}/>
    <Route path='/*' element={<Errorpage/>}/>
  
   
</Routes>:<Routes>
  <Route path='/*' element={<ErrorPage2/>}/>
  </Routes>}
   
    

    </BrowserRouter>
    </>
  )
}

export default Index
