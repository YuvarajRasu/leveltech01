import { configureStore } from '@reduxjs/toolkit'

import { setupListeners } from '@reduxjs/toolkit/query'
import { authenticationApi } from '../features/AuthService/authenticationApi'
import { masterProductsApi } from '../features/MasterProductService/MasterProductApi'
import { categoryApi } from '../features/CategoryService/CategoryApi'
import { productApi } from '../features/ProductService/ProductApi'
import { modelApi } from '../features/ModelApi/ModelApi'
import { purchaseApi } from '../features/PruchaseApi/PurchaseApi'
import { stateApi } from '../features/State/StateApi'
import { vendorApi } from '../features/VendorService/vendorApi'
import { salesApi } from '../features/salesService/SalesApi'
import { customerApi } from '../features/CustomerService.ts/customerApi'
import { stockApi } from '../features/StockService/StockApi'

export const store = configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      [authenticationApi.reducerPath]: authenticationApi.reducer,
      [masterProductsApi.reducerPath]: masterProductsApi.reducer,
      [categoryApi.reducerPath]: categoryApi.reducer,
      [productApi.reducerPath]: productApi.reducer,
      [modelApi.reducerPath]: modelApi.reducer,
      [purchaseApi.reducerPath]: purchaseApi.reducer,
      [stateApi.reducerPath]: stateApi.reducer,
      [vendorApi.reducerPath]: vendorApi.reducer,
      [salesApi.reducerPath]: salesApi.reducer,
      [customerApi.reducerPath]: customerApi.reducer,
      [stockApi.reducerPath]: stockApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authenticationApi.middleware).concat(masterProductsApi.middleware).concat(categoryApi.middleware).concat(productApi.middleware).concat(modelApi.middleware).concat(purchaseApi.middleware).concat(stateApi.middleware).concat(vendorApi.middleware).concat(salesApi.middleware).concat(customerApi.middleware).concat(stockApi.middleware),
  })

  // optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
  setupListeners(store.dispatch)