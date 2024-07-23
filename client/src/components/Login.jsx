import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import axios from "axios";
import { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext'

function Login() {
  let navigate = useNavigate();
  const { dispatch } = useContext(AuthContext)
  console.log(process.env.REACT_APP_BASE_URL)
  let [userData, setUserData] = useState({
    email: undefined,
    password: undefined
  })

  const { email, password } = userData;

  function onChangeHandler(e) {
    //console.log(e.target.value)
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }
  async function onClick(e) {
    try {
      e.preventDefault();
      // if (!userData.email.trim() || !userData.password.trim()) {

      //   // showAlert({
      //   //   type: "error",
      //   //   msg: "Please pass email and password"
      //   // })
      //   window.alert("Please pass email and password")

      //   return;
      // }
      let res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/user/login`, userData)
      console.log(res.data)
      const { token, details } = res.data;
      //  document.cookie = `access_token=${token}; path=/; secure;`;
      localStorage.setItem('token', JSON.stringify({ token, details }))
      dispatch({ type: "LOGIN_SUCCESS", payload: details })
      toast.success("You are Loged In !")
      navigate('/');
    }


    catch (error) {
      dispatch({ type: "LOGIN_failure", payload: error.response.data })
      let errorString = "";
      //handling express validator errors
      if (error.response.data.errors) {
        error.response.data.errors.forEach((ele) => {
          errorString += `${ele.msg} `
        })
        // showAlert({
        //   type: "error",
        //   msg: errorString
        // })
        toast.error(errorString);
        //window.alert(errorString)

      }
      else {
        //Custom errors
        errorString = error.response.data.error;
        // showAlert({
        //   type: "error",
        //   msg: errorString
        // })
        toast.error(errorString);
        //window.alert(errorString)

      }
    }

  }
  // function onClear(e) {
  //   e.preventDefault();
  //   setUserData({
  //     email: '',
  //     password: '',
  //   });
  // }

  return (
    <Container
      className="d-flex justify-content-center align-items-center overflow-y-hidden"
      style={{ minHeight: "800px" }}
    >
      <Form className="w-100">
        <h3 className="text-center ">LOGIN</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email} name="email" onChange={onChangeHandler}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password} name="password" onChange={onChangeHandler}
          />
        </Form.Group>
        <Form.Group className="text-center">
          <Form.Label>
            Not Registered?{" "}
            <Link to={"/signup"} className="text-decoration-none ">
              REGISTER NOW
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
      </Form>
    </Container>
  )
}

export default Login