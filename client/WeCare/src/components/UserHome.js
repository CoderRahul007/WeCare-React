import React from 'react';
import { Container, Card, Button ,Col,Row} from "react-bootstrap";
import axios from 'axios';
import UserHeader from './UserHeader';

export default class UserHome extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userId: localStorage.getItem("userId"),
            coaches: [],
        }
    }
    componentDidMount(){
        //console.log(this.state.userId)
        if (this.state.userId === "null") {
            this.props.history.replace('/')
        }

        axios.get('http://localhost:4000/coaches/all')
        .then(res => {
            this.setState({
                coaches: res.data
            })
           // console.log(res.data)
        }).catch(err => {
           alert(err.message);
        })
    }   
    bookAppointment=(id)=>{
        localStorage.setItem("coachId", id)
        this.props.history.push('/bookAppointment') 
    }
    render(){
        return (
            <React.Fragment>        
                <UserHeader  userId={this.state.userId} history={this.props.history}/>    
                <br></br>
                <Container style={{display:'flex',alignItems:'center' ,justifyContent:'space-between' ,width:'50%'}}>   
                {        
                    this.state.data.map((obj) =>{   
                    return   (
                        <Card key={obj.CoachId} className="text-center" style={{backgroundColor:'black',height:'60vh',width:'50vh'}}>
                            <Container>
                                <Row>
                                    <Col>
                                        <Card.Img></Card.Img>
                                    </Col>
                                    <Col>
                                        <Card.Body>
                                        <h3>{obj.Name}</h3>
                                        <h2>Coach Id:{obj.CoachId}</h2>
                                        <h2>Mobile No:{obj.MobileNumber}</h2>
                                        <h2>Speciality:{obj.Speciality}</h2>                                                                     
                                        </Card.Body>
                                        <Button onClick={()=>this.bookAppointment(obj.CoachId)}>Book An Appointment</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Card>
                        );
                    }
                    )
                }
                </Container>
                </React.Fragment>
            );
        }
}