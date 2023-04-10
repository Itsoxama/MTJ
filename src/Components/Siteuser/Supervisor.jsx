import React from 'react'
import { FaRegBell } from 'react-icons/fa'
import { BiLogOutCircle } from 'react-icons/bi'
import './Siteuser.css'
import { BsCreditCard2FrontFill } from 'react-icons/bs'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'

import {FiLogOut} from 'react-icons/fi'

import {FaUserCheck,FaUserTimes,FaUserEdit} from 'react-icons/fa'
import prof from '../../images/prof.png'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { useState } from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { FiDownload } from 'react-icons/fi'

import { AiOutlineReload } from 'react-icons/ai'
import { AiOutlineDashboard } from 'react-icons/ai'
import ReactToPrint from 'react-to-print';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaRegBuilding } from 'react-icons/fa'
import { GrFormClose } from 'react-icons/gr'
import XLSX from 'sheetjs-style'
import jsPDF from 'jspdf';
import { TbBuildingFactory2 } from 'react-icons/tb'
import * as file from 'file-saver'
import axios from 'axios'
import { useEffect } from 'react';
import { tz } from '../apis';
import { TbFileInvoice } from 'react-icons/tb'
import { useRef } from 'react'
import { IoAnalytics } from 'react-icons/io5'
import { AiOutlineProfile, AiOutlineMessage } from 'react-icons/ai'
import date from 'date-and-time';
import Attendence from './Attendence'
import Leave from './Leave'
import Notes from './Notes'
import Profile2 from './Profile2'
import Reports from './Reports'

const Supervisor = () => {
    
  const [value, value2] = useState(new Date());

  function onChange(e){


    var ustime=e.toLocaleString("en-US", {hour12:false})
    console.log(ustime)
    setshowcalender(false)
    var yt=ustime.split(', ')
    setdatep(yt[0])
    mopenthis(project,yt[0])
  }
  function mopenthis(val,datex) {
    setchkou(0)
    setpending2([])

   
        setdatep(datex)
        axios.post(`${tz}/siteatt/findbydateandproject`, {
            date: datex,    
            id: val._id
        }).then(rex => {

            val.user.forEach(ele => {
                var y = 0
                rex.data.Siteatt.forEach((ele2, index) => {
                    if (ele2.userid === ele.userid) {
                        y = 1
                    }

                    if (index === rex.data.Siteatt.length - 1) {
                        if (y === 0) {

                            setpending2(pending2 => [...pending2, ele])
                        }
                    }


                });
            });

            setclk(rex.data.Siteatt)
            rex.data.Siteatt.forEach(element => {
                if (element.chkouttime !== '-') {
                    setchkou(chkou => chkou + 1)

                }
            });


        })

   

}
const [datep, setdatep] = useState('')
const [openp, setopenp] = useState(false)
const [showcalender, setshowcalender] = useState(false)
const [prodata, setprodata] = useState()
    const [pending2, setpending2] = useState([])
    const [chkou, setchkou] = useState(0)
    const [clk, setclk] = useState()
    function openthis(val) {
        setchkou(0)

        axios.get(`${tz}/att/time`).then(resx => {
            console.log(resx)

            var dateput = resx.data.Date.split(', ')
            setdatep(dateput[0])
            axios.post(`${tz}/siteatt/findbydateandproject`, {
                date: dateput[0],
                id: val._id
            }).then(rex => {

                setpending2([])
                val.user.forEach(ele => {
                    var y = 0
                    rex.data.Siteatt.forEach((ele2, index) => {
                        if (ele2.userid === ele.userid) {
                            y = 1
                        }

                        if (index === rex.data.Siteatt.length - 1) {
                            if (y === 0) {

                                setpending2(pending2 => [...pending2, ele])
                            }
                        }


                    });
                });

                setclk(rex.data.Siteatt)
                rex.data.Siteatt.forEach(element => {
                    if (element.chkouttime !== '-') {
                        setchkou(chkou => chkou + 1)

                    }
                });


            })

        })

    }


    const [notibox, setnotibox] = useState('notibox2')
    const componentRef = useRef();
    const componentRef2 = useRef();
    const [datec, setdatec] = useState('')
    const [grey, setgrey] = useState(false)
    const [attid, setattid] = useState()
    const [allg, setallg] = useState(false)
    const [show, setshow] = useState(false)
    const [siteall, setsiteall] = useState()
    const [chkintime, setchkintime] = useState('')


    useEffect(() => {



        var uu = localStorage.getItem('siteuserapi')
        var uu2 = localStorage.getItem('siteuserid')
        var utype = localStorage.getItem('siteusertype')
        if (uu && uu2 && uu2.length > 2 && uu === '^%$234' && utype === 'supervisor') {

            axios.post(`${tz}/super/find`, {
                Supervisor_id: uu2
            }).then(res1 => {
                console.log(res1)
                setuser(res1.data.Supervisor[0])
                axios.post(`${tz}/jobsite/find`, {
                    Jobsite_id: res1.data.Supervisor[0].siteid
                }).then(res2 => {
                    console.log(res2)
                    setshow(true)
                    res2.data.Jobsite&&setproject(res2.data.Jobsite[0])



                    axios.post(`${tz}/siteatt/findbyproject`,{
                        
                        id:res2.data.Jobsite&&res2.data.Jobsite[0]._id
            
                    }).then(res2m => {
                        console.log(res2m)
                      if(res2m.data.Siteatt.length>0){
                        
                            var date = new Date();
                            var day = date.getDay();
                            var prevMonday = new Date();
                            if(date.getDay() == 0){
                                prevMonday.setDate(date.getDate() - 7);
                            }
                            else{
                                prevMonday.setDate(date.getDate() - (day-1));
                            }

                            var rt= new Date('2023-04-23')
                        console.log(prevMonday)
                        console.log(prevMonday>rt)
                        
                     prepare(res2m.data.Siteatt,res2.data.Jobsite[0].user,prevMonday)
                    }
                    else{


                    }
                    })
                    




                    res2.data.Jobsite&&
                    openthis(res2.data.Jobsite[0])


                })

            })
        }
        else {
            window.location.pathname = 'userlogin'
        }
        return () => {

        }
    }, [])
    const [attreport, setattreport] = useState([])
function prepare(atts,users,prevMonday){
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    users.forEach(element => {
        var u={user:element.userid,
            name:element.name,
            att:[],
            wh:0,
        
        }
        
        var wh=0;
        
        var wm=0;
        atts.forEach(val => {
            var ty=val.date.split('/')
            let date_1 = new Date(`${ty[2]}-${ty[1]}-${ty[0]}`);
    let date_2 = new Date(prevMonday);                       
    console.log(date_1)
    console.log(date_2)
    var d = new Date(`${ty[2]}-${ty[1]}-${ty[0]}`);
var dayName = days[d.getDay()];
    if(date_1>date_2&&val.userid===element.userid){
        
        var tx=val.workinghours!=='-'?val.workinghours.split(':'):[0,0]
        wh=parseInt(tx[0])+wh
        wm=parseInt(tx[1])+wm
console.log(wh)
console.log(wm)
        u.att.push({
            date:val.date,
            day:dayName,
            wh:tx[0],

        
        })
    }
    
  
            
        
        });
        u.wh=Math.floor(wh)
        
        console.log(u)
           setattreport(pr => [...pr,u])
    });
}
    const [user, setuser] = useState()
    const [project, setproject] = useState()
    function logout() {



        localStorage.removeItem('siteuserid')
        localStorage.removeItem('siteuserapi')
        window.location.reload()

    }
    const [i, seti] = useState(0)

    const [notibox2, setnotibox2] = useState('notibox3 notibox2')

    const [open, setopen] = useState(0)
    const [linked, setlinked] = useState([])
    const [att, setatt] = useState()
    function open2(val) {
        axios.post(`${tz}/siteatt/findbynameandproject`, {
            id: user._id,
            pid: val
        }).then(resq => {
            console.log(resq)
            setatt(resq.data.Siteatt)
            seti(49)




        })
    }
    
function viewprof(val){
    axios.post(`${tz}/siteuser/find`,{
        Siteuserd_id:val,
    }).then(res2 => {
        console.log(res2)
        setprodata(res2.data.Siteuserd[0])
        setopenp(true)
       
    })

}
function clockin(user) {


    axios.get(`${tz}/att/time`).then(res => {

        var dateput = res.data.Date.split(', ')
        var late = dateput[1].split(':')
        setchkintime(dateput[1])

     

            axios.post(`${tz}/siteatt/add`, {
                empno:user.empno,
                projectid: project._id,
                date: dateput[0],
                time: dateput[1],
                chkouttime: '-',
                status: 'Present',
                userid: user.userid,
                username: user.name,
                late: 'On time',
                projectname:project&&project.sitename,
                workinghours:'-'


            }).then(res2 => {
                console.log(res2)
                openthis(project)
                axios.post(`${tz}/siteatt/findbydateandchk`, {
                    date:dateput[0],
                    id:user._id,
                    chkouttime:'-'
                }).then(resq => {
                    console.log(resq)
                
    
    
                })

                setgrey(true)

            })
        
    })



}
const [showusers, setshowusers] = useState('ns')
function setdisplay(val){
    setshowusers(val)

}
    function openhistory() {
        setlinked([])
        if (user.linkedsites && user.linkedsites.length > 0) {
            siteall.forEach(element => {

                user.linkedsites.forEach(ele => {
                    if (element._id === ele.projectid) {

                        setlinked(linked => [...linked, element])
                    }
                });

            });

            seti(48)
        }
        else {
            alert('No History found')
        }

    }
    const [atten, setatten] = useState(false)
    function clockout(val){


       
        var t1=chkintime


        axios.post(`${tz}/siteuser/find`,{

            Siteuserd_id:val.userid
        }).then(resm => {

            axios.get(`${tz}/att/time`).then(res => {

                var dateput = res.data.Date.split(', ')
                var late = dateput[1].split(':')
    
                axios.post(`${tz}/siteatt/findbydateandname`, {
                    date:dateput[0],
                    id:val.userid,
                }).then(resqa => {
        console.log(resqa)
    
        
        var t2=dateput[1]
        var t=resqa.data.Siteatt[0].time.split(":")
        var tx=t2.split(":")
        var chkin=parseInt(t[0])*60+parseInt(t[1])
        var chkut=parseInt(tx[0])*60+parseInt(tx[1])
      var minsa=(chkut-chkin)%60
       var hrsa=Math.floor((chkut-chkin)/60)
    
                axios.post(`${tz}/siteatt/updatetimelat`, {
                    _id:resqa.data.Siteatt[0]._id,
                    time: dateput[1],
                    wh:`${hrsa}:${minsa}`,
                    wages:Math.ceil(hrsa*resm.data.Siteuserd[0].payrate+(minsa/60)*resm.data.Siteuserd[0].otpayrate)
    
                }).then(res2 => {
                    console.log(res2)
                    setgrey(false)
                    openthis(project)
            
                
    
    
    
                })
                })
    
                
             
            })
        })

    }
    
    const [formanreport, setformanreport] = useState(false)
    const [report, setreport] = useState(false)
    function openreport(){
        setreport(true)

    }
    return (
        <>       {show &&
            <>
            {atten===false?<div className='dashsite'>
{formanreport&&
  <div className="eas">
  <ReactToPrint
 
 trigger={() => <button className='ss33'>Export To pdf!</button>}
 content={() => componentRef2.current}
/>

<button className='ss333' onClick={e=>setformanreport(false)}>Cancel</button>

 <div className="a4" ref={componentRef2}>
    <div className="rw1">
        <div className="rwdiv1">
            <h1>232323</h1>
            <p>Week Ending</p>
            <h1>232323</h1>
            <p>Time keeper Sign</p>
            <h1>232323</h1>
            <p>Foreman's sign</p>

        </div>
        <div className="rwdiv2">
         <h3>   Foreman's Report</h3>
         <h4>
            {project&&project.clientname}</h4>

        </div>
        <div className="rwdiv1">
            <div className="undertexr">
                Job no: <div className="underlinea">
                   {project&&project.no}
                </div>
            </div>
            <div className="undertexr">
                Project: <div className="underlinea">
                    {project&&project.sitename}
                </div>
            </div>
            <div className="undertexr">
                Location: <div className="underlinea">
                  {project&&project.address.substring(0,25)}
                </div>
            </div>

        </div>
    </div>

    <div className="tablefor">
        <div className="tableforhead">
            <div className="subbox2 subbox1">
                Employee Name


            </div>
            <div className="subbox2">

            </div>
            
            <div className="subbox2">
                
            </div>
            <div className="subbox2">
                MON
            </div>
            <div className="subbox2">
                TUE
            </div>
            <div className="subbox2">
              WED  
            </div>
            <div className="subbox2">
                THU
            </div>
            <div className="subbox2">
                FRI
            </div>
            <div className="subbox2">
               SAT 
            </div>
            <div className="subbox2">
                SUN
            </div>
            <div className="subbox2">
                TOTAL
            </div>

        </div>
          <div className="tableforhead">
            <div className="subbox2 subbox1">


            </div>
            <div className="subbox2">
<div className="subpart2">

</div>
<div className="subpart">
    
</div>
            </div>
            <div className="subbox2">
            <div className="subpart2">

</div>
<div className="subpart">
    
</div>
            </div>
            <div className="subbox2">
            <div className="subpart2">
REG
</div>
<div className="subpart">
    OT
</div>
            </div>
            <div className="subbox2">
            <div className="subpart2">
                REG

</div>
<div className="subpart">
    OT
    
</div>
            </div>
            <div className="subbox2">
            <div className="subpart2">
                REG

</div>
<div className="subpart">
    OT
    
</div>
            </div>
            <div className="subbox2">
            <div className="subpart2">
                REG

</div>
<div className="subpart">
    OT
    
</div>
            </div>
            <div className="subbox2">
            <div className="subpart2">
                REG

</div>
<div className="subpart">
    OT
    
</div>
            </div>
            <div className="subbox2">
            <div className="subpart2">
                REG

</div>
<div className="subpart">
    OT
    
</div>
            </div>
            <div className="subbox2">
            <div className="subpart2">
                REG

</div>
<div className="subpart">
    OT
    
</div>
            </div>
           
            <div className="subbox2">
            <div className="subpart2">
REG
</div>
<div className="subpart">
OT    
</div>
            </div>

        </div>
       {attreport.length>0&&
       attreport.map(val=>(
        <div className="tableforhead tableforheadx">
        <div className="subbox2 subheight subbox1">
<p>{val.name}</p>

        </div>
        <div className="subbox2">
<div className="subpart2">

</div>
<div className="subpart">

</div>
        </div>
        <div className="subbox2">
        <div className="subpart2">

</div>
<div className="subpart">

</div>
        </div>
        <div className="subbox2">
        <div className="subpart2">
{val.att.map(element => (
    <>{
        element.day==='Monday'&&element.wh}</>
    
))}
</div>
<div className="subpart">

</div>
        </div>
        <div className="subbox2">
        <div className="subpart2">
        {val.att.map(element => (
    <>{
        element.day==='Tuesday'&&element.wh}</>
    
))}

</div>
<div className="subpart">


</div>
        </div>
        <div className="subbox2">
        <div className="subpart2">
        {val.att.map(element => (
    <>{
        element.day==='Wednesday'&&element.wh}</>
    
))}

</div>
<div className="subpart">


</div>
        </div>
        <div className="subbox2">
        <div className="subpart2">
            
        {val.att.map(element => (
    <>{
        element.day==='Thursday'&&element.wh}</>
    
))}
</div>
<div className="subpart">


</div>
        </div>
        <div className="subbox2">
        <div className="subpart2">
        {val.att.map(element => (
    <>{
        element.day==='Friday'&&element.wh}</>
    
))}

</div>
<div className="subpart">


</div>
        </div>
        <div className="subbox2">
        <div className="subpart2">
        {val.att.map(element => (
    <>{
        element.day==='Saturday'&&element.wh}</>
    
))}

</div>
<div className="subpart">


</div>
        </div>
        <div className="subbox2">
        <div className="subpart2">
            
        {val.att.map(element => (
    <>{
        element.day==='Sunday'&&element.wh}</>
    
))}

</div>
<div className="subpart">

<div className="absval">
    
Total
</div>

</div>
        </div>
       
        <div className="subbox2">
        <div className="subpart2">
            {val.wh>40?40:val.wh}
            <div className="absval">
                
            {val.wh>40?40:val.wh}
            </div>

</div>
<div className="subpart">
<div className="absval">
    
{val.wh>40?val.wh-40:0}
<div className="absval">
                
{val.wh>40?val.wh-40:0}
                </div>
</div>
</div>
        </div>

    </div>
       ))

       }
    </div>

    <div className="rwdiv1x">
            <div className="undertexrx undertexr">
                Authorizing Signature: <div className="underlinea underline2">
               
                </div>
            </div>
            <div className="undertexr undertexrx">
            Authorizing Signature: <div className="underlinea underline2">
                 
                </div>
            </div>

        </div>
 </div>
</div>

}

            <div className="sidesite">
                <h1>City Force LLC</h1>
                <h3 onClick={e => seti(0)}>
                    <AiOutlineDashboard className='icondash1' />

                    Dashboard
                </h3>

                <h3 onClick={e => seti(4)}>
                    <FaRegBuilding className='icondash1' />

                    Profile
                </h3>
                <h3 onClick={e => seti(11)}>
                    <FaRegBuilding className='icondash1' />

                    Jobsite info
                </h3>
                <h3 onClick={e => seti(16)}>
                    <FaRegBuilding className='icondash1' />

                    Reports
                </h3>


            </div>
            <div className="clientb clientc">

                {i === 0 &&
                    <>
                        <div className="clienthead fullwidth ">
                            <h6 className='s55'>Hy {user && user.name} 
                            
                          
                            <button className='usiosub' onClick={e=>setatten('true')}>Attendance</button>
                            </h6>

                            <div className="companymenu">


                                <div className={notibox2}>
                                    <GrFormClose className='grno' onClick={e => setnotibox2('notibox2 notibox3')} />

                                    <h2>{user && user.name}</h2>
                                    <button onClick={e => logout()} className='logouty'>Logout</button>
                                </div>

                                {/*  <FaRegBell className='menuit' />
*/}
                                <div className="profilebtn menuit" onClick={e => setnotibox2('notibox3 notibox')}>
                                    E
                                    <div className="profiledot">

                                    </div>

                                </div>
                            </div>
                        </div>
<div className="cdf" style={{width:'95%'}}>
    
<button className='usiosub' onClick={e=>setformanreport(true)}>Foreman's Report</button>
</div>
                        <div className="clientpro">
                            <div className="projectscard">
                                <div className="procard">
                                    <h1>Active Jobsite</h1>
                                    <h4 className='cardh2'>{project && project.sitename}</h4>

                                    <h2 className='cardh3' > <TbBuildingFactory2 />  </h2>
                                    <h6 className='cardf3' > {project && project.address.substring(0, 50)}</h6>
                                    <div className="circlelast"></div>

                                    <div className="circlelast2"></div>

                                </div>

                            </div>
                        </div>
                        <>

                            <div className="clockhead">
                                <button onClick={e => setshowcalender(true)} className='cht'> Choose Date</button>
                                {showcalender &&
                                    <div>
                                        <Calendar onChange={onChange}
                                            value={value} />
                                    </div>

                                }
                            </div>
                            <div className="clientpro clientproh">
                                <h1>User Stats</h1>
                                <div className="projectscard">
                                    <div className="balance balancec">  <div className="mhg mhg3">

                                        <FaUserCheck className='mhgf mhgf3' />
                                    </div>
                                        <div className="detbalance">
                                            <h1>Clocked in</h1>
                                            <h3>{clk && clk.length - chkou}</h3>
                                        </div>
                                    </div>
                                    <div className="balance balancec">
                                        <div className="mhg">

                                            <FaUserTimes className='mhgf' />
                                        </div>
                                        <div className="detbalance">
                                            <h1>Pending</h1>
                                            <h3>{project && clk && project.user.length - clk.length} </h3>
                                        </div>
                                    </div>
                                    <div className="balance balancec">  <div className="mhg mhg2">

                                        <FiLogOut className='mhgf mhgf2' />
                                    </div>
                                        <div className="detbalance">
                                            <h1>Clocked Out </h1>
                                            <h3>{chkou}</h3>
                                        </div>
                                    </div>
                                    <div className="balance balancec">  <div className="mhg mhg2x">

                                        <FaUserEdit className='mhgf mhgf2x' />
                                    </div>
                                        <div className="detbalance">
                                            <h1>On Leave </h1>
                                            <h3>{0} </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="clientpro">
                                <h1>Clockedin Users</h1>
                                <>


                                    <div className="usersdata">


                                            <>

                                                <div className="tablerow">
                                                    <div className="subtable">
                                                        <div className="headertable clop cloo">
                                                            <h1 style={{ width: "200px" }}>User</h1>
                                                            <h2 style={{ width: "100px" }}>Date</h2>
                                                            <h3 style={{ width: "100px" }}>Clockin Time</h3>

                                                            <h3 style={{ width: "100px" }}>Clockout Time</h3>
                                                            <h3 style={{ width: "100px" }}>Working Time</h3>
                                                            <h4 style={{ width: "100px" }}>Status</h4>
                                                            <h5 style={{ width: "100px" }}>Late</h5>


                                                        </div>
                                                        {clk && clk.map(val => (
                                                            <>
                                                                <div className="headertable" >
                                                                    <h1 style={{ width: "200px" }}>{val.username.substring(0, 50)}</h1>
                                                                    <h2 style={{ width: "100px" }}> <div className="tinvoice">
                                                                        {val.date}</div> </h2>
                                                                    <h3 style={{ width: "100px" }} >{val.time}</h3>
                                                                    <h3 style={{ width: "100px" }} >{val.chkouttime}</h3>
                                                                    <h3 style={{ width: "100px" }} >{val.workinghours}</h3>
                                                                    {val.status === 'Absent' ?
                                                                        <div style={{ width: "100px" }} className="yellowlabel">

                                                                            <h6 >{val.status}</h6>
                                                                        </div> :
                                                                        <div style={{ width: "100px" }} className="greenlabel">

                                                                            <h6 >{val.status}</h6>
                                                                        </div>

                                                                    }
                                                                    <h5 style={{ width: "100px" }} >{val.late}</h5>



                                                                </div>
                                                            </>
                                                        ))

                                                        }
                                                    </div>
                                                </div>
                                            </>
                                        

                                    </div></>
                            </div>
                            <div className="clientpro">
                                <h1>Pending Users</h1>
                                <>


                                    <div className="usersdata">


                                      
                                            <>

                                                <div className="tablerow">
                                                    <div className="subtable">
                                                        <div className="headertable clop cloo">
                                                            <h1 style={{ width: "200px" }}>User</h1>
                                                            <h2 style={{ width: "200px" }}>Skill</h2>


                                                        </div>
                                                        {clk && clk.length > 0 ? pending2 && pending2.map(val => (
                                                            <>
                                                                <div className="headertable" >
                                                                    <h1 style={{ width: "200px" }}>{val.name.substring(0, 50)}</h1>
                                                                    <h2 style={{ width: "200px" }}> <div className="tinvoice">
                                                                        {val.skill}</div> </h2>

                                                                    <h5 className='h5'><button className='manx man' onClick={e => viewprof(val.userid)}>View Profile</button></h5>



                                                                </div>
                                                            </>
                                                        )) :
                                                            project && project.user.map(val => (
                                                                <>
                                                                    <div className="headertable" >
                                                                        <h1 style={{ width: "200px" }}>{val.name.substring(0, 50)}</h1>
                                                                        <h2 style={{ width: "200px" }}> <div className="tinvoice">
                                                                            {val.skill}</div> </h2>

                                                                        <h5 className='h5'><button className='manx man' onClick={e => viewprof(val.userid)}>View Profile</button></h5>



                                                                    </div>
                                                                </>
                                                            ))

                                                        }
                                                    </div>
                                                </div>
                                            </>
                                        s

                                    </div></>
                            </div>
                        </>


                    </>

                }
                {i === 49 &&


                    <><div className="clienthead  ">
                        <h6>Jobsites</h6>


                    </div>

                        <div className="tablerow">
                            <div className="subtable">
                                <div className="headertable clop cloo">
                                    <h1 style={{ width: "200px" }}>User</h1>
                                    <h2 style={{ width: "100px" }}>Date</h2>
                                    <h3 style={{ width: "100px" }}>Clockin Time</h3>

                                    <h3 style={{ width: "100px" }}>Clockout Time</h3>
                                    <h3 style={{ width: "100px" }}>Working Time</h3>
                                    <h4 style={{ width: "100px" }}>Status</h4>
                                    <h5 style={{ width: "100px" }}>Late</h5>


                                </div>
                                {att && att.map(val => (
                                    <>
                                        <div className="headertable" >
                                            <h1 style={{ width: "200px" }}>{val.username.substring(0, 50)}</h1>
                                            <h2 style={{ width: "100px" }}> <div className="tinvoice">
                                                {val.date}</div> </h2>
                                            <h3 style={{ width: "100px" }} >{val.time}</h3>
                                            <h3 style={{ width: "100px" }} >{val.chkouttime}</h3>
                                            <h3 style={{ width: "100px" }} >{val.workinghours}</h3>
                                            {val.status === 'Absent' ?
                                                <div style={{ width: "100px" }} className="yellowlabel">

                                                    <h6 >{val.status}</h6>
                                                </div> :
                                                <div style={{ width: "100px" }} className="greenlabel">

                                                    <h6 >{val.status}</h6>
                                                </div>

                                            }
                                            <h5 style={{ width: "100px" }} >{val.late}</h5>



                                        </div>
                                    </>
                                ))

                                }
                            </div>
                        </div>
                    </>


                }
                {i === 1 &&
                    <Attendence props={{
                        user: user,
                        date: datec

                    }} />

                }   
                
                {i === 16 &&
                    <Reports props={{
                        user: user,
                        project:project

                    }}  />

                }
                {i === 11 &&
                    <>  <div className="projectview">
                        <h4>     <span></span> <p>Active</p></h4>
                        <h1>Company : <p>{project.clientname}</p></h1>
                        <h1>Site : <p className='greenp'>{project.sitename}</p></h1>
                        <h1 className='teamm'>Supervisor: </h1>
                        <div className="teamates">
                            <button>{user.name}</button>



                        </div>

                        <h1 className='teamm'>Employees: </h1>

                        <div className="tablerow">
                            <div className="subtable">
                                <div className="headertable clop">
                                    <h1>Employee</h1>

                                    <h6>Skill</h6>
                                    <h3>Address</h3>
                                    <h4>Phone</h4>
                                    <h5>OT Pay rate</h5>
                                    <h5>NC(%)</h5>


                                </div>
                                {project && project.user.map(val => (
                                    <>
                                        <div className="headertable">
                                            <h1><img src='' alt="" className='valimg' /> {val.name}</h1>

                                            <h6>{val.skill}</h6>

                                            <h1>{val.address}</h1>
                                            <h6>{val.phone}</h6>


                                        </div>
                                    </>
                                ))

                                }
                            </div>
                        </div>

                    </div>
                    </>

                }
                {i === 2 &&
                    <Leave props={{
                        user: user,
                        date: datec

                    }} />

                }

                {i === 3 &&
                    <Notes props={{
                        user: user,
                        date: datec

                    }} />

                }
                {i === 4 &&
                    <>

                        <div className="profilepage">
                            <img src={prof} alt="" />
                            <h1>Name:</h1>
                            <h6>{user.name}</h6>

                            <h1>Address:</h1>
                            <h6>{user.address}</h6>

                            <h1>phone:</h1>
                            <h6>{user.phone}</h6>


                            <h1>Status:</h1>
                            <h6>{user.status}</h6>

                            <h1>Cuurent Jobsite:</h1>
                            <h6>{user.sitename} </h6>

                        </div>
                    </>

                }
                {i === 48 &&

                    <div className='clientpro clienttro'>
                        <div className="clienthead  ">
                            <h6>Jobsites</h6>


                        </div>

                        <div className="tablerow">
                            <div className="subtable">
                                <div className="headertable clop cloo">
                                    <h1 style={{ width: "200px" }}>Sitename</h1>
                                    <h2 style={{ width: "200px" }}>Client Name</h2>


                                </div>
                                {linked && linked.map(val => (
                                    <>
                                        <div className="headertable" >
                                            <h1 style={{ width: "200px" }}>{val.sitename}</h1>
                                            <h2 style={{ width: "250px" }}> <div className="tinvoice">
                                                {val.clientname}</div> </h2>

                                            <h5 className='h5'><button onClick={e => open2(val._id)} className='manx man'>Work History</button></h5>



                                        </div>
                                    </>
                                ))

                                }
                            </div>
                        </div>


                    </div>}

            </div>



        </div>:
        <>
        <div className="attend">

    {showusers==='ns'?
            <div className="topcolumn">
            <div className="colhead colhead2">
                <div className="boxs1">
                    EMP #

                </div>
                <div className="boxs1 nbox">
                    EMPLOYEE NAME
                </div><div className="boxs1">
                    SIGN IN
                    
                    </div><div className="boxs1">
                    SIGN OUT
                    </div><div className="boxs1">
                    PERDIEM ELIGIBLE
                    </div><div className="boxs1">
SUNDAY              PERDIEM ELIGIBLE                
                    </div><div className="boxs1">
                   SUPER INTENDENT PERDIEM MEAL
                    </div>
                
            </div>
          {
            clk && clk.length > 0 ? pending2 && pending2.map(val => (
                <div className="colhead">
                <div className="boxs1 blackfont">
                {val.empno}

                </div>
                <div className="boxs1 nbox blackfont">
                {val.name}
                </div><div onClick={e=>clockin(val)} className="boxs1 blackfont bgred">
                   IN
                    
                    </div><div className="boxs1 blackfont bggreen">
                  OUT
                    </div><div className="boxs1 blackfont">
                    Yes
                    </div><div className="boxs1 blackfont">
No           
                    </div><div className="boxs1 blackfont">
                Yes
                    </div>
                
            </div>
            )):
          project && project.user.map(val=>(
             <div className="colhead">
             <div className="boxs1 blackfont">
           {val.empno}

             </div>
             <div className="boxs1 nbox blackfont">
             {val.name}
             </div><div onClick={e=>clockin(val)} className="boxs1 blackfont bgred">
                IN
                 
                 </div><div className="boxs1 blackfont bggreen">
               OUT
                 </div><div className="boxs1 blackfont">
                Yes
                 </div><div className="boxs1 blackfont">
No                
                 </div><div className="boxs1 blackfont">
           Yes
                 </div>
             
         </div>
          ))

          }
          
        </div>:
        showusers==='ci'?
        <div className="topcolumn">
        <div className="colhead colhead2">
            <div className="boxs1">
                EMP #

            </div>
            <div className="boxs1 nbox">
                EMPLOYEE NAME
            </div><div className="boxs1">
                SIGN IN
                
                </div><div className="boxs1">
                SIGN OUT
                </div><div className="boxs1">
                No
                </div><div className="boxs1">
Yes                
                </div><div className="boxs1">
    No
                </div>
            
        </div>
      {
        clk && clk.map(val => (
          val.chkouttime==='-'&&
          <div className="colhead">
          <div className="boxs1 blackfont">
       {val.empno}

          </div>
          <div className="boxs1 blackfont nbox">
          {val.username}
          </div><div className="boxs1 blackfont bggreen">
             IN
              
              </div><div onClick={e=>clockout(val)}  className="boxs1 blackfont bgred2">
            OUT
              </div><div className="boxs1 blackfont">
            Yes
              </div><div className="boxs1 blackfont">
No               
              </div><div className="boxs1 blackfont">
          Yes
              </div>
          
      </div>
        ))

      }
      
    </div>
    
    
    :
           <div className="topcolumn">
           <div className="colhead colhead2">
               <div className="boxs1">
                   EMP #
   
               </div>
               <div className="boxs1 nbox">
                   EMPLOYEE NAME
               </div><div className="boxs1">
                   SIGN IN
                   
                   </div><div className="boxs1">
                   SIGN OUT
                   </div><div className="boxs1">
                   PERDIEM ELIGIBLE
                   </div><div className="boxs1">
   SUNDAY              PERDIEM ELIGIBLE                
                   </div><div className="boxs1">
                  SUPER INTENDENT PERDIEM MEAL
                   </div>
               
           </div>
         {
           clk && clk.map(val => (
             val.chkouttime!=='-'&&
             <div className="colhead">
             <div className="boxs1 blackfont">
           {val.empno}
 
             </div>
             <div className="boxs1 nbox blackfont">
             {val.username}
             </div><div  className="boxs1 blackfont bggreen">
                IN
                 
                 </div><div className="boxs1 blackfont bggreen">
               OUT
                 </div><div className="boxs1 blackfont">
                 Yes
                 </div><div className="boxs1 blackfont">
               Yes                
                 </div><div className="boxs1 blackfont">
                No
                 </div>
             
         </div>
           ))
   
         }
         
       </div>
        
    }
            <div className="bottombar">

                <select name="" id="" onChange={e=>setdisplay(e.target.value)}>
                    <option value="ns">
                    Not show
                </option> <option value="ci">
                    Clock inn users
                </option> <option value="co">
                Clock out users
                </option>


                </select>
                <div>Clock inn {clk && clk.length - chkou}</div>
                
                <div>Clock out {chkou} </div>
                
                <div>No show {project && clk && project.user.length - clk.length} </div>
                
                
                <div>Vacation 2</div>
                <button onClick={e=>openreport()} className='view'>View</button>
                
                
                <button  onClick={e=>openreport()} className='peint'>Print</button>
                
                <button className='backm' onClick={e=>setatten(false)}>Back</button>

            </div>

        </div>
        {report&&
        <div className="eas">
             <ReactToPrint
            
            trigger={() => <button className='ss33'>Export To pdf!</button>}
            content={() => componentRef.current}
          />
          
      <button className='ss333' onClick={e=>setreport(false)}>Cancel</button>

            <div className="a4" ref={componentRef}>
           
                <h1>EAS Project Sit Sign In / Out  </h1>
                <p>This form will be used for payroll purposes, if an employee fails to sign this form he/she will not be paid for this day.</p>
<p>By signing this form you are affirming the following statemeents</p>
<h2>**On this day i came to work fit for duty and ready to work safely. I left this project site with good condition and no accidents to report.**</h2>
      <h3>Esta forma sera usada con el proposito de compensarle con su sueldo de acuredo con sa presencia en sa trabajo.
        <br />
En este dia yo fui a trabajar listo para completar mi trabajo con seguridad. Termine ef dia dejando mi trabajo sin accidentes que reporter. 
</h3>
<h2 className='bordernoe'>Per Diem:</h2>
<h3 className='ar3'>


This form is being utilized by payroll as an expense reimbursement request form for per Diem per our policy that pays for temporary lodging.<br/>
Below by circling Yes underper Diem for lodging you are under IRS regulations stating that you are requesting reimbursement
per Diem for temporary lodging. The IRSor EAS may audit at times and request a copy of your hotel/motel lodging receipt.<br/>
If you are found to be falsifying this form you will be eligible for disciplinary actionup to and including termination.<br/>
Per policy you must have live a minimum of 50 miles from the jobsite to receive per diem and staying in local lodgingat the job site.<br/>
Sunday per diem is available for those that live farther than 75 miles from the job siteand obtain lodging on sunday night.<br/>
If you elect to drive back and forth from a jobsite each daythat is cosidered a daily commute and willnot be considered "Hours worked" or eligible to receive per diem.<br/>
If driving back and forth you should not mark the per diem and lodging box below.<br/>
</h3>
<h3 className='ar3'>
All employees should sign only themselves in and out each day. If you signin/out someone else or allow someone else to sign you in/out you will be subject to disciplinary action up to and including termination.</h3> 

<div className="jobdate">
<h1>Job # {project&&project.no}</h1>
    <h1>Project Name:  {project&&project.sitename}</h1>
</div>
<div className="jobdate">
<h1>Date # {datep}</h1>
    <h1>Super:  {user&&user.name}</h1>
</div>
<div className="topcolumn topcola">
            <div className="colhead colhead3">
                <div className="boxs1 minwidth">
                    EMP #

                </div>
                <div className="boxs1 minwidth2x">
                    Employee Name
                </div>
                
                <div className="boxs1 minwidth2">
                    Sign in
                    
                    </div>
                    <div className="boxs1 minwidth">
                     Time in
                    
                    </div>
                    
                    <div className="boxs1 minwidth2">
                    Sign out
                    </div>
                    <div className="boxs1 minwidth">
                     Time out
                    
                    </div>
                    <div className="boxs1 minwidth2">
                    PERDIEM ELIGIBLE
                    </div><div className="boxs1 minwidth2">
SUNDAY              PERDIEM ELIGIBLE                
                    </div><div className="boxs1 minwidth2">
                   SUPER INTENDENT PERDIEM MEAL
                    </div>
                
            </div>

            {
               clk && clk.map(val => (
                <div className="colhead">
                <div className="boxs1 minwidth blackfont">
                {val.empno}

                </div>
                <div className="boxs1 blackfont minwidth2x">
                {val.username.substring(0,20)}
                </div><div  className="boxs1 minwidth2 blackfont ">
      {val.empno}
                    
                    </div>
                    <div className="boxs1 blackfont minwidth">
                 {val.time}
                    
                    </div><div className="boxs1 blackfont minwidth2 ">
               {val.empno}
                    </div>
                    <div className="boxs1 blackfont minwidth">
               {val.chkouttime}
                    
                    </div><div className="boxs1 minwidth2 blackfont">
                    Yes
                    </div><div className="boxs1 minwidth2 blackfont">
No           
                    </div><div className="boxs1 minwidth2 blackfont">
                Yes
                    </div>
                
            </div>
            )) 
            }
          {
            clk && clk.length > 0 ? pending2 && pending2.map(val => (
                <div className="colhead">
                <div className="boxs1 minwidth blackfont">
                {val.empno}

                </div>
                <div className="boxs1 blackfont minwidth2x">
                {val.name.substring(0,20)}
                </div><div onClick={e=>clockin(val)} className="boxs1 minwidth2 blackfont ">
      X
                    
                    </div>
                    <div className="boxs1 blackfont minwidth">
                 X
                    
                    </div><div className="boxs1 blackfont minwidth2 ">
               X
                    </div>
                    <div className="boxs1 blackfont minwidth">
               X
                    
                    </div><div className="boxs1 minwidth2 blackfont">
                    Yes
                    </div><div className="boxs1 minwidth2 blackfont">
No           
                    </div><div className="boxs1 minwidth2 blackfont">
                Yes
                    </div>
                
            </div>
            )):
          project && project.user.map(val=>(
             <div className="colhead">
             <div className="boxs1 minwidth blackfont">
           {val.empno}

             </div>
             <div className="boxs1 blackfont minwidth2x">
             {val.name.substring(0,20)}
             </div>
             <div  className="boxs1 minwidth2 blackfont ">
    X
                 
                 </div>

                      <div className="boxs1 blackfont minwidth">
                X
                    
                    </div>
                 
                 <div className="boxs1 blackfont  minwidth2">
               X
                 </div>
                 <div className="boxs1 blackfont minwidth">
                   X
                    
                    </div>
                 <div className="boxs1 blackfont minwidth2">
                Yes
                 </div><div className="boxs1 blackfont minwidth2">
No                
                 </div><div className="boxs1 blackfont minwidth2">
           Yes
                 </div>
             
         </div>
          ))

          }
          
        </div>





            </div>
        </div>

        }
        </>
}
</>
        }
        
        
        </>
    )
}

export default Supervisor