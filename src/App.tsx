import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AppLayout from './AppLayout'
import { Home } from '@mui/icons-material'
import Dashboard from './pages/ui/Dashboard'
import Profile from './pages/Profile/Profile'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductsList from './pages/Products/ProductsList'
import Products from './pages/Products/Products'
import ForgetPassword from './pages/auth/ForgetPassword'
import Purchase from './pages/Purchases/Purchase'
import EditMasterProduct from './pages/Products/EditMasterProduct'
import AddProduct from './pages/Products/AddProduct'
import AddPurchase from './pages/Purchases/AddPurchase'
import Sales from './pages/Sales/Sales'
import { createTheme, ThemeProvider } from '@mui/material'
import AddSale from './pages/Sales/AddSale'
import VendorList from './pages/Vendor/VendorList'
import CustomerList from './pages/Customer/CustomerList'
import Stocks from './pages/Stocks/Stocks'
import EditPurchase from './pages/Purchases/EditPurchase'

function App() {

  const router = createBrowserRouter([
    {
      path: "login",
      element: <Login />
    },
    {
      path: "register",
      element: <Register />
    },
    {
      path:"forget-password",
      element:<ForgetPassword/>
    },
    {
      path: "profile",
      element: <Profile />
    },
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <>Error page</>,
      children: [
        {
          index: true,
          element: <Dashboard />
        },
        {
          path: "home",
          element: <Home />
        },
        {
          path:"purchases",
          // element:<Purchase/>,
          children:[
            {
              index:true,
              element:<Purchase/>
            },
            {
              path:"new-purchase",
              element:<AddPurchase/>
            },
            {
              path:"edit/:id",
              element:<EditPurchase />
            }
          ]
        },
        {
          path:"products",
          // element:<Products/>,
          children: [
            {
              index:true,
              element: <Products/>
            },
            {
              path:"new-product",
              element:<AddProduct/>
            },
            {
              path:"edit/:id",
              element:<EditMasterProduct />
            }
          ]
        },
        {
          path:"sales",
          // element:<Products/>,
          children: [
            {
              index:true,
              element: <Sales />
            },
            {
              path:"new-sale",
              element:<AddSale />
            },
            // {
            //   path:"edit/:id",
            //   element:<EditMasterProduct />
            // }
          ]
        },
        {
          path:"stock",
          // element:<Products/>,
          children: [
            {
              index:true,
              element: <Stocks />
            },
            // {
            //   path:"new-sale",
            //   element:<AddSale />
            // },
            // {
            //   path:"edit/:id",
            //   element:<EditMasterProduct />
            // }
          ]
        },
        {
          path:"vendor",
          // element:<Products/>,
          children: [
            {
              index:true,
              element: <VendorList />
            }
          ]
        },
        {
          path:"customer",
          // element:<Products/>,
          children: [
            {
              index:true,
              element: <CustomerList />
            }
          ]
        }
      ]
    },
    {
      path: "*",
      element: <Navigate to="/login" /> 
    }
  ])

  const theme = createTheme({
    // Your theme configuration here
  });

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
