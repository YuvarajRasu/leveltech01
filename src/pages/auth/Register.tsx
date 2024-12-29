import { Box, Button, Card, CardActions, CardContent, Checkbox, createTheme, FormControl, FormControlLabel, Grid2, InputAdornment, OutlinedInput, TextField, Typography } from "@mui/material"
import { grey } from "@mui/material/colors";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { imagePaths } from "../../config/imagePaths";
import * as Yup from "yup"
import { Form, Formik } from "formik";
import { useState } from "react";
import FormInput from "../../components/FormInput";
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FormInputOutlined from "../../components/FormInputOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/AuthService/authenticationApi";

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
    name: Yup.string().required("name required"),
    email: Yup.string().email("Invalid email format").required("Email required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Password must match").required("Confirm password is required")
})


const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const handleSubmit = (values:any) => {
    console.log(values)
}

const Register = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleIconClick = () => {
        setShowPassword(prev => !prev)
    }
   
    return (
        <Box component="div" className="login-background-image" sx={{ width: "100%", height: "100vh", bgcolor: "#fafafa"}} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Card sx={{ p: 2, width: { xs: "90%", md: "70%", lg: "60%" } }}>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ values, errors, touched, handleChange, handleBlur }) => (
                        <Form>
                            <CardContent>
                                <Grid2 container spacing={2}>
                                    <Grid2 size={6} px={{lg:3}}>
                                        <Typography variant="h4" sx={{ fontWeight: "bold" }}>Sign Up</Typography>
                                        <Box mt={3}>
                                            <FormInput
                                                name="name"
                                                type="text"
                                                id="name"
                                                value={values.name}
                                                onBlur={handleBlur}
                                                handleChange={handleChange}
                                                placeholder="Enter your name"
                                                label={"Name"}
                                                variant="standard"
                                                startInputIcon={<PersonIcon />}
                                                endInputIcon=""
                                                
                                            />
                                            <Typography sx={{ color: "#dd2c00" }}>
                                                {errors.name && touched.name && errors.name}
                                            </Typography>
                                        </Box>
                                        <Box mt={3}>
                                            <FormInput
                                                name="email"
                                                type="text"
                                                id="email"
                                                value={values.email}
                                                onBlur={handleBlur}
                                                handleChange={handleChange}
                                                placeholder="Enter your email"
                                                label={"Email"}
                                                variant="standard"
                                                startInputIcon={<MailIcon />}
                                                endInputIcon=""
                                            />
                                            <Typography sx={{ color: "#dd2c00" }}>
                                                {errors.email && touched.email && errors.email}
                                            </Typography>
                                        </Box>
                                        <Box mt={3}>
                                            <FormInput
                                                name="password"
                                                type={showPassword ?"text" : "password"}
                                                id="password"
                                                value={values.password}
                                                onBlur={handleBlur}
                                                handleChange={handleChange}
                                                placeholder="Create password"
                                                label={"Password"}
                                                variant="standard"
                                                startInputIcon={showPassword ? <VisibilityIcon/> : <VisibilityOffIcon />}
                                                endInputIcon={""}
                                                handleIconClick={handleIconClick}
                                            />
                                            <Typography sx={{ color: "#dd2c00" }}>
                                                {errors.password && touched.password && errors.password}
                                            </Typography>
                                        </Box>
                                        <Box mt={3}>
                                            <FormInput
                                                name="confirmPassword"
                                                type="password"
                                                id="confirmPassword"
                                                value={values.confirmPassword}
                                                onBlur={handleBlur}
                                                handleChange={handleChange}
                                                placeholder="Repeat your password"
                                                label={"Confirm password"}
                                                variant="standard"
                                                startInputIcon={""}
                                                endInputIcon={""}
                                            />
                                            <Typography sx={{ color: "#dd2c00" }}>
                                                {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                                            </Typography>
                                        </Box>
                                        <Box mt={3}>
                                            <FormControlLabel control={<Checkbox />} label="I agree all terms & conditions" />
                                        </Box>
                                        <Box mt={2}>
                                            <Button type="submit" variant="contained" sx={{ bgcolor: "red", width: "150px", py: 1 }}>Sign in</Button>
                                        </Box>
                                    </Grid2>
                                    <Grid2 size={6} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                        <Box>
                                            <Card sx={{ boxShadow: "none", bgcolor: "#fafafa", borderRadius: 4, py: 3 }}>
                                                <CardContent>
                                                    <Box textAlign={"center"}>
                                                        <Box component="img" src={imagePaths.level_tech_logo} sx={{ borderRadius: 4, height: 200, width: 150 }} />
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                            <Box sx={{ ml: {lg:4}, mt: 2 }}>Already have an account? <Link to="/login" className="custom-orange-color link-deccoration">Login</Link></Box>
                                        </Box>
                                    </Grid2>
                                </Grid2>

                            </CardContent>
                        </Form>
                    )}

                </Formik>
            </Card>
        </Box>
    )
}

export default Register