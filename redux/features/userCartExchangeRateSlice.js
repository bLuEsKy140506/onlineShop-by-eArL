import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchExchangeRate = createAsyncThunk(
  "fetchExchangeRate",
  async (id) => {
    const res = await fetch(
      `https://onlineshopbyearl-git-master-bluesky140506.vercel.app/api/userss/${id}/cart`
    );
    return res.json();
  }
);

const initialState = { name: "USD", rate: 1.057692 };
//THIS DATA IS STATIC BECAUSE THE API HAS LIMITED USAGE/CONSUMPTION FOR FREE USERS
//SO I DECIDED TO TAKE THE LATEST DATA THEN MANUALLY INPUT HERE
/*
  {
  "success": true,
  "timestamp": 1695996184,
  "base": "EUR",
  "date": "2023-09-29",
  "rates": {
    "USD": 1.057692,
    "AUD": 1.635395,
    "CAD": 1.425806,
    "PLN": 4.624794,
    "MXN": 18.378749,
    "PHP": 59.828868
  }
}
*/
///http://data.fixer.io/api/latest?access_key=705ba7415f31dde1c5a4e82c1bc453e9&symbols=USD,AUD,CAD,PLN,MXN,PHP&format=1

export const exchangeValue = createSlice({
  name: "exchangeValue",
  initialState: initialState,
  reducers: {
    changeRate(state, action) {
      state = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExchangeRate.fulfilled, (state, action) => {
      if (action.payload.length === 0) {
        return state;
      } else {
        state = action.payload[0].currency;
        return state;
      }
    });
  },
});

export const { changeRate } = exchangeValue.actions;
export default exchangeValue.reducer;
