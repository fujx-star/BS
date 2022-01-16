import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import ListItemText from "@mui/material/ListItemText";
import PhotoIcon from "@mui/icons-material/Photo";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListSubheader from "@mui/material/ListSubheader";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import AddTaskIcon from "@mui/icons-material/AddTask";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {useNavigate} from "react-router-dom";

export default function Navlist(props) {
    let navigate = useNavigate()
    let username = props.username

    function DirectTo(direction) {
        return () => {
            navigate(direction, {state: {username: username}, replace: true})
        }
    }

    return (
        <div>
            <List>
                <div>
                    <ListItem button onClick={DirectTo("/taskhall")}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Hall" />
                    </ListItem>
                    <ListItem button onClick={DirectTo("/image")}>
                        <ListItemIcon>
                            <PhotoIcon />
                        </ListItemIcon>
                        <ListItemText primary="Image" />
                    </ListItem>
                    <ListItem button onClick={DirectTo("/mytask")}>
                        <ListItemIcon>
                            <BarChartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Task" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Account" />
                    </ListItem>
                </div>
            </List>
            <Divider />
            <List>
                <div>
                    <ListSubheader inset>Saved reports</ListSubheader>
                    <ListItem button onClick={DirectTo("/upload")}>
                        <ListItemIcon>
                            <AddToPhotosIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add photo" />
                    </ListItem>
                    <ListItem button onClick={DirectTo("/release")}>
                        <ListItemIcon>
                            <AddTaskIcon />
                        </ListItemIcon>
                        <ListItemText primary="Release task" />
                    </ListItem>
                    <ListItem button onClick={DirectTo("../signin")}>
                        <ListItemIcon>
                            <ManageAccountsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Exit" />
                    </ListItem>
                </div>
            </List>
        </div>
    )
}
