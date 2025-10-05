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
    <div className="w-full mx-auto mt-12 space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card 
          className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 md:col-span-1"
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
          className="border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 md:col-span-2"
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
                <li key={index} className="grid grid-cols-[auto_1fr_auto] gap-3 items-start group">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span className="text-foreground leading-relaxed">{point.text}</span>
                  <span className="text-xs text-primary font-semibold font-mono bg-primary/15 border border-primary/40 px-2 py-1 rounded whitespace-nowrap">
                    {point.timestamp}
                  </span>
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
