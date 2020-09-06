import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
}))

export default function Empty() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      Nothing here! <br /> Click the search bar to find your movie!
    </div>
  )
}
