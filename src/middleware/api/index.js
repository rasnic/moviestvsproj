const axios = require('axios')

/// api getters
export default {
// gets a page of items from api
    getItems: options => {
        return axios.get(`https://api.themoviedb.org/3/${options.type}/popular?api_key=43251736c66cc26f1d600d2ec8a2d1fb&language=he&page=${options.pageNumber}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error(error);
            });
    },
    //gets the english overview from api
    getEnOverview: async options =>{
      return await axios.get(`https://api.themoviedb.org/3/${options.type}/${options.id}?api_key=43251736c66cc26f1d600d2ec8a2d1fb&language=en`)
          .then(response =>{
              return response.data.overview;
          })
          .catch(() => {
              return undefined;
          });
    },
    //gets an item from api
    getItem: async options => {
        return await axios.get(`https://api.themoviedb.org/3/${options.type}/${options.id}?api_key=43251736c66cc26f1d600d2ec8a2d1fb&language=he`)
            .then(response => {
                return response.data
            })
            .catch(error => {
                console.error(error);
            });
    },
    //gets an item trailer from api
    getTrailer: options => {
         return axios.get(`https://api.themoviedb.org/3/${options.type}/${options.id}/videos?api_key=43251736c66cc26f1d600d2ec8a2d1fb&language=en`)
            .then(response => {
                    return response.data.results[0].key
            })
            .catch(() => {
                return false
            });
    },
    // gets an item video from api
    getPicture: options => {
        return axios.get(`https://api.themoviedb.org/3/${options.type}/${options.id}/images?api_key=43251736c66cc26f1d600d2ec8a2d1fb`)
            .then(response => {
                return response.data.posters[0].file_path
            })
            .catch(() => {
                return false
            });
    }

};