import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'motion/react';
import { Sparkles, Edit, Clock, Code } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const Prompts = () => {
  const { prompts } = useSelector((state) => state.prompts);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Prompts</h1>
          <p className="text-gray-500 mt-1">Manage AI prompt templates for question generation</p>
        </div>
        <Button className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Generate Questions
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {prompts.map((prompt, index) => (
          <motion.div
            key={prompt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="w-5 h-5 text-purple-600" />
                      <CardTitle className="text-lg">{prompt.name}</CardTitle>
                    </div>
                    <p className="text-sm text-gray-500">{prompt.description}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 font-mono">{prompt.template}</p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{prompt.category}</Badge>
                    <Badge variant="secondary">v{prompt.version}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{prompt.lastUpdated}</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  View Version History
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Prompts;
