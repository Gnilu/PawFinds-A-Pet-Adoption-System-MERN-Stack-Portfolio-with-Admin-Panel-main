import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardChart = ({ title, data, dataKey }) => {
  return (
    <div className="dashboard-chart-container">
      <h3 className="dashboard-chart-title">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#4F46E5"
            strokeWidth={2}
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>

      <style>{`
      .dashboard-chart-container {
        background-color: white;
        padding: 1.25rem; /* 20px */
        border-radius: 1rem; /* 16px */
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        width: 100%;
        margin-bottom: 1.5rem;
}

      @media (min-width: 600px) {
        .dashboard-chart-container {
        width: 80%;
  }
}

      .dashboard-chart-title {
        font-size: 1.125rem; /* text-lg */
        font-weight: 600;    /* font-semibold */
        margin-bottom: 1rem;
        color: #1C274C;
}
      `}</style>
    </div>
  );
};

export default DashboardChart;
