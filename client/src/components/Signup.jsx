import axios from "axios";
import React, { useState } from "react";
//import toast from "react-hot-toast";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";

function Signup({ isAuthenticated, setIsAuthenticated }) {
  //let navigate = useNavigate();
  let [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: ""

  })
  const { firstName, lastName, email, phone, password } = formData;


  function onChangeHandler(e) {
    //console.log(e.target.value)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  async function onClick(e) {
    try {
      e.preventDefault();
      // console.log(formData)
      let res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/signup`, formData)
      console.log(res.data)
      setIsAuthenticated(true);
      window.alert("You have successfully registered")
      //toast.success("You have successfully registered")
      

    }
    catch (error) {
      let errorString = "";
      //handling express validator errors
      if (error.response.data.errors) {
        error.response.data.errors.forEach((ele) => {
          errorString += `${ele.msg} `
        })

        window.alert(errorString)
        //toast.error(errorString);
      }
      else {
        //Custom errors
        errorString = error.response.data.error;
        window.alert(errorString)
        //toast.error(errorString);
      }
    }

  }
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <Container
    className="d-flex justify-content-center align-items-center"
    style={{ minHeight: "800px" }}
  >
    <Form  className="w-100">
      <h3 className="text-center ">REGISTER</h3>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Your First Name"
          value={firstName}
          name="firstName" onChange={onChangeHandler}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Your Last Name"
          value={lastName}
          name="lastName" onChange={onChangeHandler}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter Your Email"
          value={email}
          name="email" onChange={onChangeHandler}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Your Phone Number"
          value={phone}
          name="phone" onChange={onChangeHandler}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          name="password" onChange={onChangeHandler}
        />
      </Form.Group>
      <Form.Group className="text-center">
        <Form.Label>
          Already Registered?{" "}
          <Link to={"/login"} className="text-decoration-none ">
            LOGIN
          </Link>
        </Form.Label>
      </Form.Group>
      <Button
        variant="warning"
        type="submit"
        className="w-100 text-light fw-bold fs-5"
        onClick={onClick}
      >
        Submit
      </Button>
      
      {/* <Button
        variant="warning"
        type="submit"
        className="w-100 text-light fw-bold fs-5 g-10"
      >
        Cancel
      </Button> */}
    </Form>
  </Container>
  )
}

export default Signup