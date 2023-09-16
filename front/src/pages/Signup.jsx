import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { Alert } from "@mui/material";
const defaultTheme = createTheme();

const validationSchema = Yup.object().shape({
  username: Yup.string().min(8, "Too Short!").required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must meet the criteria"
    )
    .required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function SignUp() {
  // const handleSubmit = (values, { resetForm }) => {
  //   console.log(values);
  //   // event.preventDefault();
  //   resetForm();
  // };
  const navigate = useNavigate();

  const [error, setError] = React.useState({
    status: false,
    msg: "",
  });
  const [show, setShow] = React.useState(false);

  const handleSubmit = async (values) => {
    try {
      const { data } = await axios.post(
        "http://localhost:6600/signup",
        {
          ...values,
        },
        { withCredentials: true }
      );
      setShow(true);
      console.log(data);
      const { success, message } = data;
      if (success) {
        setError({ status: false, msg: message });
        localStorage.setItem("token", true);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setError({ status: true, msg: message });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              repeatPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            sx={{ mt: 10, mb: 2 }}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="username"
                    label="Username"
                    fullWidth
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    style={{ color: "red" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field as={TextField} name="email" label="Email" fullWidth />
                  <ErrorMessage
                    name="email"
                    component="div"
                    style={{ color: "red" }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="password"
                    label="password"
                    type="password"
                    fullWidth
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    style={{ color: "red" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="repeatPassword"
                    label="Repeat Password"
                    type="password"
                    fullWidth
                  />
                  <ErrorMessage
                    name="repeatPassword"
                    component="div"
                    style={{ color: "red" }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={show}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Form>
          </Formik>
          {error.status
            ? show && <Alert severity="error">{error.msg}</Alert>
            : show && <Alert severity="success">{error.msg}</Alert>}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
