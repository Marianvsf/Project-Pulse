"use client";

import { useRef, useState } from "react";

type FAQEntry = {
    id: number;
    question: string;
    answer: string;
    keywords: string[];
};

type ChatMessage = {
    id: number;
    sender: "bot" | "user";
    text: string;
};

type FaqBotProps = {
    faqEntries: FAQEntry[];
};

const defaultBotAnswer =
    "No encontré una respuesta exacta. Puedes preguntar sobre seguridad, planes, precios, integraciones o cancelación.";

const normalizeText = (text: string) =>
    text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

const getFaqResponse = (question: string, faqEntries: FAQEntry[]): string => {
    const normalizedQuestion = normalizeText(question);

    let bestMatch: FAQEntry | null = null;
    let bestScore = 0;

    for (const entry of faqEntries) {
        const questionText = normalizeText(entry.question);
        let score = 0;

        if (
            normalizedQuestion.includes(questionText) ||
            questionText.includes(normalizedQuestion)
        ) {
            score += 3;
        }

        for (const keyword of entry.keywords) {
            if (normalizedQuestion.includes(keyword)) {
                score += 2;
            }
        }

        if (score > bestScore) {
            bestScore = score;
            bestMatch = entry;
        }
    }

    return bestMatch && bestScore > 0 ? bestMatch.answer : defaultBotAnswer;
};

export default function FaqBot({ faqEntries }: FaqBotProps) {
    const [isFaqBotOpen, setIsFaqBotOpen] = useState<boolean>(false);
    const messageIdRef = useRef<number>(1);
    const [userQuestion, setUserQuestion] = useState<string>("");
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        {
            id: 1,
            sender: "bot",
            text: "Hola. Soy tu bot de FAQ de Project Pulse. Pregúntame sobre planes, seguridad, integraciones o precios.",
        },
    ]);

    const getNextMessageId = () => {
        messageIdRef.current += 1;
        return messageIdRef.current;
    };

    const sendFaqQuestion = (questionOverride?: string) => {
        const question = (questionOverride ?? userQuestion).trim();

        if (!question) {
            return;
        }

        const userMessage: ChatMessage = {
            id: getNextMessageId(),
            sender: "user",
            text: question,
        };

        const botMessage: ChatMessage = {
            id: getNextMessageId(),
            sender: "bot",
            text: getFaqResponse(question, faqEntries),
        };

        setChatMessages((prev) => [...prev, userMessage, botMessage]);
        setUserQuestion("");
    };

    return (
        <div className="fixed bottom-4 right-3 left-3 sm:bottom-6 sm:left-auto sm:right-6 z-[70] flex flex-col items-end gap-3">
            {isFaqBotOpen && (
                <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-slate-900 text-white p-4 sm:p-5 shadow-2xl shadow-slate-900/40">
                    <div className="flex items-center justify-between gap-3 mb-4">
                        <div>
                            <p className="font-bold text-base sm:text-lg">Bot FAQ</p>
                            <p className="text-slate-300 text-xs">Preguntas frecuentes en tiempo real.</p>
                        </div>
                        <button
                            onClick={() => setIsFaqBotOpen(false)}
                            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                            aria-label="Cerrar bot FAQ"
                        >
                            ×
                        </button>
                    </div>

                    <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-3 sm:p-4 h-64 sm:h-72 overflow-y-auto space-y-3">
                        {chatMessages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[88%] px-3 sm:px-4 py-3 rounded-2xl text-sm leading-relaxed break-words ${message.sender === "user"
                                        ? "bg-blue-500 text-white rounded-br-md"
                                        : "bg-slate-700 text-slate-100 rounded-bl-md"
                                        }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {faqEntries.slice(0, 3).map((faq) => (
                            <button
                                key={`sticky-quick-${faq.id}`}
                                onClick={() => sendFaqQuestion(faq.question)}
                                className="text-[11px] px-3 py-1.5 rounded-full border border-slate-600 text-slate-200 hover:bg-slate-800 transition-colors"
                            >
                                {faq.question}
                            </button>
                        ))}
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            value={userQuestion}
                            onChange={(event) => setUserQuestion(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    sendFaqQuestion();
                                }
                            }}
                            placeholder="Escribe tu pregunta..."
                            className="w-full flex-1 h-11 rounded-xl bg-slate-800 border border-slate-700 px-4 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-400"
                        />
                        <button
                            onClick={() => sendFaqQuestion()}
                            className="h-11 w-full sm:w-auto px-4 rounded-xl bg-[#FF7400] hover:bg-[#e66900] text-white font-semibold transition-colors"
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            )}

            <div className="flex w-full items-end justify-end gap-3">
                {!isFaqBotOpen && (
                    <div className="flex max-w-[calc(100vw-5.75rem)] items-center rounded-2xl border border-slate-200 bg-white px-3 py-3 sm:px-4 shadow-lg shadow-slate-900/10">
                        <span className="mr-2 flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <p className="text-[11px] leading-tight font-semibold text-slate-800 sm:text-sm">
                            ¿Tienes dudas? Chatea conmigo.
                        </p>
                    </div>
                )}

                <button
                    onClick={() => setIsFaqBotOpen((prev) => !prev)}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FF7400] text-2xl font-bold text-white shadow-xl shadow-orange-600/30 transition-all hover:scale-105 hover:bg-[#e66900]"
                    aria-label={isFaqBotOpen ? "Ocultar bot FAQ" : "Abrir bot FAQ"}
                >
                    {isFaqBotOpen ? "×" : "?"}
                </button>
            </div>
        </div>
    );
}