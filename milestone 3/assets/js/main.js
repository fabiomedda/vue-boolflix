/*
In questa milestone come prima cosa aggiungiamo la copertina 
del film o della serie al nostro elenco.
Ci viene passata dall’ API solo la parte finale dell’ URL, 
questo perché poi potremo generare da quella porzione di URL 
tante dimensioni diverse.
Dovremo prendere quindi l’ URL base delle immagini di TMDB:
https://image.tmdb.org/t/p/ 
per poi aggiungere la dimensione che vogliamo generare
(troviamo tutte le dimensioni possibili a questo link:
https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400 ) 
per poi aggiungere la
parte finale dell’ URL passata dall’ API.Esempio di URL:
https://image.tmdb.org/t/p/w342/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
*/

let root = new Vue ({
    el: '#root',
    data:{
        search: "",
        resultFilms: [],
        resultSerieTV: [],
        pageFilms: 1,
        pageSerieTV: 1,
        totalPageFilms: null,
        totalPageSerieTV: null,
    },
    methods: {
        functionSearch(){
            /* chiamata axios film */
            axios.get('https://api.themoviedb.org/3/search/movie?api_key=7fde4ba234d36aa8a95d8a14560d15a2&language=it-IT&query=' + this.search + '&page=' + this.pageFilms)
            .then(response => {
                console.log(response);
                this.resultFilms = response.data.results;
                this.totalPageFilms = null;
                this.totalPageFilms = response.data.total_pages;
                this.resultFilms.forEach(element => {
                    element.voteInt = Math.ceil(element.vote_average / 2);
                });
            })
            .catch(error => {
                console.log(error);
            })
            /* //chiamata axios film */

            /* chiamata axios serie tv */
            axios.get('https://api.themoviedb.org/3/search/tv?api_key=7fde4ba234d36aa8a95d8a14560d15a2&language=it-IT&query=' + this.search + '&page=' + this.pageSerieTV)
            .then(response => {
                console.log(response);
                this.resultSerieTV = response.data.results;
                this.totalPageSerieTV = null;
                this.totalPageSerieTV = response.data.total_pages;
                this.resultSerieTV.forEach(element => {
                    element.voteInt = Math.ceil(element.vote_average / 2);
                });
            })
            .catch(error => {
                console.log(error);
            })
            /* chiamata axios serie tv */

        },
        /* next and prev Films */
        nextPageFilms(){
            if (this.pageFilms < this.totalPageFilms) {
                this.pageFilms++;
                this.functionSearch();
            }
        },
        prevPageFilms() {
            if (this.pageFilms > 1) {
                this.pageFilms--;
                this.functionSearch();
            }
        },
        /* //next and prev Films */

        /* next and prev serie tv */
        nextPageSerieTV() {
            if (this.pageSerieTV < this.totalPageSerieTV) {
                this.pageSerieTV++;
                this.functionSearch();
            }
        },
        prevPageSerieTV() {
            if (this.pageSerieTV > 1) {
                this.pageSerieTV--;
                this.functionSearch();
            }
        },
        /* //next and prev serie tv */
    },
    mounted(){
        
    }
});