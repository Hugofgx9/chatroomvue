export const getters = {
	getUserofMessage: (state) => (user) =>{
		return state.users.find(a => a.id === user.id);
	}
}