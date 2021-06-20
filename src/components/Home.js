import "../styles/home.css";
import {Link} from "react-router-dom";
export default function Home(){
    return <>
    <div className="wrapper">
        <div className="elements">
            <Link to="/add-student">
                <button className="btn btn-primary">Add Student</button>
            </Link>
            <Link to="/add-mentor">
                <button className="btn btn-primary">Add Mentor</button>
            </Link>
            <Link to="/view-student">
                <button className="btn btn-primary">View Student</button>
            </Link>
            <Link to="/view-mentor">
                <button className="btn btn-primary">View Mentor</button>
            </Link>
        </div>
    </div>
    </>
}