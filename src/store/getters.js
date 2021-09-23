export const getters = {
	getUserofMessage: (state) => (user) =>{
		return state.users.find(a => a.id === user.id);
	},
	
	getLogInUser: (state) => {
		return state.users.find(a => a.id === state.socket.id);
	}
}