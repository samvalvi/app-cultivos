import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/recover.scss";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

export function Recover() {
	return (
		<Row className="p-3">
			<Col sm={12} lg={8}>
				<h2>¿Olvidó su contraseña?</h2>
				<h3>Ingrese su correo electrónico</h3>

				<Form>
					<Form.Group controlId="formBasicEmail">
						<Form.Control type="email" placeholder="Correo electrónico" />
					</Form.Group>

					<Button variant="dark" type="submit">
						Enviar correo
					</Button>

					<Button className="m-3" variant="light" type="submit">
						Cancelar
					</Button>
				</Form>
			</Col>
		</Row>
	);
}
