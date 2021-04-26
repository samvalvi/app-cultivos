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

	const handleSubmit = e => {
		e.preventDefault();
		const body = {
			email: email,
			password: password
		};

		fetch("https://3001-yellow-bug-ezbxpbrs.ws-us03.gitpod.io/api/user/delete", {
			method: "DELETE",
			body: JSON.stringify(body),
			headers: { Authorization: "Bearer " + store.token, "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				actions.setUserStatus(false);
				setAuth(true);
				alert("Cuenta Eliminada");
			})
			.catch(err => console.log(err));
	};

	return (
		<Container className="p-5 mt-5">
			<Row>
				<Col lg={6}>
					<div>
						<img src={User} className="w-50" alt="perfil" />
					</div>
				</Col>
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
								<Button variant="primary" type="submit" className=" w-25 btn btn-dark">
									Borrar
								</Button>{" "}
							</Col>
						</Form.Row>
					</Form>
					{auth ? <Redirect to="/" /> : null}
				</Col>
			</Row>
		</Container>
	);
};
