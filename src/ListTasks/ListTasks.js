import React, { useState, useEffect } from "react";
import { A } from "hookrouter";
import { Table, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ItemsListTasks from "./ItemsListTasks";
import Pagin from "./Pagin";
import Order from "./Order";

function ListTasks() {
  const ITEMS_PER_PAGE = 3;

  const [tasks, setTasks] = useState([]);
  const [loadTasks, setLoadTasks] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderUp, setOrderUp] = useState(false);
  const [orderDown, setOrderDown] = useState(false);
  const [filterTask, setFilterTask] = useState("");

  useEffect(() => {
    function getTasks() {
      const tasksDb = localStorage["tasks"];
      let listTasks = tasksDb ? JSON.parse(tasksDb) : [];
      //filtrar
      listTasks = listTasks.filter(
        (t) => t.name.toLowerCase().indexOf(filterTask.toLowerCase()) >= 0
      );

      //ordenar
      if (orderUp) {
        listTasks.sort((t1, t2) =>
          t1.name.toLowerCase() > t2.name.toLowerCase() ? 1 : -1
        );
      } else if (orderDown) {
        listTasks.sort((t1, t2) =>
          t1.name.toLowerCase() < t2.name.toLowerCase() ? 1 : -1
        );
      }
      //paginar
      setTotalItems(listTasks.length);
      setTasks(
        listTasks.splice((currentPage - 1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE)
      );
    }

    if (loadTasks) {
      getTasks();
      setLoadTasks(false);
    }
  }, [loadTasks, currentPage, orderUp, orderDown, filterTask]);

  function handleChangePage(page) {
    setCurrentPage(page);
    setLoadTasks(true);
  }

  function handleOrder(event) {
    event.preventDefault();
    if (!orderUp && !orderDown) {
      setOrderUp(true);
      setOrderDown(false);
    } else if (orderUp) {
      setOrderUp(false);
      setOrderDown(true);
    } else {
      setOrderUp(false);
      setOrderDown(false);
    }

    setLoadTasks(true);
  }

  function handleFilter(event) {
    setFilterTask(event.target.value);
    setLoadTasks(true);
  }

  return (
    <div className="text-center">
      <h3>Tarefas a fazer</h3>
      <Table striped bordered hover responsive data-testid="table">
        <thead>
          <tr>
            <th>
              <a href="/" onClick={handleOrder}>
                Tarefa &nbsp;
                <Order orderUp={orderUp} orderDown={orderDown} />
              </a>
            </th>
            <th>
              <A
                href="/cadastrar"
                className="btn btn-success btn-sm"
                data-testid="btn-new-task"
              >
                <FontAwesomeIcon icon={faPlus} />
                &nbsp; Nova tarefa
              </A>
            </th>
          </tr>
          <tr>
            <th>
              <Form.Control
                type="text"
                value={filterTask}
                onChange={handleFilter}
                data-testid="txtTask"
                className="filter-task"
              />
            </th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <ItemsListTasks tasks={tasks} reloadTasks={setLoadTasks} />
        </tbody>
      </Table>
      <Pagin
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        changePage={handleChangePage}
      />
    </div>
  );
}

export default ListTasks;
