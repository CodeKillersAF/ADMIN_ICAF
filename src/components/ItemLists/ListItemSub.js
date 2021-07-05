import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import { PermIdentity } from "@material-ui/icons";
import ListSubheader from '@material-ui/core/ListSubheader';
import { Link } from "react-router-dom";
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import DeckOutlinedIcon from '@material-ui/icons/DeckOutlined';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import TvOutlinedIcon from '@material-ui/icons/TvOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import HourglassEmptyOutlinedIcon from '@material-ui/icons/HourglassEmptyOutlined';


export default function ListItem() {
    const [open, setOpen] = React.useState(false);
    const [keynoteopen, setkeynoteopen] = React.useState(false);
    const [participantopen, setparticipantopen] = React.useState(false)
    const [editoropen, seteditoropen] = React.useState(false)
    const [templateopen, settemplateopen] = React.useState(false)
    
  const handleClick = () => {
    setOpen(!open);
  };

  const keynoteHandleClick=()=>{
    setkeynoteopen(!keynoteopen);
  }

  const participantsHandleClick=()=>{
    setparticipantopen(!participantopen);
  }
  const editorHandleClick=()=>{
    seteditoropen(!editoropen);
  }
  const templateHandleClick=()=>{
    settemplateopen(!templateopen);
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
          <ListItem button component={Link} to ="/register-page">
            <ListItemIcon>
              <AddBoxOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Register Roles" />
          </ListItem>
          <ListItem button component={Link} to ="/view-user">
            <ListItemIcon>
              <TvOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="View Roles" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button onClick={keynoteHandleClick}>
        <ListItemIcon>
          <DescriptionOutlinedIcon/>
        </ListItemIcon>
        <ListItemText primary="Keynotes"/>
        {keynoteopen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={keynoteopen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button component={Link} to ="/add-keynote">
            <ListItemIcon>
              <AddBoxOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Add Keynote" />
          </ListItem>
          <ListItem button component={Link} to ="/pending-keynote">
            <ListItemIcon>
              <HourglassEmptyOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Pending Keynotes" />
          </ListItem>
          <ListItem button component={Link} to ="/approved-keynote">
            <ListItemIcon>
              <AssignmentTurnedInOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Approved Keynotes" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button onClick={participantsHandleClick}>
        <ListItemIcon>
          <PeopleAltOutlinedIcon/>
        </ListItemIcon>
        <ListItemText primary="Participants" />
        {participantopen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={participantopen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItem button component={Link} to ="/inquiries">
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Inquiries" />
          </ListItem>
          <ListItem button component={Link} to ="/workshop-conductors">
            <ListItemIcon>
              <PermIdentity />
            </ListItemIcon>
            <ListItemText primary="Workshop Conductor" />
          </ListItem>
          <ListItem button component={Link} to ="/attendees">
            <ListItemIcon>
              <PermIdentity />
            </ListItemIcon>
            <ListItemText primary="Attendees" />
          </ListItem>
          <ListItem button component={Link} to ="/research-paper">
            <ListItemIcon>
              <PermIdentity />
            </ListItemIcon>
            <ListItemText primary="Research Publishers" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button onClick={editorHandleClick}>
        <ListItemIcon>
          <DeckOutlinedIcon/>
        </ListItemIcon>
        <ListItemText primary="Conferences" />
        {editoropen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={editoropen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button component={Link} to ="/editor">
            <ListItemIcon>
              <TvOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="View" />
          </ListItem>
          <ListItem button component={Link} to ="/editor-add">
            <ListItemIcon>
              <AddBoxOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Add" />
          </ListItem>
          <ListItem button component={Link} to ="/editor-admin">
            <ListItemIcon>
              <HourglassEmptyOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Approve" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem button onClick={templateHandleClick}>
        <ListItemIcon>
          <LibraryBooksOutlinedIcon/>
        </ListItemIcon>
        <ListItemText primary="Template" />
        {templateopen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={templateopen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button component={Link} to ="/add-template">
            <ListItemIcon>
              <AddBoxOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Add Template" />
          </ListItem>
          <ListItem button component={Link} to ="/view-template">
            <ListItemIcon>
              <TvOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="View Template"/>
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
}
