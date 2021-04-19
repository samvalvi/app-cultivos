import React from "react";
import { Form, Image, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import fondo from "../../img/login-image.jpg";
import "../../styles/demo.scss";

export const Login = () => {
	return (
		<Container className="p-5 mt-5">
			<Row className="align-items-center">
				<Col lg={4} className="displayNone">
					<img src={fondo} className="img-fluid" alt="plantas" />
				</Col>
				<Col sm={12} md={8} lg={8}>
					<h2>Inicio de sesión</h2>
					<Form>
						<Form.Row>
							<Col lg={12}>
								<Form.Group controlId="formGroupEmail">
									<Form.Control type="email" placeholder="Correo electrónico" />
								</Form.Group>
							</Col>
						</Form.Row>
						<Form.Row>
							<Col lg={12}>
								<Form.Group controlId="formGroupPassword">
									<Form.Control type="password" placeholder="Contraseña" />
								</Form.Group>
							</Col>
						</Form.Row>
						<Form.Row>
							<Col lg={8}>
								<Link className="w-25 btn btn-dark" role="button" variant="dark">
									Iniciar
								</Link>{" "}
								<Link className="w-25 btn btn-light" role="button" to="/" variant="light">
									Cancelar
								</Link>
							</Col>
						</Form.Row>
						<Form.Row className="mt-2">
							<Col>
								<small>
									<Link to="/recover" className="text-secondary mt-5">
										¿Olvidó su contraseña?
									</Link>
								</small>
							</Col>
						</Form.Row>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};
