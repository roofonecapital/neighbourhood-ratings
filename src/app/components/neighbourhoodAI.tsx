"use client";
import { MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RatingResultsProps } from "@/lib/helpers";

interface QuickQuestion {
   text: string;
   icon?: string;
}

const quickQuestions: QuickQuestion[] = [
   { text: "What schools are nearby?" },
   { text: "What gyms are nearby?" },
   { text: "Tell me about transport links" },
   { text: "What restaurants are in the area?" },
   { text: "How safe is this neighborhood?" },
   { text: "What healthcare facilities are close?" },
];

interface NeighborhoodAIOverviewProps {
   onQuestionClick?: (question: string) => void;
}

export function NeighborhoodAIOverview({
   onQuestionClick,
}: NeighborhoodAIOverviewProps) {
   // Generate contextual summary based on rating data
   const getSummary = () => {
      return "HX5 9JB is a vibrant neighborhood in Wembley with strong educational facilities and excellent healthcare access. The area boasts good financial services infrastructure and a growing entertainment scene. With above-average safety ratings and convenient transport links, it's an attractive location for families and young professionals alike. The neighborhood has seen steady development while maintaining its community character, with local amenities within easy reach and a diverse range of dining and shopping options.";
   };

   const handleQuestionClick = (question: string) => {
      console.log(question);
   };

   return (
      <div className="w-full max-w-6xl mx-auto px-4 py-12">
         <Card className="p-8 bg-gradient-to-br from-white to-gray-50">
            <div className="flex items-center gap-3 mb-6">
               <div className="size-10 rounded-full bg-[#9FC131] flex items-center justify-center">
                  <Sparkles className="size-5 text-white" />
               </div>
               <h2 className="text-2xl">Neighbourhood AI Overview</h2>
            </div>

            {/* Summary */}
            <div className="mb-8">
               <p className="text-gray-700 leading-relaxed">{getSummary()}</p>
            </div>

            {/* CTA Section */}
            <div className="bg-white rounded-xl p-6 border-2 border-[#9FC131]/20 mb-6">
               <div className="flex items-start gap-4 mb-4">
                  <div className="size-12 rounded-full bg-[#9FC131]/10 flex items-center justify-center flex-shrink-0">
                     <MessageCircle className="size-6 text-[#9FC131]" />
                  </div>
                  <div className="flex-1">
                     <h3 className="font-medium mb-2">
                        Have questions about this area?
                     </h3>
                     <p className="text-gray-600 text-sm mb-4">
                        Our AI assistant has detailed insights about schools,
                        amenities, transport, and local services. Ask anything!
                     </p>
                  </div>
               </div>
            </div>

            {/* Quick Questions */}
            <div>
               <p className="font-medium mb-4 text-gray-700">
                  Quick questions to get started:
               </p>
               <div className="flex flex-wrap gap-3">
                  {quickQuestions.map((question, index) => (
                     <Button
                        key={index}
                        variant="outline"
                        className="rounded-full border-2 border-[#9FC131]/30 hover:bg-[#9FC131] hover:text-white hover:border-[#9FC131] transition-all"
                        onClick={() => handleQuestionClick(question.text)}
                     >
                        {question.text}
                     </Button>
                  ))}
               </div>
            </div>

            {/* Bottom hint */}
            <div className="mt-6 pt-6 border-t border-gray-200">
               <p className="text-sm text-gray-500 text-center">
                  💬 Click any question or use the chat button in the bottom
                  right to start a conversation
               </p>
            </div>
         </Card>
      </div>
   );
}
