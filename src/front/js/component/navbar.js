import React, { useContext } from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import "../../styles/navbar.scss";

import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const logOut = () => {
		actions.setToken("");
		actions.setUserStatus(false);
		<Redirect to="/" />;
		alert("Sesión Cerrada");
	};
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
				{store.userStatus ? (
					<div>
						<span className="mr-2 navbar-brand">
							{store.userData.user.firstName + " " + store.userData.user.lastName}
						</span>
						<Link to="/feed" className="mr-2">
							<span className="navbar-brand" href="#">
								Feed
							</span>
						</Link>
						<Link to="/" className="mr-2">
							<span className="navbar-brand" href="#">
								Favoritos
							</span>
						</Link>
						<Link to="/" className="mr-2">
							<span className="navbar-brand" href="#" onClick={() => logOut()}>
								Cerrar Sesión
							</span>
						</Link>
						<Link to="/userconfig" className="mr-2">
							<span className="navbar-brand" href="#">
								<i className="fas fa-cog" />
							</span>
						</Link>
					</div>
				) : (
					<ul className="navbar-nav">
						<li />
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
				)}
			</div>
		</nav>
	);
};
