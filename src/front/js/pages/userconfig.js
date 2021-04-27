import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import User from "../../img/User.png";
import { Button, Container, Row, Col, Form, ButtonGroup } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import "../../styles/userconfig.scss";

export const Userconfig = () => {
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

		fetch("https://3001-blue-stork-ejly8s52.ws-us03.gitpod.io/#/workspace/app-cultivos/api/user/delete", {
			method: "DELETE",
			body: JSON.stringify(body),
			headers: { Authorization: "Bearer " + store.token, "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				if (data.status === "succesful") {
					console.log(data);
					actions.setUserStatus(false);
					setAuth(true);
					setMsg(data.msg);
				} else {
					setMsg(data.msg);
				}
			})
			.catch(err => console.log(err));
	};

	return (
		<Container className="p-5 mt-5">
			<h1>Configuración de la cuenta</h1>
			<Row>
				<div className="p-3">
					<img src={User} className="img-fluid" alt="perfil" id="perfil" />
				</div>
			</Row>
			<hr />
			<Row>
				<Col sm={12} lg={6} className="text-left">
					<h1>Eliminar Usuario</h1>
					<Form onSubmit={() => handleSubmit(event)}>
						<Form.Row>
							<Col lg={12}>
								<Form.Group controlId="formGroupEmail">
									<Form.Control
										type="email"
										placeholder="correo electrónico"
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
										placeholder="contraseña"
										onChange={event => setPassword(event.target.value)}
										value={password}
									/>
								</Form.Group>
							</Col>
						</Form.Row>

						<Form.Row>
							<Col lg={10}>
								<Button variant="primary" type="submit" className="btn btn-dark">
									Borrar
								</Button>{" "}
							</Col>
						</Form.Row>
					</Form>
					{auth ? <Redirect to="/" /> : null}
				</Col>
			</Row>
			<hr />
			<Row>
				<Col sm={12} lg={6} className="text-left">
					<h2>Actualizar contraseña</h2>
					<Form>
						<Form.Row>
							<Col lg={12}>
								<Form.Group controlId="formGroupEmail">
									<Form.Control type="email" placeholder="contraseña anterior" />
								</Form.Group>
							</Col>
						</Form.Row>

						<Form.Row>
							<Col lg={12}>
								<Form.Group controlId="formGroupPassword">
									<Form.Control type="password" placeholder="nueva contraseña" />
								</Form.Group>
							</Col>
						</Form.Row>

						<Form.Row>
							<Col lg={10}>
								<Button variant="primary" type="submit" className="btn btn-dark">
									Actualizar
								</Button>{" "}
							</Col>
						</Form.Row>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};
