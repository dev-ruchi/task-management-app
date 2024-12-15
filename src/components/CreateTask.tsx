import axios from "axios";
import { Input, Button, Form, message, Checkbox } from "antd";

const CreateTask = () => {
  const [form] = Form.useForm();

  const addTask = (values: any) => {
    const payload = {
      taskTitle: values.taskTitle,
      priority: values.priority,
      dueDate: values.dueDate || new Date().toISOString().split("T")[0],
      status: values.status || false, // Default to false if not provided
    };

    axios
      .post("http://localhost:3000/tasks", payload)
      .then((data) => {
        message.success("Task created successfully!");
        form.resetFields(); // Reset form after successful submission
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to create task.");
      });
  };

  return (
    <div>
      <h2>Create Task</h2>
      <Form
        layout="vertical"
        onFinish={addTask}
        form={form}
        initialValues={{
          taskTitle: "",
          priority: "Low", // Set default priority
          dueDate: new Date().toISOString().split("T")[0], // Default to today's date
          status: false, // Default to not completed
        }}
      >
        <Form.Item
          label="Task Title"
          name="taskTitle"
          rules={[{ required: true, message: "Task title is required!" }]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>

        <Form.Item
          label="Priority"
          name="priority"
          rules={[{ required: true, message: "Priority is required!" }]}
        >
          <Input placeholder="Enter priority (High, Medium, Low)" />
        </Form.Item>

        <Form.Item
          label="Due Date"
          name="dueDate"
          rules={[{ required: true, message: "Due date is required!" }]}
        >
          <Input type="date" />
        </Form.Item>

        <Form.Item
          name="status"
          valuePropName="checked"
        >
          <Checkbox>Checkbox</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Task
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateTask;
