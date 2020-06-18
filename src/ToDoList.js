import React from "react";
import "./ToDoList.css";
import { useRoutes } from "hookrouter";
import ListTasks from "./ListTasks/ListTasks";
import NewTask from "./NewTask/NewTask";
import UpdateTask from "./UpdateTask/UpdateTask";

const routes = {
  "/": () => <ListTasks />,
  "/cadastrar": () => <NewTask />,
  "/atualizar/:id": ({ id }) => <UpdateTask id={id} />,
};

function ToDoList() {
  return useRoutes(routes);
}

export default ToDoList;
