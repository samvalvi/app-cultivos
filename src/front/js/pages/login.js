import React, { useState, useEffect, useContext } from "react";
import { Form, Card, InputGroup, Image, Container, Row, Col, Button } from "react-bootstrap";
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

		fetch(process.env.BACKEND_URL + "/api/user/login", {
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
					actions.setFavList(data.list_fav);
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
		<div className="container-fluid p-3 mt-auto">
			<Row className="justify-content-center">
				<Col sm={10} md={10}>
					<Card className="col-lg-7 border-0 mx-auto shadow p-3">
						<h4 className="display-4">Inicie sesión en su cuenta</h4>
						<p className="text-wrap font-weight-normal">
							Ingrese sus credenciales para acceder a su cuenta
						</p>
						{msg ? (
							<div className="alert alert-danger" role="alert">
								{msg}
							</div>
						) : null}
						<Form onSubmit={() => handleSubmit(event)}>
							<Form.Row>
								<Col sm={12} md={12} lg={12}>
									<Form.Group controlId="formGroupEmail">
										<InputGroup className="mb-2 mr-sm-2">
											<InputGroup.Prepend>
												<InputGroup.Text>
													<i className="fas fa-at" />
												</InputGroup.Text>
											</InputGroup.Prepend>
											<Form.Control
												type="email"
												placeholder="Correo electrónico"
												onChange={event => setEmail(event.target.value)}
												value={email}
												required
											/>
										</InputGroup>
									</Form.Group>
								</Col>
							</Form.Row>
							<Form.Row>
								<Col sm={12} md={12} lg={12}>
									<Form.Group controlId="formGroupPassword">
										<InputGroup className="mb-2 mr-sm-2">
											<InputGroup.Prepend>
												<InputGroup.Text>
													<i className="fas fa-lock" />
												</InputGroup.Text>
											</InputGroup.Prepend>
											<Form.Control
												type="password"
												placeholder="Contraseña"
												onChange={event => setPassword(event.target.value)}
												value={password}
												required
											/>
										</InputGroup>
									</Form.Group>
								</Col>
							</Form.Row>
							<Form.Row>
								<Col lg={8}>
									<Button variant="dark" className="mr-1 btn btn-dark" type="submit">
										Iniciar
									</Button>
									<Link className="ml-1 btn btn-light" role="button" to="/" variant="light">
										Cancelar
									</Link>
								</Col>
							</Form.Row>
							<Form.Row className="mt-2">
								<Col lg={12}>
									<small>
										<Link to="/recover" className="text-secondary mt-5">
											¿Olvidó su contraseña?
										</Link>
									</small>
								</Col>
							</Form.Row>
						</Form>
						{auth ? <Redirect to="/feed" /> : null}
					</Card>
				</Col>
			</Row>
		</div>
	);
};
