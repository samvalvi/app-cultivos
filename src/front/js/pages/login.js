import React, { useState, useEffect, useContext } from "react";
import { Form, Image, Container, Row, Col, Button } from "react-bootstrap";
import { Link, useParams, Redirect } from "react-router-dom";
import fondo from "../../img/login-image.jpg";
import "../../styles/login.scss";

import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [auth, setAuth] = useState(false);
	const [msg, setMsg] = useState("");

	const handleSubmit = e => {
		e.preventDefault();
		const body = {
			email: email,
			password: password
		};

		fetch("https://3001-blue-stork-ejly8s52.ws-us03.gitpod.io/api/user/login", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(data => {
				if (data.status === "succesful") {
					console.log(data);
					actions.setToken(data.access_token);
					actions.setUserData(data);
					actions.setUserStatus(true);
					setAuth(true);
					setMsg(data.msg);
					console.log(store.token);
				} else {
					setMsg(data.msg);
				}
			})
			.catch(err => console.log(err));
	};

	return (
		<Container className="p-5 mt-5">
			<Row className="align-items-center">
				<Col sm={12} md={8} lg={8}>
					<h1>Inicio de sesión</h1>
					{msg ? (
						<div className="alert alert-danger" role="alert">
							{msg}
						</div>
					) : null}
					<Form onSubmit={() => handleSubmit(event)}>
						<Form.Row>
							<Col lg={12}>
								<Form.Group controlId="formGroupEmail">
									<Form.Control
										type="email"
										placeholder="Correo electrónico"
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
										placeholder="Contraseña"
										onChange={event => setPassword(event.target.value)}
										value={password}
										required
									/>
								</Form.Group>
							</Col>
						</Form.Row>
						<Form.Row>
							<Col lg={8}>
								<Button variant="dark" className="btn btn-dark" type="submit">
									Iniciar
								</Button>
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
					{auth ? <Redirect to="/feed" /> : null}
				</Col>
			</Row>
		</Container>
	);
};
