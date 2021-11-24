import React from 'react';
import { Container, Card, Button ,Col,Row} from "react-bootstrap";
import axios from 'axios';
import CoachHeader from './CoachHeader';

export default class CoachProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            coachId: localStorage.getItem("coachId"),
            data: null,            
        }
    }
    componentDidMount(){
        axios.get('http://localhost:4000/coaches/' + this.state.coachId)
        .then(res => {
            this.setState({
                data: res.data,
               
            })
            console.log(res.data)
        }).catch(err => {
            alert(err)
        })

    }
    render(){
        return (
            <React.Fragment>
            <CoachHeader coachId={this.state.coachId} history={this.props.history} />
                <Container
                    style={{
                    alignContent: "center",
                    justifyContent: "center",
                    width: "100vh",
                    }}
                >
                </Container>
                <br></br>
                <Container style={{display:'flex',alignItems:'center' ,justifyContent:'space-between' ,width:'50%'}}>                
                    <Card className="text-center" style={{backgroundColor:'black',height:'60vh',width:'50vh'}}>
                        <Container>
                            <Row>
                                <Col>
                                    <Card.Img></Card.Img>
                                </Col>
                                <Col>
                                    <Card.Body>
                                       <h3>Coach Id:{this.state.data.CoachId}</h3>
                                       <h2>Date of Birth :{this.state.data.DateOfBirth.substr(0,10)}</h2>
                                       <h2>Mobile No:{this.state.data.MobileNumber}</h2>
                                       <h2>Speciality:{this.state.data.Speciality}</h2>                                                                     
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Container>
                    </Card>
                </Container>
                </React.Fragment>
            );
        }
}