import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TranscriptionResults = () => {
  // Sample transcription data
  const transcriptionData = {
    summary: "The quarterly planning meeting covered key objectives for Q4 2025, including product roadmap updates, resource allocation, and team expansion plans. The team discussed the successful launch of the new AI transcription feature and identified areas for improvement in user onboarding. Budget considerations for hiring two additional engineers were approved, and the marketing team presented their campaign strategy for the upcoming product release.",
    keyPoints: [
      "Q4 product roadmap finalized with focus on AI-powered features and mobile app development",
      "New AI transcription feature achieved 95% accuracy rate in initial testing",
      "Budget approved for hiring two senior engineers and one product designer",
      "Marketing campaign scheduled to launch on November 15th with targeted social media and content strategy",
      "User feedback shows 4.7/5 satisfaction rating, with onboarding improvements needed",
      "Next milestone: Beta launch of mobile app by end of Q4"
    ]
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card 
          className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10"
          style={{ boxShadow: 'var(--shadow-soft)' }}
        >
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">
              Meeting Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">
              {transcriptionData.summary}
            </p>
          </CardContent>
        </Card>

        <Card 
          className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10"
          style={{ boxShadow: 'var(--shadow-soft)' }}
        >
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">
              Key Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {transcriptionData.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span className="text-foreground leading-relaxed flex-1">{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TranscriptionResults;
