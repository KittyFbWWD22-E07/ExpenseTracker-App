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
import Header from "./components/Header";
import TransactionType from "./components/TransactionType";
import CategorySelection from "./components/CategorySelection";
import Amount from "./components/Amount";
import DateSelection from "./components/DateSelection";
import CreateStatement from "./components/CreateStatement";
import IncomeChart from "./components/IncomeChart";
import ExpenseChart from "./components/ExpenseChart";

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

    // this reduce function returns an object with a "total" property
    // it updates on each iteration if the statement transaction type is "income"
    const totalIncome = statements.reduce(
        (accumulator, statement) => {
            if (statement.type === "income") {
                return { total: accumulator.total + Number(statement.amount) };
            }
            // return the accumulator object if the statement type is not income
            return accumulator;
        },
        { total: 0 }
    );

    const totalExpenses = statements.reduce(
        (accumulator, statement) => {
            if (statement.type === "expense") {
                return { total: accumulator.total + Number(statement.amount) };
            }
            // return the accumulator object if the statement type is not expense
            return accumulator;
        },
        { total: 0 }
    );


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
                <Header />
                <Grid item xs={12} md={3}>
                    <Paper
                        elevation={4}
                        style={{ borderBottom: "green 10px solid" }}
                    >
                        <Card style={{ margin: "2px" }}>
                            <CardHeader align="left" title="Total Income" />
                            <CardContent>
                                <Typography variant="h5">
                                    $ {totalIncome.total}
                                </Typography>
                                <IncomeChart data={statements}/>
                            </CardContent>
                        </Card>
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
                                    <Grid item xs={12}>
                                        <CreateStatement
                                            type={type}
                                            amount={amount}
                                            date={date}
                                            category={category}
                                            statements={statements}
                                            setStatements={setStatements}
                                            balance={balance}
                                            setBalance={setBalance}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Paper
                        elevation={4}
                        style={{ borderBottom: "red 10px solid" }}
                    >
                        <Card style={{ margin: "2px" }}>
                            <CardHeader align="left" title="Total Expenses" />
                            <CardContent>
                                <Typography variant="h5">
                                    $ {totalExpenses.total}
                                </Typography>
                                <ExpenseChart data={statements}/>

                            </CardContent>
                        </Card>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
