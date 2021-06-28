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




export default function ListItem() {
    const [open, setOpen] = React.useState(false);
    
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div>
      <ListSubheader inset>Saved reports</ListSubheader>
      <ListItem button>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Keynotes" />
      </ListItem>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <PermIdentity/>
        </ListItemIcon>
        <ListItemText primary="Users" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Attendees" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Workshop Conductors" />
          </ListItem>
          <ListItem>
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
