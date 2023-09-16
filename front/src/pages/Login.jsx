import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Alert } from "@mui/material";
const defaultTheme = createTheme();

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});
export default function Login() {
  const navigate = useNavigate();

  const [error, setError] = React.useState({
    status: false,
    msg: "",
  });
  const [show, setShow] = React.useState(false);

  const handleSubmit = async (values) => {
    try {
      const { data } = await axios.post(
        "http://localhost:6600/login",
        {
          ...values,
        },
        { withCredentials: true }
      );
      setShow(true);
      const { success, message, role, id } = data;
      console.log(data);

      if (success) {
        setError({ status: false, msg: message });
        localStorage.setItem("token", true);
        setTimeout(() => {
          role === "user" ? navigate(`/${id}`) : navigate("/admin");
        }, 1000);
      } else {
        setError({ status: true, msg: message });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setShow(false);
      }, 3000);
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
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Sign in
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            sx={{ mt: 10, mb: 2 }}
          >
            <Form>
              <Grid container spacing={2}>
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
                    type="password"
                    name="password"
                    label="Password"
                    fullWidth
                  />
                  <ErrorMessage
                    name="password"
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
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
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
