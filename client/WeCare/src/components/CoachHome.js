import React from 'react';
import { Container, Card,Button } from "react-bootstrap";
import CoachHeader from './CoachHeader';
import axios from 'axios';

export default class CoachHome extends React.Component{
    constructor(props){
        super(props);
         this.state = {
            coachId: localStorage.getItem("coachId"),
            bookings: [],            
        }
    }
    componentDidMount(){
        axios.get('http://localhost:4000/coaches/booking/' + this.state.coachId)
        .then(res => {
            this.setState({
                bookings: res.data
            })
            console.log(res.data)
        }).catch(err => {
            alert(err)
        })       
        
    }
    render(){
        return (
            <React.Fragment>    
             <CoachHeader coachId={this.state.coachId} history={this.props.history}/>           
                <br></br>
                <Container style={{display:'flex',alignItems:'center' ,justifyContent:'space-between' ,width:'100%'}}>            
                {
                    this.state.bookings.length === 0 ?
                    <Card className="text-center" style={{backgroundColor:'grey',height:'60vh',width:'50vh'}}>
                            <Card.Body>
                              <h2>No Planned Schedules yet</h2>
                            </Card.Body>
                    </Card> 
                    :
                    this.state.data.map((obj,index) => {
                    return(
                        <Card key={index} className="text-center" style={{backgroundColor:'black',height:'60vh',width:'50vh'}}>
                            <Card.Body>
                                <h2>Appointment Date is:</h2>
                                <h3>{obj.AppointmentDate.substr(0,10)}</h3>
                                <h3>Slot :{obj.Slot}</h3>
                                <br></br>
                                <h2>Booking id:{obj.BookingId}</h2>
                                <h2>User id:{obj.UserId}</h2>
                            </Card.Body>
                        </Card>
                    );
                })
                }
                </Container>
                </React.Fragment>
            );
        }
}