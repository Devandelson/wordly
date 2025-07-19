function getSuspender(promise){
    let status = 'pending';
    let response;

    const suspender = promise.then(
        (res) => {
            status = 'success';
            response = res;
        },
        (err) => {
            status = 'error';
            response = err;
        }
    )

    const read = () => {
        switch (status) {
            case 'pending':
                throw suspender;
            case 'error':
                throw response;
            default:
                // primero obteniendo la categoria a seleccionar
                const arrayKeys = Object.keys(response);
                const numRandomKeys = arrayKeys[Math.floor(Math.random() * arrayKeys.length)];
                let dataSelect = response[numRandomKeys];
                return [dataSelect , response];
        }
    }

    return { read };
}

export function fechingData(url) {
    const promise = fetch(url)
        .then((response) => response.json())
        .then((data) => data);
    
    return getSuspender(promise);
}