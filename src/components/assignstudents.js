import {useState,useEffect} from "react";
import axios from "axios";
import Select from "react-select";
export default function AssignStudents(){
    let [sNames,setsNames]=useState("");
    let [mName,setmName]=useState("");
    let [data,setData]=useState([]);
    let [res,setRes]=useState("");
    let [options,setOptions]=useState([]);
    useEffect(()=>{
        getAllMentors();
        getAllStudents();
    },[])
    const getAllMentors = async()=>{//get all mentors
        await axios.get("https://student-mentor-mgmt-sys-be.herokuapp.com/users/all-mentors")
        .then((response)=>{
            setData(response.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    const getAllStudents = async()=>{//get all students
        await axios.get("https://student-mentor-mgmt-sys-be.herokuapp.com/users/all-students")
        .then((response)=>{
            response.data.map((e)=>{
                if(!e.studentMentor){
                    options.push({//initialise options for multi select dropdown
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
    const handleEvent =async()=>{//assigning students for selected mentor
        await axios.post("https://student-mentor-mgmt-sys-be.herokuapp.com/users/assign-students",{
            mentorName:mName,
            mentorStudents:sNames
        })
        .then((response)=>{
            setRes(response.data.message);
            setTimeout(() => {// to refresh after successfull changes
                window.location.reload();
              }, 1000);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    let UpdateSelected = (e)=>{
        setsNames(Array.isArray(e)?e.map(x=>x.label):[]);//to handle multi select dropdown selected data
    }

    return <>
        <div className="add-wrapper">
        <h3>Assign Students</h3>
            <div className="inputfields">
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
                <label>Students : </label>
                <Select isMulti options={options} className="input" displayValue="Student" onChange={UpdateSelected}/>
            </div>
            <br></br>
            <button className="btn btn-primary" id="but" onClick={handleEvent}>Add</button>
            <div style={{color:"green"}}>{res}</div>
        </div>
    </>
}