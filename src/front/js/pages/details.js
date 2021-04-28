import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/details.scss";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

export const Details = () => {
	const { store, actions } = useContext(Context);
	const { detailsid } = useParams();
	console.log("cultivos: " + store.cultivos);
	console.log("detailsid: " + detailsid);
	store.cultivos[detailsid];

	return store.cultivos[detailsid] ? (
		<Container>
			<div
				className="container text-white text-justify p-5 mt-5 "
				id="bgDetails"
				style={{ backgroundImage: `url(${store.cultivos[detailsid].url_image})` }}>
				<h4>{store.cultivos[detailsid].nombre}</h4>
			</div>
			<div className="container text-black text-justify p-5 mt-5">
				<h3>Descripción</h3>
				<p>{store.cultivos[detailsid].descripcion}</p>
				<hr />
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
				<h3>Plagas</h3>
				<p>{store.cultivos[detailsid].plagas}</p>

				<hr />
			</div>
			<Container className="text-center mb-3">
				<h3>Productos Recomendados</h3>
				<hr />
				<Row className="justify-content-center m">
					<Col xs={3} md={2}>
						<a
							href="#"
							onClick={() =>
								window.open("https://www.greensolutionscr.com/bioeco-desengrasante-natural")
							}>
							<Image
								id="product-detail"
								className="p-1"
								src="https://www.greensolutionscr.com/image/cache/data/bio-eco/JARD%C3%8DN%20FIBRA%20DE%20COCO%20MECHA%20LARGA-550x550.png"
								roundedCircle
							/>
						</a>
					</Col>
					<Col xs={3} md={2}>
						<a
							href="#"
							onClick={() => window.open("hhttps://www.greensolutionscr.com/combo-plagas-de-suelo-1")}>
							<Image
								className="p-1"
								id="product-detail"
								src="https://www.greensolutionscr.com/image/cache/catalog/Categorias/plagas%20de%20suelo-550x550h.PNG"
								roundedCircle
							/>
						</a>
					</Col>
					<Col xs={3} md={2}>
						<a
							href="#"
							onClick={() => window.open("https://www.greensolutionscr.com/fertilizer-bio-foliar")}>
							<Image
								className="p-1"
								id="product-detail"
								src="https://www.greensolutionscr.com/image/cache/data/bio-eco/BIOECO%20BIOFOLIAR2-550x550h.png"
								roundedCircle
							/>
						</a>
					</Col>
					<Col xs={3} md={2}>
						<a
							href="#"
							onClick={() =>
								window.open("https://www.evergreencr.com/producto/repelente-a-base-de-ajo/")
							}>
							<Image
								className="p-1"
								id="product-detail"
								src="https://www.evergreencr.com/wp-content/uploads/2018/07/Repelente-Organico-Litro-2.png"
								roundedCircle
							/>
						</a>
					</Col>
					<Col xs={3} md={2}>
						<a
							href="#"
							onClick={() =>
								window.open("https://www.evergreencr.com/producto/insecticida-multiefecto/")
							}>
							<Image
								className="p-1"
								id="product-detail"
								src="https://www.evergreencr.com/wp-content/uploads/2018/07/Insecticida-Multiefecto-1.png"
								roundedCircle
							/>
						</a>
					</Col>
				</Row>
			</Container>
		</Container>
	) : (
		"cargando"
	);
};
