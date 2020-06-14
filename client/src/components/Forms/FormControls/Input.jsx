import React from 'react'
import './Input.css'

export const Input=({input,meta:{touched,error},...props})=>{
    const hasError=error&&touched
    return(
        <div className="formControl">
            <input className={hasError?"error":""} {...input}{...props} />
              {hasError?<span>{error}</span>:null} 
        </div>
    )
}