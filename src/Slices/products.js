import { createSlice  } from "@reduxjs/toolkit";

export const initialState = {
    products:[],
    filteredProducts:[],
    favorites: [],
    selectedProduct: null,
}


export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProducts : (state, action)=> {
            state.products = action.payload;
            state.filteredProducts = action.payload
            // console.log(state.products)
        },
        toggleFavorite: (state, action) => {
            const productId = action.payload;
            
            if (state.favorites.includes(productId)) {
              state.favorites = state.favorites.filter(id => id !== productId);
            } else {
              if (state.favorites.length < 5) {
                state.favorites.push(productId);
              }
              else{
                alert('You can add maximum 5 as favorites');
              }
            }
          },
          selectProduct: (state, action) => {
            state.selectedProduct = action.payload;
            console.log(action.payload)
          },

          filterProducts:(state , action) =>{
            const searchText = action.payload.toLowerCase();
            console.log(action.payload)
            if (searchText.length < 1) {
                state.filteredProducts = state.products; // Reset to all products when search text is empty
              } else {
                state.filteredProducts = state.products.filter(
                  (product) =>
                    product.title.toLowerCase().includes(searchText) 
                );
              }
          }
    }
}) 


export const {addProducts , selectProduct , toggleFavorite , filterProducts} = productSlice.actions;

export default productSlice.reducer;