import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'motion/react';
import { Download, Trophy, Medal, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { getStatusColor } from '../utils/helpers';

const Results = () => {
  const { results } = useSelector((state) => state.results);

  const topPerformers = [...results]
    .filter((r) => r.status === 'passed')
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Results & Leaderboard</h1>
          <p className="text-gray-500 mt-1">View and export assessment results</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topPerformers.map((result, index) => (
              <motion.div
                key={result.candidateId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-gray-200">
                  {index === 0 && <Trophy className="w-6 h-6 text-yellow-500" />}
                  {index === 1 && <Medal className="w-6 h-6 text-gray-400" />}
                  {index === 2 && <Award className="w-6 h-6 text-orange-500" />}
                  {index > 2 && <span className="font-bold text-gray-600">{index + 1}</span>}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{result.candidateName}</p>
                  <p className="text-sm text-gray-500">{result.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{result.score}%</p>
                  <Badge className={getStatusColor(result.status)} className="mt-1">
                    {result.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Results</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Candidate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((result) => (
                  <tr key={result.candidateId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {result.candidateName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {result.score}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getStatusColor(result.status)}>{result.status}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Results;
