import {v4 as uuid} from 'uuid';

interface ISignInRequestData {
    email: string;
    password: string;
}

const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))

export const signRequest = async(data: ISignInRequestData) => {
    await delay();


    return {
        token: uuid(),
        user: {
            name: 'Lívia Siqueira',
            email: 'livia.siqueira12@outlook.com',
            avatar_url: 'https://github.com/livia-siqueira.png'
        }
    }
}


export const recoverUserInformation = async() => {
    await delay();

    return {
        user: {
            name: 'Lívia Siqueira',
            email: 'livia.siqueira12@outlook.com',
            avatar_url: 'https://github.com/livia-siqueira.png'
        }
    }

}