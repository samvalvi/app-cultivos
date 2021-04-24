import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.scss";

export const Footer = () => {
	return (
		<footer className="container-fluid footer mt-auto py-3" id="foot">
			<div className="row">
				<div className="col-sm-4 text-center align-self-center">
					<i className="fas fa-seedling fa-3x" />
				</div>
				<div className="col-sm-4 text-center align-self-center">
					<h5>Contáctanos</h5>
					<p className="text-justify text-center align-self-center">cultivacostarica@gmail.com</p>
				</div>
				<div className="col-sm-4 text-center align-self-center">
					<h5>
						<Link to="/about" className="text-white">
							Sobre nosotros
						</Link>
					</h5>
					<p>&copy;2021</p>
				</div>
			</div>
		</footer>
	);
};
