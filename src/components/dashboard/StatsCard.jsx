import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';

const StatsCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  bgColor = 'bg-white', 
  textColor = 'text-gray-900',
  iconColor = 'text-blue-500',
  trend = null,
  trendColor = 'text-green-500',
  trendDirection = 'up', // 'up', 'down', 'neutral'
  animated = true,
  onClick = null,
  loading = false,
  tooltip = null,
  size = 'default' // 'small', 'default', 'large'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);

  // Animation effect for numbers
  useEffect(() => {
    if (animated && typeof value === 'number') {
      setIsVisible(true);
      const timer = setTimeout(() => {
        let start = 0;
        const end = value;
        const duration = 1000;
        const increment = end / (duration / 16);
        
        const animate = () => {
          start += increment;
          if (start < end) {
            setCurrentValue(Math.floor(start));
            requestAnimationFrame(animate);
          } else {
            setCurrentValue(end);
          }
        };
        animate();
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [value, animated]);

  const sizeClasses = {
    small: 'p-4',
    default: 'p-6',
    large: 'p-8'
  };

  const titleSizes = {
    small: 'text-xs',
    default: 'text-sm',
    large: 'text-base'
  };

  const valueSizes = {
    small: 'text-lg',
    default: 'text-3xl',
    large: 'text-4xl'
  };

  const iconSizes = {
    small: 'w-6 h-6',
    default: 'w-8 h-8',
    large: 'w-10 h-10'
  };

  const getTrendIcon = () => {
    switch (trendDirection) {
      case 'up':
        return <TrendingUp className="w-4 h-4" />;
      case 'down':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const displayValue = animated && typeof value === 'number' ? currentValue : value;

  return (
    <div className="relative group">
      <div 
        className={`
          ${bgColor} rounded-xl shadow-lg ${sizeClasses[size]} border border-gray-200 
          hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2
          ${onClick ? 'cursor-pointer hover:scale-105' : ''}
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          ${loading ? 'animate-pulse' : ''}
        `}
        onClick={onClick}
      >
        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 rounded-xl flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Header with icon and tooltip */}
        <div className="flex items-center justify-between mb-4">
          <div className={`${iconColor} transition-transform duration-300 group-hover:scale-110`}>
            {React.isValidElement(icon) ? 
              React.cloneElement(icon, { className: iconSizes[size] }) : 
              <div className={iconSizes[size]}>{icon}</div>
            }
          </div>
          
          <div className="flex items-center space-x-2">
            {trend && (
              <div className={`
                flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold
                ${trendDirection === 'up' ? 'bg-green-100 text-green-700' :
                  trendDirection === 'down' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'}
                transition-all duration-300 hover:scale-105
              `}>
                {getTrendIcon()}
                <span>{trend}</span>
              </div>
            )}
            
            {tooltip && (
              <div className="relative">
                <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
                <div className="absolute right-0 top-6 w-48 p-2 bg-black text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                  {tooltip}
                  <div className="absolute -top-1 right-2 w-2 h-2 bg-black transform rotate-45"></div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Main content */}
        <div className="space-y-2">
          <h3 className={`${titleSizes[size]} font-medium ${textColor} opacity-70 uppercase tracking-wide`}>
            {title}
          </h3>
          
          <div className={`${valueSizes[size]} font-bold ${textColor} transition-all duration-500`}>
            {typeof displayValue === 'number' ? displayValue.toLocaleString() : displayValue}
          </div>
          
          {subtitle && (
            <p className={`text-sm ${textColor} opacity-60 leading-relaxed`}>
              {subtitle}
            </p>
          )}
        </div>
        
        {/* Progress bar for percentage values */}
        {typeof value === 'string' && value.includes('%') && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: isVisible ? value : '0%',
                  transition: 'width 1s ease-out 0.5s'
                }}
              ></div>
            </div>
          </div>
        )}

        {/* Click indicator */}
        {onClick && (
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-xs">→</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced predefined variants
export const MetricCard = ({ title, value, change, changeType, icon, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
    teal: 'from-teal-500 to-teal-600'
  };

  return (
    <StatsCard
      title={title}
      value={value}
      icon={icon}
      bgColor={`bg-gradient-to-br ${colorClasses[color]}`}
      textColor="text-white"
      iconColor="text-white opacity-80"
      trend={change}
      trendDirection={changeType}
      trendColor={changeType === 'up' ? 'text-green-300' : changeType === 'down' ? 'text-red-300' : 'text-gray-300'}
    />
  );
};

export const DoctorAvailabilityCard = ({ available, total, specialty }) => (
  <StatsCard
    title={`${specialty || 'Doctors'} Available`}
    value={`${available}/${total}`}
    subtitle={`${Math.round((available / total) * 100)}% availability`}
    icon={<div className="text-2xl">👩‍⚕️</div>}
    bgColor="bg-gradient-to-br from-blue-50 to-blue-100"
    iconColor="text-blue-600"
    trend={available > total * 0.6 ? "Good Coverage" : "Limited Staff"}
    trendDirection={available > total * 0.6 ? 'up' : 'down'}
    trendColor={available > total * 0.6 ? "text-green-600" : "text-red-600"}
    tooltip="Shows real-time doctor availability for consultations"
  />
);

export const PatientStatsCard = ({ count, todayCount, weeklyGrowth }) => (
  <StatsCard
    title="Patients Served"
    value={count}
    subtitle={`${todayCount} consultations today`}
    icon={<div className="text-2xl">🏥</div>}
    bgColor="bg-gradient-to-br from-green-50 to-green-100"
    iconColor="text-green-600"
    trend={`+${weeklyGrowth}% this week`}
    trendDirection="up"
    trendColor="text-green-600"
    animated={true}
    tooltip="Total patients served across all villages"
  />
);

export const VillageConnectionCard = ({ connected, total, newThisMonth }) => (
  <StatsCard
    title="Villages Connected"
    value={connected}
    subtitle={`${total} total villages`}
    icon={<div className="text-2xl">🏘️</div>}
    bgColor="bg-gradient-to-br from-purple-50 to-purple-100"
    iconColor="text-purple-600"
    trend={`+${newThisMonth} this month`}
    trendDirection="up"
    trendColor="text-green-600"
    tooltip="Villages with active telemedicine connections"
  />
);

export const MedicineInventoryCard = ({ stockLevel, criticalLow, wellStocked }) => (
  <StatsCard
    title="Medicine Inventory"
    value={`${stockLevel}%`}
    subtitle={`${criticalLow} items low stock`}
    icon={<div className="text-2xl">💊</div>}
    bgColor="bg-gradient-to-br from-orange-50 to-orange-100"
    iconColor="text-orange-600"
    trend={stockLevel > 70 ? "Well Stocked" : stockLevel > 40 ? "Moderate" : "Critical"}
    trendDirection={stockLevel > 70 ? 'up' : stockLevel > 40 ? 'neutral' : 'down'}
    trendColor={stockLevel > 70 ? "text-green-600" : stockLevel > 40 ? "text-yellow-600" : "text-red-600"}
    tooltip="Overall medicine inventory status across all locations"
  />
);

export const SystemHealthCard = ({ uptime, responseTime, activeConnections }) => (
  <StatsCard
    title="System Health"
    value={`${uptime}%`}
    subtitle={`${responseTime}ms avg response`}
    icon={<div className="text-2xl">⚡</div>}
    bgColor="bg-gradient-to-br from-teal-50 to-teal-100"
    iconColor="text-teal-600"
    trend={uptime > 99 ? "Excellent" : uptime > 95 ? "Good" : "Needs Attention"}
    trendDirection={uptime > 99 ? 'up' : uptime > 95 ? 'neutral' : 'down'}
    trendColor={uptime > 99 ? "text-green-600" : uptime > 95 ? "text-yellow-600" : "text-red-600"}
    tooltip="Real-time system performance metrics"
  />
);

// Compact version for smaller spaces
export const CompactStatsCard = ({ title, value, icon, color = 'blue' }) => (
  <StatsCard
    title={title}
    value={value}
    icon={icon}
    size="small"
    bgColor="bg-white"
    textColor="text-gray-900"
    iconColor={`text-${color}-500`}
  />
);

// Large featured card for main metrics
export const FeaturedStatsCard = ({ title, value, subtitle, icon, trend, onClick }) => (
  <StatsCard
    title={title}
    value={value}
    subtitle={subtitle}
    icon={icon}
    size="large"
    bgColor="bg-gradient-to-br from-indigo-500 to-purple-600"
    textColor="text-white"
    iconColor="text-indigo-100"
    trend={trend}
    trendDirection="up"
    trendColor="text-green-300"
    onClick={onClick}
    animated={true}
    tooltip="Click to view detailed analytics"
  />
);

// Real-time updating card
export const LiveStatsCard = ({ title, value, unit, updateInterval = 30000 }) => {
  const [liveValue, setLiveValue] = useState(value);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time data updates
      const variation = Math.random() * 0.1 - 0.05; // ±5% variation
      setLiveValue(prev => Math.max(0, Math.round(prev * (1 + variation))));
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval]);

  return (
    <StatsCard
      title={title}
      value={`${liveValue}${unit || ''}`}
      subtitle="Live data"
      icon={<div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />}
      bgColor="bg-gradient-to-br from-slate-50 to-slate-100"
      iconColor="text-slate-600"
      trend="Live"
      trendDirection="neutral"
      animated={true}
    />
  );
};

// Emergency alert card
export const AlertStatsCard = ({ title, value, alertLevel = 'warning', message }) => {
  const alertStyles = {
    success: {
      bg: 'bg-gradient-to-br from-green-50 to-green-100',
      text: 'text-green-900',
      icon: 'text-green-600',
      trend: 'bg-green-100 text-green-700'
    },
    warning: {
      bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
      text: 'text-yellow-900',
      icon: 'text-yellow-600',
      trend: 'bg-yellow-100 text-yellow-700'
    },
    error: {
      bg: 'bg-gradient-to-br from-red-50 to-red-100',
      text: 'text-red-900',
      icon: 'text-red-600',
      trend: 'bg-red-100 text-red-700'
    }
  };

  const style = alertStyles[alertLevel];

  return (
    <StatsCard
      title={title}
      value={value}
      subtitle={message}
      icon={<div className="text-2xl">⚠️</div>}
      bgColor={style.bg}
      textColor={style.text}
      iconColor={style.icon}
      trend={alertLevel.toUpperCase()}
      trendDirection={alertLevel === 'error' ? 'down' : alertLevel === 'success' ? 'up' : 'neutral'}
      animated={true}
    />
  );
};

export default StatsCard;