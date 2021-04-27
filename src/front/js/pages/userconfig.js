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
	const [deleteMsg, setDeleteMsg] = useState("");
	const [passwordMsg, setPasswordMsg] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

	const handleSubmit = e => {
		e.preventDefault();
		const body = {
			email: email,
			password: password
		};

		fetch("https://3001-moccasin-cicada-lbfqo3z5.ws-us03.gitpod.io/api/user/delete", {
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
					setDeleteMsg(data.msg);
					alert("Cuenta eliminada");
				} else {
					setDeleteMsg(data.msg);
				}
			})
			.catch(err => console.log(err));
	};

	const updatePassword = e => {
		e.preventDefault();

		const body = {
			oldPassword: oldPassword,
			newPassword: newPassword
		};

		fetch("https://3001-moccasin-cicada-lbfqo3z5.ws-us03.gitpod.io/api/user/password_update", {
			method: "PUT",
			body: JSON.stringify(body),
			headers: { Authorization: "Bearer " + store.token, "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				if (data.status === "succesful") {
					console.log(data);
					setPasswordMsg(data.msg);
				} else {
					setPasswordMsg(data.msg);
					alert(data.msg);
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

					{deleteMsg ? (
						<div className="alert alert-danger" role="alert">
							{deleteMsg}
						</div>
					) : null}

					<Form onSubmit={() => handleSubmit(event)}>
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

					{/* {passwordMsg ? (
						<div className="alert alert-danger" role="alert">
							{passwordMsg}
						</div>
					) : null} */}
					{passwordMsg ? (
						<div className="alert alert-success" role="alert">
							{passwordMsg}
						</div>
					) : null}

					<Form onSubmit={() => updatePassword(event)}>
						<Form.Row>
							<Col lg={12}>
								<Form.Group controlId="formGroupEmail">
									<Form.Control
										type="password"
										placeholder="contraseña anterior"
										onChange={event => setOldPassword(event.target.value)}
										value={oldPassword}
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
										placeholder="nueva contraseña"
										onChange={event => setNewPassword(event.target.value)}
										value={newPassword}
										required
									/>
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
