# Fetch Data Thunks (inside Slice)
- in this branch, the async operations (users, posts) are handled inside 'Slices', using 'plain Thunks'

- Note:  the showing 'visual states' (pending/fulfilled/rejected) is done:
   + for 'posts', in their 'state.status' logic & reducers -> UI gets the 'status' by Selector
   + for 'users', in UI by 'states'