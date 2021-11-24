import React from 'react';
import { Container, Card, Button ,Col,Row, Alert} from "react-bootstrap";
import axios from 'axios';
import UserHeader from './UserHeader';

export default class UserProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userId: localStorage.getItem("userId"),
            data: null,
        }
    }
    componentDidMount(){
        axios.get('http://localhost:4000/users/' + this.state.userId)
        .then(res => {
            this.setState({
                data: res.data,    
            })
           // console.log(res.data)
        }).catch(err => {
            alert(err)
        })
        
    }
    render(){
        return (
            <React.Fragment>        
              <UserHeader  userId={this.state.userId} history={this.props.history}/>        
                <br></br>
                <Container style={{display:'flex',alignItems:'center',align:'center' ,justifyContent:'space-between' ,width:'50%'}}>                            
                        <Card  className="text-center" style={{backgroundColor:'black',height:'60vh',align:'center',width:'50vh'}}>
                            <Container>
                                <Row>
                                    <Col>
                                        <Card.Img></Card.Img>
                                    </Col>
                                    <Col>
                                        <Card.Body>
                                        <h3>{this.state.data.Name}</h3>
                                        <h2>Date Of Birth:{this.state.data.CoachId}</h2>
                                        <h2>Email Id :{this.state.data.Email}</h2>
                                        <h2>Mobile No:{this.state.data.MobileNumber}</h2>
                                        <h2>Address :{this.state.data.City},{this.state.data.State},{this.state.data.Country}</h2>  
                                        <h2>Pincode :{this.state.data.Pincode}</h2>                                                                  
                                        </Card.Body>
                                        <Button href="/userhome">Go Back</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Card>           
                </Container>
                </React.Fragment>
            );
        }
}