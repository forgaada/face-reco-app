function parseAxios(response) {
    if(response.status >= 200 && response.status < 400){
        return response.data;
    }else{
        return Promise.reject(response.statusText)
    }
}

const Api = {
    parseAxios
}

export default Api;