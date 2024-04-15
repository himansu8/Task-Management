import axios from "axios";
import React, {  useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";


function UpdateTaskmodal({ showUpdateModal, handleUpdateModalClose,fetchTasks, id, setTasks, taskName, deadline }) {

    const [data, setData] = useState({
        updateTaskName:taskName,
        taskDeadLine: deadline,
        newIsCompleted: "false",
    })

    function onChangeHandler(e) {
        console.log(e.target.name, e.target.value)
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const inputData = async (taskid) => {

        try {
            let res = await axios.patch(`/api/task/${taskid}`, data);
            console.log(taskid)
            handleUpdateModalClose()
            console.log(res.data)
            setTasks(res.data.task);
            fetchTasks()
            toast.success(res.data.msg)
        } catch (error) {
            console.log(error);
        }
    };
    console.log("taskName prop:", taskName);
console.log("data state:", data);

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
                placeholder="New task name"
                name="updateTaskName" value={taskName} onChange={onChangeHandler}
              />
            </Stack>
            <br />
            <Stack gap={2}>
              <label>Deadline</label>
              <input
                type="datetime-local" placeholder="Enter Deadline" name="taskDeadLine"  onChange={onChangeHandler}
              />
            </Stack>
            <br />
            <Stack gap={2}>
              <label>Status</label>
              <select value={data.newIsCompleted} name="newIsCompleted"  onChange={onChangeHandler}>
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