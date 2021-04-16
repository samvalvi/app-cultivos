import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Button, Container, Row, Col, Form, ButtonGroup } from "react-bootstrap";

import "../../styles/register.scss";

export const Register = () => {
	const { store, actions } = useContext(Context);

	return (
		<Row>
			<Col lg={6} className="displayNone">
				<div className="bg-image">
					<div className="bg-blur" />
				</div>

				<div className="bg-text">
					<h1>¡Bienvenido!</h1>
					<h5>Cree su cuenta</h5>
				</div>
			</Col>
			<Col sm={12} lg={6} className="text-left mt-5 border border-1 rounded p-5 ">
				<h1>Registro</h1>
				<Form>
					<Form.Group controlId="formGroupEmail">
						<Form.Label>Primer Nombre</Form.Label>
						<Form.Control type="text" placeholder="Primer Nombre" />
					</Form.Group>
					<Form.Group controlId="formGroupEmail">
						<Form.Label>Primer Apellido</Form.Label>
						<Form.Control type="text" placeholder="Primer Apellido" />
					</Form.Group>
					<Form.Group controlId="formGroupEmail">
						<Form.Label>Correo Electrónico</Form.Label>
						<Form.Control type="email" placeholder="Correo Electrónico" />
					</Form.Group>
					<Form.Group controlId="formGroupPassword">
						<Form.Label>Contraseña</Form.Label>
						<Form.Control type="password" placeholder="Contraseña" />
					</Form.Group>

					<ButtonGroup aria-label="Basic example">
						<Button variant="primary" type="submit" className="btn btn-success mx-4">
							Crear
						</Button>
						<Button variant="secondary">Cancelar</Button>
					</ButtonGroup>
				</Form>
			</Col>
		</Row>
	);
};
