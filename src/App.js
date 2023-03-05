import React, { useState, useEffect, useCallback } from "react";
import moment from "moment/moment";
import {
    Grid,
    Paper,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Divider,
    Button,
} from "@mui/material";
import TransactionType from "./components/TransactionType";
import CategorySelection from "./components/CategorySelection";
import Amount from "./components/Amount";
import DateSelection from "./components/DateSelection";
// import CreateButton from "./components/CreateButton";
import CreateStatement from "./components/CreateStatement";
import "./App.css";

function App() {
    const [date, setDate] = useState(moment());
    const [type, setType] = useState("income");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
    const [balance, setBalance] = useState("0.00");
    const [statements, setStatements] = useState([]);
    const [isCreateButtonClicked, setIsCreateButtonClicked] = useState(false);

    const addStatement = useCallback(
        (newStatement) => {
            setStatements([newStatement, ...statements]);
        },
        [statements]
    );

    const updateBalance = useCallback(() => {
        if (type === "income") {
            setBalance(Number(balance) + Number(amount));
        } else {
            setBalance((Number(balance) - Number(amount)).toFixed(2));
        }
    }, [type, balance, amount]);

    const createStatement = useCallback(() => {
        const statement = {
            id: Math.floor(Math.random() * 10000),
            date: date,
            category: category,
            amount: amount,
            type: type,
        };
        updateBalance();
        addStatement(statement);
        setCategory("");
        setAmount("");
        setType("income");
        setDate(moment());
    }, [date, category, amount, type, updateBalance, addStatement]);

    useEffect(() => {
        if (isCreateButtonClicked) {
            createStatement();
            setIsCreateButtonClicked(false);
        }
    }, [isCreateButtonClicked, createStatement]);

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

                                    <TransactionType
                                        type={type}
                                        setType={setType}
                                    />

                                    <CategorySelection
                                        category={category}
                                        setCategory={setCategory}
                                        type={type}
                                    />

                                    <Amount
                                        amount={amount}
                                        setAmount={setAmount}
                                    />

                                    <DateSelection
                                        date={date}
                                        setDate={setDate}
                                    />
                                </Grid>

                                <Button
                                    fullWidth
                                    onClick={() =>
                                        setIsCreateButtonClicked(true)
                                    }
                                    variant="outlined"
                                    color="success"
                                    style={{ marginTop: "20px" }}
                                >
                                    CREATE
                                </Button>
                            </CardContent>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid
                                        item
                                        xs={12}
                                        style={{
                                            height: "170px",
                                            overflowY: "auto",
                                        }}
                                    >
                                        <CreateStatement
                                            type={type}
                                            amount={amount}
                                            date={date}
                                            category={category}
                                            statements={statements}
                                        />
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
