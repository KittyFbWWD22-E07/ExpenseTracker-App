import React from "react";
import moment from "moment";
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    IconButton,
    Tooltip,
    Zoom,
} from "@mui/material";
import { Delete, Edit, MoneyOff, AttachMoney } from "@mui/icons-material";
import { red, green } from "@mui/material/colors";

function CreateStatement({ statements }) {
    const { type, date, amount, category } = statements;
    if (date && type && amount && category) {
        console.log("I am creating a list");
    }

    return (
        <List >
            {statements.map(({ id, type, category, amount, date }) => (
                <ListItem
                    key={id}
                    secondaryAction={
                        <>
                            <Tooltip
                                TransitionComponent={Zoom}
                                title="Edit entry"
                            >
                                <IconButton
                                    edge="end"
                                    aria-label="edit"
                                    style={{ margin: "2px" }}
                                >
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                            <Tooltip
                                TransitionComponent={Zoom}
                                title="Delete entry"
                            >
                                <IconButton edge="end" aria-label="delete">
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                        </>
                    }
                >
                    <ListItemAvatar style={{ alignItems: "center" }}>
                        <Avatar
                            sx={{
                                bgcolor:
                                    type === "income" ? green[500] : red[500],
                            }}
                        >
                            {type === "income" ? <AttachMoney /> : <MoneyOff />}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={category.toUpperCase()}
                        secondary={
                            date
                                ? `$${amount} - ${moment(date).format(
                                      "MM-DD-YYYY"
                                  )}`
                                : "No date selected"
                        }
                    />
                </ListItem>
            ))}
        </List>
    );
}
export default CreateStatement;
