/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import axios from "axios";

// Define the BASE_URL
import { BASE_URL } from "../util/utils";

// Define types
interface Task {
  _id: string;
  taskname: string;
  tag: string;
  time: string;
  error: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

interface CreateTask {
  taskname: string;
  tag: string;
  time: string;
}

// API functions
const GetAllTasks = async (): Promise<ApiResponse<Task[]>> => {
  try {
    const response = await axios.get<Task[]>(`${BASE_URL}/`);
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Error fetching tasks:", error);
    return {
      success: false,
      message: error.response?.data?.error || "Failed to fetch tasks",
    };
  }
};

const CreateTask = async (taskData: CreateTask): Promise<ApiResponse<Task>> => {
  try {
    const response = await axios.post<Task>(`${BASE_URL}/`, taskData);
    return {
      success: true,
      data: response.data,
      message: "Task created successfully",
    };
  } catch (error: any) {
    console.error("Error creating task:", error);
    return {
      success: false,
      message: error.response?.data?.error || "Failed to create task",
    };
  }
};

const UpdateTaskById = async (
  id: string,
  taskData: CreateTask
): Promise<ApiResponse<Task>> => {
  try {
    const response = await axios.patch<Task>(`${BASE_URL}/${id}`, taskData);
    return {
      success: true,
      data: response.data,
      message: "Task updated successfully",
    };
  } catch (error: any) {
    console.error("Error updating task:", error);
    return {
      success: false,
      message: error.response?.data?.error || "Failed to update task",
    };
  }
};

const DeleteTaskById = async (id: string): Promise<ApiResponse<any>> => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return {
      success: true,
      data: response.data,
      message: "Task deleted successfully",
    };
  } catch (error: any) {
    console.error("Error deleting task:", error);
    return {
      success: false,
      message: error.response?.data?.error || "Failed to delete task",
    };
  }
};

// Simple console notification function
const notify = (
  message: string,
  type: "success" | "error" | "warning" | "info"
): void => {
  console.log(`${type.toUpperCase()}: ${message}`);
  // You could implement a custom notification UI here if needed
};

const TaskManager: React.FC = () => {
  const [taskName, setTaskName] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [copyTasks, setCopyTasks] = useState<Task[]>([]);
  const [updateTask, setUpdateTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch all tasks on component mount
  useEffect(() => {
    fetchAllTasks();
  }, []);

  // Set form fields when editing a task
  useEffect(() => {
    if (updateTask) {
      setTaskName(updateTask.taskname || "");
      setTag(updateTask.tag || "");
      setTime(updateTask.time || "");
    }
  }, [updateTask]);

  const fetchAllTasks = async (): Promise<void> => {
    try {
      const { success, data, message } = await GetAllTasks();
      if (success && data) {
        setTasks(data);
        setCopyTasks(data);
      } else {
        notify(message || "Unknown error occurred", "error");
      }
    } catch (err) {
      console.error(err);
      notify("Failed to fetch tasks", "error");
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!taskName || !tag || !time) {
      notify("All fields are required", "warning");
      return;
    }

    if (updateTask) {
      handleUpdateTask();
    } else {
      handleAddTask();
    }
  };

  const handleAddTask = async (): Promise<void> => {
    const taskData = {
      taskname: taskName,
      tag,
      time,
    };

    try {
      const { success, message } = await CreateTask(taskData);
      if (success) {
        notify(message || "Task created successfully", "success");
        resetForm();
        fetchAllTasks();
      } else {
        notify(message || "Failed to create task", "error");
      }
    } catch (err) {
      console.error(err);
      notify("Failed to create task", "error");
    }
  };

  const handleUpdateTask = async (): Promise<void> => {
    if (!updateTask) return;

    const taskData = {
      taskname: taskName,
      tag,
      time,
    };

    try {
      const { success, message } = await UpdateTaskById(
        updateTask._id,
        taskData
      );
      if (success) {
        notify(message || "Task updated successfully", "success");
        resetForm();
        setUpdateTask(null);
        fetchAllTasks();
      } else {
        notify(message || "Failed to update task", "error");
      }
    } catch (err) {
      console.error(err);
      notify("Failed to update task", "error");
    }
  };

  const handleDeleteTask = async (id: string): Promise<void> => {
    try {
      const { success, message } = await DeleteTaskById(id);
      if (success) {
        notify(message || "Task deleted successfully", "success");
        fetchAllTasks();
      } else {
        notify(message || "Failed to delete task", "error");
      }
    } catch (err) {
      console.error(err);
      notify("Failed to delete task", "error");
    }
  };

  const resetForm = (): void => {
    setTaskName("");
    setTag("");
    setTime("");
  };

  const cancelUpdate = (): void => {
    setUpdateTask(null);
    resetForm();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.trim() === "") {
      setTasks(copyTasks);
      return;
    }

    const filteredTasks = copyTasks.filter(
      (item) =>
        item.taskname.toLowerCase().includes(term) ||
        item.tag.toLowerCase().includes(term) ||
        item.time.toLowerCase().includes(term)
    );

    setTasks(filteredTasks);
  };

  return (
    <div className="container mx-auto px-4 mt-[10rem]">
      <div className="flex justify-center">
        <div className="w-full max-w-3xl">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-primary text-white p-4">
              <h3 className="text-xl font-bold text-center">Ask Me</h3>
            </div>
            <div className="p-6">
              {/* Task Form */}
              <form onSubmit={handleSubmit} className="mb-6">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-5">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Task Name"
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-span-3">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Tag"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-span-2 flex">
                    <button
                      type="submit"
                      className="flex-grow mr-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md flex items-center justify-center"
                    >
                      {updateTask ? <FaPencilAlt /> : <FaPlus />}
                    </button>

                    {updateTask && (
                      <button
                        type="button"
                        className="flex-grow bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center justify-center"
                        onClick={cancelUpdate}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              </form>

              {/* Search Box */}
              <div className="relative flex items-center mb-6">
                <span className="absolute left-3 text-gray-500">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search tasks"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>

              {/* Task List */}
              {tasks.length > 0 ? (
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <div
                      key={task._id}
                      className="flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200"
                    >
                      <div>
                        <h5 className="font-medium mb-1">{task.taskname}</h5>
                        <div className="flex items-center">
                          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded mr-2">
                            {task.tag}
                          </span>
                          <small className="text-gray-500">{task.time}</small>
                        </div>
                      </div>
                      <div className="flex">
                        <button
                          onClick={() => setUpdateTask(task)}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded mr-2"
                          type="button"
                          aria-label="Edit"
                        >
                          <FaPencilAlt size={12} />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task._id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                          type="button"
                          aria-label="Delete"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <p>No tasks found. Add a new task to get started!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
