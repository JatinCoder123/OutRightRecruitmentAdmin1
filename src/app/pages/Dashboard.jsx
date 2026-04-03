import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'motion/react';
import {
  Users,
  FileCheck,
  TrendingUp,
  Award,
  Clock,
  User,
  Trophy,
  Database,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { mockDashboardStats, mockPerformanceData, mockRoundPerformance, mockActivityFeed } from '../utils/mockData';

const Dashboard = () => {
  const { candidates } = useSelector((state) => state.candidates);

  const stats = [
    {
      title: 'Total Candidates',
      value: mockDashboardStats.totalCandidates,
      icon: Users,
      color: 'blue',
      trend: '+12%',
      trendUp: true,
    },
    {
      title: 'Active Tests',
      value: mockDashboardStats.activeTests,
      icon: FileCheck,
      color: 'purple',
      trend: '+8%',
      trendUp: true,
    },
    {
      title: 'Pass Rate',
      value: `${mockDashboardStats.passRate}%`,
      icon: TrendingUp,
      color: 'green',
      trend: '+5%',
      trendUp: true,
    },
    {
      title: 'Avg Score',
      value: mockDashboardStats.avgScore,
      icon: Award,
      color: 'orange',
      trend: '-2%',
      trendUp: false,
    },
  ];

  const passFailData = [
    { name: 'Passed', value: 168, color: '#10b981' },
    { name: 'Failed', value: 80, color: '#ef4444' },
  ];

  const activityIcons = {
    user: User,
    file: FileCheck,
    trophy: Trophy,
    users: Users,
    database: Database,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's your assessment platform overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-sm font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.trend}
                      </span>
                      <span className="text-sm text-gray-500">vs last month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Candidate Performance Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="candidates"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Total Candidates"
                />
                <Line
                  type="monotone"
                  dataKey="passed"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Passed"
                />
                <Line
                  type="monotone"
                  dataKey="failed"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Failed"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pass vs Fail */}
        <Card>
          <CardHeader>
            <CardTitle>Pass vs Fail Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={passFailData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {passFailData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Round-wise Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Round-wise Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockRoundPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="round" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="avgScore" fill="#8b5cf6" name="Average Score" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Test Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Test Activity Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={mockPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="candidates"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.2}
                  name="Candidates"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockActivityFeed.map((activity) => {
              const Icon = activityIcons[activity.icon] || Clock;
              return (
                <div key={activity.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
