import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";

const validationSchema = Yup.object().shape({
  name: Yup.string().min(4, "Too Short!").required("subject name is required"),
  mark: Yup.string().max(2, "too long must be 2").required("mark is required"),
});

function CreateNewSubject({ refresh, setRefresh }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const info = {
    name: "",
    mark: "",
  };
  const handleSubmit = async (values) => {
    try {
      const { data } = await axios.post(
        "http://localhost:6600/createSubject",
        {
          ...values,
        },
        { withCredentials: true }
      );
      //   setRefresh(!refresh);

      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
    }
  };
  return (
    <div>
      <Button variant="contained" fullWidth onClick={handleClickOpen}>
        create new subject
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New subject </DialogTitle>
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
                    name="name"
                    label="Subject Name"
                    fullWidth
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    style={{ color: "red" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="mark"
                    label="Minimum Mark For Success"
                    fullWidth
                  />
                  <ErrorMessage
                    name="mark"
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

export default CreateNewSubject;
