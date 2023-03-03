import {
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";

function TransactionType({type, setType}) {

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };
    return (
        <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
                <InputLabel id="transaction-label" style={{ fontSize: "18px" }}>
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
                    <MenuItem value="income">Income</MenuItem>
                    <MenuItem value="expense">Expense</MenuItem>
                </Select>
            </FormControl>
        </Grid>
    );
}

export default TransactionType;
