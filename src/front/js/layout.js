import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Single } from "./pages/single";
import { Register } from "./pages/register";
import { Details } from "./pages/details";
import { Userconfig } from "./pages/userconfig";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Login } from "./pages/login";
import { Recover } from "./pages/recover";
import { Feed } from "./pages/feed";
import { About } from "./pages/about";
//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div className="d-flex flex-column h-100">
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Navbar />
					<Switch>
						<Route exact path="/">
							<Home />
							<Footer />
						</Route>
						<Route exact path="/login">
							<Login />
							<Footer />
						</Route>
						<Route exact path="/recover">
							<Recover />
							<Footer />
						</Route>
						<Route exact path="/single/:theid">
							<Single />
						</Route>
						<Route exact path="/register">
							<Register />
							<Footer />
						</Route>
						<Route exact path="/feed">
							<Feed />
						</Route>
						<Route exact path="/details/:detailsid">
							<Details />
						</Route>
						<Route exact path="/about">
							<About />
						</Route>
						<Route exact path="/userconfig">
							<Userconfig />
						</Route>
						<Route>
							<h1>Not found!</h1>
						</Route>
					</Switch>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
