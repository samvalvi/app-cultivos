import React from "react";
import { Form, Image, Container, Row, Col, Button } from "react-bootstrap";

export const Login = () => {
	return (
		<Container>
			<Row className="pt-5">
				<Col sm={4}>
					<Image src="https://via.placeholder.com/350x400" thumbnail />
				</Col>
				<Col sm={5}>
					<Form>
						<Form.Group controlId="formBasicEmail">
							<Form.Control type="email" placeholder="Enter email" />
						</Form.Group>
						<Form.Group controlId="formBasicEmail">
							<Form.Control type="password" placeholder="Password" />
							<Form.Text className="text-muted">Forgot password?</Form.Text>
						</Form.Group>

						<Button variant="primary">LOG IN</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};
