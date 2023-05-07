import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function Register() {
  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    client.get("/api/user")
    .then(function(res) {
      setCurrentUser(true);
    })
    .catch(function(error) {
      setCurrentUser(false);
    });
  }, []);

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true);
    }
  }
  function submitRegistration(e) {
    e.preventDefault();
    client.post(
      "/api/register",
      {
        email: email,
        username: username,
        password: password
      }
    ).then(function(res) {
      client.post(
        "/api/login",
        {
          email: email,
          password: password
        }
      ).then(function(res) {
        setCurrentUser(true);
      });
    });
  }

  function submitLogin(e) {
    e.preventDefault();
    client.post(
      "/api/login",
      {
        email: email,
        password: password
      }
    ).then(function(res) {
      setCurrentUser(true);
    });
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post(
      "/api/logout",
      {withCredentials: true}
    ).then(function(res) {
      setCurrentUser(false);
    });
  }






  if (currentUser) {
  
  return (
    <div>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Authentication App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <form onSubmit={e => submitLogout(e)}>
              <Button type="submit" variant="light">Log out</Button>
            </form>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <div className="center">
        <h2>You're logged in!</h2>
      </div>
    </div>
  )
  }
  return(

    <div>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Authentication App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button id="form_btn" onClick={update_form_btn} variant="light">Register</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {
      registrationToggle ?(
      
      <div className="center">
      <Form onSubmit={e => submitRegistration(e)}>
      
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="row border rounded-5 p-3 bg-white shadow box-area">

   

       <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{background: '#103cbe'}}>
           <div className="featured-image mb-3">
           <img src={process.env.PUBLIC_URL + "/static_components/images/1.png"} className="img-fluid" style={{ width: "250px" }} />
           </div>
           <p className="text-white fs-2"style={{ fontFamily: 'Courier New, Courier, monospace', fontWeight: 600 }}
>Be Verified</p>
           <small className="text-white text-wrap text-center" style={{ width: '17rem', fontFamily: 'Courier New, Courier, monospace' }}>Join experienced Designers on this platform.</small>
       </div> 
       <div className="col-md-6 right-box">
          <div className="row align-items-center">
                <div className="header-text mb-4">
                     <h2>Hello, Welcome to CapitalDash!</h2>
                     <p>We are happy to have you back.</p>
                </div>
                <div className="input-group mb-3">
                <input type="text" className="form-control form-control-lg bg-light fs-6" placeholder="User Name" onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="input-group mb-3">
                <input type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Email address" onChange={e => setEmail(e.target.value)} value={email} />
                </div>
                <div className="input-group mb-1">
                <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} />
                </div>

                <div className="input-group mb-5 d-flex justify-content-between">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="formCheck"/>
                        <label for="formCheck" className="form-check-label text-secondary"><small>Remember Me</small></label>
                    </div>
                </div>
                <div className="input-group mb-3">
                <button className="btn btn-lg btn-primary w-100 fs-6" >Register</button>
                </div>
                <div className="input-group mb-3">
                    <button className="btn btn-lg btn-light w-100 fs-6">
                    <img src={process.env.PUBLIC_URL + "/static_components/images/google.png"} style={{width:'20px'}} className="me-2"/><small>Sign In with Google</small></button>
                </div>
                <div className="row">
                    <small>Already have an account? <a href="#">Log-in</a></small>
                </div>
          </div>
       </div> 

      </div>
    </div>
    </Form>
        </div>
    
):(
  <div className="center">
          <Form onSubmit={e => submitLogin(e)}>


          <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="row border rounded-5 p-3 bg-white shadow box-area">

   

       <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{background: '#103cbe'}}>
           <div className="featured-image mb-3">
           <img src={process.env.PUBLIC_URL + "/static_components/images/1.png"} className="img-fluid" style={{ width: "250px" }} />
           </div>
           <p className="text-white fs-2"style={{ fontFamily: 'Courier New, Courier, monospace', fontWeight: 600 }}
>Be Verified</p>
           <small className="text-white text-wrap text-center" style={{ width: '17rem', fontFamily: 'Courier New, Courier, monospace' }}>Join experienced Designers on this platform.</small>
       </div> 

   
        
       <div className="col-md-6 right-box">
          <div className="row align-items-center">
                <div className="header-text mb-4">
                     <h2>Hello,Again</h2>
                     <p>We are happy to have you back.</p>
                </div>
                <div className="input-group mb-3">
                <input type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Email address" onChange={e => setEmail(e.target.value)} value={email} />
                </div>
                <div className="input-group mb-1">
                <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} />
                </div>
                <div className="input-group mb-5 d-flex justify-content-between">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="formCheck"/>
                        <label for="formCheck" className="form-check-label text-secondary"><small>Remember Me</small></label>
                    </div>
                    <div className="forgot">
                        <small><a href="#">Forgot Password?</a></small>
                    </div>
                </div>
                <div className="input-group mb-3">
                <button className="btn btn-lg btn-primary w-100 fs-6" >Login</button>
                </div>
                <div className="input-group mb-3">
                    <button className="btn btn-lg btn-light w-100 fs-6">
                    <img src={process.env.PUBLIC_URL + "/static_components/images/google.png"} style={{width:'20px'}} className="me-2"/><small>Sign In with Google</small></button>
                </div>
                <div className="row">
                    <small>Don't have account? <a href="#">Sign Up</a></small>
                </div>
          </div>
       </div> 

      </div>
    </div>

          </Form>
          </div>
)
    }
   




</div>

  
)

  }

export default Register