import axios from "axios";
import React, { useState } from "react";
import { Button, Modal, Stack } from "react-bootstrap";
import toast from "react-hot-toast";
function CreateTaskModal({ showCreateModal, handleCreateModalClose, setTasks }) {

    let [formData, setFormData] = useState({
        taskName: "",
        taskDeadLine: ""
    })
    const { taskName, taskDeadLine } = formData;

    function onChangeHandler(e) {
        // console.log(e.target.value)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    async function onSubmit(e) {
        try {
            e.preventDefault();
            //console.log(formData)
            const token = JSON.parse(localStorage.getItem('token')).token;
            let res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/task`, formData, {
                headers: {
                    authorization: `bearer ${token}`
                }
            })
            // console.log("------------------>",res.data)
            setTasks((prevTasks) => [...prevTasks, res.data.task]);
            toast.success(res.data.msg);
            handleCreateModalClose();
        }
        catch (error) {
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
                // window.alert(errorString)
                toast.error(errorString)

            }
            else {
                //Custom errors
                errorString = error.response.data.error;
                // showAlert({
                //   type: "error",
                //   msg: errorString
                // })
                //window.alert(errorString)
                toast.error(errorString)

            }
        }

    }
    return (
        <>
            <Modal show={showCreateModal} onHide={handleCreateModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack gap={3}>
                        <label>Task Name</label>
                        <input
                            type="text"
                            placeholder="Title"
                            value={taskName}
                            name="taskName"
                            onChange={onChangeHandler}
                        />
                    </Stack>
                    <br />
                    <Stack gap={3}>
                        <label>Deadline</label>
                        <input
                            type="datetime-local"
                            placeholder="Date and Time"
                            value={taskDeadLine}
                            name="taskDeadLine"
                            onChange={onChangeHandler}
                        />
                    </Stack>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCreateModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSubmit}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateTaskModal