import React, { useReducer } from "react";
import moment from "moment/moment";
import {
    Grid,
    Paper,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Divider,
} from "@mui/material";
import TransactionType from "./components/TransactionType";
import CategorySelection from "./components/CategorySelection";
import Amount from "./components/Amount";
import DateSelection from "./components/DateSelection";
import CreateStatement from "./components/CreateStatement";
import CreateButton from "./components/CreateButton";
import "./App.css";

const initialState = {
    date: moment(),
    type: "income",
    category: "",
    amount: "",
    balance: "0.00",
    statements: [],
};

function reducer(state, action) {
    switch (action.type) {
        case "ADD_STATEMENT":
            const newStatement = {
                id: Math.floor(Math.random() * 10000),
                date: state.date,
                category: state.category,
                amount: state.amount,
                type: state.type,
            };
            return {
                ...state,
                statements: [newStatement, ...state.statements],
            };
        case "UPDATE_BALANCE":
            const newBalance =
                action.payload.type === "income"
                    ? Number(state.balance) + Number(action.payload.amount)
                    : Number(state.balance) - Number(action.payload.amount);
            return {
                ...state,
                balance: newBalance.toFixed(2),
            };
        case "SET_CATEGORY":
            return {
                ...state,
                category: action.payload,
            };
        case "SET_AMOUNT":
            return {
                ...state,
                amount: action.payload,
            };
        case "SET_TYPE":
            return {
                ...state,
                type: action.payload,
            };
        case "SET_DATE":
            return {
                ...state,
                date: action.payload,
            };
        default:
            break;
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const createStatement = () => {
        dispatch({ type: "ADD_STATEMENT" });
        dispatch({
            type: "UPDATE_BALANCE",
            payload: { type: state.type, amount: state.amount },
        });
        dispatch({ type: "SET_CATEGORY", payload: "" });
        dispatch({ type: "SET_AMOUNT", payload: "" });
        dispatch({ type: "SET_TYPE", payload: "income" });
        dispatch({ type: "SET_DATE", payload: moment() });
    };

    const setCategory = (category) => {
        dispatch({ type: "SET_CATEGORY", payload: category });
    };

    const setAmount = (amount) => {
        dispatch({ type: "SET_AMOUNT", payload: amount });
    };

    const setType = (type) => {
        dispatch({ type: "SET_TYPE", payload: type });
    };

    const setDate = (date) => {
        dispatch({ type: "SET_DATE", payload: date });
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
                                    Total Balance $ {state.balance}
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
                                        type={state.type}
                                        setType={setType}
                                    />

                                    <CategorySelection
                                        category={state.category}
                                        setCategory={setCategory}
                                        type={state.type}
                                    />

                                    <Amount
                                        amount={state.amount}
                                        setAmount={setAmount}
                                    />

                                    <DateSelection
                                        date={state.date}
                                        setDate={setDate}
                                    />
                                </Grid>

                                <CreateButton onClick={createStatement} />
                            </CardContent>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <CreateStatement
                                            sx={{
                                                height: 150,
                                                overflow: "hidden",
                                                overflowY: "scroll",
                                            }}
                                            type={state.type}
                                            amount={state.amount}
                                            date={state.date}
                                            category={state.category}
                                            statements={state.statements}
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
