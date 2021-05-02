import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid text-black" id="home">
			<div className="row justify-content-center " id="fondonegro">
				<div className="m-5 col-sm-8 col-md-6 col-lg-6">
					<h1 className="display-4 text-center">¡Bienvenido a Cultiva!</h1>
					<p id="home-text">
						Aquí podrás encontrar información sobre el cultivo de vegetales. Nuestra meta es incentivar el
						autocultivo brindando información detallada sobre el cultivo de vegetales y productos para el
						óptimo desarrollo del cultivo. Al mismo tiempo queremos crear lazos entre los productores de
						suministros para la siembra y los usuarios de Cultiva.
					</p>
				</div>
			</div>
		</div>
	);
};
