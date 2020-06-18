import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Form, Jumbotron, Modal } from "react-bootstrap";
import { navigate, A } from "hookrouter";

function UpdateTask(props) {
  const [showModal, setShowModal] = useState(false);
  const [formValidated, setFormValidated] = useState(false);
  const [task, setTask] = useState("");
  const [loadTask, setLoadTask] = useState(true);

  useEffect(() => {
    if (loadTask) {
      const tasksDb = localStorage["tasks"];
      const tasks = tasksDb ? JSON.parse(tasksDb) : [];
      const task = tasks.filter((t) => t.id === parseInt(props.id))[0];

      setTask(task.name);
      setLoadTask(false);
    }
  }, [loadTask, props]);

  function back(event) {
    event.preventDefault();
    navigate("/");
  }

  function handleCloseModal() {
    navigate("/");
  }

  function update(event) {
    event.preventDefault();
    setFormValidated(true);

    if (event.currentTarget.checkValidity() === true) {
      const tasksDb = localStorage["tasks"];
      let tasks = tasksDb ? JSON.parse(tasksDb) : [];

      tasks = tasks.map((taskObj) => {
        if (taskObj.id === parseInt(props.id)) {
          taskObj.name = task;
        }
        return taskObj;
      });

      localStorage["tasks"] = JSON.stringify(tasks);
      setShowModal(true);
    }
  }

  function handleTxtTask(event) {
    setTask(event.target.value);
  }

  return (
    <div>
      <h3 className="text-center">Atualizar</h3>
      <Jumbotron>
        <Form onSubmit={update} noValidate validated={formValidated}>
          <Form.Group>
            <Form.Label>Tarefa</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite a tarefa"
              minLength="5"
              maxLength="100"
              required
              data-testid="txt-task"
              value={task}
              onChange={handleTxtTask}
            />
            <Form.Control.Feedback type="invalid">
              A tarefa deve conter ao menos 5 caracteres
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="text-center">
            <Button variant="success" type="submit" data-testid="btn-update">
              Atualizar
            </Button>
            &nbsp;
            <A href="/" className="btn btn-light" onClick={back}>
              Voltar
            </A>
          </Form.Group>
        </Form>
        <Modal show={showModal} onHide={handleCloseModal} data-testid="modal">
          <Modal.Header closeButton>
            <Modal.Title>Sucesso</Modal.Title>
          </Modal.Header>
          <Modal.Body>Tarefa atualizada com sucesso!</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleCloseModal}>
              Continuar
            </Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </div>
  );
}

UpdateTask.propTypes = {
  id: PropTypes.number.isRequired,
};

export default UpdateTask;
