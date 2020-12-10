import React from 'react'

export default function ErrorPage({msg}) {
    return (
        <div style={{height:'100vh',display:'flex',
        alignItems:'center',
        justifyContent:'center'}} >
           <h2 style={{fontFamily:'Montserrat'}}>{msg}</h2>
        </div>
    )
}
