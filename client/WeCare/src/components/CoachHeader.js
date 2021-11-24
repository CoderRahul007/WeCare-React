import React from 'react'
import { Navbar, Container } from "react-bootstrap";

export default class CoachHeader extends React.Component {
    coachBookings = () => {
        this.props.history.push('/coachschedules')
    }

    viewProfile = () => {
        this.props.history.push('/coachviewprofile')
    }

    logout = () => {
        localStorage.setItem("coachId", null)
        this.props.history.replace('/')
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">WeCare</Navbar.Brand>
                    <ul className="navbar-nav mr-auto"></ul>
                    <ul className="navbar-nav">
                        <li className="nav-item"> 
                            <span className="nav-link text-light cursor" onClick={this.viewProfile}><i className="fas fa-user"></i>View Profile</span>
                        </li>
                        <li className="nav-item"> 
                            <span className="nav-link text-light cursor" onClick={this.coachBookings}><i className="fas fa-calendar-alt"></i>My Schedules</span>
                        </li>
                        <li className="nav-item"> 
                            <span className="nav-link text-light cursor"><i className="fas fa-phone-alt"></i>Call us: 080 2233447</span>
                        </li>
                        <li className="nav-item"> 
                            <span className="nav-link text-light cursor" onClick={this.logout}><i className="fas fa-sign-out-alt"></i>Logout</span>
                        </li>
                    </ul>
              </Navbar>
        )
    }
}
