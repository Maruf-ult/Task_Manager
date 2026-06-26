import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const getChartDimensions = () => {
  const width = window.innerWidth;
  if (width < 640) {
    return { height: 260, outerRadius: 80, innerRadius: 55 };
  }
  if (width < 768) {
    return { height: 290, outerRadius: 100, innerRadius: 75 };
  }
  return { height: 325, outerRadius: 130, innerRadius: 100 };
};

const CustomPieChart = ({ data, colors }) => {
  const [dimensions, setDimensions] = useState(getChartDimensions);

  useEffect(() => {
    const handleResize = () => setDimensions(getChartDimensions());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={dimensions.height}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="status"
          cx="50%"
          cy="50%"
          outerRadius={dimensions.outerRadius}
          innerRadius={dimensions.innerRadius}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
