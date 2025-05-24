// import { useState, useEffect, useRef } from "react";
// import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

// const ChatBot = () => {
//   const [messages, setMessages] = useState([
//     {
//       text: "Hello! I'm your Rent Easy assistant. How can I help you today?",
//       sender: "bot",
//     },
//   ]);
//   const [inputValue, setInputValue] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [systemInstruction, setSystemInstruction] = useState("");
//   const messagesEndRef = useRef(null);

//   const API_KEY = "AIzaSyCX_pzUX4dL48HQGMoOh_pdEalgQBuUnmg";
//   const genAI = new GoogleGenerativeAI(API_KEY);

//   const safetySettings = [
//     {
//       category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//       threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
//     },
//     {
//       category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//       threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//     }
//   ];

//   useEffect(() => {
//     const fetchSystemInstruction = async () => {
//       try {
//         const response = await fetch('http://localhost/rent-easy/public/userDetails.php');
//         if (!response.ok) throw new Error('Failed to fetch system instruction');
//         const text = await response.text();
//         setSystemInstruction(text);
//       } catch (error) {
//         console.error("Error fetching system instruction:", error);
//       }
//     };

//     fetchSystemInstruction();
//   }, []);

//   const handleSendMessage = async () => {
//     if (!inputValue.trim()) return;

//     const userMessage = { text: inputValue, sender: "user" };
//     setMessages(prev => [...prev, userMessage]);
//     setInputValue("");
//     setIsLoading(true);
    
//     // Add typing indicator
//     setMessages(prev => [...prev, { text: "...", sender: "bot" }]);

//     try {
//       const model = genAI.getGenerativeModel({
//         model: "gemini-1.5-flash",
//         systemInstruction: {
//           role: "system",
//           parts: [{ text: systemInstruction }]
//         },
//         safetySettings
//       });

//       const result = await model.generateContent({
//         contents: [{ role: "user", parts: [{ text: inputValue }] }]
//       });

//       const response = await result.response;
//       const responseText = await response.text();

//       // Remove typing indicator and add actual response
//       setMessages(prev => [...prev.slice(0, -1), { text: responseText, sender: "bot" }]);
//     } catch (error) {
//       console.error("Error:", error);
//       setMessages(prev => [...prev.slice(0, -1), { text: `Error: ${error.message}`, sender: "bot" }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !isLoading) {
//       handleSendMessage();
//     }
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   return (
//     <div className="fixed bottom-5 left-5 w-72 max-h-[250px] flex flex-col bg-white rounded-lg shadow-xl overflow-hidden border border-gray-300">
//       <div className="bg-blue-400 text-white p-3 shadow-md flex justify-between items-center">
//         <h1 className="text-lg font-bold">Rent Easy Assistant</h1>
//         <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//       </div>

//       <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`flex ${
//               message.sender === "user" ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`max-w-[90%] rounded-lg px-3 py-2 text-sm ${
//                 message.sender === "user"
//                   ? "bg-blue-500 text-white rounded-br-none"
//                   : "bg-gray-200 text-gray-800 rounded-bl-none whitespace-pre-wrap"
//               }`}
//             >
//               {message.text === "..." ? (
//                 <div className="flex space-x-1">
//                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                   <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
//                 </div>
//               ) : (
//                 message.text
//               )}
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="border-t border-gray-300 p-3 bg-white">
//         <div className="flex space-x-2">
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             onKeyPress={handleKeyPress}
//             placeholder="Ask about your lease, payments..."
//             className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             disabled={isLoading}
//           />
//           <button
//             onClick={handleSendMessage}
//             disabled={isLoading || !inputValue.trim()}
//             className="bg-blue-500 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
//           >
//             {isLoading ? (
//               <svg
//                 className="animate-spin h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//             ) : (
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBot;