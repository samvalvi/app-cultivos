import React, { Component } from "react";

export const Footer = () => {
	return (
		<footer className="container-fluid footer mt-auto py-3">
			<div className="row">
				<div className="col-sm-4">
					<h4 className="text-center">Footer</h4>
				</div>
				<div className="col-sm-4">
					<h5>Ready to get started?</h5>
					<p className="text-justify">
						Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat.
					</p>
				</div>
				<div className="col-sm-4">
					<h5>Company</h5>
					<p>&copy;2021</p>
				</div>
			</div>
		</footer>
	);
};
