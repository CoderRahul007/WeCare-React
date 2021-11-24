import Home from "./components/Home";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CoachHome from "./components/CoachHome";
import CoachLogin from "./components/CoachLogin";
import CoachProfile from "./components/CoachProfile";
import CoachSignup from "./components/CoachSignup";
import UserAppointments from "./components/UserAppointments";
import UserHome from "./components/UserHome";
import UserLogin from "./components/UserLogin";
import UserSignup from "./components/UserSignup";
import UserProfile from "./components/UserProfile";
import AppointmentBook from "./components/AppointmentBook";
import RescheduleAppointment from './components/RescheduleAppointment';
import { Navbar, Container } from "react-bootstrap";


const Footer = () => {
  return (
    <Navbar bg="dark" fixed="bottom" variant="dark">
      <Container style={{ alignContent: "center", justifyContent: "center" }}>
        <p style={{ color: "white" }}>
          Copyright &copy; 2020,WeCare All rights reserved
        </p>
      </Container>
    </Navbar>
  );
};
function App() {
    return (
      <div style={{backgroundColor:'grey',height:'100vh'}}>
      <Router>              
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/coachsignup" component={CoachSignup} />
          <Route path="/usersignup" component={UserSignup} />
          <Route path="/coachlogin" component={CoachLogin} />
          <Route path="/userlogin" component={UserLogin} />
          <Route path="/coachviewprofile" component={CoachProfile} />
          <Route path="/coachhome" component={CoachHome} />
          <Route path="/coachschedules" component={CoachHome}/>
          <Route path="/userhome" component={UserHome} />
          <Route path="/appointmentbook" component={AppointmentBook} />
          <Route path="/rescheduleappointment" component={RescheduleAppointment} />
          <Route path="/userviewprofile" component={UserProfile} />
          <Route path="/userappointments" component={UserAppointments} />
        </Switch>
        <Footer />
      </Router>
      </div>
    );
  }

export default App;
