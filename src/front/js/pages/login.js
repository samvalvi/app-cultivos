import React, { useState, useEffect, useContext } from "react";
import { Form, Image, Container, Row, Col, Button } from "react-bootstrap";
import { Link, useParams, Redirect } from "react-router-dom";
import fondo from "../../img/login-image.jpg";
import "../../styles/login.scss";

import { Context } from "../store/appContext";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [auth, setAuth] = useState(false);

	const handleSubmit = e => {
		e.preventDefault();
		const body = {
			email: email,
			password: password
		};

		fetch("https://3001-apricot-pinniped-awkeq3pq.ws-us03.gitpod.io/api/user/login", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				sessionStorage.setItem("my_token", data.token);

				setAuth(true);
			})
			.catch(err => console.log(err));
	};

	return (
		<Container className="p-5 mt-5">
			<Row className="align-items-center">
				<Col lg={4} className="displayNone">
					<img src={fondo} className="img-fluid" alt="plantas" />
				</Col>
				<Col sm={12} md={8} lg={8}>
					<h2>Inicio de sesión</h2>
					<Form onSubmit={() => handleSubmit(event)}>
						<Form.Row>
							<Col lg={12}>
								<Form.Group controlId="formGroupEmail">
									<Form.Control
										type="email"
										placeholder="Correo electrónico"
										onChange={event => setEmail(event.target.value)}
										value={email}
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
									/>
								</Form.Group>
							</Col>
						</Form.Row>
						<Form.Row>
							<Col lg={8}>
								<Button variant="dark" type="submit">
									Iniciar
								</Button>
								<Link className="ml-1 w-25 btn btn-light" role="button" to="/" variant="light">
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
