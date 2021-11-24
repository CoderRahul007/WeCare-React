import React from 'react';
import { Container, Card,Button } from "react-bootstrap";
import axios from 'axios';
import UserHeader from './UserHeader'

export default class UserAppointments extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userId: localStorage.getItem("userId"),
            data: [],
        }
    }
    componentDidMount(){
        axios.get('http://localhost:4000/users/booking/' + this.state.userId)
        .then(res => {
            //console.log(res.data)
            this.setState({
                data: res.data
            })
        }).catch(err => {

            alert(err.message)
        })
            
    }
    cancelAppointment=(id)=>{
        const shouldDelete = window.confirm("Are You Sure You Need To Cancel The Appointment?");
        if (shouldDelete) {
            axios.delete('http://localhost:4000/booking/' + id)
            .then(res => {
                window.location.reload()
            }).catch(err => {
                alert(err.message)
            })
        }

    }
    rescheduleAppointment=(bookingId)=>{
        localStorage.setItem("bookingId", bookingId)
        const { history } = this.props;
        history.push("/appointmentbook");
    }
    render(){
        if (this.state.data.length === 0) {
            return (
                <React.Fragment>
                    <UserHeader userId={this.state.userId} history={this.props.history} />
                    <Card className="text-center" style={{backgroundColor:'grey',align:'center',height:'60vh',width:'50vh'}}>
                            <Card.Body>
                              <h2>No Planned Schedules yet</h2>
                            </Card.Body>
                    </Card> 
                    <div align="center">
                        <Button variant="primary" onClick={() => this.props.history.push('/userhome') }>Go Back</Button>
                    </div>
                </React.Fragment>
            )
        }


        return (            
            <React.Fragment>
             <UserHeader  userId={this.state.userId} history={this.props.history} />
                <Container style={{display:'flex',alignItems:'center' ,justifyContent:'space-between' ,width:'100%'}}>            
                {
                    this.state.data.map((obj,index) => {
                    return(
                        <Card key={index} className="text-center" style={{backgroundColor:'black',height:'60vh',width:'50vh'}}>
                            <Card.Body>
                               {console.log(obj,index)}
                                <h2>Appointment Date is:</h2>
                                <h3>{obj.AppointmentDate}</h3>
                                <h3>Slot :{obj.Slot}</h3>
                                <h6>Booking ID: { obj.bookingId }</h6>
                                <h6>Coach ID: { obj.coachId }</h6>
                                <h6>User ID: { obj.userId }</h6>
                                <br></br>
                                <br></br>
                                <Button onClick={()=>this.rescheduleAppointment(obj.bookindId)} block>Reschedule Appointment</Button>
                                <Button style={{color:'red'}} onClick={()=> this.cancelAppointment(obj.bookingId)} block>Cancel Appointment</Button>
                            </Card.Body>
                        </Card>
                    );

                })
                }                
                </Container>
                <Container
                    style={{                
                    alignContent: "center",
                    justifyContent: "center",
                    width: "100vh",
                    align:'center'
                }}
                >
                    <Button href='/userhome'>Go Back</Button>
                </Container>
                </React.Fragment>
            );
        }
}