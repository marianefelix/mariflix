import config from '../config';

const categoriesURL = `${config.baseURL}/categorias`;
const createCategoriesURL = `${categoriesURL}?_embed=categorias`;

function getAll() {
    return fetch(`${categoriesURL}`)
      .then(async (responseServer) => {
        if (responseServer.ok) {
          const response = await responseServer.json();
          
          return response;
        }
  
        throw new Error('Não foi possível pegar os dados :(');
    });
}

function getAllWithVideos(){
    return fetch(`${categoriesURL}?_embed=videos`)
        .then(async (responseServer) => {
            if (responseServer.ok) {
                const response = await responseServer.json();
                
                return response;
            }
            throw new Error('Não foi possível pegar os dados');
        });
}

function create(object){
    return fetch(createCategoriesURL, {
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
    getAllWithVideos,
    getAll,
    create,
};