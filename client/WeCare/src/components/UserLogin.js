import React from 'react'
import axios from 'axios'
import { Container, Card,Button,Form,Row,Col } from "react-bootstrap";
import HomeHeader from './HomeHeader';

export default class CoachLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: "",
            password: "",
            passwordError:'',
            userIdError:'',
            err:'',
            valid: true
        }
    }

    handleChange = (e) => {
      this.setState({[e.target.name]:e.target.value});
      this.validate(e.target.name);
    }

    validate = (type) => {
        switch(type){
        case 'password':
                if(this.state.password.trim().length >=5 & this.state.password.trim().length <=10){
                   this.setState({passwordError:'',valid:true})
                }else{
                    this.setState({passwordError:'Password should have 5 to 10 characters',valid:false})                   
                }
                break;
            case 'userId':
                if(this.state.userId.trim().length == 0){
                    this.setState({userIdError:'Id Required',valid:false})               
                }else{
                    this.setState({userIdError:'',valid:true})               
                }
                break;
            default:
                break;
            }
    }
    
    submit=(e)=>{
        e.preventDefault();
      
        axios.post("http://localhost:4000/login/users", {
            id: this.state.userId,
            password: this.state.password
        }).then(res => {           
            localStorage.setItem("userId", this.state.userId)
            this.props.history.replace('/userhome')
        }).catch(err => {
            this.setState({
                err: 'Invalid Credentials'
            })
            console.log(err.message)
        })

    }
    render() {
        return (
            <React.Fragment>  
              <HomeHeader/>          
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
                           <h3> Login As User</h3>
                        </Container>
                        <br></br>
                        <Form onSubmit={this.submit}>
                            <Container>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formBasicId">                                       
                                            <Form.Control type="text" placeholder="User Id" value={this.state.userId} name="userId" onChange={this.handleChange}/>
                                            <Form.Text className="text-muted">
                                            {this.state.userIdError}
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>                            
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formBasicPassword">                                        
                                            <Form.Control type="password" placeholder="Password"value={this.state.password} name="password" onChange={this.handleChange}/>
                                            <Form.Text className="text-muted">
                                            {this.state.passwordError}
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Container>
                            <Container>
                                <Button type="submit" block> Login</Button>
                            </Container>
                        </Form>
                        <span style={{color:'red'}}>{this.state.err}</span>
                    </Card.Body>              
                </Card>
                </Container>
            </React.Fragment>    
        )
    }
}