import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/details.scss";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

export const Details = () => {
	const { store, actions } = useContext(Context);
	const { detailsid } = useParams();

	return store.cultivos[detailsid] ? (
		<Container>
			<div className="container text-white text-justify p-5 mt-5" id="bgDetails">
				<h4>{store.cultivos[detailsid].nombre}</h4>
			</div>
			<div className="container text-black text-justify p-5 mt-5">
				<h3>Clima</h3>
				<p>{store.cultivos[detailsid].clima}</p>
				<hr />
				<h3>Epoca Siembra</h3>
				<p>{store.cultivos[detailsid].epoca_siembra}</p>
				<hr />
				<h3>Tipo de Suelo</h3>
				<p>{store.cultivos[detailsid].tipo_de_suelo}</p>
				<hr />
				<h3>Preparación del Suelo</h3>
				<p>{store.cultivos[detailsid].preparacion_del_suelo}</p>
				<hr />
				<h3>Cosecha</h3>
				<p>{store.cultivos[detailsid].cosecha}</p>
				<hr />
			</div>
			<Container className="text-center mb-3">
				<h3>Productos Recomendados</h3>
				<hr />
				<Row className="justify-content-center m">
					<Col xs={3} md={2}>
						<Image className="p-1" src="https://via.placeholder.com/100x100" roundedCircle />
					</Col>
					<Col xs={3} md={2}>
						<Image className="p-1" src="https://via.placeholder.com/100x100" roundedCircle />
					</Col>
					<Col xs={3} md={2}>
						<Image className="p-1" src="https://via.placeholder.com/100x100" roundedCircle />
					</Col>
					<Col xs={3} md={2}>
						<Image className="p-1" src="https://via.placeholder.com/100x100" roundedCircle />
					</Col>
					<Col xs={3} md={2}>
						<Image className="p-1" src="https://via.placeholder.com/100x100" roundedCircle />
					</Col>
				</Row>
			</Container>
		</Container>
	) : (
		"cargando"
	);
};
