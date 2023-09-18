import React, { useEffect, useState } from 'react'
// import './Profile.css'
import { Button } from '@mui/material'

function Settings() {
  const [newPass, setNewPass] = useState("")
  const [oldPass, setOldPass] = useState("")
  const [newPass2, setNewPass2] = useState("")
  // const [editingMode, setEditingMode] = useState(false)

  return (
    // Navbar
    <div className='Settings_bodies'>
      <div className='profile-heading' >
        <div className='box' >S</div>
        <div style={{ display: 'flex', flexDirection: 'column' }} >
          <h1 className='floating-heading' style={{ color: "#ffffff", fontWeight: 400 }} >Settings</h1>
          <div className='line' ></div>
        </div>
      </div>


      <div className='profile-sections' >

        <div className='profile-details'>


          <div className='label-inp' >
            <label className='lbl' >Old Password</label>
            <input className='inp'  type="text" value={oldPass} />
          </div>
          <div className='label-inp' >
            <label className='lbl' >New Password</label>
            <input className='inp'  type="text" value={newPass} />
          </div>

          <div className='label-inp'>
            <label className='lbl'  >Confirm New Password</label>
            <input className='inp'  type="text" value={newPass2} />
          </div>

          <div style={{display:'flex', alignItems:'center',justifyContent:'center',gap:'1rem' }} >
            <Button sx={{ height: 'fit-content', padding: 1, marginTop: 3 }} variant='contained' size='large'>
              SAVE
            </Button>

            <Button sx={{ height: 'fit-content', padding: 1, marginTop: 3 }} variant='contained' color='error' size='large' >
              Cancel
            </Button>
          </div>
        </div>


      </div>

    </div>
  )
}

export default Settings