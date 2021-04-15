import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/details.scss";
import { Container, Row, Col, Image } from "react-bootstrap";

export const Details = () => {
	const { store, actions } = useContext(Context);

	return (
		<Container>
			<div className="container text-white text-justify p-5 mt-5" id="bgDetails">
				<h4>Nombre</h4>
			</div>
			<div className="container text-black text-justify p-5 mt-5">
				<h3>Titulo</h3>
				<p>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
					industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type
					and scrambled it to make a type specimen book
				</p>
				<hr />
				<h3>Titulo</h3>
				<p>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
					industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type
					and scrambled it to make a type specimen book
				</p>
				<hr />
				<h3>Titulo</h3>
				<p>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
					industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type
					and scrambled it to make a type specimen book
				</p>
				<hr />
				<h3>Titulo</h3>
				<p>
					Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
					industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type
					and scrambled it to make a type specimen book
				</p>
				<hr />
			</div>
			<Container className="text-center mb-3">
				<h3>Productos Recomendados</h3>
				<hr />
				<Row className="justify-content-center m">
					<Col xs={2} md={2}>
						<Image src="https://via.placeholder.com/100x100" roundedCircle />
					</Col>
					<Col xs={2} md={2}>
						<Image src="https://via.placeholder.com/100x100" roundedCircle />
					</Col>
					<Col xs={2} md={2}>
						<Image src="https://via.placeholder.com/100x100" roundedCircle />
					</Col>
					<Col xs={2} md={2}>
						<Image src="https://via.placeholder.com/100x100" roundedCircle />
					</Col>
					<Col xs={2} md={2}>
						<Image src="https://via.placeholder.com/100x100" roundedCircle />
					</Col>
				</Row>
			</Container>
		</Container>
	);
};
