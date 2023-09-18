
import React from 'react'
import UserCard from './common/UserCard'
import { Typography } from '@mui/material'

const data = [
    {
        id: 1,
        codeName: "Steam Gift Card",
        author : "Aglaea Iphigeneia",
        creationDate: "11/09/2017",
        codeType: "CODE",
        dynamic : false

    },
    {
        id: 2,
        codeName: "PlayStation Gift Card",
        author : "Bugsy Gurdeep",
        creationDate: "25/11/2017",
        codeType: "CODE",
        dynamic : true
    },
    {
        id: 3,
        codeName: "Xbox Gift Card",
        author : "Roselyn Willa",
        creationDate: "08/05/2017",
        codeType: "CODE",
        dynamic : true
    },
    {
        id: 4,
        codeName: "Amazon Gift Card",
        author : "Kurt Gayatri",
        creationDate: "19/01/2017",
        codeType: "CODE",
        dynamic : true
    },
    {
        id: 5,
        codeName: "J's Dinner - Menu",
        author : "Nazaret Rachelle",
        creationDate: "13/04/2019",
        codeType: "RESTAURANT-MENU",
        dynamic : false
    },
    {
        id: 6,
        codeName: "Spotify playlist",
        author : "Pearlie Otto",
        creationDate: "03/09/2017",
        codeType: "URL",
        dynamic : true
    },
    {
        id: 7,
        codeName: "PSG Stadium tour",
        author : "Porter Vinay",
        creationDate: "18/12/2018",
        codeType: "GOOGLE REVIEW",
        dynamic : true
    },
    {
        id: 8,
        codeName: "Home WiFi",
        author : "Iunia Suijin",
        creationDate: "04/04/2018",
        codeType: "WIFI",
        dynamic : true
    },
    {
        id: 9,
        codeName: "Test",
        author : "Porter Vinay",
        creationDate: "07/02/2021",
        codeType: "",
        dynamic : false
    }
]

export default function View() {
    return (
        <div>
            <Typography variant='h5' fontWeight='bolder'  sx={{color:'gray',paddingLeft:10}} >
                QR Code List
            </Typography>
            {
                data.map((card) => {
                    return (
                        <div id={card.id} >
                            <UserCard dynamic={card.dynamic} codeName={card.codeName}  author={card.author} creationDate={card.creationDate} codeType={card.codeType}  />
                        </div>
                    )
                })
            }
        </div>
    )
}
