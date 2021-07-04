import { Link } from "react-router-dom";
import { Divider } from '@material-ui/core'
import React from 'react'

export default function DisplayeDetails({title,count,linkTitle,link}) {
    return (
        <div>
            <p style={{fontSize:40 }}>{title}</p>
            <p style={{fontSize:60,color:'#3571f1' }}>{count}</p>
            <Divider style={{marginTop:30}}/>
            <Link to={link} style={{textDecorationColor:'#3571f1',color:'#3571f1'}}>
            <p style={{marginTop:10}}>{linkTitle}</p>
            </Link>
            
        </div>
    )
}
