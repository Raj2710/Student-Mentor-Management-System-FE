import {useState,useEffect} from "react";
import axios from "axios";
export default function AddStudent(){
    let [sName,setsName]=useState("");
    let [mName,setmName]=useState("");
    let [data,setData]=useState([]);
    let [res,setRes]=useState("");
    useEffect(()=>{
        getAllMentors()
    },[])
    const getAllMentors = async()=>{
        await axios.get("https://student-mentor-mgmt-sys-be.herokuapp.com/users/all-mentors")
        .then((response)=>{
            setData(response.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    const handleEvent =async()=>{
        await axios.post("https://student-mentor-mgmt-sys-be.herokuapp.com/users/add-student",{
            studentName:sName,
            studentMentor:mName
        })
        .then((response)=>{
            setRes(response.data.message);
            setTimeout(() => {
                window.location.reload();
              }, 1000);
        }).catch((error)=>{
            console.log(error);
        })
    }
    
    return <>
        <div className="add-wrapper">
        <h3>Add Student</h3>
            <div className="inputfields">
                <label>Student Name* : </label> <input className="input" type="text" placeholder="Student" required={true} onChange={(e)=>setsName(e.target.value)}></input>
                <label>Mentor Name : </label>
                <select className="input" onChange={(e)=>setmName(e.target.value)}>
                    <option selected disabled hidden>
                        Select an Option
                    </option>
                    {
                        data.map((e)=>{
                            return <>
                                <option key={e._id}>{e.mentorName}</option>
                            </>
                        })
                    }
                </select>
            
            </div>
            <br></br>
            <button className="btn btn-primary" id="but" onClick={handleEvent}>Add</button>
            <div style={{color:"green"}}>{res}</div>
        </div>
    </>
}