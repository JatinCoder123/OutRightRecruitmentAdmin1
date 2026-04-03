import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'motion/react';
import { Plus, Edit, Trash2, Eye, Upload } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select } from '../components/ui/select';
import { getDifficultyColor } from '../utils/helpers';

const Questions = () => {
  const { questions } = useSelector((state) => state.questions);
  const [typeFilter, setTypeFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const filteredQuestions = questions.filter((q) => {
    if (typeFilter !== 'all' && q.type !== typeFilter) return false;
    if (difficultyFilter !== 'all' && q.difficulty !== difficultyFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Question Bank</h1>
          <p className="text-gray-500 mt-1">Manage assessment questions and test cases</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Bulk Upload
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Question
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4 mb-6">
            <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="w-48">
              <option value="all">All Types</option>
              <option value="MCQ">MCQ</option>
              <option value="Subjective">Subjective</option>
              <option value="Coding">Coding</option>
            </Select>
            <Select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)} className="w-48">
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredQuestions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="secondary">{question.type}</Badge>
                      <Badge className={getDifficultyColor(question.difficulty)}>
                        {question.difficulty}
                      </Badge>
                      <Badge variant="purple">{question.category}</Badge>
                    </div>
                    <p className="text-gray-900 font-medium">{question.text}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {question.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Questions;
