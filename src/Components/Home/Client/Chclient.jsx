import React, { useState } from 'react'
import Client from './Client'
import Clientnew from './Clientnew'

const Chclient = () => {
const [i, seti] = useState(0)

  return (
    <>
    {i===1&&
        <Client />

        }
        {i===2&&
        <Clientnew />

        } 
    {i===0&&
<div className="empt">
    
        <>
        <div className="emp1" onClick={e=>seti(1)}>
            <p>Active <br /> Companies</p>

        </div>
        <div className="emp2" onClick={e=>seti(2)}>
<p>New <br /> Companies</p>
        </div>
        
      
        </>

       
        
        
            </div> }
    </>


  )
}

export default Chclient