import {LOGIN_URL} from "./serviceMethods";

export type LoginRequest = {
    username: string;
    password: string;
}

export type LoginResponse = {
    status: number;
    authorized: boolean;
    apiToken: string;
}

export async function sendLoginRequest(loginData: LoginRequest): Promise<LoginResponse> {
    let response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    })

    const data: object = await response.json()

    return {
        status: response.status,
        authorized: data?.authorized,
        apiToken: data?.apiToken
    }
}