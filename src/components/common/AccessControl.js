import React, { useEffect, useState } from 'react'
import './Profile.css'
import { Button } from '@mui/material'
function AccessControl() {
    // const [firstName, setFirstName] = useState("John")
    // const [lastName, setLastName] = useState("Doe")
    // const [email, setEmail] = useState("johndoe@gmail.com")
    // const [editingMode, setEditingMode] = useState(false)

    return (
        // Navbar
        <div className='Profile_bodies'>
            <div className='profile-heading' >
                <div className='box' >AC</div>
                <div style={{ display: 'flex', flexDirection: 'column' }} >
                    <h1 className='floating-heading' style={{ color: "#ffffff", fontWeight: 400 }} >Access Control</h1>
                    <div className='line' ></div>
                </div>
            </div>


            <div className='profile-sections' >

                
            </div>

        </div>
    )
}

export default AccessControl