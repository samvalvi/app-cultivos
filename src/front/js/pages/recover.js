import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export function Recover() {
	const [emailRecover, setEmailRecover] = useState("");
	const [auth, setAuth] = useState(false);

	const handleSummit = e => {
		e.preventDefault();
		let response = {
			email: emailRecover
		};

		fetch("https://3001-crimson-pike-1ahdmr6w.ws-us03.gitpod.io/api/user/recover", {
			method: "POST",
			body: JSON.stringify(response),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				setAuth(true);
			})
			.catch(error => console.log(error));
	};

	return (
		<Container className="p-3 m-0">
			<Row>
				<Col sm={10} lg={8}>
					<h2>¿Olvidó su contraseña?</h2>
					<h3>Ingrese su correo electrónico</h3>

					<Form onSubmit={() => handleSummit(event)}>
						<Form.Group controlId="formBasicEmail">
							<Form.Control
								type="email"
								placeholder="Correo electrónico"
								onChange={event => setEmailRecover(event.target.value)}
								value={emailRecover}
							/>
						</Form.Group>

						<Button variant="dark" type="submit">
							Enviar contraseña
						</Button>

						<Link to="/" role="button" className="w-25 btn btn-light m-3" variant="light" type="submit">
							Cancelar
						</Link>
					</Form>
					{auth ? <Redirect to="/" /> : null}
				</Col>
			</Row>
		</Container>
	);
}
