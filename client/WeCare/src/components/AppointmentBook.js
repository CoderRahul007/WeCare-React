import React from 'react';
import { Container, Card,Button,Form,Row,Col } from "react-bootstrap";
import axios from 'axios';
import UserHeader from './UserHeader';

export default class AppointmentBook extends React.Component{
    constructor(props){
        super(props);
        this.state={  
            userId: localStorage.getItem("userId"),
            coachId: localStorage.getItem("coachId"),       
            doaError:'',
            doa:'',
            doaValid:'',
            slot:'9 AM to 10 AM',
            slotError:'',
            slotValid:'',
        }
    }

    validate=(name,value)=>{
        switch(name){
            case 'doa':
                function addDays(date1, days) {
                    const copy = new Date(Number(date1));
                    copy.setDate(date1.getDate() + days);
                    return copy;
                  }
                  const d = new Date(value);
                  const today = new Date();
                  const future = addDays(d, 7);
                  if (d > today && d < future) {
                    this.setState({doaError :'',doaValid:true})
                  }else{
                    this.setState({doaError :'Required, date should be any upcoming 7 days',doaValid:false})
                  }                  
                break;
            default:
                break;
        }

    }
    update =(e) =>{
        const value =e.target.value;
        const name =e.target.name;
        this.setState({[name]:value})
        this.validate(name,value);
    }
    submit=(e)=>{
        e.preventDefault();
        axios.post(`http://localhost:4000/users/booking/${this.state.userId}/${this.state.coachId}`, {
            slot: this.state.slot,
            appointmentDate: this.state.doa
        }).then(res => {
            alert("Appointment Booked Successfully")
            this.props.history.replace('/userhome')
        }).catch(err => {
            alert(err.message)
        })
    }
    render(){
        return(
            <React.Fragment>          
             <UserHeader  userId={this.state.userId} history={this.props.history}/>      
                  <Container
                style={{
                padding:'15px',
                alignContent: "center",
                justifyContent: "center",
                width: "30%",
                }}
            >
            <Card className="text-center" 
                style={{backgroundColor:'black',width:'100%',color:'white'}}>
                <Card.Body>
                    <Container>            
                       <h3> Proceed With Your Appointment</h3>
                    </Container>
                    <br></br>
                    <Form onSubmit={this.submit}>
                        <Container>
                            <Row>
                                <Form.Group controlId="formBasicDoa">
                                        <Form.Label>Date Of Birth</Form.Label>
                                        <Form.Control type="date" value={this.state.doa} placeholder="mm/dd/yyyy" onChange={this.update}/>                                       
                                </Form.Group>                
                            </Row>
                            <Row>
                                <Form.Label>Preferred Slot</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label="9 AM to 10 AM"
                                        value="9 AM to 10 AM"   
                                        name="slot"   
                                        checked
                                        onChange={this.update}                                
                                        />
                                     <Form.Check
                                        type="radio"
                                        label="10 AM to 11 AM"
                                        value="10 AM to 11 AM"   
                                        name="slot"                                       
                                        onChange={this.update}                                
                                        />
                                      <Form.Check
                                        type="radio"
                                        label="11 AM to 12 PM"
                                        value="11 AM to 12 PM" 
                                        name="slot"                                         
                                        onChange={this.update}                                
                                        />
                                     <Form.Check
                                        type="radio"
                                        label="2 PM to 3 PM"
                                        value="2 PM to 3 PM" 
                                        name="slot"                                        
                                        onChange={this.update}                                
                                        />
                                    <Form.Check
                                        type="radio"
                                        label="3 PM to 4 PM"
                                        value="3 PM to 4 PM" 
                                        name="slot"                                           
                                        onChange={this.update}                                
                                        />
                                    <Form.Check
                                        type="radio"
                                        label="4 PM to 5 PM"
                                        value="4 PM to 5 PM" 
                                        name="slot"                                       
                                        onChange={this.update}                                
                                        />
                                     <span style={{color:'red'}}>{this.state.slotError}</span>                                        
                            </Row>
                        </Container>
                        <Container>
                            <Button type="submit" block> Confirm Your Appointment</Button>
                        </Container>
                    </Form>
                    <span style={{color:'red'}}>{this.state.doaError}</span>
                </Card.Body>              
            </Card>
            </Container>
                </React.Fragment>
            );
    }
}