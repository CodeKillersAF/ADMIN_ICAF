import React , { useEffect , useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import GetAppIcon from '@material-ui/icons/GetApp';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 610,
    },
  }));
export default function WorkshopConductor() {
    let number = 0;
    const classes = useStyles();
    const [conductors, setConductors] = useState([]);
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
      axios.get('/get-all-not-approved-work-shop-conductors')
      .then(response => {
        console.log(response.data.data);
        setConductors(response.data.data);
      })
      .catch(error => {
        console.log(error.message);
      })

    }, [trigger]);

    const handleApproval = (id) => {
      axios.put(`/set-work-shop-conductor-approved/${id}`)
      .then(response => {
        console.log('email');
        axios.get(`/send-email-to-approved-work-shop/${id}`)
        .then(response => {
          console.log(response.data.data);
        })
        .catch(error => {
          console.log(error.message);
        })
        number = number + 1;
        setTrigger(number)
        console.log(response.data.data);

      })
      .catch(error => {
        console.log(error.message);
      })

    }

    const onDownload = (url) => {
      const link = document.createElement('a');
      link.href = url;
      link.click();
    }

    const onDeleteHandle = (id) => {
     axios.delete(`/delete-work-shops/${id}`)
     .then(response => {
       console.log(response.data.data);
       number = number + 1;
       setTrigger(number)
     })
     .catch(error => {
       console.log(error.message);
     })
    }
  

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
        <div>
           
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={12}>
              <Paper className={fixedHeightPaper}>
              <center><h3>Work Shop Conductors</h3></center>
              <table className="styled-table">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Approval</th>
                    <th>Download Workshop Praposal</th>
                    <th>Give approval</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                {conductors.map((conductor) => (
                  <tbody>
                    <tr key={conductor._id}>
                      <td>{conductor.first_name}</td>
                      <td>{conductor.last_name}</td>
                      <td>{conductor.email}</td>
                      <td>{conductor.phone}</td>
                      <td>{conductor.is_approved.toString()}</td>
                      <td>
                        <Button variant="outlined" color="secondary" endIcon={<GetAppIcon />} onClick = {() => onDownload(conductor.praposal_url)} >
                          Download
                        </Button>
                      </td>
                      <td>
                        <Button variant="outlined" color="primary" onClick={() => handleApproval(conductor._id)} endIcon={ <DoneIcon/> }>
                          Approve
                        </Button>
                      </td>
                      <td>
                        <Button variant="outlined" color="secondary" onClick={() => onDeleteHandle(conductor._id)} endIcon={ <DeleteIcon/> }>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
              </Paper>
            </Grid>
          </Grid>
         
        </Container>
        </div>
    )
}
