export const UPDATE_USER = 'users:updateUser';

export function updateUser(newUser) {
    console.log('updateUser function fires, giving the user-reducer an action')
    return {
        type: UPDATE_USER,
        payload: {
            user: newUser
        }
    }
}