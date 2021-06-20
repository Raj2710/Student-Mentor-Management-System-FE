import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Topbar from './components/topbar';
import Home from './components/Home';
import AddMentor from './components/addmentor';
import AddStudent from './components/addstudent';
import AllMentors from './components/allmentors';
import AllStudents from './components/allstudents';
import AssignStudents from './components/assignstudents';
import ChangeMentor from './components/changementor';
import ViewMentor from './components/viewmentor';
function App() {
  return <>
  <Router>
    <Topbar/>
    <Switch>
        <Route path="/home" component={Home}/>
        <Route path="/add-mentor" component={AddMentor}/>
        <Route path="/add-student" component={AddStudent}/>
        <Route path="/all-mentors" component={AllMentors}/>
        <Route path="/all-students" component={AllStudents}/>
        <Route path="/assign-students" component={AssignStudents}/>
        <Route path="/change-mentor" component={ChangeMentor}/>
        <Route path="/view-mentor" component={ViewMentor}/>
        <Route path="/" component={Home}/>
    </Switch>
  </Router>
  </>
}

export default App;
