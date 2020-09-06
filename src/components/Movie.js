import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: { margin: '1em' },
  title: {
    fontSize: '1.2em',
    textAlign: 'center',
  },
  year: {
    fontSize: '1em',
  },
  media: {
    height: '500px',
    width: '300px',
  },
  cardContent: {
    width: '332px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
})

const Movie = ({ movie }) => {
  const classes = useStyles()
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.cardContent}>
        <CardMedia
          className={classes.media}
          image={movie.Poster}
          title={movie.Title}
        />
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          {movie.Title}
        </Typography>
        <Typography className={classes.year} color="textSecondary" gutterBottom>
          {movie.Year}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default Movie
