import React, { Component } from 'react'
// import { movies } from './getMovies'
import axios from 'axios'

export default class Movies extends Component {
  constructor(){
    super()
    this.state = {
      hover: '',
      pageArr: [1],
      currPage: 1,
      movies: [],
      fav: []
    }
  }

  // calling API in stateEffect 
  async componentDidMount(){
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=ec98ae62e08502977b08b3ff7f5fe782&language=en-US&page=${this.state.currPage}`);
    let data = res.data;
    // console.log(data);
    this.setState({
      movies: [...data.results]
    })
  }

  // change movies when we click next page on pagination
  movieChange = async() => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=ec98ae62e08502977b08b3ff7f5fe782&language=en-US&page=${this.state.currPage}`);
    let data = res.data;
    // console.log(data);
    this.setState({
      movies: [...data.results]
    })
  }

  // Goto next page on click on next on pagination
  nextPage = () => {
    let tempArr = [];
    for(let i = 1; i <= this.state.pageArr.length + 1; i++){
      tempArr.push(i);
    }
    this.setState({
      pageArr: [...tempArr],
      currPage: this.state.currPage + 1
    }, this.movieChange)
  }

  // Goto previous page on click of previous button pagination
  prevPage = () => {
   if(this.state.currPage !== 1){
    this.setState({
      currPage: this.state.currPage - 1
    }, this.movieChange)
   }
  }

  // goto direct on the page we want 
  handleClick = (value) =>{
    if(value !== this.state.currPage){
      this.setState({
        currPage: value
      }, this.movieChange)
    }
  }

  AddRemFav = (movie) =>{
    let oldData = JSON.parse(localStorage.getItem('movies') || '[]')
    if(this.state.fav.includes(movie.id)){
      oldData = oldData.filter((m) => m.id !== movie.id)
    }else{
      oldData.push(movie)
    }
    localStorage.setItem('movies', JSON.stringify(oldData));
    console.log(oldData);
    this.SetFavState();
  }

  SetFavState = () =>{
    let oldData = JSON.parse(localStorage.getItem('movies') || '[]');
    let temp = oldData.map((movie) => movie.id);
    this.setState({
      fav: [...temp]
    })
  }
  render() {
    // let movie = movies.results
    return (
      <>
        {
            this.state.movies.length === 0 ?
                <div className="spinner-border text-success">
                    <span class="visually-hidden">Loading...</span>
                </div> : 
                <div>
                    <h3 className='text-center'><strong>Trending</strong></h3>
                    <div className='movie-list'>
                        {
                            this.state.movies.map((movieObj) => (
                                <div className="card movie-card" onMouseEnter={()=>this.setState({hover:movieObj.id})} onMouseLeave={()=>this.setState({hover:''})}>
                                    <img src= {`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} className="card-img-top movie-img" alt="..."/>
                                        <h5 className="card-title movie-title">{movieObj.original_title}</h5>
                                        {/*  <p className="card-text movie-text">{movieObj.overview}</p> */}
                                        <div className='wrapper-btn' style={{display: 'flex', width: '100%', justifyContent: 'center'}}>

                                          {
                                              this.state.hover === movieObj.id &&
                                              <button className='btn btn-primary movie-btn' onClick={() => this.AddRemFav(movieObj)}>{this.state.fav.includes(movieObj.id)?"Remove from favourites":"Add to favourites"}</button>
                                          }
                                        </div>

                                </div>
                            ))
                        }
                    </div>

                    {/* Pagination buttons */}
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                      <nav aria-label="Page navigation example">
                        <ul class="pagination">
                          <li class="page-item">
                            <button class="page-link" onClick={this.prevPage} aria-label="Previous">
                              <span>&laquo;</span>
                            </button>
                          </li>
                          {
                            this.state.pageArr.map((value) => (
                              <li class="page-item"><button class="page-link" onClick={() => this.handleClick(value)}>{value}</button></li>
                            ))
                          }
                          <li class="page-item">
                            <button class="page-link" onClick={this.nextPage} aria-label="Next">
                              <span>&raquo;</span>
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                </div>
        }
      
      </>
    )
  }
}
