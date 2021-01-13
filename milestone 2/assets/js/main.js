/*
Milestone 2:
Trasformiamo il voto da 1 a 10 decimale in un numero intero 
da 1 a 5, così da permetterci di stampare a schermo un numero 
di stelle piene che vanno da 1 a 5, 
lasciando le restanti vuote(troviamo le icone in FontAwesome).
Arrotondiamo sempre per eccesso all’ unità successiva, 
non gestiamo icone mezze piene(o mezze vuote: P)
Trasformiamo poi la stringa statica della lingua in una vera e propria
bandiera della nazione corrispondente, 
gestendo il caso in cui non abbiamo la bandiera della
nazione ritornata dall’ API(le flag non ci sono in FontAwesome).
Allarghiamo poi la ricerca anche alle serie tv.
Con la stessa azione di ricerca dovremo prendere sia i film 
che corrispondono alla query, sia le serie tv, stando
attenti ad avere alla fine dei valori simili
(le serie e i film hanno campi nel JSON di risposta diversi, 
simili ma non sempre identici)
Qui un esempio di chiamata per le serie tv:
https: //api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=s
crubs
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