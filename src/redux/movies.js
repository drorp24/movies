import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import moize from 'moize'

//! About Caching
// I am using here 'moize' to memoize the returned list of movies per title and year
// (useMemo is good for functional components only)
const moviesAPI = async ({ title, year }) => {
  let endpoint = `${process.env.REACT_APP_OMDB_ENDPOINT}/?s=${title}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
  if (year) endpoint += `&y=${year}`
  try {
    const movies = await axios.get(endpoint)
    return movies
  } catch (error) {
    // Returning a resolved promise with a RejectWithValue argument here would be better
    console.error(error)
  }
}

const memoizedMoviesAPI = moize(moviesAPI, {
  equals(cacheKeyArgument, keyArgument) {
    return (
      cacheKeyArgument.title === keyArgument.title &&
      cacheKeyArgument.year === keyArgument.year
    )
  },
})

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ title, year }) => {
    const movies = await memoizedMoviesAPI({ title, year })
    // Here too, error would have to be handled
    return movies.data
  }
)

// all these state assignments below will not mutate redux state;
// Instead, Immer will use them merely as instructions and will return a new state object.
const moviesSlice = createSlice({
  name: 'movies',
  initialState: { entities: [], loading: 'idle' },
  reducers: {
    clear: state => {
      state.entities = []
    },
  },
  extraReducers: {
    [fetchMovies.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending'
        state.currentRequestId = action.meta.requestId
      }
    },

    [fetchMovies.fulfilled]: (state, { meta, payload: { Search } }) => {
      const { requestId } = meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.currentRequestId = undefined
        if (Search)
          Search.forEach(movie => {
            // I need all fields; otherwise I would have destructured those I needed only
            state.entities.push(movie)
          })
      }
    },

    [fetchMovies.rejected]: (state, action) => {
      const { requestId } = action.meta
      if (state.loading === 'pending' && state.currentRequestId === requestId) {
        state.loading = 'idle'
        state.error = action.error
        state.currentRequestId = undefined
      }
    },
  },
})

const { reducer, actions } = moviesSlice
export const { clear } = actions

export default reducer
