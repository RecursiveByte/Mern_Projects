import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const changerSlice = createSlice({
  name: 'changer',
  initialState,
  reducers: {
    changer: (state) => {
      if (state.value == 'y')
                  state.value='n';
      else if(state.value == 'n')
              state.value = 'y';
          else 
            state.value='y';
    }
  }
})

export const { changer } = changerSlice.actions

export default changerSlice.reducer