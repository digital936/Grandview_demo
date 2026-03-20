import React from 'react';
import './StatsCard.css';

const StatsCard = ({ title, value, icon, trend, trendValue, color = 'primary' }) => {
  return (
    <div className={`stats-card stats-card--${color}`}>
      <div className="stats-card__header">
        <div className="stats-card__icon">
          {icon}
        </div>
        <div className="stats-card__trend">
          {trend && (
            <span className={`trend ${trend === 'up' ? 'trend--up' : 'trend--down'}`}>
              {trend === 'up' ? '↗' : '↘'} {trendValue}%
            </span>
          )}
        </div>
      </div>
      <div className="stats-card__content">
        <h3 className="stats-card__value">{value}</h3>
        <p className="stats-card__title">{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;