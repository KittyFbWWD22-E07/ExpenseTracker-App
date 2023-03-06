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

function CreateStatement({ statements, setStatements, balance, setBalance }) {
    const { id, type, date, amount, category } = statements;
    if (id && date && type && amount && category) {
        console.log("I am creating a list");
    }

    const handleDelete = (id) => {
        const statementToDelete = statements.find((statement) => statement.id === id);
        const updatedStatements = [...statements].filter((statement) => statement.id !== id);
        setStatements(updatedStatements);


        if (statementToDelete.type === "income") {
            setBalance(Number(balance) - Number(statementToDelete.amount));

        } else{
        setBalance(Number(balance) + Number(statementToDelete.amount))
        }

        }


    return (
        <List sx={{
            maxHeight: "150px",
            overflow: "hidden",
            overflowY: "auto",
        }}>
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
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(id)}>
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
