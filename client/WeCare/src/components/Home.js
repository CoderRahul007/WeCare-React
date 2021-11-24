import React from "react";
import { Container, Card,Button } from "react-bootstrap";
import userImg from '../User LogIn.jpg';
import coachImg from '../Life Coach LogIn.jpg'
import HomeHeader from './HomeHeader';

export default function Home() {
  return (
    <React.Fragment>
      <HomeHeader/>
      <Container
        style={{
          alignContent: "center",
          justifyContent: "center",
          width: "100vh",
        }}
      >
        <h3>We are at the heart of appropriate care</h3>
      </Container>
      <br></br>
      <Container style={{display:'flex',alignItems:'center' ,justifyContent:'space-between' ,width:'50%'}}>
        <Card className="text-center" style={{backgroundColor:'black',height:'60vh',width:'50vh'}}>
            <Container
                    style={{
                    alignContent: "center",
                    justifyContent: "center",
                    padding:'15px'
                    }}
                >
                <Card.Img variant="top" src={coachImg}  style={{height:'100%', width:'50%'}}/>
            </Container>
            <Card.Body>
            <Button variant="primary" href="/coachlogin"  block>
                Login as a Coach
            </Button>
            <Button variant="primary"  href="/coachsignup" block>
                Join as a Coach
            </Button>
            </Card.Body>
        </Card>
        <Card className="text-center" style={{backgroundColor:'black',height:'60vh',width:'50vh'}}>
            <Container
                    style={{
                    alignContent: "center",
                    justifyContent: "center",
                    padding:'15px'
                    }}
                >
                <Card.Img variant="top" src={userImg} style={{height:'100%', width:'50%',justifyContent:'center',alignContent:'center'}}/>
            </Container>
            <Card.Body>
            <Button variant="primary" href="/userlogin" block>
               Login as a User
            </Button>
            <Button variant="primary" href="/usersignup"  block>
               Join as a User
            </Button>
            </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
}
