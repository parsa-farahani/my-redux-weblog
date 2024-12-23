# Fetch Data by createAsyncThunk (inside Slice) + entityAdapter(to keep state normalized)
- in this branch, the async operations (users, posts) are handled inside 'Slices', using 'createAsyncThunk'

- Note:  the showing 'visual states' (pending/fulfilled/rejected) is done:
   + for 'posts', in their 'state.status' logic & extra-reducers -> UI gets the 'status' by Selector
   + for 'users', in UI by 'states'