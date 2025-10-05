import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TranscriptionResults = () => {
  // Sample transcription data
  const transcriptionData = {
    summary: "The quarterly planning meeting covered key objectives for Q4 2025, including product roadmap updates, resource allocation, and team expansion plans. The team discussed the successful launch of the new AI transcription feature and identified areas for improvement in user onboarding. Budget considerations for hiring two additional engineers were approved, and the marketing team presented their campaign strategy for the upcoming product release.",
    keyPoints: [
      { text: "Q4 product roadmap finalized with focus on AI-powered features and mobile app development", timestamp: "02:15" },
      { text: "New AI transcription feature achieved 95% accuracy rate in initial testing", timestamp: "05:42" },
      { text: "Budget approved for hiring two senior engineers and one product designer", timestamp: "12:30" },
      { text: "Marketing campaign scheduled to launch on November 15th with targeted social media and content strategy", timestamp: "18:05" },
      { text: "User feedback shows 4.7/5 satisfaction rating, with onboarding improvements needed", timestamp: "23:18" },
      { text: "Next milestone: Beta launch of mobile app by end of Q4", timestamp: "28:50" }
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
            <ul className="space-y-4">
              {transcriptionData.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <span className="text-primary font-bold mt-1">•</span>
                  <div className="flex-1 space-y-1">
                    <span className="text-foreground leading-relaxed block">{point.text}</span>
                    <span className="text-xs text-primary/60 font-mono bg-primary/5 px-2 py-0.5 rounded inline-block">
                      {point.timestamp}
                    </span>
                  </div>
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
