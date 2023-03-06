import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Paper } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const IncomeChart = ({ data }) => {

    const categories = [...new Set(data.filter((item) => item.type === "income").map((item) => item.category))];

    const incomeData = categories.map((category) => {
        const totalIncome = data
            .filter(
                (item) => (item.category === category)
            )
            .reduce((sum, item) => sum + item.amount, 0);
            return totalIncome;
            });

    const chartData = {
        labels: categories,
        datasets: [
            {
                data: incomeData,
                backgroundColor: [
                    "#006400",
                    "#228B22",
                    "#008000",
                    "#00FF00",
                    "#808000",
                    "#2E8B57",
                    "#00FF7F",
                    "#9ACD32",
                    "#556B2F",

                ],
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
      };

      return (
        <Paper elevation={0} sx={{display: "block",width: "100%", height: "490px"}}>
            <Doughnut data={chartData} options={chartOptions} />
        </Paper>


      );
    };

    export default IncomeChart;
