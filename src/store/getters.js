export const getters = {
	getUserofMessage: (state) => (user) => {
		return state.users.find(a => a.id === user.id);
	},

	getLogInUser: (state) => {
		if (!state.socket || !state.users) return false;
		return state.users.find(a => a.id === state.socket.id);
	},
	
	getOtherUsers: (state) => {
		if (!state.socket || !state.users) return false;
		return state.users.filter(a => a.id !== state.socket.id);
	},

	getRandomColor: (state) => (nb) => {
		const colors = state.colors;
		return colors[Math.floor(nb * colors.length)];
	}
}