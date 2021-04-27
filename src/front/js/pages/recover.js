import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export function Recover() {
	const [emailRecover, setEmailRecover] = useState("");
	const [auth, setAuth] = useState(false);
	const [msg, setMsg] = useState("");

	const handleSummit = e => {
		e.preventDefault();
		let response = {
			email: emailRecover
		};

		fetch(process.env.BACKEND_URL + "/api/user/recover", {
			method: "POST",
			body: JSON.stringify(response),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				if (data.status === "succesful") {
					console.log(data);
					setAuth(true);
					setMsg(data.msg);
				} else {
					setMsg(data.msg);
				}
			})
			.catch(error => console.log(error));
	};

	return (
		<Container className="p-5 mt-5">
			<Row>
				<Col sm={10} lg={8}>
					<h1>¿Olvidó su contraseña?</h1>
					<h5>Ingrese su correo electrónico</h5>
					{msg ? (
						<div className="alert alert-danger" role="alert">
							{msg}
						</div>
					) : null}
					<Form onSubmit={() => handleSummit(event)}>
						<Form.Group controlId="formBasicEmail">
							<Form.Control
								type="email"
								placeholder="Correo electrónico"
								onChange={event => setEmailRecover(event.target.value)}
								value={emailRecover}
								required
							/>
						</Form.Group>

						<Button variant="dark" type="submit">
							Enviar correo
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
