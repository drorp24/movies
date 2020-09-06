# Table of Contents

1. [What I skipped](#errors)
2. [What I did "by design"](#design)
3. [What I would do in a real app](#real)

# What I skipped

## Error handling <a name="errors">

Due to the time constraint, I took the liberty to skip proper error handling,
but wrapping it all with ErrorBoundary is the least I could do.

## Testing

For the same reason, no tests are included.

## Input validation

No input validation either:
key in alphanumerics in the year and you would get the last query result...

No 'X' to clear the input either.

# What I did "by design" <a name="design">

## Styling

- I chose to use material-ui to for some common components to save myself from inventing some wheels and leverage their default theme with breakpoints, fade function etc##

## Saving API calls

- The results of the API calls are memoized by title and year, as is evident if you hit the return key multiple times and seeing no network call ib the DevTools' Network tab. Search for another movie then return to the original one - and there's no network call.

- As an even simpler way to cut on API calls, the user in this version has to hit the 'return' key to trigger a call for the API. Of course, search-as-you-type is friendlier, and in a real app there would be other measures taken to enable that friendliness without compromising the API quota (such as calling the API every x charcters, using serviceworker and/or otehr forms of caching etc).

## App layout

- The Title and Year search fields are on the AppBar rather than on separate page or box. That's by design.
  It's because I believe users would likely want to have the list change in front of their eyes
  as they type - without having to switch back and forth between a separate search page and the results page.

- A separate page with multiple search terms could eventually be added for those who do require a more advanced search (like in LinkedIn you have the simple search on the main page and the advanced search on a separate page).

- To save time, layout is quite mobile-biased.
  For instance, in a real app, the upper AppBar would not stretch the entire width of the screen.

## The use of redux

I used redux to have 'Bar' trigger the API and 'Movies' to be able to access to the returned records.
I could of course alternatively "lift up" that common state into App but I didn't want to.
That's because in a real app, there would eventually be more components which would need access to the movies
(as one example, the component showing the details of one selected movie, that I didn't implement).
So passing props didn't seem the right way of doing that.

# What I would do in a real app <a name="real">

The list goes on and on, but at the very minimum, a real app in my mind would require:

- Cursor-based paging, automatically fetched when the user is about to encounter the last displayed records while scrolling (i.e., "cursor-based paging" + "endless scrolling")
- Lazy loading of those heavy movie posters (why fetch if the user has not scrolled to that movie)
- Input autocomplete - for both the already-typed search terms as well as the fetched movies themselves
- Offline support through both:
  a. serviceworker activation (unregister -> resgiter)
  b. using redux-persist to reload device-persisted results if existent - when going offline or after page reload
- Movie details (when clicked)
- Other queries the API enables (e.g. category)
- Desktop- and tablet-friendly layouts (using media queries or css grid)
- Either keeping the upper AppBar fixed or having some other fixed banner so the user can always view the search criteria.
- More dynamic layout (changing the posters' dimensions to better fill the device' entire viewport )
- tile vs. list display (as in zap and some dating apps)
- light/dark mode (very easy with material-ui)
