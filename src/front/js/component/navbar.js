import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../../styles/navbar.scss";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-sm navbar-dark" id="nav-bar">
			<Link to="/">
				<span className="navbar-brand" href="#">
					Cultiva
				</span>
			</Link>

			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation">
				<span className="navbar-toggler-icon" />
			</button>
			<div className="collapse navbar-collapse justify-content-end" id="navbarNav">
				<ul className="navbar-nav">
					<li className="nav-item">
						<Link to="/login" className="nav-link">
							Iniciar sesión
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/register" className="nav-link">
							Registrar
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};
