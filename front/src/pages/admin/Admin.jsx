import { Container, Typography } from "@mui/material";
import StudentsTable from "./StudentsTable";

import Grid from "@mui/material/Grid";
function Admin({ students, handleClickDelete }) {
  return (
    <Container maxWidth="lg" sx={{ padding: " 20px 0" }}>
      <Typography variant="h3" gutterBottom>
        Students Info
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StudentsTable
            students={students}
            handleClickDelete={handleClickDelete}
          />
        </Grid>
        {/* <Grid item xs={4}>
         
        </Grid> */}
        {/* <Grid item xs={4}>
         
        </Grid>
        <Grid item xs={8}>
        
        </Grid> */}
      </Grid>
    </Container>
  );
}

export default Admin;
