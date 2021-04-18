import React from "react";
import { Form, Image, Container, Row, Col, Button } from "react-bootstrap";

import "../../styles/demo.scss";

export const Login = () => {
	return (
		<Container>
			<Row className="pt-5">
				<Col lg={4} className="displayNone">
					<div className="border rounded" id="login" />
				</Col>
				<Col sm={12} lg={5} className="border rounded">
					<Form className="mt-2 mb-4">
						<h3>Inicio de sesión</h3>
						<Form.Group controlId="formBasicEmail">
							<Form.Control type="email" placeholder="correo electrónico" />
						</Form.Group>
						<Form.Group controlId="formBasicEmail">
							<Form.Control type="password" placeholder="contraseña" />
							<Form.Text className="text-muted">¿Olvido su contraseña?</Form.Text>
						</Form.Group>

						<Button variant="dark">Confirmar</Button>
						<Button className="ml-2" variant="light">
							Cancelar
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};
