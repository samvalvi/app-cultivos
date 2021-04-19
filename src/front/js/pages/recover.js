import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export function Recover() {
	return (
		<Container className="p-3 m-0">
			<Row>
				<Col sm={10} lg={8}>
					<h2>¿Olvidó su contraseña?</h2>
					<h3>Ingrese su correo electrónico</h3>

					<Form>
						<Form.Group controlId="formBasicEmail">
							<Form.Control type="email" placeholder="Correo electrónico" />
						</Form.Group>

						<Button variant="dark" type="submit">
							Enviar contraseña
						</Button>

						<Link to="/" role="button" className="w-25 btn btn-light m-3" variant="light" type="submit">
							Cancelar
						</Link>
					</Form>
				</Col>
			</Row>
		</Container>
	);
}
