import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function DeleteTask(props) {
  const [showModal, setShowModal] = useState(false);

  function handleOpenModal(event) {
    event.preventDefault();
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleDeleteTask(event) {
    event.preventDefault();
    const tasksDb = localStorage["tasks"];
    let tasks = tasksDb ? JSON.parse(tasksDb) : [];
    tasks = tasks.filter((task) => task.id !== props.task.id);
    localStorage["tasks"] = JSON.stringify(tasks);
    setShowModal(false);
    props.reloadTasks(true);
  }

  return (
    <span>
      <Button
        variant="danger"
        className="btn-sm"
        onClick={handleOpenModal}
        data-testid="btn-open-modal"
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </Button>
      <Modal show={showModal} onHide={handleCloseModal} data-testid="modal">
        <Modal.Header closeButton>
          <Modal.Title>Remover tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deseja realmente remover a seguinte tarefa?
          <br />
          <strong>{props.task.name}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleDeleteTask}
            data-testid="btn-delete"
          >
            Sim
          </Button>
          <Button variant="light" onClick={handleCloseModal}>
            Não
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  );
}

DeleteTask.propTypes = {
  task: PropTypes.object.isRequired,
  reloadTasks: PropTypes.func.isRequired,
};

export default DeleteTask;
