import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import {
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";

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
function Home({ students }) {
  const [cookies, removeCookie] = useCookies([]);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate]);

  const studentInfo = students.filter((student) => student._id === id);
  const student = studentInfo[0];
  console.log(student);

  return (
    <Container maxWidth="lg" sx={{ padding: " 20px 0" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Student Info
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
              <TableHead style={{ backgroundColor: "black" }}>
                <TableRow>
                  <TableCell style={{ color: "white" }}>Username</TableCell>
                  <TableCell style={{ color: "white" }}>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{student?.username}</TableCell>
                  <TableCell align="left">{student?.email}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Student Subject
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
              <TableHead style={{ backgroundColor: "black" }}>
                <TableRow>
                  <TableCell style={{ color: "white" }}>Subject Name</TableCell>
                  <TableCell style={{ color: "white" }}>Pass Mark</TableCell>
                  <TableCell style={{ color: "white" }}>
                    Obtained Mark
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">Math</TableCell>
                  <TableCell align="left">40</TableCell>
                  <TableCell align="left">-----</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
