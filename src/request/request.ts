type RequestParams = {
    method: string;
    url: string;
    body: object;
    authToken: string|null;
    responseType: string;
}

export async function request(params: RequestParams): Promise<any> {
    let response = await fetch(params.url, {
        method: params.method,
        headers: {
            'Content-Type': 'application/json',
            'X_AUTH_TOKEN': params.authToken ?? '',
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
