import React, { useContext } from "react";
import { Container, Row, Col, Card, CardColumns } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import Fruta from "../../img/fruta-prueba.jpg";
import PropTypes from "prop-types";
export function Product2(props) {
	const { store, actions } = useContext(Context);
	return (
		<Container className="mt-5">
			<Row>
				<Col className="col-md-4">
					<Card className="shadow">
						<Card.Img variant="top" src={props.url_image2} />
					</Card>
				</Col>
				<Col className="col-md-8">
					<Card className="shadow h-100">
						<Card.Body>
							<Card.Title>
								<Row>
									<Col sm={6} lg={6}>
										<h5>{props.name2}</h5>
									</Col>

									<Col sm={6} lg={6}>
										<i
											className="fas fa-trash-alt float-right btn btn-outline-danger "
											onClick={() => actions.favFunctionDelete(props.pos2)}
										/>
									</Col>
								</Row>
							</Card.Title>
							<Card.Text>{props.description2}</Card.Text>
							<Card.Text className="float-right">
								<Link to={"/details/" + props.pos2}>
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

Product2.propTypes = {
	name2: PropTypes.string,
	type2: PropTypes.string,
	description2: PropTypes.string,
	pos2: PropTypes.number,
	url_image2: PropTypes.string
};
