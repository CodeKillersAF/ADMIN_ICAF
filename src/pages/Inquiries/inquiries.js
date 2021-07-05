import React , { useEffect , useState } from "react";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 610,
  },
}));
export default function Inquiries() {

    const [inquiries, setInquiries] = useState([]);

    useEffect(() => {
        axios.get('/get-all-contacts')
        .then(response => {
            console.log(response.data.data);
            setInquiries(response.data.data);
        })
        .catch(error => {
            console.log(error.message);
        })
    }, [])

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={12}>
            <Paper className={fixedHeightPaper}>
            <center><h3>Inquiries</h3></center>
            <table className="styled-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                  </tr>
                </thead>

                {inquiries.map((inquiry) => (
                  <tbody>
                    <tr key={inquiry._id}>
                      <td>{inquiry.name}</td>
                      <td>{inquiry.email}</td>
                      <td>{inquiry.subject}</td>
                      <td>{inquiry.message}</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
