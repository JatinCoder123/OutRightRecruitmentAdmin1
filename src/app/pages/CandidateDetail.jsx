import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Mail,
  Calendar,
  Briefcase,
  Award,
  Clock,
  CheckCircle,
  Circle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import * as Tabs from '@radix-ui/react-tabs';
import { getStatusColor, formatDate } from '../utils/helpers';

const CandidateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { candidates } = useSelector((state) => state.candidates);
  const [activeTab, setActiveTab] = useState('overview');
  
  const candidate = candidates.find((c) => c.id === id);

  if (!candidate) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Candidate not found</p>
      </div>
    );
  }

  const rounds = [
    {
      name: 'Aptitude',
      status: candidate.aptitudeScore > 0 ? 'completed' : 'pending',
      score: candidate.aptitudeScore,
      timeTaken: '45 min',
    },
    {
      name: 'Role',
      status: candidate.roleScore > 0 ? 'completed' : candidate.aptitudeScore > 0 ? 'in-progress' : 'pending',
      score: candidate.roleScore,
      timeTaken: '60 min',
    },
    {
      name: 'DSA',
      status: candidate.dsaScore > 0 ? 'completed' : candidate.roleScore > 0 ? 'in-progress' : 'pending',
      score: candidate.dsaScore,
      timeTaken: '90 min',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/candidates')}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">Candidate Details</h1>
          <p className="text-gray-500 mt-1">Complete assessment overview and performance</p>
        </div>
      </div>

      {/* Profile Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <img
              src={candidate.avatar}
              alt={candidate.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{candidate.name}</h2>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{candidate.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Briefcase className="w-4 h-4" />
                      <span className="text-sm">{candidate.role}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Applied: {formatDate(candidate.appliedDate)}</span>
                    </div>
                    {candidate.completedDate && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">Completed: {formatDate(candidate.completedDate)}</span>
                      </div>
                    )}
                  </div>
                </div>
                <Badge className={getStatusColor(candidate.status)}>
                  {candidate.status}
                </Badge>
              </div>

              <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-500">Overall Score</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{candidate.overallScore}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Aptitude</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">{candidate.aptitudeScore}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role Test</p>
                  <p className="text-2xl font-bold text-purple-600 mt-1">{candidate.roleScore}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">DSA</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">{candidate.dsaScore}%</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

            <div className="space-y-8">
              {rounds.map((round, index) => (
                <motion.div
                  key={round.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-start gap-6"
                >
                  {/* Timeline icon */}
                  <div className="relative z-10">
                    {round.status === 'completed' ? (
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                    ) : round.status === 'in-progress' ? (
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock className="w-8 h-8 text-blue-600" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <Circle className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Round details */}
                  <div className="flex-1">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{round.name} Round</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {round.status === 'completed'
                              ? 'Completed successfully'
                              : round.status === 'in-progress'
                              ? 'Currently in progress'
                              : 'Not started yet'}
                          </p>
                        </div>
                        <Badge className={getStatusColor(round.status)}>
                          {round.status}
                        </Badge>
                      </div>

                      {round.status === 'completed' && (
                        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
                          <div>
                            <p className="text-sm text-gray-500">Score</p>
                            <p className="text-xl font-bold text-gray-900 mt-1">{round.score}%</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Time Taken</p>
                            <p className="text-xl font-bold text-gray-900 mt-1">{round.timeTaken}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">AI Evaluation</p>
                            <p className="text-xl font-bold text-green-600 mt-1">
                              <Award className="w-5 h-5 inline" /> Good
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List className="flex gap-4 border-b border-gray-200">
          <Tabs.Trigger
            value="overview"
            className="px-4 py-2 text-sm font-medium text-gray-600 border-b-2 border-transparent data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 transition-colors"
          >
            Overview
          </Tabs.Trigger>
          <Tabs.Trigger
            value="answers"
            className="px-4 py-2 text-sm font-medium text-gray-600 border-b-2 border-transparent data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 transition-colors"
          >
            Answers
          </Tabs.Trigger>
          <Tabs.Trigger
            value="feedback"
            className="px-4 py-2 text-sm font-medium text-gray-600 border-b-2 border-transparent data-[state=active]:text-blue-600 data-[state=active]:border-blue-600 transition-colors"
          >
            Feedback
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="overview" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Performance Summary</h3>
              <p className="text-gray-600">
                {candidate.name} has completed the assessment with an overall score of {candidate.overallScore}%.
                Strong performance in role-specific questions with room for improvement in DSA section.
              </p>
            </CardContent>
          </Card>
        </Tabs.Content>

        <Tabs.Content value="answers" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Submitted Answers</h3>
              <p className="text-gray-600">Detailed answer review will be displayed here.</p>
            </CardContent>
          </Card>
        </Tabs.Content>

        <Tabs.Content value="feedback" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">AI-Generated Feedback</h3>
              <p className="text-gray-600">AI evaluation and personalized feedback will be shown here.</p>
            </CardContent>
          </Card>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default CandidateDetail;
