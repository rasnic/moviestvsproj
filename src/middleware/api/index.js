const axios = require('axios')
let trailers = []
let pictures = []
export default {
    pictures,trailers,
    getItems: options => {
        return axios.get(`https://api.themoviedb.org/3/${options.entity}/popular?api_key=43251736c66cc26f1d600d2ec8a2d1fb&language=he&page=${options.pageNumber}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error(error);
            });
    },

    getItem: async options => {
        return await axios.get(`https://api.themoviedb.org/3/${options.entity}/${options.id}?api_key=43251736c66cc26f1d600d2ec8a2d1fb&language=he`)
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.error(error);
            });
    },
    getTrailer: options => {
         return axios.get(`https://api.themoviedb.org/3/${options.entity}/${options.id}/videos?api_key=43251736c66cc26f1d600d2ec8a2d1fb&language=en`)
            .then(response => {
                trailers.push(response.data.results[0].key)
                    return response.data.results[0].key
            })
            .catch(() => {
                trailers.push('0')
            });
    },
    getPicture: options => {
        return axios.get(`https://api.themoviedb.org/3/${options.entity}/${options.id}/images?api_key=43251736c66cc26f1d600d2ec8a2d1fb`)
            .then(response => {
                pictures.push(response.data.posters[0].file_path)
                return response.data.posters[0].file_path
            })
            .catch(() => {
                pictures.push('0')
            });
    }

};