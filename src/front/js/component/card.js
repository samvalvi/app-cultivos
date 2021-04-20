import React from "react";
import { Container, Row, Col, Card, CardColumns } from "react-bootstrap";
import { Link } from "react-router-dom";
import Fruta from "../../img/fruta-prueba.jpg";

export function Product() {
	return (
		<Container className="mt-5">
			<Row>
				<Col className="col-md-4">
					<Card className="shadow">
						<Card.Img variant="top" src={Fruta} />
						<Card.Body>
							<Card.Title>Nombre</Card.Title>
						</Card.Body>
					</Card>
				</Col>
				<Col className="col-md-8">
					<Card className="shadow">
						<Card.Body>
							<Card.Title>
								<Row>
									<Col sm={6} lg={6}>
										<h5>Categoría</h5>
									</Col>
									<Col sm={6} lg={6}>
										<i className="far fa-heart float-right" />
									</Col>
								</Row>
							</Card.Title>
							<Card.Text>
								Some quick example text to build on the card title and make up the bulk of the cards
								content.
							</Card.Text>
							<Card.Text className="float-right">
								<Link to="/details">
									<small>ver más</small>
								</Link>
							</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}
