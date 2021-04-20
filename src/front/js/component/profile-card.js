import React from "react";
import { Link } from "react-router-dom";
import user from "../../img/User.png";
import "../../styles/profile-card.scss";

export function Info() {
	return (
		<div className="p-3">
			<div className="row justify-content-center">
				<h2>Nosotros</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
					et dolore magna aliqua. Ut enim ad minim veniam,
				</p>
			</div>
			<div className="row">
				<div className="col">
					<div className="card shadow h-100">
						<img src={user} className="mx-auto mt-3 card-img-top" alt="..." id="perfil" />
						<div className="card-body">
							<h5 className="text-center card-title">Ricardo</h5>
							<p className="card-text">
								<ul>
									<li>email: cubilloricardo@gmail.com</li>
									<li>github: https://github.com/ricubi199</li>
								</ul>
							</p>
						</div>
					</div>
				</div>
				<div className="col">
					<div className="card shadow h-100">
						<img src={user} className="mx-auto mt-3 card-img-top" alt="..." id="perfil" />
						<div className="card-body">
							<h5 className="text-center card-title">Kevin</h5>
							<p className="card-text">
								<ul>
									<li>email: kev.rdgz@gmail.com</li>
									<li>github: https://github.com/kevrdgz</li>
								</ul>
							</p>
						</div>
					</div>
				</div>
				<div className="col">
					<div className="card shadow h-100">
						<img src={user} className="mx-auto mt-3 card-img-top" alt="..." id="perfil" />
						<div className="card-body">
							<h5 className="text-center card-title">Ernesto</h5>
							<p className="card-text">
								<ul>
									<li>email: elopezc0308@gmail.com</li>
									<li>github: https://github.com/Ernesto-03</li>
								</ul>
							</p>
						</div>
					</div>
				</div>
				<div className="col">
					<div className="card shadow h-100">
						<img src={user} className="mx-auto mt-3 card-img-top" alt="..." id="perfil" />
						<div className="card-body">
							<h5 className="text-center card-title">Samuel</h5>
							<p className="card-text">
								<ul>
									<li>email: samuelvalerin@gmail.com</li>
									<li>github: https://github.com/samvalvi</li>
								</ul>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="row justify-content-center p-3">
				<Link to="/" className="w-25 btn btn-dark" type="button">
					Regresar
				</Link>
			</div>
		</div>
	);
}
