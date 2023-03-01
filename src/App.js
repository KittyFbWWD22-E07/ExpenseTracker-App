import React, { useState } from "react";
import moment from "moment/moment";
import {
    Grid,
    Paper,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemIcon,
    Avatar,
    IconButton,
} from "@mui/material";
import { Delete, MoneyOff } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DesktopDatePicker } from "@mui/x-date-pickers";

import "./App.css";

function App() {
    const [date, setDate] = useState(moment("2023-01-01"));
    const [type, setType] = useState("income");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [balance, setBalance] = useState("0.00");
    const [data, setData] = useState([]);

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleDateChange = (date) => {
        setDate(date);
    };

    const handleClick = () => {
        updateBalance();
        CreateStatement();
        setType("income");
        setCategory("");
        setDate(moment("2023-01-01"));
        setAmount("");
    };

    const updateBalance = () => {
        if (type === "income") {
            setBalance(Number(balance) + Number(amount));
        } else if (type === "expense") {
            setBalance((Number(balance) - Number(amount)).toFixed(2));
        }
    };

    function CreateStatement () {
        const newData = {
            type: type,
            amount: amount,
            date: date,
            category: category,
        };

        setData([...data, newData]);
        return (
            <List>
                {data.map((entry) => (
                    <ListItem
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete">
                                <Delete />
                            </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <ListItemIcon>
                                    <MoneyOff />
                                </ListItemIcon>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={entry.category}
                            secondary={`${entry.amount} - ${entry.date} `}
                        />
                    </ListItem>
                ))}
            </List>
        );
    };

    return (
        <div className="App">
            <Grid
                container
                spacing={2}
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                }}
            >
                <Grid item xs={12} md={3}>
                    <Paper
                        elevate={3}
                        variant="outlined"
                        style={{ backgroundColor: "green" }}
                    >
                        Let's Get Started!!!
                    </Paper>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Paper style={{ backgroundColor: "white" }}>
                        <Card>
                            <CardHeader align="left" title="Expense Tracker" />
                            <CardContent>
                                <Typography variant="h5">
                                    Total Balance $ {balance}
                                </Typography>
                                <Typography
                                    align="left"
                                    variant="h6"
                                    style={{ marginTop: "30px" }}
                                >
                                    Add Your Statement
                                </Typography>
                                <Divider />
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">
                                            ...
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl
                                            fullWidth
                                            variant="standard"
                                        >
                                            <InputLabel
                                                id="transaction-label"
                                                style={{ fontSize: "18px" }}
                                            >
                                                Transaction Type
                                            </InputLabel>
                                            <Select
                                                align="left"
                                                defaultValue="income"
                                                labelId="transaction-label"
                                                id="transaction"
                                                value={type}
                                                onChange={handleTypeChange}
                                                label="Transaction Type"
                                            >
                                                <MenuItem value="income">
                                                    Income
                                                </MenuItem>
                                                <MenuItem value="expense">
                                                    Expense
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl
                                            fullWidth
                                            variant="standard"
                                        >
                                            <InputLabel
                                                id="category-label"
                                                variant="standard"
                                                style={{ fontSize: "18px" }}
                                            >
                                                Category
                                            </InputLabel>
                                            <Select
                                                align="left"
                                                labelId="category-label"
                                                id="category"
                                                value={category}
                                                onChange={handleCategoryChange}
                                            >
                                                <MenuItem value="business">
                                                    Business
                                                </MenuItem>
                                                <MenuItem value="investments">
                                                    Investments
                                                </MenuItem>
                                                <MenuItem value="extra income">
                                                    Extra Income
                                                </MenuItem>
                                                <MenuItem value="deposits">
                                                    Deposits
                                                </MenuItem>
                                                <MenuItem value="lottery">
                                                    Lottery
                                                </MenuItem>
                                                <MenuItem value="gifts">
                                                    Gifts
                                                </MenuItem>
                                                <MenuItem value="salary">
                                                    Salary
                                                </MenuItem>
                                                <MenuItem value="savings">
                                                    Savings
                                                </MenuItem>
                                                <MenuItem value="rental income">
                                                    Rental Income
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <TextField
                                                id="standard-number"
                                                label="Amount"
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                value={amount}
                                                // step="2"
                                                variant="standard"
                                                onChange={handleAmountChange}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <LocalizationProvider
                                                dateAdapter={AdapterMoment}
                                            >
                                                <DesktopDatePicker
                                                    label="Date"
                                                    value={date}
                                                    onChange={handleDateChange}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            variant="standard"
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <Button
                                    fullWidth
                                    onClick={handleClick}
                                    variant="outlined"
                                    color="success"
                                    style={{ marginTop: "20px" }}
                                >
                                    CREATE
                                </Button>
                            </CardContent>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        {/* <CreateStatement /> */}
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Paper
                        elevate={3}
                        variant="outlined"
                        style={{ backgroundColor: "red" }}
                    >
                        Let's Get Started!!!
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
