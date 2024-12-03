import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function MovieComponent() {

    let [movie, SetMovie] = useState([])

    let getMovieList = () => {
        //API DATA

        let apiUrl;
        if (title===''){
            apiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1`
        }
        else{
            apiUrl = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${title}`
        }

        axios.get(apiUrl)
            .then((res) => res.data)

            .then((finalRes) => {
                SetMovie(finalRes.results)
            })
    }

    let [title, setTitle] = useState('')

    let getValue = (event) => {
        setTitle(event.target.value)
    }

    useEffect(() => {
        getMovieList()
    }, [title])
    return (
        <div className='bg-black py-6'>
            <h1 className='text-center text-3xl font-bold py-5 text-white'>Movie App</h1>

            <form className='max-w-[1000px] mx-auto px-4' action="">
                <input onChange={getValue} type="text" value={title} className='w-[100%] pl-3 border-2 h-12 rounded-[15px]' placeholder='Search Movie' />
            </form>

            <div className='max-w-[1200px] mx-auto grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-[20px] mt-6 md:px-3 px-2'>
                {movie.length >= 1
                    ?
                    movie.map((items, index) => <MovieItem movieData={items} />)
                    :
                    "Loding..."
                }

            </div>
        </div>
    )
}


function MovieItem({ movieData }) {
    let { title, poster_path } = movieData
    return (
        <div className='shadow-lg cursor-pointer'>
            {
                poster_path!==null
                ?
                <img className='rounded-t-lg' src={`https://image.tmdb.org/t/p/w1280/${poster_path}`} />
                :
                <img className='rounded-t-lg' src={`https://sunlanddrivein.com/wp-content/uploads/2020/05/comingSoon-1.jpg`} />
            }
            
            <h3 className='text-[20px] p-3 bg-[rgb(255,211,201)]'>{title}</h3>
        </div>
    )
}


// MOVIE APIs
// https://image.tmdb.org/t/p/w1280/yh64qw9mgXBvlaWDi7Q9tpUBAvH.jpg
// https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=
// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1