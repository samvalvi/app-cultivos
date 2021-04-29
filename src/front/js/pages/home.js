import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid text-black" id="home">
			<div className="row justify-content-center " id="fondonegro">
				<div className="m-5 col-sm-8 col-md-6 col-lg-6">
					<h1 className="display-4">¡Bienvenido a Cultiva!</h1>
					<p id="home-text">
						Aquí podrás encontrar la información acerca del cultivo de vegetales. Nuestra meta en incentivar
						el autocultivo brindado información detallada sobre el cultivo de vegetales. Al mismo tiempo
						crear lazos entre los productores locales de suministros para la siembra y los usuarios de
						Cultiva.
					</p>
				</div>
			</div>
		</div>
	);
};
