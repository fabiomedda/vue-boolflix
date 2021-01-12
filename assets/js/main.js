let root = new Vue ({
    el: '#root',
    data:{
        search: "",
        result: [],
        page: null,
    },
    methods: {
        functionSearch(){
            axios.get('https://api.themoviedb.org/3/search/movie?api_key=7fde4ba234d36aa8a95d8a14560d15a2&language=it-IT&query=' + this.search)
            .then(response => {
                console.log(response);
                this.result = response.data.results;
                this.page = response.data.total_pages;
                console.log(this.result);
                console.log(this.page);
            })
            .catch(error => {
                console.log(error);
            })
        }
    },
    mounted(){/*
        
    }
});