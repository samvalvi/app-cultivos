const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			userStatus: false,
			userData: {},
			cultivos: [],
			token: "",
			favList: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			setUserStatus: condicion => {
				setStore({ userStatus: condicion });
			},
			setUserData: data => {
				setStore({ userData: data });
			},
			setToken: data => {
				setStore({ token: data });
			},
			fetchCultivos() {
				fetch("https://3001-yellow-bug-ezbxpbrs.ws-us03.gitpod.io/api/post/")
					.then(response => response.json())
					.then(result => {
						setStore({ cultivos: result });
						console.log(result);
					})
					.catch(error => console.log("error", error));
			},
			favFunction: name => {
				const store = getStore();
				const actions = getActions();
				let token = store.token;

				fetch("https://3001-yellow-bug-ezbxpbrs.ws-us03.gitpod.io/api/favorites", {
					method: "POST",
					headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
					body: JSON.stringify({ name: name })
				})
					.then(res => res.json())
					.then(data => {
						console.log(data);
						setStore({ favlist: listFav });
						console.log(store.favList);
					})
					.catch(err => console.log("error", err));
			},
			setFavList: listFav => {
				setStore({ favlist: listFav });
			}
		}
	};
};

export default getState;
