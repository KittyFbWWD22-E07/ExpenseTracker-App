// import React from "react";
import moment from "moment";
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    IconButton,
    Tooltip,
    Zoom
} from "@mui/material";
import { Delete, Edit, MoneyOff, AttachMoney } from "@mui/icons-material";
import { red, green } from "@mui/material/colors";

function CreateStatement({ statements }) {
    return (
        <List >
            {statements.map((statement) => (
                <ListItem
                    key={statement.id}
                    secondaryAction={
                        <>
                            <Tooltip TransitionComponent={Zoom} title="Edit entry">
                            <IconButton
                                edge="end"
                                aria-label="edit"
                                style={{ margin: "2px" }}
                            >
                                <Edit />
                            </IconButton>
                            </Tooltip>
                            <Tooltip TransitionComponent={Zoom} title="Delete entry">
                            <IconButton edge="end" aria-label="delete">
                                <Delete />
                            </IconButton>
                            </Tooltip>
                        </>
                    }
                >
                    <ListItemAvatar style={{ alignItems: "center" }}>
                        {statement.type === "income" ? (
                            <Avatar sx={{ bgcolor: green[500] }}>
                                <AttachMoney />
                            </Avatar>
                        ) : (
                            <Avatar sx={{ bgcolor: red[500] }}>
                                <MoneyOff />
                            </Avatar>
                        )}
                    </ListItemAvatar>
                    <ListItemText
                        primary={statement.category.toUpperCase()}
                        secondary={`$${statement.amount} - ${
                            moment(statement.date).format("MM-DD-YYYY")
                                ? moment(statement.date).format("MM-DD-YYYY")
                                : alert("You haven't picked  a date")
                        }`}
                    />
                </ListItem>
            ))}
        </List>
    );
}

export default CreateStatement;
