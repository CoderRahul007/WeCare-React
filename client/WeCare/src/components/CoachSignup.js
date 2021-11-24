/* eslint-disable default-case */
import React from 'react'
import axios from 'axios'
import { Container, Card,Button,Form,Row,Col } from "react-bootstrap";
import HomeHeader from './HomeHeader'

export default class CoachSignup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            password: "",
            dob: "",
            gender: "M",
            mobile: "",
            speciality: "",
            coachId: null,
            nameError:'',
            passwordError:'',
            mobileError:'',
            dobError:'',
            specialityError:'',
            valid:false,

        }
    }

    handleChange = (e) => {
      this.setState({[e.target.name]:e.target.value});
      this.validate(e.target.name)
    }

    validate = (type) => {
        switch(type){
            case 'name':
                if(this.state.name.trim().length >= 3 && this.state.name.trim().length <=50) {
                    this.setState({nameError:'',nameValid:true,valid:true})
                }
                else{
                    this.setState({nameError:'Name should have 3 to 50 characters',nameValid:false,valid:false})                    
                }
                break;        
            case 'password':
                if(this.state.password.trim().length >=5 && this.state.password.trim().length <=10){
                   this.setState({passwordError:'',passwordValid:true,valid:true})
                }else{
                    this.setState({passwordError:'Password should have 5 to 10 characters',passwordValid:false,valid:false})                
                }
                break;
            case 'mobile':                
                if( this.state.mobile.trim().length === 10){
                        this.setState({mobileError:'',mobileValid:true,valid:true})
                }else{
                    this.setState({mobileError:'Mobile Number should have 10 digits',mobileValid:false,valid:true})                
                }
                break;                        
            case 'speciality':        
                    if(this.state.speciality.trim().length >=10 && this.state.speciality.trim().length<=50){
                      this.setState({specialityError:'',valid:true})
                    }
                    else{
                        this.setState({specialityError:'Speciality should have 10 to 50 characters',valid:false})
                      
                    }
                break;
            case 'dob':
                const getAge = (birthDate) =>
                Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);
                const Age = getAge(this.state.dob);
                if (Age > 20 && Age < 100) {
                   this.setState({dobError:'',dobValid:true,valid:true})
                }
                else{
                    this.setState({dobError:'',dobValid:false,valid:false})
                }
                break;
        }
    }
    submit=()=>{
        axios.post('http://localhost:4000/coaches', {
            name: this.state.name,
            password: this.state.password,
            dateOfBirth: this.state.dob,
            gender: this.state.gender,
            mobileNumber: this.state.mobile,
            speciality: this.state.speciality
        }).then(res => {
            const id = res.data.message
            this.setState({
                coachId: id
            })
        }).catch(err => alert(err.message))
    }  

    render() {

        if (!this.state.coachId) {
            return (
                <React.Fragment>
                <HomeHeader/>
                    <Container
                style={{
                padding:'15px',
                alignContent: "center",
                justifyContent: "center",
                width: "60%",
                }}
            >
            <Card className="text-center" 
                style={{backgroundColor:'black',width:'100%',color:'white'}}>
                <Card.Body>
                    <Container>            
                       <h2> Life Coach Profile</h2>
                    </Container>
                    <Form onSubmit={this.submit}>
                        <Container>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formBasicName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" value={this.state.name} name="name" onChange={this.handleChange} />
                                        <Form.Text className="text-muted">
                                        {this.state.nameError}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" value={this.state.password} name="password" onChange={this.handleChange}/>
                                        <Form.Text className="text-muted">
                                        {this.state.passwordError}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formBasicDob">
                                        <Form.Label>Date Of Birth</Form.Label>
                                        <Form.Control type="date" value={this.state.dob} placeholder="mm/dd/yyyy" name="dob" onChange={this.handleChange}/>
                                        <Form.Text className="text-muted">
                                        {this.state.dobError}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col>
                                <Form.Label>Gender</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        label="Male"
                                        value='M'   
                                        name="gender"     
                                        checked                                   
                                        onChange={this.handleChange}/>
                                    <Form.Check
                                        type="radio"
                                        label="Female"
                                        value='F'   
                                        name="gender"
                                        onChange={this.handleChange}                                               
                                        />                                   
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formBasicMobile">
                                            <Form.Label>Mobile Number</Form.Label>
                                            <Form.Control type="text" value={this.state.mobile} name="mobile" onChange={this.handleChange}/>
                                            <Form.Text className="text-muted">
                                            {this.state.coachIdmobileError}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col>
                                        <Form.Group controlId="formBasicSpeciality">
                                            <Form.Label>Speciality</Form.Label>
                                            <Form.Control type="text" value={this.state.speciality}   name="speciality" onChange={this.handleChange}
                                             />
                                            <Form.Text className="text-muted">
                                            {this.state.specialityError}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                        <Container>
                            <Button type="submit"> Register</Button>
                        </Container>
                    </Form>
                </Card.Body>              
            </Card>
            </Container>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <HomeHeader/>
               
                <Container
                        style={{
                        alignContent: "center",
                        justifyContent: "center",
                        width: "100vh",
                        align:'center',
                        }}
                    >
                        <h3 style={{alignContent:'center'}} >You are a Coach now !</h3>
                        <h2 style={{alignContent:'center'}}>Your Coach Id is {this.state.coachId}</h2>
                        <Button style={{alignContent:'center'}} href='/coachlogin'>Login now</Button>
                </Container>
                </React.Fragment>
            )
        }
    }
}