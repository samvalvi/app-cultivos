import React, { useContext, useState } from "react";
import { Product2 } from "../component/cardfav";

import { Context } from "../store/appContext";
import { element } from "prop-types";

export function Favorites() {
	const { store, actions } = useContext(Context);

	const getProduct = name => {
		return store.cultivos.find(element => element.nombre === name);
	};
	console.log("favList: " + store.favList);

	return (
		<div className="mb-5">
			<div>
				{store.userData ? (
					store.favList.length > 0 ? (
						store.favList.map((item, index) => {
							let product = getProduct(item.name);
							return (
								<div key={index}>
									<Product2
										name2={product.nombre}
										description2={product.descripcion}
										pos2={product.id}
										url_image2={product.url_image}
										pos3={item.id}
									/>
								</div>
							);
						})
					) : (
						<h1 className="text-center mt-5 ">Agrega tus Cultivos para Favoritos para verlos aqui</h1>
					)
				) : (
					"cargando"
				)}
			</div>
		</div>
	);
}
