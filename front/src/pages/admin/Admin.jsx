import { Button, Container, Typography } from "@mui/material";
import StudentsTable from "./StudentsTable";
import { useCookies } from "react-cookie";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CreateUserForm from "./CreateUserFrom";
import CreateNewSubject from "./CreateNewSubject";
import AssignSubject from "./AssignSubject";
function Admin({ students, subjects, handleClickDelete, refresh, setRefresh }) {
  const [cookies, removeCookie] = useCookies([]);
  const navigate = useNavigate();
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate]);
  return (
    <Container maxWidth="lg" sx={{ padding: " 20px 0" }}>
      <Grid container spacing={2}>
        <Grid container style={{ margin: "0 20px" }} spacing={2} xs={12}>
          <Grid item xs={3}>
            <CreateUserForm refresh={refresh} setRefresh={setRefresh} />
          </Grid>
          <Grid item xs={3}>
            <CreateNewSubject refresh={refresh} setRefresh={setRefresh} />
          </Grid>
          <Grid item xs={3}>
            <AssignSubject students={students} subjects={subjects} />
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" fullWidth>
              Set Mark
            </Button>{" "}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Students Info
          </Typography>
          <StudentsTable
            students={students}
            handleClickDelete={handleClickDelete}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </Grid>

        {/* <Grid item xs={4}>
         
        </Grid>
        <Grid item xs={8}>
        
        </Grid> */}
      </Grid>
    </Container>
  );
}

export default Admin;
