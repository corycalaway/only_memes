

const memeDisplayReducer = (state = [], action) => {
    switch (action.type) {
        case "NEWMEMES":
            return state.push(action.value)
        case "SALEPACK":
            return state
        default: 
        return state
    }
}

export default memeDisplayReducer;
