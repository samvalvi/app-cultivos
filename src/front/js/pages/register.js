import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Button, Container, Row, Col, Form, H1 } from "react-bootstrap";

import "../../styles/register.scss";

export const Register = () => {
	const { store, actions } = useContext(Context);

	return (
		<Container className="text-center mt-5">
			<Row>
				<Col md={6}>
					<div className="bg-image">
						<div className="bg-blur" />
					</div>

					<div className="bg-text">
						<h1>Name</h1>
						<p>info</p>
						<p>info</p>
					</div>
				</Col>
				<Col md={6} className="text-center mt-5 border border-1 rounded p-3">
					<h1>Register</h1>
					<Form>
						<Form.Group controlId="formGroupEmail">
							<Form.Label>First Name</Form.Label>
							<Form.Control type="text" placeholder="Enter email" />
						</Form.Group>
						<Form.Group controlId="formGroupEmail">
							<Form.Label>Last Name</Form.Label>
							<Form.Control type="text" placeholder="Enter email" />
						</Form.Group>
						<Form.Group controlId="formGroupEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control type="email" placeholder="Enter email" />
						</Form.Group>
						<Form.Group controlId="formGroupPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control type="password" placeholder="Password" />
						</Form.Group>
						<Button variant="primary" type="submit" className="btn btn-success">
							Register
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};
