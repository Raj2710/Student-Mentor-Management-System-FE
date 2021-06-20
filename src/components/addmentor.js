import {useState,useEffect} from "react";
import Select from "react-select"
import axios from "axios";
import { Multiselect } from 'multiselect-react-dropdown';
export default function AddMentor(){
    let [mName,setmName]=useState("");
    let [sNames,setsNames]=useState([]);
    let [res,setRes]=useState("");
    let [options,setOptions]=useState([]);
    useEffect(()=>{
        getAllStudents()
    },[])
    const getAllStudents = async()=>{
        await axios.get("https://student-mentor-mgmt-sys-be.herokuapp.com/users/all-students")
        .then((response)=>{
            response.data.map((e)=>{
                if(!e.studentMentor){
                    options.push({
                        value:options.length+1,
                        label:e.studentName
                    })
                }
            })
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    const handleEvent =async()=>{
        await axios.post("https://student-mentor-mgmt-sys-be.herokuapp.com/users/add-mentor",{
            mentorName:mName,
            mentorStudents:sNames
        })
        .then((response)=>{
            setRes(response.data.message);
        }).catch((error)=>{
            console.log(error);
        })
    }
    let UpdateSelected = (e)=>{
        setsNames(Array.isArray(e)?e.map(x=>x.label):[]);
    }
    return <>
        <div className="add-wrapper">
            <div className="inputfields">
                <label>Mentor Name* : </label> <input className="input" type="text" placeholder="Student" required={true} onChange={(e)=>setmName(e.target.value)}></input>
                <label>Student Name : </label>
                <Select isMulti options={options} className="input" displayValue="Student" onChange={UpdateSelected}/>
            
            </div>
            <br></br>
            <button className="btn btn-primary" id="but" onClick={handleEvent}>Add</button>
            <div style={{color:"green"}}>{res}</div>
        </div>
    </>
}