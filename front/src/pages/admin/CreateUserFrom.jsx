import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

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

export default function CreateUserForm({ refresh, setRefresh }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // console.log(student.username, stdId);
  const info = {
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
  //   console.log(stdId);

  const handleSubmit = async (values) => {
    try {
      const { data } = await axios.post(
        "http://localhost:6600/signup",
        {
          ...values,
        },
        { withCredentials: true }
      );
      setRefresh(!refresh);

      console.log(data);
    } catch (error) {
      console.log(error);
    }finally{
        handleClose();
    }
  };
  return (
    <div>
      <Button variant="contained" fullWidth onClick={handleClickOpen}>
        create new user
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Student </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mt: 2, mb: 2 }}></DialogContentText>
          <Formik
            initialValues={info}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            // onSubmit={console.log(stdId)}
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
              >
                Add
              </Button>
            </Form>
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
