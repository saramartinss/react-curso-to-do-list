import React, { useState } from "react";
import { Button, Form, Jumbotron, Modal } from "react-bootstrap";
import { navigate, A } from "hookrouter";
import Task from "../models/task.model";

function NewTask() {
  const [task, setTask] = useState("");
  const [formValidated, setFormValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function register(event) {
    event.preventDefault();
    setFormValidated(true);
    if (event.currentTarget.checkValidity() === true) {
      const tasksDb = localStorage["tasks"];
      const tasks = tasksDb ? JSON.parse(tasksDb) : [];

      tasks.push(new Task(new Date().getTime(), task, false));
      localStorage["tasks"] = JSON.stringify(tasks);
      setShowModal(true);
    }
  }

  function handleTxtTask(event) {
    setTask(event.target.value);
  }

  function handleCloseModal() {
    navigate("/");
  }

  return (
    <div>
      <h3 className="text-center">Cadastrar</h3>
      <Jumbotron>
        <Form validated={formValidated} noValidate onSubmit={register}>
          <Form.Group>
            <Form.Label>Tarefa</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite a tarefa"
              minLength="5"
              maxLength="100"
              required
              value={task}
              onChange={handleTxtTask}
              data-testid="txt-task"
            />
            <Form.Control.Feedback type="invalid">
              A tarefa deve conter ao menos 5 caracteres
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="text-center">
            <Button variant="success" type="submit" data-testid="btn-register">
              Cadastrar
            </Button>
            &nbsp;
            <A href="/" className="btn btn-light">
              Voltar
            </A>
          </Form.Group>
        </Form>
        <Modal show={showModal} onHide={handleCloseModal} data-testid="modal">
          <Modal.Header closeButton>
            <Modal.Title>Sucesso</Modal.Title>
          </Modal.Header>
          <Modal.Body>Tarefa adicionada com sucesso!</Modal.Body>
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

export default NewTask;
