import { useState,useEffect } from "react";
import axios from "axios";

export default function AllStudents(){
    let [data,setData]=useState([]);
    useEffect(()=>{
        getAllData();
    },[])
    let getAllData = async()=>{
        await axios.get("https://student-mentor-mgmt-sys-be.herokuapp.com/users/all-students")
        .then((response)=>{
            setData(response.data)
        }).catch((error)=>console.log(error))
    }
    return<>
        <div>
            <table className="table table-hover table-bordered border-primary">
                <thead className="table" id="thead">
                    <tr>
                        <th>Student Name</th>
                        <th>Mentor Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((e)=>{
                            return <>
                                <tr>
                                    <td>{e.studentName}</td>
                                    <td>{e.studentMentor}</td>
                                    
                                </tr>
                            </>
                        })
                    }
                </tbody>
            </table>
        </div>
    </>
}