import axios from "axios";
import React, { useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";


function UpdateTaskmodal({ showUpdateModal, handleUpdateModalClose, id, setTasks, taskName, deadline }) {
  const [data, setData] = useState({
    updateTaskName: taskName,
    taskDeadLine: deadline,
    newIsCompleted: "false",
  })

  function onChangeHandler(e) {
    // console.log(e.target.name, e.target.value)
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }
  const inputData = async (taskid) => {
    //console.log(taskid)
    try {

      const token = JSON.parse(localStorage.getItem('token')).token;
      let res = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/task/${taskid}`, data, {
        headers: {
          authorization: `bearer ${token}`
        }
      });
      //console.log(`${process.env.REACT_APP_BASE_URL}/api/task/${taskid}`)

      handleUpdateModalClose()
      // console.log("======================>",res.data.task)
      setTasks((prevTasks) => {
        let pTask = [...prevTasks];
        let taskIndex = pTask.findIndex((ele) => ele._id === res.data.task._id);
        pTask[taskIndex] = res.data.task
        return pTask
      }

      );

      //find the id and update
      // fetchTasks()
      toast.success(res.data.msg)
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while updating the task. Please try again later.");
    }
  };


  return (
    <>
      <Modal show={showUpdateModal} onHide={handleUpdateModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Task </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack gap={2}>
            <label>Task Name</label>
            <input
              type="text"
              placeholder={taskName}
              name="updateTaskName" value={data.updateTaskName} onChange={onChangeHandler}
            />
          </Stack>
          <br />
          <Stack gap={2}>
            <label>Deadline</label>
            <input
              type="datetime-local" placeholder="Enter Deadline" name="taskDeadLine" onChange={onChangeHandler}
            />
          </Stack>
          <br />
          <Stack gap={2}>
            <label>Status</label>
            <select value={data.newIsCompleted} name="newIsCompleted" onChange={onChangeHandler}>
              <option value="true">COMPLETED</option>
              <option value="false">INCOMPLETE</option>
            </select>
          </Stack>
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => inputData(id)}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default UpdateTaskmodal