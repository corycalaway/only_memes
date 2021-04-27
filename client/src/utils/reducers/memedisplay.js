

const memeDisplayReducer = (state = [], action) => {
    switch (action.type) {
        case "NEWMEMES":
            return state = action.value
        case "SALEPACK":
            return state = [action.value]
        default: 
        return state
    }
}

export default memeDisplayReducer;
