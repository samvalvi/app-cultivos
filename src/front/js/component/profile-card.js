import React from "react";
import { Link } from "react-router-dom";
import user from "../../img/User.png";
import kevfoto from "../../img/FOTO1.jpg";
import samuelfoto from "../../img/IMG_0153.jpg";
import ricardofoto from "../../img/ricardo2.jpg";
import ernestofoto from "../../img/enesto.jpg";
import "../../styles/profile-card.scss";

export function Info() {
	return (
		<div className="p-3">
			<div className="row text-center">
				<div className="col">
					<h2 className="display-4">Nosotros</h2>
					<p className="mt-3">Conoce nuestro equipo de programadores</p>
				</div>
			</div>
			<div className="row">
				<div className="col-md-6 col-lg-3">
					<div className="mb-2 card shadow h-100">
						<img src={ricardofoto} className="mx-auto mt-3 card-img-top" alt="..." id="perfil" />
						<div className="card-body">
							<h5 className="text-center card-title">Ricardo Cubillo</h5>
							<div className="card-text">
								<ul>
									<li>email: cubilloricardo@gmail.com</li>
									<li>github: ricubi199</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-6 col-lg-3">
					<div className="mb-2 card shadow h-100">
						<img src={kevfoto} className="mx-auto mt-3 card-img-top" alt="..." id="perfil" />
						<div className="card-body">
							<h5 className="text-center card-title">Kevin Rodríguez</h5>
							<div className="card-text">
								<ul>
									<li>email: kev.rdgz@gmail.com</li>
									<li>github: kevrdgz</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-6 col-lg-3">
					<div className="mb-2 card shadow h-100">
						<img src={ernestofoto} className="mx-auto mt-3 card-img-top" alt="..." id="perfil" />
						<div className="card-body">
							<h5 className="text-center card-title">Ernesto López</h5>
							<div className="card-text">
								<ul>
									<li>email: elopezc0308@gmail.com</li>
									<li>github: Ernesto-03</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="col-md-6 col-lg-3">
					<div className="mb-2 card shadow h-100">
						<img src={samuelfoto} className="mx-auto mt-3 card-img-top" alt="..." id="perfil" />
						<div className="card-body">
							<h5 className="text-center card-title">Samuel Valerín</h5>
							<div className="card-text">
								<ul>
									<li>email: samuelvalerin@gmail.com</li>
									<li>github: samvalvi</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="row justify-content-center p-3">
				<Link to="/" className="col-sm-2 btn btn-dark" type="button">
					Regresar
				</Link>
			</div>
		</div>
	);
}
