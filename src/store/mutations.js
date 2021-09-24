export const mutations = {

	addUser(state, user) {
		if (![...state.users].some(a => a.id === user.id)) {
			if (user.id !== state.socket.id) {
				const colors = state.colors;
				user.color = colors[Math.floor(Math.random() * colors.length)];
			}
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

	removeUser(state, user) {
		state.users = state.users.filter(a => a.id !== user.id);
	},

	setUserColor(state, { user, color }) {
		const current_user = state.users.find(a => a.id === user.id);
		current_user.color = color;
	},
	// removeUser() {},
	addMessage(state, message) {
		if ((message?.value?.length < 300) && ![...state.messages].some(a => a.id === message.id)) {
			state.messages.push(message);
		}
	},

	setSocket(state, socket) {
		state.socket = socket;
	},

	toogleAnchors(state) {
		state.anchors = !state.anchors;
	}
};