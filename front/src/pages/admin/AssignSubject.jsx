import {
  Box,
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
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

function AssignSubject({ students, subjects }) {
  const [open, setOpen] = useState(false);

  const [student, setStudent] = useState("");
  const [subject, setSubject] = useState("");

  function handleChangeStudent(e) {
    setStudent(e.target.value);
  }
  function handleChangeSubject(e) {
    setSubject(e.target.value);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log("student", student);
    console.log("subject", subject);
    handleClose();
    setStudent("");
    setSubject("");
  }

  const filterdStudents = students.filter((std) => std.role !== "admin");
  // console.log(student.username, stdId);
  return (
    <div>
      <Button variant="contained" fullWidth onClick={handleClickOpen}>
        Assign Subject
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Assign Subject to Student </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mt: 2, mb: 2 }}></DialogContentText>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <Box sx={{ minWidth: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Subject
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={subject}
                      label="Age"
                      onChange={handleChangeSubject}
                    >
                      {subjects.map((subject) => (
                        <MenuItem key={subject._id} value={subject._id}>
                          {subject.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ minWidth: 200 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Student
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={student}
                      label="Age"
                      onChange={handleChangeStudent}
                    >
                      {filterdStudents.map((std) => (
                        <MenuItem key={std._id} value={std._id}>
                          {std.username}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
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
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AssignSubject;
