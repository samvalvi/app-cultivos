import React from "react";
import { Link } from "react-router-dom";

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
					<div className="card" />
				</div>
				<div className="col">
					<div className="card" />
				</div>
				<div className="col">
					<div className="card" />
				</div>
				<div className="col">
					<div className="card" />
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
