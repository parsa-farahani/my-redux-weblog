# Fetch Data by RTK-Query (inside apiSlice) + entityAdapter(to keep cached-data normalized)

-  in this branch, the async operations (users, posts) are handled inside 'apiSlice.js', using 'RTK-Query'

-  Note: the showing 'visual states' (pending/fulfilled/rejected) is done:
   -  for 'fetchposts/fetchUsers', in their 'posts/usersSlice' file, using 'matchPending/fulfilled/rejected' & extra-reducers -> UI gets the 'status' by Selector
   -  for 'other CRUD operations' (POST, PUT, DELETE, and GET one single-data), I used 'useHookQuery/Mutation' of RTK-Query (data, isLoading, isFetching, isScucess, isError, error, reftch, ...)
