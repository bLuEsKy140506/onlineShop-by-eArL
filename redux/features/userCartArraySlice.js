import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCartArray = createAsyncThunk("fetchCartArray", async (id) => {
  const res = await fetch(
    `https://onlineshopbyearl-bluesky140506.vercel.app/api/userss/${id}/cart`,
    {
      cache: "no-store",
      mode: "no-cors",
    }
  );
  let response = res.json();
  return response;
});
/*
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

const initialRate = { name: "USD", rate: 1.057692 };
const initialState = [];
export const cartArray = createSlice({
  name: "cartArray",
  initialState: initialState,
  reducers: {
    changeArray(state, action) {
      state = action.payload;
      return state;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCartArray.fulfilled, (state, action) => {
      let temp = JSON.parse(localStorage.getItem("cartNotLogIn")); //isolated storage of users PC

      //most frequent scenario --- have data in the database and no data in local
      //next frequent scenario --- have data in the database and have data in local
      //least frequent scenario --- have no data in the database and have data in local

      if (action.payload[0] !== undefined && temp === null) {
        state = action.payload[0];
        return state;
      } else if (temp !== null && action.payload[0] !== undefined) {
        let merged = temp.concat(action.payload[0].items);

        const uniqueObjects = {};
        merged.forEach((obj) => {
          // Use 'id' as the unique key
          const id = obj.title;
          if (uniqueObjects[id]) {
            // If the object already exists, add the values
            uniqueObjects[id].quantity += obj.quantity;
          } else {
            // If the object doesn't exist, create a new one
            uniqueObjects[id] = { ...obj };
          }
        });

        const resultArray = Object.values(uniqueObjects);

        fetch(
          `https://onlineshopbyearl-bluesky140506.vercel.app/api/cart/${action.payload[0]._id.toString()}`,
          {
            method: "PUT",
            body: JSON.stringify({
              creator: action.payload[0].creator._id.toString(),
              items: resultArray,
              currency: action.payload[0].currency,
            }),
          }
        );

        state = [
          {
            _id: action.payload[0].creator._id.toString(),
            items: resultArray,
            currency: action.payload[0].currency,
          },
        ];
        localStorage.removeItem("cartNotLogIn");
        return state;
      } else if (temp !== null && action.payload[0] === undefined) {
        fetch(
          "https://onlineshopbyearl-bluesky140506.vercel.app/api/cart/new",
          {
            method: "POST",
            body: JSON.stringify({
              userId: action.meta.arg.toString(),
              items: temp,
              currency: initialRate,
            }),
          }
        );
        state = [
          {
            creator: action.meta.arg.toString(),
            items: temp,
            currency: {
              name: "USD",
              currency: initialRate,
            },
          },
        ];
        localStorage.removeItem("cartNotLogIn");
        return state;
      }
    });
  },
});

export const { changeArray } = cartArray.actions;
export default cartArray.reducer;
