import React from 'react';

interface ChartPoint {
  month: string;
  orders: number;
  revenue: number;
}

interface SalesChartProps {
  data?: ChartPoint[];
}

const defaultChartData: ChartPoint[] = [
  { month: 'Jan', orders: 120, revenue: 45000 },
  { month: 'Feb', orders: 160, revenue: 62000 },
  { month: 'Mar', orders: 140, revenue: 58000 },
  { month: 'Apr', orders: 210, revenue: 84000 },
  { month: 'May', orders: 290, revenue: 112000 },
  { month: 'Jun', orders: 325, revenue: 135890 },
];

export const SalesChart: React.FC<SalesChartProps> = ({ data = defaultChartData }) => {
  const chartData = data && data.length > 0 ? data : defaultChartData;

  const maxOrders = Math.max(...chartData.map((d) => d.orders), 350);
  const maxRevenue = Math.max(...chartData.map((d) => d.revenue), 150000);

  // SVG dimensions
  const width = 650;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  const getX = (index: number) => {
    return paddingX + (index * (width - 2 * paddingX)) / (chartData.length - 1);
  };

  const getOrdersY = (orders: number) => {
    return height - paddingY - (orders / maxOrders) * (height - 2 * paddingY);
  };

  const getRevenueY = (revenue: number) => {
    return height - paddingY - (revenue / maxRevenue) * (height - 2 * paddingY);
  };

  // Build SVG polyline paths
  const ordersPath = chartData.map((d, i) => `${getX(i)},${getOrdersY(d.orders)}`).join(' ');
  const revenuePath = chartData.map((d, i) => `${getX(i)},${getRevenueY(d.revenue)}`).join(' ');

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-heading font-extrabold text-lg text-slate-900">Sales Overview</h3>
          <p className="text-xs text-slate-400">Monthly trend performance (Jan – Jun)</p>
        </div>

        {/* Legend matching Reference Image */}
        <div className="flex items-center gap-5 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span className="text-slate-600">Orders</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF4B6E]"></span>
            <span className="text-slate-600">Revenue</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas for Chart */}
      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[500px]">
          {/* Subtle Grid Lines */}
          <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="#F1F5F9" strokeWidth="1" />
          <line x1={paddingX} y1={height / 2} x2={width - paddingX} y2={height / 2} stroke="#F1F5F9" strokeWidth="1" />
          <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="#E2E8F0" strokeWidth="1" />

          {/* Orders Line (Blue) */}
          <polyline
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={ordersPath}
          />

          {/* Revenue Line (Pink/Red) */}
          <polyline
            fill="none"
            stroke="#FF4B6E"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={revenuePath}
          />

          {/* Data Points */}
          {chartData.map((d, i) => {
            const x = getX(i);
            const yOrders = getOrdersY(d.orders);
            const yRevenue = getRevenueY(d.revenue);

            return (
              <g key={i}>
                {/* Orders point */}
                <circle cx={x} cy={yOrders} r="5" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="2" />
                {/* Revenue point */}
                <circle cx={x} cy={yRevenue} r="5" fill="#FF4B6E" stroke="#FFFFFF" strokeWidth="2" />
                {/* Month label */}
                <text
                  x={x}
                  y={height - 8}
                  textAnchor="middle"
                  fill="#94A3B8"
                  fontSize="11"
                  fontWeight="600"
                >
                  {d.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
