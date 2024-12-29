import { Box, Button, Card, CardActions, CardContent, createTheme, FormControl, InputAdornment, OutlinedInput, Typography } from "@mui/material"
import { grey } from "@mui/material/colors";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { imagePaths } from "../../config/imagePaths";
import * as Yup from "yup"
import { Form, Formik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForgetPasswordMutation, useLoginMutation } from "../../features/AuthService/authenticationApi";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[400],
    },
    secondary: {
      main: '#f44336',
    },
  },
});

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email required"),
//   password: Yup.string().required("Password required")
})


const initialValues = {
  email: "",
//   password: ""
}

const ForgetPassword = () => {
//   const [showPassword, setShowPassword] = useState<boolean>(false)
//   const [login, { isLoading }] = useLoginMutation();
const [forgotPassword, data] = useForgetPasswordMutation()
  const navigate = useNavigate();

  const handleFormSubmit = async (values: any) => {
    try {
      const { data } = await forgotPassword(values);
      console.log(data);
      await toast.success(data.message)
      await navigate("/login")
      

      
    } catch (error) {
      const errorMsg = error?.data?.message || 'Something went wrong. Please try again.';
      toast.error(errorMsg);
    }
  }
  return (
    <Box component="div" className="login-background-image" sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Card sx={{ p: 2, width: { xs: "90%", sm: "60%", lg: "30%" } }}>
        <Box display={"flex"} justifyContent={"end"}>
      <Button variant="contained" size="small" onClick={() => navigate("/login")}><KeyboardArrowLeftIcon sx={{color:"#fff"}}/>back</Button>
        </Box>
        <Box textAlign={"center"}>
          <Box component="img" src={imagePaths.level_tech_logo} sx={{ borderRadius: 3, height: "80px" }} />
        </Box>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleFormSubmit}>
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <CardContent>
                <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center" }}>Forget Password</Typography>
                <Typography sx={{ textAlign: "center", my: 2 }} color={theme.palette.primary.main}>Please enter your email in the below</Typography>
                <Box display={"flex"} justifyContent={"center"}>
                  <FormControl sx={{ my: 1, mx: 3, width: '35ch' }} variant="outlined">
                    <label id="email">Email :</label>
                    <OutlinedInput
                      name="email"
                      type="text"
                      id="email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <Typography sx={{ color: "#dd2c00" }}>
                      {errors.email && touched.email && errors.email}
                    </Typography>
                <Button type="submit" variant="contained" sx={{ bgcolor: "red", width: "100%", mt:3 }}>Submit</Button>
                  </FormControl>
                </Box>
               
                {/* <Box display={"flex"} justifyContent={"center"}>
                  <FormControl sx={{ my: 1, mx: 3, width: '35ch' }} variant="outlined">
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <label id="password">Password :</label>
                      <Box sx={{ color: "grey", fontSize: 14, cursor: "pointer" }}><Link to="/forget-password" className="custom-orange-color link-deccoration">Forgot password ?</Link></Box>
                    </Box>
                    <OutlinedInput
                      name="password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={values.password}
                      endAdornment={<InputAdornment position="end" sx={{ cursor: "pointer" }}>{showPassword ? <VisibilityIcon onClick={() => setShowPassword(false)} /> : <VisibilityOffIcon onClick={() => setShowPassword(true)} />}</InputAdornment>}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />

                    <Typography sx={{ color: "#dd2c00" }}>{errors.password && touched.password && errors.password}</Typography>
                    <Box sx={{ textAlign: "end", mt: 3 }}>
                      <Button type="submit" variant="contained" sx={{ bgcolor: "red", width: "100px" }}>{isLoading ? 'Logging in...' : 'Login'}</Button>
                    </Box>
                    <Box sx={{textAlign:"center", mt: 2 }}>Don't have an account yet? <Link to="/register" className="custom-orange-color link-deccoration">Register</Link>
                    </Box>
                  </FormControl>
                </Box> */}
               
              </CardContent>
            </Form>
          )}

        </Formik>
      </Card>
    </Box>
  )
}

export default ForgetPassword