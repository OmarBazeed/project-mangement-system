import React, { useEffect, useState } from "react";
import style from "../Tasks.module.css";
import {
  ColumnProps,
  TaskProps,
  TasksInterface,
  changeTaskStatus,
} from "../../../../interfaces/Auth";
import { baseUrl, getRequestHeaders } from "../../../../utils/Utils";
import axios from "axios";
import { motion } from "framer-motion";

export default function TaskBoard() {
  baseUrl;
  const [tasks, setTasks] = useState<TasksInterface>([]);
  const [fetchcount, refetch] = useState(0);

  const getAllTasks = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Task`, {
        headers: getRequestHeaders(),
      });

      setTasks(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const changeTaskStatus: changeTaskStatus = async (
    id,
    prevStatus,
    newStatus
  ) => {
    try {
      const newTasks = tasks.map((task) => {
        if (task.id == id) return { ...task, status: newStatus };
        return task;
      });
      setTasks(newTasks);
      if (prevStatus == newStatus) {
        return;
      } else {
        const response = await axios.put(
          `${baseUrl}/Task/${id}/change-status`,
          { status: newStatus },
          {
            headers: getRequestHeaders(),
          }
        );
      }
      refetch((prev) => prev + 1);
    } catch (error) {
      // refetch((prev) => prev + 1);
    }
  };
  useEffect(() => {
    getAllTasks();
  }, [fetchcount]);

  return (
    <>
      <section>
        <div
          className={`task-board-head container-fluid shadow-sm  head-bg pt-5 pb-4 px-5`}
        >
          <div className={`row`}>
            <div className="col-md-6">
              <div>
                <h2
                  className={`text-theme text-lg-start text-sm-center text-center`}
                >
                  Tasks Board
                </h2>
              </div>
            </div>
            {/* <div
              className={`col-md-6 text-lg-end text-sm-center text-center text-theme`}
            >
              <h2>test</h2>
            </div> */}
          </div>
        </div>
        <div className="task-board-body head-bg mt-5 container rounded-4 shadow  px-4 py-5">
          <div className="row justify-content-center gy-5 ">
            <Column
              changeTaskStatus={changeTaskStatus}
              tasks={tasks}
              status="ToDo"
              title="To Do"
            />
            <Column
              changeTaskStatus={changeTaskStatus}
              tasks={tasks}
              status="InProgress"
              title="In Progress"
            />
            <Column
              changeTaskStatus={changeTaskStatus}
              tasks={tasks}
              status="Done"
              title="Done"
            />
          </div>
        </div>
      </section>
    </>
  );
}

const Task = ({ task }: TaskProps) => {
  const [isDragging, setIsDragging] = useState(false);
  return (
    <motion.div
      layout={true}
      layoutId={task.id}
      draggable={true}
      onDrag={(e) => {
        console.log(task.id);
      }}
      onDragStart={(e) => {
        console.log("dragStart");
        console.log(task.id);
        e.dataTransfer.setData("id", task.id);
        e.dataTransfer.setData("status", task.status);
        setIsDragging(true);
      }}
      onDragEnd={() => {
        console.log("dragEnd");
        setIsDragging(false);
      }}
      className={`${style.task} task-bg mb-3 rounded-4 px-5 py-3  ${
        isDragging ? style.cursorGrabbing : style.cursorGrab
      }  `}
      // className="bg-info"
    >
      {task.title}
    </motion.div>
  );
};

const Column = ({ title, status, tasks, changeTaskStatus }: ColumnProps) => {
  const filteredCards = tasks?.filter((task) => task.status === status);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  return (
    <div className={`col-md-6 col-lg-4 text-white `}>
      <div className={``}>
        <h4 className="px-4 mb-4 text-theme">
          <span>{title}</span>
          <span className="fs-6 ms-2">({filteredCards?.length})</span>
        </h4>
        <motion.div
          layout={true}
          layoutId={status}
          onDrop={(e) => {
            e.preventDefault();
            console.log("drop");
            const id = e.dataTransfer.getData("id");
            const prevStaus = e.dataTransfer.getData("status");
            console.log({ id, status, prevStaus });
            setIsDraggingOver(false);

            changeTaskStatus(id, prevStaus, status);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            console.log("dragover");
            setIsDraggingOver(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            // console.log("dragLeave");
            setIsDraggingOver(false);
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            // console.log("dragEnter");
          }}
          className={`task-body g-5 p-4 rounded-4 ${style.taskBody} ${
            isDraggingOver ? style.borderDrag : ""
          }`}
        >
          {filteredCards?.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
