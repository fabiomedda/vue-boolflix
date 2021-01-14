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
        pageFilms: 1,
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