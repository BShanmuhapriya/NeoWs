import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Box, Typography } from "@mui/material";

const COLORS = ["#00bfff", "#ffb400"];

interface Props {
  minDiameter: number;
  maxDiameter: number;
}

const DiameterPieChart: React.FC<Props> = ({ minDiameter, maxDiameter }) => {
  const data = [
    { name: "Min Diameter", value: minDiameter },
    { name: "Max Diameter", value: maxDiameter },
  ];

  return (
    <Box sx={{ flex: 1, minWidth: 300 }}>
      <Typography variant="h6" sx={{ mb: 2, fontFamily: "'Space Mono', monospace" }}>
        Diameter Comparison
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{fontFamily: "'Space Mono', monospace"}}/>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default DiameterPieChart;
