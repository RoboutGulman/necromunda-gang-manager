type RequetsParams = {
    method: string;
    url: string;
    body: object;
    authKey: string|null;
    responseType: string;
}

export async function request(params: RequetsParams): Promise<any> {
    let response = await fetch(params.url, {
        method: params.method,
        headers: {
            'Content-Type': 'application/json',
            'X_AUTH_KEY': params.authKey ?? '',
        },
        body: JSON.stringify(params.body),
    })

    let data
    switch (params.responseType) {
        case 'json':
            data = response.json()
            break
        default:
            data = response.text()
    }

    return data
}
