import {
    Grid,
    FormControl,
    TextField
} from '@mui/material';
import moment from 'moment';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DesktopDatePicker } from "@mui/x-date-pickers";

function DateSelection ({date, setDate}) {
    return (
        <Grid item xs={6}>
        <FormControl fullWidth>
            <LocalizationProvider
                dateAdapter={AdapterMoment}
            >
                <DesktopDatePicker
                    label="Date"
                    value={date}
                    format="MM-dd-yyyy"
                    onChange={(newValue) => {
                      setDate(moment(newValue))
                    }}
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
    )
}

export default DateSelection;