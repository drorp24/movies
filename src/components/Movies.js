import React from 'react'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import Progress from './Progress'
import Movie from './Movie'
import Empty from './Empty'

const Movies = () => {
  const movies = useSelector(store => store.movies.entities)

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
  }))
  const classes = useStyles()

  if (!movies) return <Progress />
  if (!movies.length) return <Empty />
  return (
    <div className={classes.root}>
      {movies.map(movie => (
        <Movie key={movie.imdbID} movie={movie} />
      ))}
    </div>
  )
}

export default Movies
