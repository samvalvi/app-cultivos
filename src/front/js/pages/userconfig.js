import React, { useContext } from "react";
import { Context } from "../store/appContext";
import User from "../../img/User.png";
import { Button, Container, Row, Col, Form, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/userconfig.scss";

export const Userconfig = () => {
	const { store, actions } = useContext(Context);

	return (
		<Container className="p-5 mt-5">
			<h1>Configuración de cuenta</h1>
			<Row>
				<div className="p-3">
					<img src={User} className="img-fluid" alt="perfil" id="perfil" />
				</div>
			</Row>
			<hr />
			<Row>
				<Col sm={12} lg={6} className="text-left">
					<h2>Eliminar cuenta</h2>
					<Form>
						<Form.Row>
							<Col lg={12}>
								<Form.Group controlId="formGroupEmail">
									<Form.Control type="email" placeholder="correo electrónico" />
								</Form.Group>
							</Col>
						</Form.Row>

						<Form.Row>
							<Col lg={12}>
								<Form.Group controlId="formGroupPassword">
									<Form.Control type="password" placeholder="contraseña" />
								</Form.Group>
							</Col>
						</Form.Row>

						<Form.Row>
							<Col lg={10}>
								<Button variant="primary" type="submit" className="btn btn-dark">
									Borrar
								</Button>{" "}
							</Col>
						</Form.Row>
					</Form>
				</Col>
			</Row>
			<hr />
			<Row>
				<Col sm={12} lg={6} className="text-left">
					<h2>Actualizar contraseña</h2>
					<Form>
						<Form.Row>
							<Col lg={12}>
								<Form.Group controlId="formGroupEmail">
									<Form.Control type="email" placeholder="contraseña anterior" />
								</Form.Group>
							</Col>
						</Form.Row>

						<Form.Row>
							<Col lg={12}>
								<Form.Group controlId="formGroupPassword">
									<Form.Control type="password" placeholder="nueva contraseña" />
								</Form.Group>
							</Col>
						</Form.Row>

						<Form.Row>
							<Col lg={10}>
								<Button variant="primary" type="submit" className="btn btn-dark">
									Actualizar
								</Button>{" "}
							</Col>
						</Form.Row>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};
