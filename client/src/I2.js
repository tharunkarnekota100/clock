import React,{useState,useEffect} from 'react'
import { Link,Navigate,useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

const Indprofile = () => {
    const {id}=  useParams()
    const [message,setMessage] = useState(null);
    const [messageSender,setMessageSender] = useState(null);
    const [iprofile,setIprofile] = useState({})
    const [x,gx] = useState("https://github.com/")
    const [y,gy] = useState("https://in.linkedin.com/in/")

    const [descriptionx,setDescriptionx] = useState("No Description added yet")
    const [xid,setXid] = useState("")

    const [projectx,setProjectx] = useState("No Project added yet")
    const [yid,setYid] = useState("")

    useEffect(()=>{
        axios.get(`http://localhost:5000/getdescription2/${id}`,{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
            }).then(
                res =>{ 
                let len = res.data.length
                if(res.data[len-1].description){
                    setDescriptionx(res.data[len-1].description); 
                    setXid(res.data[len-1].profileId) 
                }
                else{
                    setDescriptionx("please add some description about you")
                }
                })


        axios.get(`http://localhost:5000/getproject2/${id}`,{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
            }).then(
                res =>{ 
                let len = res.data.length
                if(res.data[len-1].project){
                    setProjectx(res.data[len-1].project); 
                    setYid(res.data[len-1].profileId) 
                }
                else{
                    setProjectx("please add some projects of you")
                }
                })
        axios.get(`http://localhost:5000/indprofilee/${id}`).then(
            res => setIprofile(res.data)
        )
        console.log(id)

    },[])


    const submitHandler = e =>{
        axios.get('http://localhost:5000/myprofile',{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(res => setMessageSender(res.data.email))

        let review = {
            messageSender,
            messageReceiver:id,
            message,
        }
        if(message){
        axios.post('http://localhost:5000/addreview',review,{
                headers : {
                    'x-token' : localStorage.getItem('token')
                }
            }).then(res => alert(res.data))
        }
        else{
            alert("please enter some message")
        }
    }

    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }
    

 
    return (
        <div>
             <Header />
            
            <div className="profile bg-light card " style={{"margin":"10px"}}>
                <center>
                        <img 
                            className="round-img"
                            src="https://cdn.pixabay.com/photo/2016/03/23/22/26/user-1275780_960_720.png"
                            height="250" width="450"
                            alt="pix"
                        />
                        <div>
                            <h2 style={{"color":"springgreen"}}>{iprofile.fullname}</h2>
                            <h3>{iprofile.email}</h3>
                            <h4>{iprofile.collegeId}</h4>
                            <h5><b>branch : </b>{iprofile.branch}</h5>
                            <p><b>Mobile : </b>{iprofile.mobile}</p>
                        </div>
                </center>
            </div>
                        {/*
                            {github!=="-" ? <div><b>Github : </b><a href={x+github} target="_blank">https://github.com/{github}</a></div> : null}
                            {linkedin!=="-" ? <div><b>Linkedin : </b><a href={y+linkedin} target="_blank">https://in.linkedin.com/in/{linkedin}</a></div> : null}
                            
                            <p>VJIT - Student</p>
                            <h4><u>Skills</u>:-</h4>

                            <ul>
                                {iprofile.skill.split(",").map(skills => {
                                    return <li className="text-primary" style={{ listStyleType: "none", marginLeft: "-30px" }}>{skills}</li>;
                                }
                                    )}

                            </ul>

                            <div className="card" style={{"width":"59%"}}><br />
                            <h1>Projects:-</h1>
                                <center>
                                    <div className="card" style={{"width":"85%"}}><br />
                                        
                                        <ul>
                                            {projectx.split(",").map(skills => {
                                                return <li className="text-primary" style={{ listStyleType: "none", marginLeft: "-30px",color:"black" }}>{skills}</li>;
                                            }
                                                )}
                                        </ul>
                                    </div>
                                    <br />
                                </center>
                            </div>
                            <br />

                            <div className="card" style={{"width":"59%"}}><br />
                            <h1>Description:-</h1>
                                <center>
                                    <div className="card" style={{"width":"85%"}}><br />
                                        <p>{descriptionx}</p>
                                        
                                    </div>
                                    <br />
                                </center>
                            </div>

                            <br />

                            <br />

                            <center>
                                        <div className="  card" style={{"width":"30rem",textAlign:"center"}}><br />
                                            <h4>Enter Your Message:</h4>
                                            <form onSubmit={submitHandler}>
                                                <input size="50" type="text" onChange={e => setMessage(e.target.value)} placeholder="Message to this profile holder" /><br /><br />
                                                <input type="submit" className="btn btn-primary" value="send message" /><br /><br />
                                            </form>
                                        </div>
                                        <br />
                            </center>
                        </div>
                </center>
                
            </div> */}
            <h1>hiii</h1>
            <button onClick={()=> console.log(iprofile.fullname)}>DDDD</button>

           
        </div>
    )
}

export default Indprofile
