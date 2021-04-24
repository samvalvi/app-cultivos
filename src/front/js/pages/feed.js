import React, { useContext, useState } from "react";
import { Product } from "../component/card";

import { Context } from "../store/appContext";

export function Feed() {
	const { store, actions } = useContext(Context);
	return (
		<div>
			<div>
				{store.cultivos.map((item, index) => {
					return (
						<div key={index}>
							<Product name={item.nombre} description={item.cosecha} pos={index} />
						</div>
					);
				})}
			</div>
		</div>
	);
}
