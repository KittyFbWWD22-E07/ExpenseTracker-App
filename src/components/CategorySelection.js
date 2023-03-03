import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function CategorySelection({ category, setCategory, type }) {
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    return (
        <Grid item xs={6}>
            <FormControl fullWidth variant="standard">
                <InputLabel
                    id="category-label"
                    variant="standard"
                    style={{ fontSize: "18px" }}
                >
                    Category
                </InputLabel>
                {type === "income" ? (
                    <Select
                        align="left"
                        labelId="category-label"
                        id="category"
                        value={category}
                        onChange={handleCategoryChange}
                    >
                        <MenuItem value="business">Business</MenuItem>
                        <MenuItem value="investments">Investments</MenuItem>
                        <MenuItem value="extra income">Extra Income</MenuItem>
                        <MenuItem value="deposits">Deposits</MenuItem>
                        <MenuItem value="lottery">Lottery</MenuItem>
                        <MenuItem value="gifts">Gifts</MenuItem>
                        <MenuItem value="salary">Salary</MenuItem>
                        <MenuItem value="savings">Savings</MenuItem>
                        <MenuItem value="rental income">Rental Income</MenuItem>
                    </Select>
                ) : (
                    <Select
                        align="left"
                        labelId="category-label"
                        id="category"
                        value={category}
                        onChange={handleCategoryChange}
                    >
                        <MenuItem value="bills">Utilities</MenuItem>
                        <MenuItem value="car">Car</MenuItem>
                        <MenuItem value="clothing">Clothing</MenuItem>
                        <MenuItem value="communication">Communication</MenuItem>
                        <MenuItem value="eating out">Eating Out</MenuItem>
                        <MenuItem value="entertainment">Entertainment</MenuItem>
                        <MenuItem value="gifts">Gifts</MenuItem>
                        <MenuItem value="groceries">Groceries</MenuItem>
                        <MenuItem value="health">Health</MenuItem>
                        <MenuItem value="house">House</MenuItem>
                        <MenuItem value="pets">Pets</MenuItem>
                        <MenuItem value="sports">Sports</MenuItem>
                        <MenuItem value="taxi">Taxi</MenuItem>
                        <MenuItem value="toiletries">Toiletry</MenuItem>
                        <MenuItem value="transport">Transport</MenuItem>
                        <MenuItem value="other">Other</MenuItem>

                    </Select>
                )}
            </FormControl>
        </Grid>
    );
}

export default CategorySelection;
