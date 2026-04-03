import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Users, Award, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Analytics = () => {
  const rolePerformance = [
    { role: 'Full Stack', score: 87, candidates: 45 },
    { role: 'Frontend', score: 82, candidates: 32 },
    { role: 'Backend', score: 85, candidates: 28 },
    { role: 'DevOps', score: 78, candidates: 18 },
    { role: 'Data Science', score: 91, candidates: 15 },
  ];

  const radarData = [
    { skill: 'JavaScript', A: 85, B: 78 },
    { skill: 'React', A: 90, B: 82 },
    { skill: 'Node.js', A: 78, B: 88 },
    { skill: 'DSA', A: 75, B: 80 },
    { skill: 'System Design', A: 82, B: 75 },
  ];

  const funnelData = [
    { stage: 'Applied', count: 248 },
    { stage: 'Aptitude', count: 198 },
    { stage: 'Role Test', count: 156 },
    { stage: 'DSA', count: 124 },
    { stage: 'Passed', count: 98 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Advanced Analytics</h1>
        <p className="text-gray-500 mt-1">Deep insights into assessment performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Avg Success Rate', value: '68%', icon: TrendingUp, color: 'blue' },
          { title: 'Total Assessed', value: '248', icon: Users, color: 'purple' },
          { title: 'Top Score', value: '94%', icon: Award, color: 'green' },
          { title: 'Completion Rate', value: '79%', icon: Target, color: 'orange' },
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Role-based Performance Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={rolePerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="role" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="score" fill="#3b82f6" name="Avg Score" radius={[8, 8, 0, 0]} />
                <Bar dataKey="candidates" fill="#8b5cf6" name="Candidates" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skill Comparison Radar</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="skill" stroke="#6b7280" />
                <PolarRadiusAxis stroke="#6b7280" />
                <Radar name="Current Batch" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Radar name="Previous Batch" dataKey="B" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Candidate Funnel Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={funnelData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" stroke="#6b7280" />
              <YAxis dataKey="stage" type="category" stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="count" fill="#10b981" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
