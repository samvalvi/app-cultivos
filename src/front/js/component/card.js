import React, { useContext } from "react";
import { Container, Row, Col, Card, CardColumns } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Fruta from "../../img/fruta-prueba.jpg";
import PropTypes from "prop-types";
export function Product(props) {
	const { store, actions } = useContext(Context);
	return (
		<Container className="mt-5">
			<Row>
				<Col className="col-md-4">
					<Card className="shadow">
						<Card.Img variant="top" src={props.url_image} />
					</Card>
				</Col>
				<Col className="col-md-8 ">
					<Card className="shadow h-100">
						<Card.Body>
							<Card.Title>
								<Row>
									<Col sm={6} lg={6}>
										<h5>{props.name}</h5>
									</Col>
									<Col sm={6} lg={6}>
										<i
											className="far fa-heart float-right"
											onClick={() => actions.favFunction(props.name)}
										/>
									</Col>
								</Row>
							</Card.Title>
							<Card.Text>{props.description}</Card.Text>
							<Card.Text className="float-right">
								<Link to={"/details/" + props.pos}>
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

Product.propTypes = {
	name: PropTypes.string,
	type: PropTypes.string,
	description: PropTypes.string,
	pos: PropTypes.number,
	url_image: PropTypes.string
};
