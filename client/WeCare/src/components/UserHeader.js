import React from 'react'
import { Navbar } from "react-bootstrap";

export default class UserHeader extends React.Component {
    logout = () => {
        localStorage.setItem("userId", null)
        localStorage.setItem("coachId", null)
        localStorage.setItem("bookingId", null)
        this.props.history.replace('/')
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">WeCare</Navbar.Brand>
                    <ul className="navbar-nav mr-auto"></ul>
                    <ul className="navbar-nav">
                        <li className="nav-item"> 
                            <span className="nav-link text-light cursor" 
                            onClick={() => this.props.history.push('/userviewprofile')}>View Profile</span>
                        </li>
                        <li className="nav-item"> 
                            <span className="nav-link text-light cursor"
                             onClick={() => this.props.history.push('/userappointments')}>My Appointments</span>
                        </li>
                        <li className="nav-item"> 
                            <span className="nav-link text-light cursor">Call us: 080 2233447</span>
                        </li>
                        <li className="nav-item"> 
                            <span className="nav-link text-light cursor" 
                            onClick={this.logout}>Logout</span>
                        </li>
                    </ul>
             </Navbar>
        )
    }
}
