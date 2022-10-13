import React, { Component } from 'react'
// import {movies} from './getMovies'

export default class fav extends Component {
    constructor(){
        super();
        this.state = {
            genres: [],
            currgen: 'All Genres',
            movies: [],
            searchBar: '',
            limit: 5,
            currPage: 1
        }
    }

    componentDidMount(){
        let genreId = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 
                        'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 
                        10752: 'War', 37: 'Western' };
        let data = JSON.parse(localStorage.getItem('movies') || '[]');
        let temp = [];
            data.forEach((movieObj) => {
                if(!temp.includes(genreId[movieObj.genre_ids[0]])){
                    temp.push(genreId[movieObj.genre_ids[0]]);
                }
            })
            temp.unshift('All Genres');
            this.setState({
                genres: [...temp],
                movies: [...data]
            })
    }

    changeCurrGenState = (genre) =>{
        this.setState({
            currgen: genre
        })
    }

    sortPopularityDesc=()=>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objB.popularity-objA.popularity
        })
        this.setState({
            movies:[...temp]
        })
    }

    sortPopularityAsc=()=>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objA.popularity-objB.popularity
        })
        this.setState({
            movies:[...temp]
        })
    }

    sortRatingDesc=()=>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objB.vote_average-objA.vote_average;
        })
        this.setState({
            movies: [...temp]
        })
    }

    sortRatingAsc=()=>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objA.vote_average-objB.vote_average;
        })
        this.setState({
            movies:[...temp]
        })
    }

    pageChange=(page)=>{
        this.setState({
            currPage:page
        })
    }

    Delete=(id)=>{
        let newarr = [];
        newarr = this.state.movies.filter((movieObj)=>movieObj.id!==id)
        this.setState({
            movies:[...newarr]
        })
        localStorage.setItem("movies",JSON.stringify(newarr))
    }
   
  render() {
    let genreId = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 
                    'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 
                    10752: 'War', 37: 'Western' };
    let filterArr = [];

    if(this.state.searchBar === ''){
        filterArr = this.state.movies;
    }else{
        filterArr = this.state.movies.filter((movieObj) => {
            let Movtitle = movieObj.original_title.toLowerCase();
            return Movtitle.includes(this.state.searchBar.toLowerCase());
        })
    }

    // if(this.state.currgen === 'All Genres'){
    //     filterArr = this.state.movies;
    // }
    if(this.state.currgen !== 'All Genres'){
        filterArr = this.state.movies.filter((movieObj) => genreId[movieObj.genre_ids[0]] === this.state.currgen)
    }

    let pages = Math.ceil(filterArr.length/this.state.limit);
    let pageArr = [];
    for(let i = 1; i < pages; i++){
        pageArr.push(i);
    }

    let startIndex = (this.state.currPage-1)*this.state.limit;
    let endIndex = startIndex + this.state.limit;
    filterArr = filterArr.slice(startIndex, endIndex);

    return (
      <div>
        <>
            <div className='main'>
                <div className='row'>
                    <div className='col-lg-3 col-sm-12 genre'>
                        <ul className='list-group fav-genres'>
                            {
                                this.state.genres.map((genre)=>(
                                    this.state.currgen === genre ?
                                    <li class="list-group-item fav-sidebar" style={{background:'#3f51b5', color: 'white', fontWeight: 'bolder'}} >{genre}</li> :
                                    <li class="list-group-item fav-sidebar" style={{background:'white',color:'#3f51b5'}} onClick={()=> this.changeCurrGenState(genre)}>{genre}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className='col-lg-9 col-sm-12 fav-table'>
                        <div className='row'>
                            <input type="text" className="input-group-text fav-input" placeholder='Search' value={this.state.searchBar} onChange={(e)=>this.setState({searchBar: e.target.value})}/>
                            <input type="number" className="input-group-text fav-input" placeholder='Rows you want' value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}/> 
                        </div>
                        <div className='row fav-tables'>
                            <table class="table">
                                <thead style={{border: "1px solid #666"}}>
                                    <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genres</th>
                                    <th scope="col"><i class="fa-solid fa-sort-up" style={{paddingRight: '.5rem'}} onClick={this.sortPopularityDesc}/>Popularity<i class="fa-solid fa-sort-down" style={{paddingLeft: '.5rem'}} onClick={this.sortPopularityAsc}/></th>
                                    <th scope="col"><i class="fa-solid fa-sort-up" style={{paddingRight: '.5rem'}}  onClick={this.sortRatingDesc}/>Rating<i class="fa-solid fa-sort-down" style={{paddingLeft: '.5rem'}} onClick={this.sortRatingAsc}/></th>
                                    <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filterArr.map((movieObj) => (
                                            <tr>
                                                <td> <img src= {`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt= {movieObj.title} style={{width:'6rem'}}/> {movieObj.original_title}</td>
                                                <td>{genreId[movieObj.genre_ids[0]]}</td>
                                                <td>{movieObj.popularity}</td>
                                                <td>{movieObj.vote_average}</td>
                                                <td><img src={'https://cdn-icons-png.flaticon.com/128/1828/1828666.png'} alt={'..'} style={{width: '1.5rem', 
                                                                paddingTop: '0.5rem', paddingBottom: '0.5rem', cursor: 'pointer'}} onClick={()=>this.Delete(movieObj.id)}/></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    {
                                        pageArr.map((page)=>(
                                            <li class="page-item"><button class="page-link" onClick={()=>this.pageChange(page)}>{page}</button></li>
                                        ))
                                    }  
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>

      </div>
    )
  }
}
