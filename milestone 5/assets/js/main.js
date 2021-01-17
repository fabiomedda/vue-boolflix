/*
Milestone 4:
Trasformiamo quello che abbiamo fatto fino ad ora in una 
vera e propria webapp, creando un layout completo 
simil - Netflix: 
●Un header che contiene logo e search bar
● Dopo aver ricercato qualcosa nella searchbar, 
i risultati appaiono sotto forma
di“ card” in cui lo sfondo è rappresentato dall’ immagine 
di copertina(consiglio la poster_path con w342)
● Andando con il mouse sopra una card(on hover), appaiono le informazioni
aggiuntive già prese nei punti precedenti più la overview
*/

let root = new Vue ({
    el: '#root',
    data:{
        search: "",
        resultFilms: [],
        resultSerieTV: [],
        castFilm: [],
        pageFilms: 1,
        castSerieTv: [],
        pageSerieTV: 1,
        totalPageFilms: null,
        totalPageSerieTV: null,
        flags: ["it", "en", "es", "fr"],
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
                    element.castFilmVisible = false;
                });
                if (this.pageFilms > this.totalPageFilms) {
                    this.pageFilms = 1;
                    this.functionSearch();
                }
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
                    element.castSerieTvVisible = false;
                });
                if (this.pageSerieTV > this.totalPageSerieTV) {
                    this.pageSerieTV = 1;
                    this.functionSearch();
                }
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

        /* methods per impaginazione film */
        activePagesFilms(page){
            this.pageFilms = page;
            this.functionSearch();
        },
        ultimePageFilms() {
            this.pageFilms = this.totalPageFilms;
            this.functionSearch();
        },
        firstPageFilms(){
            this.pageFilms = 1;
            this.functionSearch();
        },
        /* //methods per impaginazione film */

        /* methods per impaginazione serie tv */
        activePagesSerieTv(page) {
            this.pageSerieTV = page;
            this.functionSearch();
        },
        ultimePageSerieTv() {
            this.pageSerieTV = this.totalPageSerieTV;
            this.functionSearch();
        },
        firstPageSerieTv() {
            this.pageSerieTV = 1;
            this.functionSearch();
        },
        /* //methods per impaginazione serie tv */

        /* cast film */
        castMovie(id, index){
            axios.get('https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=7fde4ba234d36aa8a95d8a14560d15a2&language=it-IT')
            .then(response => {
                let cast = [];
                for (let i = 0; i < 5; i++) {
                    cast.push(response.data.cast[i].name);
                }
                this.resultFilms.forEach(element => {
                    element.castFilmVisible = false;
                });
                this.castFilm = cast;
                this.resultFilms[index].castFilmVisible = true;
                console.log(this.castFilm);
            })
            .catch(error => {
                console.log(error);
            })
        },
        /* //cast film */

        /* cast serie tv */
        castSerieTV(id, index) {
            axios.get('https://api.themoviedb.org/3/tv/' + id + '/credits?api_key=7fde4ba234d36aa8a95d8a14560d15a2&language=it-IT')
            .then(response => {
                let cast = [];
                for (let i = 0; i < 5; i++) {
                    cast.push(response.data.cast[i].name);
                }
                this.resultSerieTV.forEach(element => {
                    element.castSerieTvVisible = false;
                });
                this.castSerieTv = cast;
                this.resultSerieTV[index].castSerieTvVisible = true;
                console.log(this.castSerieTv);
            })
            .catch(error => {
                console.log(error);
            })
        },
        /* //cast serie tv */

    },
    mounted(){
        
    }
});