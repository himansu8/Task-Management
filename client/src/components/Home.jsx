import axios from "axios";
import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
//import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Button, Dropdown } from "react-bootstrap";
import ViewTaskModal from "./ViewTaskModal";
import CreateTaskModal from "./CreateTaskModal";
import UpdateTaskmodal from "./UpdateTaskmodal";
function Home() {
  //console.log(process.env.REACT_APP_BASE_URL);

  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("")
  async function fetchTasks() {
    try {
      // let res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/task`,{ withCredentials: true })
      const token = JSON.parse(localStorage.getItem('token')).token;
      let res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/task`,
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      )
      setTasks(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchTasks()
  }, [])
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewTaskId, setViewTaskId] = useState(null);

  //let navigate = useNavigate();
  const handleViewModalClose = () => setShowViewModal(false);
  const handleViewModalShow = (id) => {
    // console.log(id)
    setViewTaskId(id);
    setShowViewModal(true);
  };



  const [showCreateModal, setShowCreateModal] = useState(false);
  const handleCreateModalClose = () => setShowCreateModal(false);
  const handleCreateModalShow = () => setShowCreateModal(true);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedTaskId, setUpdateTaskId] = useState(null);
  const [updatedTaskName, setUpdatedTaskName] = useState(null);
  const [updatedDeadline, setUpdatedDeadline] = useState(null);

  const handleUpdateModalClose = () => setShowUpdateModal(false);

  const handleUpdateModalShow = (id, taskName, deadline) => {

    setUpdateTaskId(id);
    setUpdatedTaskName(taskName);
    setUpdatedDeadline(deadline);
    setShowUpdateModal(true);
  };

  async function deleteTask(taskId) {
    try {
      const token = JSON.parse(localStorage.getItem('token')).token;
      const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/task/${taskId}`, {
        headers: {
          authorization: `bearer ${token}`
        }
      });

      let updatedTasks = tasks.filter((ele) => ele._id !== taskId);
      setTasks(updatedTasks);
      //fetchTasks(); // Refresh the tasks after deleting a task
      // console.log(res)
      toast.success(res.data.msg);
    } catch (error) {
      console.log(error);
    }
  }
  const filterTasks = async (filterType) => {
    // let res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/task`, { withCredentials: true });
    const token = JSON.parse(localStorage.getItem('token')).token;
    let res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/task`, {
      headers: {
        authorization: `bearer ${token}`
      }
    });
    let tasksData = res.data;
    let filteredTasks = [];

    switch (filterType) {
      case "completed":
        filteredTasks = tasksData.filter((task) => task.isCompleted);
        setTaskTitle("Completed Tasks");
        break;
      case "incomplete":
        filteredTasks = tasksData.filter((task) => !task.isCompleted);
        setTaskTitle("Incomplete Tasks");
        break;
      case "all":
        filteredTasks = tasksData;
        setTaskTitle("Tasks");
        break;
      default:
        filteredTasks = tasks;
    }
    setTasks(filteredTasks);
  };

  // console.log(tasks)

  return (
    <Container fluid>
      <Container>
        <Row>
          <div className="col-lg-12">
            <h1>{taskTitle}</h1>
          </div>
        </Row>

        <Row>
          <div className="col-lg-12 text-end mb-3">
            <Button variant="primary" onClick={handleCreateModalShow}>
              Create Task
            </Button>

          </div>
        </Row>
        <Row>
          <div className="col-lg-12 mb-3">
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Filter
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => filterTasks("all")}>All Tasks</Dropdown.Item>
                <Dropdown.Item onClick={() => filterTasks("completed")}>Completed Tasks</Dropdown.Item>
                <Dropdown.Item onClick={() => filterTasks("incomplete")}>Incomplete Tasks</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Row>
        <Row>
          <div className="col-lg-12">
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Serial No</th>
                  <th>Task Name</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Delete</th>
                  <th>Edit</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length > 0 ? (
                  tasks.map((task, index) => (
                    <tr key={task._id}>
                      <td>{1 + index}</td>
                      <td>{task?.taskName}</td>
                      <td>{new Date(task?.deadline).toLocaleDateString()}</td>
                      <td>{task?.isCompleted ? "completed" : "Pending"}</td>
                      <td><span className="delete-button" type="delete" style={{ cursor: "pointer" }} onClick={() => deleteTask(task._id)}><MdDelete className="fs-3" /></span></td>
                      <td><span className="edit-button" type="edit" style={{ cursor: "pointer" }} onClick={() => handleUpdateModalShow(task._id, task.taskName, task.deadline)}><MdEdit className="fs-3" /></span></td>
                      <td><span className="edit-button" type="edit" style={{ cursor: "pointer" }} onClick={() => handleViewModalShow(task._id)}><FaEye className="fs-3" /></span></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">Loading...</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Row>
      </Container>
      <CreateTaskModal
        handleCreateModalClose={handleCreateModalClose}
        showCreateModal={showCreateModal}
        setTasks={setTasks}
      />
      <UpdateTaskmodal
        handleUpdateModalClose={handleUpdateModalClose}
        showUpdateModal={showUpdateModal}
        id={updatedTaskId}
        taskName={updatedTaskName}
        deadline={updatedDeadline}
        setTasks={setTasks}
        fetchTasks={fetchTasks}
      />
      <ViewTaskModal
        handleViewModalClose={handleViewModalClose}
        showViewModal={showViewModal}
        id={viewTaskId}
      />
    </Container>
  )
}

export default Home