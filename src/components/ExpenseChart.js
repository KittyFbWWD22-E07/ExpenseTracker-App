import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Paper } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ data }) => {
    const { id, type, date, amount, category } = data;

    if (id && date && type && amount && category) {

       console.log("I am loading");

    }

    const categories = [...new Set(data.filter((item) => item.type === "expense").map((item) => item.category))];


    const expenseData = categories.map((category) => {
        const totalExpense = data
            .filter(
                (item) => (item.category === category)
            )
            .reduce((sum, item) => sum + item.amount, 0);
            return totalExpense;
            });

    const chartData = {
        labels: categories,
        datasets: [
            {

                data: expenseData,
                backgroundColor: [
                    "#FFCDD2",
                    "#EF9A9A",
                    "#E57373",
                    "#EF5350",
                    "#F44336",
                    "#E53935",
                    "#D32F2F",
                    "#C62828",
                    "#B71C1C",
                    "#FF8A80",
                    "#FF5252",
                    "#FF1744",
                    "#D50000",
                    "#F50057",
                    "#C51162",
                    "#88E4F",
                ],
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,

      };

      return (
        <Paper elevation={0} sx={{display: "block",width: "100%", height: "420px"}}>
            <Doughnut data={chartData} options={chartOptions} />
        </Paper>


      );
    };

    export default ExpenseChart;