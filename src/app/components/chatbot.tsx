"use client";
import { useState } from "react";
import { Send, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
   id: string;
   text: string;
   isUser: boolean;
   timestamp: Date;
}

export function Chatbot() {
   const [isOpen, setIsOpen] = useState(false);
   const [messages, setMessages] = useState<Message[]>([
      {
         id: "1",
         text: "Hi! I'm your neighborhood assistant. Ask me anything about this area - transport links, local amenities, schools, or anything else you'd like to know!",
         isUser: false,
         timestamp: new Date(),
      },
   ]);
   const [inputValue, setInputValue] = useState("");

   const suggestedQuestions = [
      "What are the transport links like?",
      "Tell me about local schools",
      "What shopping options are nearby?",
      "How safe is this neighborhood?",
      "What's the average commute time to Central London?",
   ];

   const handleSendMessage = () => {
      if (!inputValue.trim()) return;

      const userMessage: Message = {
         id: Date.now().toString(),
         text: inputValue,
         isUser: true,
         timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");

      // Simulate AI response
      setTimeout(() => {
         const responses = [
            "Based on the data for HA9 7LL, this area has excellent transport links with the nearest tube station just 0.3 miles away. There are frequent bus services and good road connections to central London.",
            "The local schools in this area have an average rating of 8.5/10. There's 1 elementary school within walking distance and 2 high schools nearby, both with good Ofsted ratings.",
            "This neighborhood offers great shopping options including 2 major shopping centers within 1 mile, plus local convenience stores and a weekly farmers market on Saturdays.",
            "This is considered a safe neighborhood with a crime rate 15% below the London average. There are regular police patrols and good street lighting throughout the area.",
            "The average commute time to Central London is approximately 35-40 minutes by public transport, with multiple route options available.",
         ];

         const randomResponse =
            responses[Math.floor(Math.random() * responses.length)];

         const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: randomResponse,
            isUser: false,
            timestamp: new Date(),
         };

         setMessages((prev) => [...prev, botMessage]);
      }, 1000);
   };

   const handleSuggestedQuestion = (question: string) => {
      setInputValue(question);
   };

   if (!isOpen) {
      return (
         <div className="fixed bottom-6 right-6 z-50">
            <Button
               onClick={() => setIsOpen(true)}
               className="rounded-full size-14 bg-[#9FC131] hover:bg-[#8ab12a] shadow-lg"
            >
               <MessageCircle className="size-6" />
            </Button>
         </div>
      );
   }

   return (
      <div className="fixed bottom-6 right-6 z-50">
         <Card className="w-96 h-[500px] flex flex-col shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-[#9FC131] text-white rounded-t-lg">
               <div className="flex items-center gap-2">
                  <MessageCircle className="size-5" />
                  <h3 className="font-medium">Neighborhood Assistant</h3>
               </div>
               <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
               >
                  <X className="size-4" />
               </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
               <div className="space-y-4">
                  {messages.map((message) => (
                     <div
                        key={message.id}
                        className={`flex ${
                           message.isUser ? "justify-end" : "justify-start"
                        }`}
                     >
                        <div
                           className={`max-w-[80%] p-3 rounded-lg ${
                              message.isUser
                                 ? "bg-[#9FC131] text-white"
                                 : "bg-gray-100 text-gray-900"
                           }`}
                        >
                           <p className="text-sm">{message.text}</p>
                           <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString([], {
                                 hour: "2-digit",
                                 minute: "2-digit",
                              })}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Suggested Questions */}
               {messages.length === 1 && (
                  <div className="mt-6">
                     <p className="text-sm font-medium text-gray-600 mb-3">
                        Suggested questions:
                     </p>
                     <div className="space-y-2">
                        {suggestedQuestions.map((question, index) => (
                           <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="w-full text-left justify-start h-auto p-2 text-xs"
                              onClick={() => handleSuggestedQuestion(question)}
                           >
                              {question}
                           </Button>
                        ))}
                     </div>
                  </div>
               )}
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t">
               <div className="flex gap-2">
                  <Input
                     value={inputValue}
                     onChange={(e) => setInputValue(e.target.value)}
                     placeholder="Ask a question..."
                     onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                     }
                     className="flex-1"
                  />
                  <Button
                     onClick={handleSendMessage}
                     size="sm"
                     className="bg-[#9FC131] hover:bg-[#8ab12a]"
                  >
                     <Send className="size-4" />
                  </Button>
               </div>
            </div>
         </Card>
      </div>
   );
}
