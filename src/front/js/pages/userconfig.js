import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Button, Container, Row, Col, Form, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/userconfig.scss";

export const Userconfig = () => {
	const { store, actions } = useContext(Context);

	return (
		<Container className="p-5 mt-5">
			<Row>
				<Col lg={6} className="displayNone">
					<div className="bg-image">
						<div className="bg-blur" />
					</div>

					<div className="bg-text">
						<h1>Titulo</h1>
						<h5>Borrar su cuenta</h5>
					</div>
				</Col>
				<Col sm={12} lg={6} className="text-left">
					<h1>Eliminar Usuario</h1>
					<Form>
						<Form.Row>
							<Col lg={12}>
								<Form.Group controlId="formGroupEmail">
									<Form.Control type="email" placeholder="correo electrónico" />
								</Form.Group>
							</Col>
						</Form.Row>

						<Form.Row>
							<Col lg={12}>
								<Form.Group controlId="formGroupPassword">
									<Form.Control type="password" placeholder="contraseña" />
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
				</Col>
			</Row>
		</Container>
	);
};
