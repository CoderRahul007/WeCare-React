import React from 'react'
import axios from 'axios'
import { Container, Card,Button,Form,Row,Col } from "react-bootstrap";

import HomeHeader from './HomeHeader';

export default class UserSignup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            valid:'',
            userId: "",
            name: "",
            nameValid: true,
            nameError:'',
            password: "",
            passwordValid: true,
            passwordError:'',
            mobile: "",
            mobileValid: true,
            mobileError:'',
            email: "",
            emailValid: true,
            emailError:'',
            dob: "",
            dobValid: true,
            dobError:'',
            gender: "M",
            genderValid: true,
            genderError:'',
            pincode: "",
            pinocdeValid: true,
            pincodeError:'',
            city: "",
            cityValid: true,
            cityError:'',
            state: "",
            stateCheck: true,
            stateError:'',
            country: "",
            countryValid: true,  
            countryError:'',
        }
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
            case 'email':
                let re = /\S+@\S+\.\S+/;
                if(re.test(this.state.email)){
                    this.setState({emailError:'',valid:true,emailValid:true})
                }
                else{
                    this.setState({emailError:'Email should be Valid',valid:true,emailValid:true})                   
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
            case 'pincode':                
                if(this.state.pincode.trim().length === 6){
                   this.setState({pinocdeValid:true,pincodeError:'',vali:true})
                }
                else{
                    this.setState({pinocdeValid:false,pincodeError:'Pincode should have 6 digits',valid:false})                  
                }
                break;
            case 'state':
                if(this.state.state.trim().length >=6 && this.state.state.trim().length <=20){
                  this.setState({stateError:'',setStateValid:true,valid:true})
                } else{
                    this.setState({stateError:'State should have 6 to 20 characters',setStateValid:false,valid:false})                  
                }
                break;
            case 'city':
                    if(this.state.city.trim().length >=6 && this.state.city.trim().length <=20){
                       this.setState({cityError:'',valid:true,cityValid:true})
                    } else{
                        this.setState({cityError:'City should have 6 to 20 characters',valid:false,cityValid:false})                       
                    }
                    break;
            case 'country':
                        if(this.state.country.trim().length >=6 && this.state.country.trim().length <=20){
                            this.setState({countryError:'',valid:true,countryValid:true})
                        } else{
                            this.setState({countryError:'Country should have 6 to 20 characters',valid:true,countryValid:true})                        
                        }
                        break;
            default:
                break;
                    }
       
    }    
    submit=(e)=>{
        e.preventDefault();
        if (this.state.valid) {
            axios.post('http://localhost:4000/users', {
                name: this.state.name,
                password: this.state.password,
                dateOfBirth: this.state.dob,
                gender: this.state.gender,
                mobileNumber: this.state.mobile,
                email: this.state.email,
                pincode: this.state.pincode,
                city: this.state.city,
                state: this.state.state,
                country: this.state.country
            }).then(res => {
                this.setState({
                    userId: res.data.message
                })
            }).catch(err=>{
                alert(err.message)
            })
        }
    }
    handleChange = (e) => {       
        this.setState({[e.target.name]: e.target.value})
        this.validate(e.target.name);
    }

    render() {
        if (!this.state.userId) {
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
                style={{backgroundColor:'black',width:'100%',color:'white',height:'90%'}}>
                <Card.Body>
                    <Container>            
                       <h2> User Profile</h2>
                    </Container>
                    <Form onSubmit={this.submit}>
                        <Container>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formBasicName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" value={this.state.name} name="name" onChange={this.handleChange}
                                             />
                                        <Form.Text className="text-muted">
                                        {this.state.nameError}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" value={this.state.password} name="password" onChange={this.handleChange}
                                        />
                                        <Form.Text className="text-muted">
                                        {this.state.passwordError}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formBasicMobile">
                                            <Form.Label>Mobile Number</Form.Label>
                                            <Form.Control type="text" value={this.state.mobile} name="mobile"
                                           onChange={this.handleChange} />
                                            <Form.Text className="text-muted">
                                            {this.state.mobileError}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" value={this.state.email}onChange={this.handleChange}
                                               name="email" />
                                            <Form.Text className="text-muted">
                                            {this.state.emailError}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formBasicDob">
                                        <Form.Label>Date Of Birth</Form.Label>
                                        <Form.Control type="date" name="dob" value={this.state.dob} placeholder="mm/dd/yyyy" onChange={this.handleChange}
                                        />
                                        <Form.Text className="text-muted">
                                        {this.state.dobError}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Container>
                                    <Row>
                                        <Form.Label>Gender</Form.Label>
                                    </Row>
                                    <Row>
                                    <Form.Check
                                        type="radio"
                                        label="Male"
                                        value='M'   
                                        name="gender"         
                                        checked                                 
                                        onChange={this.handleChange}                
                                        />                                   
                                    <Form.Check
                                        style={{paddingLeft:'30px'}}
                                        type="radio"
                                        label="Female"
                                        value='F'   
                                        name="gender"
                                        onChange={this.handleChange}                                              
                                        />
                                    <span style={{color:'red'}}>{this.state.genderError}</span>
                                    </Row>
                                    </Container>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formBasicPincode">
                                            <Form.Label>Pincode</Form.Label>
                                            <Form.Control type="text" name="pincode" value={this.state.pincode}onChange={this.handleChange}
                                                 />
                                            <Form.Text className="text-muted">
                                            {this.state.pincodeError}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formBasicCity">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control type="text" name="city" value={this.state.city} onChange={this.handleChange}
                                                 />
                                            <Form.Text className="text-muted">
                                            {this.state.cityError}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formBasicState">
                                            <Form.Label>State</Form.Label>
                                            <Form.Control type="text" name="state" value={this.state.state}onChange={this.handleChange} />
                                            <Form.Text className="text-muted">
                                            {this.state.stateError}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formBasicCountry">
                                            <Form.Label>Country</Form.Label>
                                            <Form.Control type="text" name="country" value={this.state.country}onChange={this.handleChange} />
                                            <Form.Text className="text-muted">
                                            {this.state.countryError}
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
               padding:'15px',
               alignContent: "center",
               justifyContent: "center",
               align:'center',
               width: "60%",
               }}
           >    <h3 style={{alignContent:'center'}}>Account Created Successfully</h3>
               <h2 style={{alignContent:'center'}}>Your User Id is</h2>
               {this.state.userId}
               <Button style={{alignContent:'center'}} href="/userlogin"> Login</Button>
           </Container>
           </React.Fragment>
            ) 
        }
    }
}