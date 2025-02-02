import { createSlice } from '@reduxjs/toolkit';
import { Asset } from 'expo-asset';

const sampleProducts = [
  {
    id: '1',
    name: 'Wagyu steak medallions',
    price: 299.99,
    category: ['Beef'],
    image: Asset.fromModule(require('../assets/images/1.png')).uri,
  },
  {
    id: '2',
    name: 'Prime steak',
    price: 249.99,
    category: ['Fish'],
    image: Asset.fromModule(require('../assets/images/2.png')).uri,
  },
  {
    id: '3',
    name: 'Grilled salmon fillet',
    price: 199.99,
    category: ['Fish'],
    image: Asset.fromModule(require('../assets/images/3.png')).uri,
  },
  {
    id: '4',
    name: 'Chicken breast',
    price: 149.99,
    category: ['Poultry'],
    image: Asset.fromModule(require('../assets/images/4.png')).uri,
  },
  {
    id: '5',
    name: 'Roast pork loin',
    price: 179.99,
    category: ['Pork'],
    image: Asset.fromModule(require('../assets/images/5.png')).uri,
  },
  {
    id: '6',
    name: 'T-bone steak',
    price: 229.99,
    category: ['Beef'],
    image: Asset.fromModule(require('../assets/images/6.png')).uri,
  },
];

const initialState = {
  items: Array.from({ length: 40 }, (_, i) => ({
    ...sampleProducts[i % sampleProducts.length],
    id: `${i + 1}`,
  })),
  selectedCategories: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleCategory: (state, action) => {
      const category = action.payload;
      if (state.selectedCategories.includes(category)) {
        state.selectedCategories = state.selectedCategories.filter(c => c !== category);
      } else {
        state.selectedCategories.push(category);
      }
    },
    clearCategories: (state) => {
      state.selectedCategories = [];
    },
  },
});

export const { toggleCategory, clearCategories } = productsSlice.actions;
export default productsSlice.reducer;