import { Home } from '@mui/icons-material'
import { createTheme, ThemeProvider } from '@mui/material'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import AppLayout from './AppLayout'
import ForgetPassword from './pages/auth/ForgetPassword'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import CustomerList from './pages/Customer/CustomerList'
import AddProduct from './pages/Products/AddProduct'
import EditMasterProduct from './pages/Products/EditMasterProduct'
import Products from './pages/Products/Products'
import Profile from './pages/Profile/Profile'
import AddPurchase from './pages/Purchases/AddPurchase'
import EditPurchase from './pages/Purchases/EditPurchase'
import Purchase from './pages/Purchases/Purchase'
import AddSale from './pages/Sales/AddSale'
import Sales from './pages/Sales/Sales'
import Stocks from './pages/Stocks/Stocks'
import Dashboard from './pages/ui/Dashboard'
import VendorList from './pages/Vendor/VendorList'

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
          children: [
            {
              index:true,
              element: <Sales />
            },
            {
              path:"new-sale",
              element:<AddSale />
            },
          ]
        },
        {
          path:"stock",
          children: [
            {
              index:true,
              element: <Stocks />
            },
          ]
        },
        {
          path:"vendor",
          children: [
            {
              index:true,
              element: <VendorList />
            }
          ]
        },
        {
          path:"customer",
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
