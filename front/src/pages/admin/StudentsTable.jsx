import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import EmailUsernameUpdateDialog from "./FormDialog";
import { useState } from "react";
import FormDialog from "./FormDialog";
import Swal from "sweetalert2";
import axios from "axios";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function StudentsTable({
  students,
  handleClickDelete,
  refresh,
  setRefresh,
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // function handleClickDelete(id) {
  //   Swal.fire({
  //     title: "Are you sure to delete this user?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire("Deleted!", "User has been deleted.", "success");
  //       axios
  //         .delete(`http://localhost:6600/deleteuser/${id}`)
  //         .then((response) => {
  //           console.log(response.data);
  //         })

  //         .catch((error) => console.log(error.message));
  //     }
  //   });
  // }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Username</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Is Active</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.length === 0 ? (
            <StyledTableRow>
              <StyledTableCell>There Are No Students Yet</StyledTableCell>
            </StyledTableRow>
          ) : (
            students
              .filter((student) => student.role !== "admin")
              .map((student) => (
                <StyledTableRow key={student._id}>
                  <StyledTableCell component="th" scope="row">
                    {student.username}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {student.email}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {student.isActive ? "🟢 Yes" : "🔴 No"}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Stack
                      direction={{ xs: "column", sm: "row-reverse" }}
                      spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                      <FormDialog
                        handleClickOpen={handleClickOpen}
                        handleClose={handleClose}
                        open={open}
                        stdId={student._id}
                        student={student}
                        refresh={refresh}
                        setRefresh={setRefresh}
                      />

                      <Button
                        style={{
                          marginRight: "8px",
                        }}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleClickDelete(student._id)}
                      >
                        Delete
                      </Button>
                    </Stack>{" "}
                  </StyledTableCell>
                </StyledTableRow>
              ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
