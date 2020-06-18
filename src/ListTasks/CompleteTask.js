import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";

function CompleteTask(props) {
  const [showModal, setShowModal] = useState(false);

  function handleOpenModal(event) {
    event.preventDefault();
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleCompleteTask(event) {
    event.preventDefault();
    const tasksDb = localStorage["tasks"];
    let tasks = tasksDb ? JSON.parse(tasksDb) : [];

    tasks = tasks.map((task) => {
      if (task.id === props.task.id) {
        task.completed = true;
      }
      return task;
    });

    localStorage["tasks"] = JSON.stringify(tasks);
    setShowModal(false);
    props.reloadTasks(true);
  }

  return (
    <span className={props.className}>
      <Button
        className="btn-sm"
        onClick={handleOpenModal}
        data-testid="btn-open-modal"
      >
        <FontAwesomeIcon icon={faClipboardCheck} />
      </Button>
      <Modal show={showModal} onHide={handleCloseModal} data-testid="modal">
        <Modal.Header closeButton>
          <Modal.Title>Concluir tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deseja realmente concluir a seguinte tarefa?
          <br />
          <strong>{props.task.name}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleCompleteTask}
            data-testid="btn-complete"
          >
            Sim
          </Button>
          <Button
            variant="light"
            onClick={handleCloseModal}
            data-testid="btn-close-modal"
          >
            Não
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  );
}

CompleteTask.propTypes = {
  task: PropTypes.object.isRequired,
  reloadTasks: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default CompleteTask;
