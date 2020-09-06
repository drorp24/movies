# Table of Contents

1. [What I did "by design"](#design)
2. [What I intentionally skipped](#skipped)
3. [What I would do in a real app](#real)

# What I did "by design" <a name="design">

## Saving API calls

- The results of the API calls are memoized by title and year.
  - This is evident by hitting the return key a couple of times and looking at the Network tab (no network calls). Search for another movie then go back and key the first one and again, no network call.
- As a simplistic way of cutting on API calls, the user in this version has to hit the 'return' key to trigger a call for the API, rather than get results after every character keyed in (for a real app see what I would do below).

## App layout

- The Title and Year search fields are on the AppBar rather than on a separate page or box. That's because I believe users perfer seeing the list change in front of their eyes
  as they type - rather than having to switch back and forth between a separate search page and the results page.
- A separate page with multiple search criteria could eventually be added for those who do require a more advanced search (like in LinkedIn you have the simple search vs. the advanced search that resides on a separate page).

## The use of redux

- I used redux to have 'Bar' trigger the API and 'Movies' to be able to access the returned records.
- I could alternatively "lift up" that common state into App. The reason I chose not to do so is that, in a real app, there would eventually be more components which would need access to this common movies data.
  One such example is a component showing the details of one selected movie, that I didn't implement.
  So passing props didn't seem like the right way of sharing that common data.

## Styling

- I chose to use material-ui to save myself from inventing some wheels, and to leverage their default theme with its default breakpoints, fade function and so on.

# What I intentionally skipped <a name="skipped">

## Mobile layout

- While the app is responsive enough for every device, the layout is heavily mobile-influenced. For instance, in a real app, the upper AppBar would probably not stretch the entire width of the screen when viewed on desktop.
- To save time there was no use of media queries, and the images do not fit themselves to the device' dimensions.

## Error handling

- Out of time considerations, I took the liberty to not always do the proper error handling a real app would require. For instance I settle for console.error instead of returning a rejected promise.
- Wrapping the App with ErrorBoundary is the least I could do.

## Testing

- For time's sake, no tests are included.

## Input validation

- No input validation for the same reason (try keying-in alphanumerics in the year field and it would be happily accepted, yielding the last query result).
- No 'X' to clear the input either.

# What I would do in a real app <a name="real">

If this app ever goes into production, I believe it should include as a minimum:

## Performance improvements

- API control - throttling of requests, control over the quantity of records requested etc
- Cursor-based paging, automatically fetched when the user is about to scroll over the last displayed records (aka "endless scrolling")
- Lazy loading of those heavy movie posters (not fetching an image unless the user is scrolling into it)
- Server-rendered first page with no CSS blocking or custom fonts

## UX improvements

- Search-as-you-type (character by character) using:
  - some throttling to protect against API quota breach
  - React concurrency mode (when available), to protect against keyboard/render competition
- Input autocomplete (for already-typed search terms and movies in the cache)
- Offline support (notification of connection loss and return, data recovery while offline etc), using:
  - serviceworker, to cache and persist code and asset files on the local device
  - either redux-persist or apollo client to cache and persist API data on the local device
- The rest of the PWA features, namely
  - connecting over https
  - using manifest file for splash screen, icons and theme colors,
  - installation prompts (both native and home-made),
  - meta tags for iOS
- Better layout, particularly
  - Desktop- and tablet-friendly layouts (using media queries or css grid)
  - dynamic posters' dimensions to better fill the device' entire viewport
  - a fixed bar showing the user what query he/she has made
  - tile vs. list display (as in zap and some dating apps)
- Better display, especially
  - using a theme across the app
  - enabling the user to toggle b/w light and dark mode

## Content improvements

- More content, such as
  - movie details (when clicked)
  - other queries the OMDB API enables (e.g. category)
  - any other detail that would make the app more useful and engaging (from IMDB perhaps)
