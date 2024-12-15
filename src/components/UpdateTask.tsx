import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Input, Button, message, Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useParams, useNavigate } from "react-router-dom";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  // Extract year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const UpdateTask = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    _id: "",
    taskTitle: "",
    priority: "",
    dueDate: "",
    status: false,
  });

  const fetchTasks = () => {
    fetch(`http://localhost:3000/tasks/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setTask(data);
      })
      .catch((err) => {
        setTask({
          _id: "",
          taskTitle: "",
          priority: "Low",
          dueDate: "",
          status: false,
        });
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | CheckboxChangeEvent
  ) => {
    const { name, value, type, checked } = e.target;
    setTask((prev) => ({
      ...prev,
      [name as string]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleUpdate = () => {
    if (!task._id) {
      message.error("Task ID is required!");
      return;
    }

    axios
      .put(`http://localhost:3000/tasks/${task._id}`, {
        taskTitle: task.taskTitle,
        priority: task.priority,
        dueDate: task.dueDate,
        status: task.status,
      })
      .then(() => {
        message.success("Task updated successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to update task.");
      });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl mb-4">Update Task</h1>
      <Form layout="vertical" onFinish={handleUpdate}>
        <Form.Item label="Task Title">
          <Input
            name="taskTitle"
            value={task.taskTitle}
            onChange={handleInputChange}
            placeholder="Enter task title"
          />
        </Form.Item>
        <Form.Item label="Priority">
          <Input
            name="priority"
            value={task.priority}
            onChange={handleInputChange}
            placeholder="High, Medium, or Low"
          />
        </Form.Item>
        <Form.Item label="Due Date">
          <Input
            name="dueDate"
            type="date"
            value={formatDate(task.dueDate)}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item>
          <Checkbox name="status" onChange={handleInputChange}>
            Status
          </Checkbox>
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Update Task
        </Button>
      </Form>
    </div>
  );
};

export default UpdateTask;
