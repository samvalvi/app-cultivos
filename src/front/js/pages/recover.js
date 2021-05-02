import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col, Card, InputGroup, Form, Button } from "react-bootstrap";

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
					alert("Email enviado con su contraseña");
				} else {
					setMsg(data.msg);
				}
			})
			.catch(error => console.log(error));
	};

	return (
		<Container className="p-3 mt-5">
			<Row className="justify-content-center">
				<Col sm={10} lg={8}>
					<Card className="shadow border-0 p-3">
						<h4 className="display-4">¿Olvidó su contraseña?</h4>
						<p className="text-wrap font-weight-normal">Ingrese su correo electrónico</p>
						{msg ? (
							<div className="alert alert-danger" role="alert">
								{msg}
							</div>
						) : null}
						<Form onSubmit={() => handleSummit(event)}>
							<Form.Group controlId="formBasicEmail">
								<InputGroup className="mb-2">
									<InputGroup.Prepend>
										<InputGroup.Text>
											<i className="fas fa-at" />
										</InputGroup.Text>
									</InputGroup.Prepend>
									<Form.Control
										type="email"
										placeholder="Correo electrónico"
										onChange={event => setEmailRecover(event.target.value)}
										value={emailRecover}
										required
									/>
								</InputGroup>
							</Form.Group>

							<Button variant="dark" type="submit">
								Enviar correo
							</Button>

							<Link to="/" role="button" className="btn btn-light ml-2" variant="light" type="submit">
								Cancelar
							</Link>
						</Form>
						{auth ? <Redirect to="/login" /> : null}
					</Card>
				</Col>
			</Row>
		</Container>
	);
}
