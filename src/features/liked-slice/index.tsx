import {IProduct} from "@/types/product";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IInitialState {
  data?: IProduct[];
  liked: Set<string>;
}

const initialState: IInitialState = {
  data: [],
  liked: new Set(),
};

const likedProductsSlice = createSlice({
  name: "liked",
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<IProduct>) => {
      const product = action.payload;

      if (state.liked.has(product._id)) {
        state.liked.delete(product._id);
        state.data = state.data?.filter((item) => item._id !== product._id);
      } else {
        state.liked.add(product._id);
        state.data?.push(product);
      }
    },
    setLikedProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.data = action.payload;
      const productIds = action.payload.map((product) => product._id);
      state.liked = new Set(productIds);
    },
  },
});

export const {toggleLike, setLikedProducts} = likedProductsSlice.actions;
export default likedProductsSlice.reducer;
