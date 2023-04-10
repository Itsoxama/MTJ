import React, { useState } from 'react'
import Siteemp from '../Siteemp/Siteemp'
import Userdata from '../Userdata/Userdata'
import Siteemp2 from './Siteemp2'

const Emp = () => {
const [i, seti] = useState(0)

  return (
    <>
    {i===1&&
        <Userdata />

        }
        {i===2&&
        <Siteemp />

        }  {i===4&&
          <Siteemp2 />
  
          }
    {i===0&&
<div className="empt">
    
        <>
        <div className="emp1" onClick={e=>seti(2)}>
            <p>Onsite <br /> Staff</p>

        </div>
        <div className="emp2" onClick={e=>seti(1)}>
<p>Office <br /> Monitor</p>
        </div>
        
        <div className="emp2" onClick={e=>seti(4)}>
<p>New <br /> Users</p>
        </div>
        </>

       
        
        
            </div> }
    </>


  )
}

export default Emp