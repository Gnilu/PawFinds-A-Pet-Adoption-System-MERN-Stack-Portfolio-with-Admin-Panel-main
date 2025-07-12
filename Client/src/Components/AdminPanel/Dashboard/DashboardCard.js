import React from "react";

const DashboardCard = ({ title, count, icon, bgColor }) => {
  return (
    <div className={`dashboard-card ${bgColor}`}>
      <div>
        <h4 className="dashboard-title">{title}</h4>
        <p className="dashboard-count">{count}</p>
      </div>
      <div className="dashboard-icon">{icon}</div>

{/* Styling */}
      <style>{`
      .dashboard-card {
  flex: 1;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  width: 20%;
}

.dashboard-title {
  font-size: 1.125rem;
}

.dashboard-count {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 0.25rem;
}

.dashboard-icon {
  font-size: 2rem;
}

/* Example background colors */
.bg-blue {
  background-color: #3B82F6;
}
.bg-green {
  background-color: #10B981;
}
.bg-purple {
  background-color: #8B5CF6;
}

      `}</style>
    </div>
  );
};

export default DashboardCard;
