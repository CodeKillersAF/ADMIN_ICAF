import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import DraftsIcon from "@material-ui/icons/Drafts";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import { PermIdentity } from "@material-ui/icons";
import ListSubheader from '@material-ui/core/ListSubheader';
import { Link } from "react-router-dom";




export default function ListItem() {
    const [open, setOpen] = React.useState(false);
    const [keynoteopen, setkeynoteopen] = React.useState(false);
    const [participantopen, setparticipantopen] = React.useState(false)
    
  const handleClick = () => {
    setOpen(!open);
  };

  const keynoteHandleClick=()=>{
    setkeynoteopen(!keynoteopen);
  }

  const participantsHandleClick=()=>{
    setparticipantopen(!participantopen);
  }
  return (
    <div>
      <ListSubheader inset>Manage</ListSubheader>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <PermIdentity/>
        </ListItemIcon>
        <ListItemText primary="Roles" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button component={Link} to ="/">
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Register Roles" />
          </ListItem>
          <ListItem >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="View Roles" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button onClick={keynoteHandleClick}>
        <ListItemIcon>
          <PermIdentity/>
        </ListItemIcon>
        <ListItemText primary="Keynote" />
        {keynoteopen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={keynoteopen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button component={Link} to ="/add-keynote">
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Add Keynote" />
          </ListItem>
          <ListItem button component={Link} to ="/pending-keynote">
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Pending Keynotes" />
          </ListItem>
          <ListItem button component={Link} to ="/approved-keynote">
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Approved Keynotes" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button onClick={participantsHandleClick}>
        <ListItemIcon>
          <PermIdentity/>
        </ListItemIcon>
        <ListItemText primary="Participants" />
        {participantopen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={participantopen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button component={Link} to ="/workshop-conductors">
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Workshop Conductor" />
          </ListItem>
          <ListItem button component={Link} to ="/attendees">
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Attendees" />
          </ListItem>
          <ListItem button component={Link} to ="/research-paper">
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Research Publishers" />
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
}
