export const mutations = {

	setSocket(state, socket) {
		state.socket = socket;
	},
	addUser(state, user) {
		if (![...state.users].some(a => a.id === user.id)) {
		// if (!state.users.some(a => a.id === user.id) && user.id !== state.socket.id) {
			state.users.push(user);
		}
	},
	updateUser(state, user) {
		const user_to_update = [...state.users].find(a => a.id === user.id);
		if (user_to_update) {
			user_to_update.name = user.name;
			state.messages
				.filter(msg => msg.user.id === user_to_update.id)
				.map(msg => msg.user = user_to_update);
		}

	},
	// removeUser() {},
	addMessage(state, message) {
		if (![...state.messages].some(a => a.id === message.id)) {
			state.messages.push(message);
		}
	},
};