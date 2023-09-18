import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import PrivateComponent from './components/login/PrivateComponent'
import Login from './components/login/Login'
import Home from './components/Home'
import Sidebar from './components/common/Sidebar'
import Profile from './components/common/Profile'
import Settings from './components/common/Settings'
import Register from './components/login/Register'
import Create from './components/Create'
import View from './components/View'
import AccessControl from './components/common/AccessControl'
import ForgotPassword from './components/login/ForgotPassword'

export default function RoutingComponent() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<PrivateComponent />} >
                    <Route path='/' element={<Sidebar />} >
                        <Route path='/Home' element={<Home />} />
                        <Route path='/Create' element={<Create />} />
                        <Route path='/View' element={<View />} />
                        <Route path='/Profile' element={<Profile />} />
                        <Route path='/Settings' element={<Settings />} />
                        <Route path='/AccessControl' element={<AccessControl />} />
                    </Route>
                </Route>
                <Route path='/Login' element={<Login />} />
                <Route path='/Register' element={<Register />} />
                <Route path='/ForgotPassword' element={<ForgotPassword />} />
            </Routes>
        </BrowserRouter>
    )
}
