import axios from "axios";
import { useContext } from "react";
//import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
//import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle } from 'react-icons/fa';
function Header() {
  const { user, dispatch } = useContext(AuthContext)
  let navigate = useNavigate()

  // const [allTasks, setAllTasks] = useState([]);
  // // Fetch tasks from the server when the component mounts
  // useEffect(() => {
  //   fetchTasks();
  // }, [isAuthenticated]);

  // // Fetch tasks from the server
  // const fetchTasks = async () => {
  //   try {
  //     let token = JSON.parse(localStorage.getItem('token')).token;
  //     let response = await axios.get('/api/task', {
  //       headers: {
  //         "authorization": `Bearer ${token}`
  //       }
  //     })
  //     setAllTasks(response.data);
  //     setTasks(response.data); // Update tasks with fetched tasks
  //   } catch (error) {
  //     console.error("Error fetching tasks:", error);
  //   }
  // };

  const handleLogout = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const removeToken = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/removetoken`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      if (removeToken) {
        dispatch({ type: "LOGOUT" })
        navigate('/');
      }
    }
    catch (error) {
      console.log(error)
    }
  };

  // const filterTasks = (filterType) => {
  //   let filteredTasks = [];

  //   switch (filterType) {
  //     case "completed":
  //       filteredTasks = allTasks.filter((task) => task.isCompleted === "true");
  //       setTaskTitle("Completed Tasks");
  //       break;
  //     case "incomplete":
  //       filteredTasks = allTasks.filter((task) => task.isCompleted === "false");
  //       setTaskTitle("Incomplete Tasks");
  //       break;
  //     // case "archived":
  //     //   filteredTasks = allTasks.filter((task) => task.archived === true);
  //     //   setTaskTitle("Archived Tasks");
  //     //   break;
  //     case "all":
  //       filteredTasks = allTasks;
  //       setTaskTitle("Tasks");
  //       break;
  //     default:
  //       filteredTasks = allTasks;
  //   }
  //   setTasks(filteredTasks);
  // };

  return (
    <Navbar
      expand="lg"
      className={`bg-body-tertiary`}
    >
      <Container>
        <Navbar.Brand href="/">TASK MANAGER HOME</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Item>
              <Link
                to={"/"}
                className="nav-link text-decoration-none link-light"
                style={{ color: "white" }}
              >
                Home
              </Link>
            </Nav.Item> */}
            {/* <Nav.Item>
              <NavDropdown title="Filter Tasks" id="basic-nav-dropdown" style={{ color: "white" }}>
                <NavDropdown.Item>All Tasks</NavDropdown.Item>
                <NavDropdown.Item>Completed Tasks</NavDropdown.Item>
                <NavDropdown.Item>Incomplete Tasks</NavDropdown.Item>
              </NavDropdown>
            </Nav.Item> */}

          </Nav>
          {user && (
            <Nav>
              <NavDropdown
                title={
                  <span style={{ fontWeight: "bold", color: "white", fontSize: "1.1rem", marginRight: "10px" }}>
                    <FaUserCircle style={{ fontSize: "1.5rem", marginRight: "5px" }} /> {user.firstName}
                  </span>
                }
                id="basic-nav-dropdown"

              >
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;