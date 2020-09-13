import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { fetchMovies, clear } from '../redux/movies'
import { fade, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    height: searching => (searching ? '20vh' : 'inherit'),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  searches: {
    display: 'flex',
    flexDirection: 'column',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

const loadMovies = async (title, year, dispatch) => {
  try {
    dispatch(clear())
    // This particular dispatch returns a promise, but no need to 'await' for it here.
    // It is the redux thunk that awaits the API return, checks the status and populates the store
    dispatch(fetchMovies({ title, year }))
  } catch (error) {
    // I took the liberty to not be bothered with proper error handling
    console.error('Failed fetching Tax table! error:', error)
  }
}

export default function Bar() {
  const dispatch = useDispatch()
  const [searching, setSearching] = useState(false)
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')

  const openSearching = () => {
    if (!searching) setSearching(true)
  }

  const triggerSearch = ({ keyCode }) => {
    if (keyCode === 13) {
      loadMovies(title, year, dispatch)
    }
  }

  const classes = useStyles(searching)

  const updateTitle = ({ target: { value } }) => {
    setTitle(value)
  }
  const updateYear = ({ target: { value } }) => {
    setYear(value)
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            MOVIES
          </Typography>
          <div className={classes.search}>
            <div
              className={classes.search}
              onClick={openSearching}
              onKeyDown={triggerSearch}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Movie Title..."
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                value={title}
                onChange={updateTitle}
              />
            </div>
            {searching && (
              <div
                className={classes.search}
                onClick={openSearching}
                onKeyDown={triggerSearch}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Year (optional)..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  value={year}
                  onChange={updateYear}
                />
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
