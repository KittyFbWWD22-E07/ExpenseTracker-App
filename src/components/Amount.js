import {
    Grid,
    FormControl,
    TextField,
    InputAdornment
} from "@mui/material";

function Amount({amount, setAmount}) {
    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    return (
        <Grid item xs={6}>
        <FormControl fullWidth>
            <TextField
                id="standard-number"
                label="Amount"
                type="number"
                value={amount}

                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                          $
                      </InputAdornment>
                  ),
              }}
                variant="standard"
                onChange={handleAmountChange}
            />
        </FormControl>
    </Grid>
    )
}

export default Amount;