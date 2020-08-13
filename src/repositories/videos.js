import config from '../config';

const videosURL = `${config.baseURL}/videos`;
const createVideosURL = `${videosURL}?_embed=videos`;

function create(object){
    return fetch(createVideosURL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(object),
    })
        .then(async (responseServer) => {
            if (responseServer.ok) {
                const response = await responseServer.json();
                
                return response;
            }
            throw new Error('Não foi possível pegar os dados');
        });
}

export default {
    create,
    createVideosURL
};