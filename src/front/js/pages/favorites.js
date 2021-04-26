import React, { useContext, useState } from "react";
import { Product } from "../component/card";

import { Context } from "../store/appContext";
import { element } from "prop-types";

export function Favorites() {
	const { store, actions } = useContext(Context);

	const found = store.favList.map(item => {
		return store.cultivos.find(element => element.nombre === item.name);
	});
	console.log(found);

	console.log(store.favList);

	return (
		<div>
			<div>
				{store.userData
					? found.map((item, index) => {
							return (
								<div key={index}>
									<Product name={item.nombre} description={item.descripcion} pos={index} />
								</div>
							);
					  })
					: "cargando"}
			</div>
		</div>
	);
}
