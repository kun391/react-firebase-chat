import {
    CONTACT_GET_USERS
} from '../constants/ActionTypes';

const initialState = {
    contacts: []
};

export default function auth(state = initialState, action) {
    let userState = state;

    switch (action.type) {
        case CONTACT_GET_USERS:
            const authResponse = action.payload.data;

            if (authResponse) {
                const users = authResponse.data;
                userState = {
                    ...state,
                    contacts: users
                };
            } else {
                userState = {};
            }
            break;

        default:
            userState = state;
    }

    return userState;
};

