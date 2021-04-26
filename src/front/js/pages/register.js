import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

import { Button, Container, Row, Col, Form, ButtonGroup } from "react-bootstrap";
import { Link, useParams, Redirect } from "react-router-dom";
import "../../styles/register.scss";

export const Register = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [auth, setAuth] = useState(false);
	const [error, setError] = useState(false);
	const [msg, setMsg] = useState("");

	const handleSummit = e => {
		e.preventDefault();
		let response = {
			email: email,
			password: password,
			lastName: lastName,
			firstName: firstName
		};

		fetch("https://3001-blue-stork-ejly8s52.ws-us03.gitpod.io/api/user/register", {
			method: "POST",
			body: JSON.stringify(response),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => {
				res.json();

				if (res.status == 400) {
					setMsg(res.json().msg);
					throw res.json().msg;
					setError(true);
				}
				setError(false);
				setMsg("");
				console.log(res);
			})
			.then(data => {
				console.log(data);
				setAuth(true);
				setMsg("Usuario registrado");
			})
			.catch(error => console.log(error));
	};

	return (
		<Container className="p-5 mt-5">
			<Row>
				{error ? (
					<div className="alert alert-danger" role="alert">
						{error}
					</div>
				) : null}
				{msg ? (
					<div className="alert alert-succes" role="alert">
						{msg}
					</div>
				) : null}
				<Col lg={6}>
					<div>
						<h1>¡Bienvenido!</h1>
						<h5>Cree su cuenta</h5>
					</div>
				</Col>
				<Col sm={12} lg={6} className="text-left">
					<h1>Registro</h1>
					<Form onSubmit={() => handleSummit(event)}>
						<Form.Row>
							<Col lg={12}>
								<Form.Group controlId="formGroupEmail">
									<Form.Control
										type="text"
										placeholder="primer nombre"
										onChange={event => setFirstName(event.target.value)}
										value={firstName}
										required
									/>
								</Form.Group>
							</Col>
						</Form.Row>

						<Form.Row>
							<Col lg={12}>
								<Form.Group controlId="formGroupEmail">
									<Form.Control
										type="text"
										placeholder="primer apellido"
										onChange={event => setLastName(event.target.value)}
										value={lastName}
										required
									/>
								</Form.Group>
							</Col>
						</Form.Row>

						<Form.Row>
							<Col lg={12}>
								<Form.Group controlId="formGroupEmail">
									<Form.Control
										type="email"
										placeholder="correo electrónico"
										onChange={event => setEmail(event.target.value)}
										value={email}
										required
									/>
								</Form.Group>
							</Col>
						</Form.Row>

						<Form.Row>
							<Col lg={12}>
								<Form.Group controlId="formGroupPassword">
									<Form.Control
										type="password"
										placeholder="contraseña"
										onChange={event => setPassword(event.target.value)}
										value={password}
										required
									/>
								</Form.Group>
							</Col>
						</Form.Row>

						<Form.Row>
							<Col lg={10}>
								<Button variant="primary" type="submit" className=" w-25 btn btn-dark">
									Crear
								</Button>{" "}
								<Link to="/" role="button" className="w-25 btn btn-light" variant="light">
									Cancelar
								</Link>
							</Col>
						</Form.Row>
					</Form>
					{auth ? <Redirect to="/login" /> : null}
				</Col>
			</Row>
		</Container>
	);
};
