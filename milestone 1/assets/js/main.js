/*
Milestone 1:
Creare un layout base con una searchbar(una input e un button) in cui 
possiamo scrivere completamente o parzialmente il nome di un film. 
Possiamo, cliccando il bottone, cercare sull’ API tutti i film 
che contengono ciò che ha scritto l’ utente.
Vogliamo dopo la risposta dell’ API visualizzare a schermo 
i seguenti valori per ogni
film trovato:
1. Titolo
2. Titolo Originale
3. Lingua
4. Voto
*/

let root = new Vue ({
    el: '#root',
    data:{
        search: "",
        result: [],
        page: 1,
        totalPage: null,
    },
    methods: {
        functionSearch(){
            axios.get('https://api.themoviedb.org/3/search/movie?api_key=7fde4ba234d36aa8a95d8a14560d15a2&language=it-IT&query=' + this.search + '&page=' + this.page)
            .then(response => {
                console.log(response);
                this.result = response.data.results;
                this.totalPage = response.data.total_pages;
                console.log(this.result);
                console.log(this.page);
            })
            .catch(error => {
                console.log(error);
            })
        },
        nextPage(){
            if (this.page < this.totalPage) {
                this.page++;
                this.functionSearch();
                console.log(this.page);
            }
        },
        prevPage() {
            if (this.page > 1) {
                this.page--;
                this.functionSearch();
                console.log(this.page);
            }
        },
    },
    mounted(){
        
    }
});