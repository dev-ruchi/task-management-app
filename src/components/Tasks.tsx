import { useEffect, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";

// Define a type for the task
interface Task {
  _id: string;
  taskTitle: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string; 
  status?: boolean;
}

const TaskForm: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch("http://localhost:3000/tasks")
      .then((response) => {
        if (!response.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return response.json();
      })
      .then((data) => {
        setTasks(data);
      })
      .catch((err) => {
        setTasks([]);
        console.log(err);
      });
  };

  function handleDelete(taskToDelete: Task) {
    if (!confirm("Do you want to delete this task")) return;

    // Make the call to delete the task

    setTasks((prevTasks) =>
      prevTasks.filter((task) => task._id !== taskToDelete._id)
    );
  }

  const columns = [
    {
      title: "Task Title",
      dataIndex: "taskTitle", // Refers to taskTitle in the data
      key: "taskTitle",
    },
    {
      title: "Priority",
      dataIndex: "priority", // Refers to priority in the data
      key: "priority",
      render: (priority: "High" | "Medium" | "Low") => {
        let color = "";
        if (priority === "High") color = "red";
        else if (priority === "Medium") color = "orange";
        else color = "green";
        return <span style={{ color, fontWeight: "bold" }}>{priority}</span>;
      },
    },
    {
      title: "Due Date",
      dataIndex: "dueDate", // Refers to dueDate in the data
      key: "dueDate",
      render: (dueDate: string) => new Date(dueDate).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status", // Refers to status in the data
      key: "status",
      render: (status?: boolean) => (status ? "Completed" : "Not Completed"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Task) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to={`/update/${record._id}`}>Edit</Link>
          <button
            onClick={() => handleDelete(record)}
            style={{ color: "red", cursor: "pointer" }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Tasks</h1>
      <Table
        rowKey={(task: Task) => task._id}
        columns={columns}
        dataSource={tasks}
        pagination={{ pageSize: 10 }}
        loading={tasks.length === 0} // Show loading spinner until data is loaded
      />
    </div>
  );
};

export default TaskForm;
