import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { A } from "hookrouter";
import CompleteTask from "./CompleteTask";
import DeleteTask from "./DeleteTask";

function ItemsListTasks(props) {
  return props.tasks.map((task) => (
    <tr key={task.id} data-testid="task">
      <td
        width="75%"
        data-testid="name-task"
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        {task.name}
      </td>
      <td className="text-right">
        <CompleteTask
          task={task}
          reloadTasks={props.reloadTasks}
          className={task.completed ? "hidden" : null}
        />
        &nbsp;
        <A
          href={`/atualizar/${task.id}`}
          className={task.completed ? "hidden" : "btn btn-warning btn-sm"}
        >
          <FontAwesomeIcon icon={faEdit} />
        </A>
        &nbsp;
        <DeleteTask task={task} reloadTasks={props.reloadTasks} />
      </td>
    </tr>
  ));
}

ItemsListTasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  reloadTasks: PropTypes.func.isRequired,
};

export default ItemsListTasks;
