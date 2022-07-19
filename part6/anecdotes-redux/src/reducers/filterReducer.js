import { createSlice } from '@reduxjs/toolkit'

const filterReducer = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    applyFilter(state, action) {
      return state = action.payload
    }
  }
})

export const { applyFilter } = filterReducer.actions
export default filterReducer.reducer 