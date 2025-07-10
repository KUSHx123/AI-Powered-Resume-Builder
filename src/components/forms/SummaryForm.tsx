import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useResume } from '@/contexts/ResumeContext';
import { useAI } from '@/hooks/useAI';
import { toast } from 'sonner';
import { FileText, Sparkles, RefreshCw } from 'lucide-react';

export function SummaryForm() {
  const { state, updateSummary } = useResume();
  const { generateContent, isLoading } = useAI();
  const [summary, setSummary] = useState(state.data.summary);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleGenerateAI = async () => {
    const jobTitle = state.data.experience[0]?.position || 'Professional';
    
    try {
      const response = await generateContent({
        type: 'summary',
        context: `Generate a professional summary for a ${jobTitle}`,
        jobTitle
      });
      
      if (response.suggestions.length > 0) {
        setSuggestions(response.suggestions);
        toast.success('AI suggestions generated!');
      }
    } catch (error) {
      toast.error('Failed to generate AI suggestions');
    }
  };

  const handleSave = () => {
    updateSummary(summary);
    toast.success('Professional summary saved successfully!');
  };

  const handleUseSuggestion = (suggestion: string) => {
    setSummary(suggestion);
    setSuggestions([]);
  };

  const wordCount = summary.split(/\s+/).filter(word => word.length > 0).length;
  const recommendedRange = { min: 50, max: 150 };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Professional Summary</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Summary</label>
              <div className="flex items-center space-x-2">
                <Badge variant={
                  wordCount < recommendedRange.min ? 'destructive' :
                  wordCount > recommendedRange.max ? 'secondary' : 'default'
                }>
                  {wordCount} words
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleGenerateAI}
                  disabled={isLoading}
                  className="flex items-center space-x-2"
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  <span>AI Generate</span>
                </Button>
              </div>
            </div>
            <Textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Write a brief professional summary that highlights your key skills, experience, and career objectives..."
              className="min-h-[120px] resize-none"
              rows={5}
            />
            <p className="text-sm text-gray-500 mt-2">
              Recommended: {recommendedRange.min}-{recommendedRange.max} words
            </p>
          </div>

          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">
                AI Suggestions:
              </h4>
              {suggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                >
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    {suggestion}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUseSuggestion(suggestion)}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    Use This
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-end"
          >
            <Button onClick={handleSave} className="w-full md:w-auto">
              Save Summary
            </Button>
          </motion.div>
        </motion.div>
      </CardContent>
    </Card>
  );
}