import { Container, Typography } from "@mui/material";
import Navbar from "./Navbar";

const DashboardPage = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="body">Dashboard</Typography>
      </Container>
    </>
  );
};
export default DashboardPage;
