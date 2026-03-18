import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  User, 
  Users, 
  ChevronRight, 
  Sparkles, 
  Gamepad2,
  Star,
  RotateCcw,
  CheckCircle2,
  XCircle
} from 'lucide-react';

type Section = 'learn' | 'quiz' | 'result';

const FAMILY_MEMBERS = [
  { s: 'El Padre', a: 'Հայր', e: 'Father', icon: User, color: 'bg-blue-500' },
  { s: 'La Madre', a: 'Մայր', e: 'Mother', icon: Heart, color: 'bg-pink-500' },
  { s: 'El Hermano', a: 'Եղբայր', e: 'Brother', icon: User, color: 'bg-indigo-500' },
  { s: 'La Hermana', a: 'Քույր', e: 'Sister', icon: Heart, color: 'bg-rose-500' },
  { s: 'El Abuelo', a: 'Պապիկ', e: 'Grandfather', icon: User, color: 'bg-slate-600' },
  { s: 'La Abuela', a: 'Տատիկ', e: 'Grandmother', icon: Heart, color: 'bg-purple-500' },
  { s: 'El Tío', a: 'Հորեղբայր / Մորեղբայր', e: 'Uncle', icon: User, color: 'bg-emerald-500' },
  { s: 'La Tía', a: 'Հորաքույր / Մորաքույր', e: 'Aunt', icon: Heart, color: 'bg-amber-500' },
];

const SENTENCE_QUIZ = [
  { 
    prompt: 'Իմ հայրը բարի է', 
    answer: 'Mi padre es bueno', 
    words: ['Mi', 'padre', 'es', 'bueno'] 
  },
  { 
    prompt: 'Մայրը գեղեցիկ է', 
    answer: 'La madre es bonita', 
    words: ['La', 'madre', 'es', 'bonita'] 
  },
  { 
    prompt: 'Եղբայրը փոքր է', 
    answer: 'El hermano es pequeño', 
    words: ['El', 'hermano', 'es', 'pequeño'] 
  },
  { 
    prompt: 'Տատիկը ծեր է', 
    answer: 'La abuela es vieja', 
    words: ['La', 'abuela', 'es', 'vieja'] 
  },
  { 
    prompt: 'Իմ ընտանիքը մեծ է', 
    answer: 'Mi familia es grande', 
    words: ['Mi', 'familia', 'es', 'grande'] 
  },
  { 
    prompt: 'Պապիկը իմաստուն է', 
    answer: 'El abuelo es sabio', 
    words: ['El', 'abuelo', 'es', 'sabio'] 
  },
  { 
    prompt: 'Քույրը ուրախ է', 
    answer: 'La hermana está feliz', 
    words: ['La', 'hermana', 'está', 'feliz'] 
  },
  { 
    prompt: 'Հորեղբայրը բարձրահասակ է', 
    answer: 'El tío es alto', 
    words: ['El', 'tío', 'es', 'alto'] 
  },
  { 
    prompt: 'Հորաքույրը աշխատասեր է', 
    answer: 'La tía es trabajadora', 
    words: ['La', 'tía', 'es', 'trabajadora'] 
  },
  { 
    prompt: 'Իմ տունը գեղեցիկ է', 
    answer: 'Mi casa es bonita', 
    words: ['Mi', 'casa', 'es', 'bonita'] 
  },
];

export default function FamilyAdventure() {
  const [section, setSection] = useState<Section>('learn');
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [shuffledWords, setShuffledWords] = useState<{word: string, originalIndex: number}[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (section === 'quiz') {
      const current = SENTENCE_QUIZ[quizIndex];
      const wordsWithIndices = current.words.map((w, i) => ({ word: w, originalIndex: i }));
      // Shuffle words
      const shuffled = [...wordsWithIndices].sort(() => Math.random() - 0.5);
      setShuffledWords(shuffled);
      setSelectedIndices([]);
      setIsCorrect(null);
    }
  }, [quizIndex, section]);

  const handleWordClick = (indexInShuffled: number) => {
    if (isCorrect !== null) return;
    if (selectedIndices.includes(indexInShuffled)) return;
    setSelectedIndices([...selectedIndices, indexInShuffled]);
  };

  const removeWord = (indexInSelected: number) => {
    if (isCorrect !== null) return;
    const newSelected = [...selectedIndices];
    newSelected.splice(indexInSelected, 1);
    setSelectedIndices(newSelected);
  };

  const checkAnswer = () => {
    const current = SENTENCE_QUIZ[quizIndex];
    const userSentence = selectedIndices.map(idx => shuffledWords[idx].word).join(' ');
    if (userSentence === current.answer) {
      setIsCorrect(true);
      setScore(s => s + 1);
    } else {
      setIsCorrect(false);
    }
  };

  const nextQuestion = () => {
    if (quizIndex < SENTENCE_QUIZ.length - 1) {
      setQuizIndex(i => i + 1);
    } else {
      setSection('result');
    }
  };

  const reset = () => {
    setSection('learn');
    setQuizIndex(0);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-yellow-50 font-sans selection:bg-yellow-200">
      {/* Header */}
      <header className="bg-white border-b-4 border-yellow-200 p-6 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Mi Familia</h1>
          </div>
          <div className="px-4 py-2 bg-slate-100 rounded-full text-xs font-black text-slate-400 uppercase tracking-widest">
            Գայանեի համար
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 md:p-12">
        <AnimatePresence mode="wait">
          {section === 'learn' && (
            <motion.div 
              key="learn"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-black text-slate-900 uppercase">Սովորենք Ընտանիքի Անդամներին</h2>
                <p className="text-slate-500 text-xl font-medium">Սեղմիր քարտերի վրա՝ իմանալու համար:</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {FAMILY_MEMBERS.map((member, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="bg-white rounded-[40px] p-6 border-4 border-slate-100 shadow-xl hover:border-yellow-400 transition-all cursor-pointer group"
                  >
                    <div className={`w-16 h-16 ${member.color} rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-inner`}>
                      <member.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-center space-y-1">
                      <p className="text-xl font-black text-slate-900">{member.s}</p>
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{member.e}</p>
                      <p className="text-lg font-bold text-yellow-600 pt-2">{member.a}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center pt-8">
                <button 
                  onClick={() => setSection('quiz')}
                  className="px-12 py-6 bg-yellow-400 text-white rounded-[32px] font-black text-2xl shadow-xl shadow-yellow-400/30 hover:bg-yellow-500 transition-all active:scale-95 flex items-center gap-4"
                >
                  ԽԱՂԱԼ ԽԱՂԸ
                  <Gamepad2 className="w-8 h-8" />
                </button>
              </div>
            </motion.div>
          )}

          {section === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
              className="max-w-3xl mx-auto space-y-8"
            >
              <div className="bg-white rounded-[40px] p-12 border-4 border-yellow-200 shadow-2xl text-center space-y-8">
                <div className="flex justify-center">
                  <div className="px-6 py-2 bg-yellow-100 text-yellow-700 rounded-full font-black text-sm uppercase tracking-widest">
                    Հարց {quizIndex + 1} / {SENTENCE_QUIZ.length}
                  </div>
                </div>
                <h3 className="text-5xl font-black text-indigo-600 tracking-tight">
                  {SENTENCE_QUIZ[quizIndex].prompt}
                </h3>
                <p className="text-slate-400 font-medium italic">Թարգմանիր այս նախադասությունը իսպաներեն</p>
              </div>

              {/* Result Area */}
              <div className="min-h-[100px] bg-white rounded-[32px] p-6 border-4 border-dashed border-slate-200 flex flex-wrap gap-3 items-center justify-center">
                {selectedIndices.map((idx, i) => (
                  <motion.button
                    layoutId={`word-${idx}`}
                    key={`selected-${i}`}
                    onClick={() => removeWord(i)}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xl shadow-md hover:bg-indigo-700 transition-colors"
                  >
                    {shuffledWords[idx].word}
                  </motion.button>
                ))}
              </div>

              {/* Word Pool Area */}
              <div className="flex flex-wrap gap-4 justify-center">
                {shuffledWords.map((item, i) => {
                  const isSelected = selectedIndices.includes(i);
                  return (
                    <div key={i} className="relative">
                      {/* Placeholder Grey Block */}
                      <div className="px-6 py-3 bg-slate-200 text-transparent rounded-2xl font-black text-xl select-none">
                        {item.word}
                      </div>
                      
                      {/* Actual Word Button */}
                      {!isSelected && (
                        <motion.button
                          layoutId={`word-${i}`}
                          onClick={() => handleWordClick(i)}
                          className="absolute inset-0 px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl font-black text-xl shadow-sm hover:border-yellow-400 hover:bg-yellow-50 transition-all"
                        >
                          {item.word}
                        </motion.button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Feedback & Actions */}
              <div className="space-y-4">
                {isCorrect === null ? (
                  <button
                    disabled={selectedIndices.length === 0}
                    onClick={checkAnswer}
                    className="w-full py-6 bg-yellow-400 text-white rounded-[32px] font-black text-2xl shadow-xl hover:bg-yellow-500 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ՍՏՈՒԳԵԼ
                  </button>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className={`p-8 rounded-[32px] flex flex-col items-center gap-4 ${isCorrect ? 'bg-emerald-50 border-4 border-emerald-200' : 'bg-rose-50 border-4 border-rose-200'}`}
                  >
                    <div className="flex items-center gap-3">
                      {isCorrect ? (
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                      ) : (
                        <XCircle className="w-10 h-10 text-rose-500" />
                      )}
                      <span className={`text-3xl font-black ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {isCorrect ? 'ՃԻՇՏ Է!' : 'ՍԽԱԼ Է'}
                      </span>
                    </div>
                    {!isCorrect && (
                      <p className="text-rose-600 font-bold text-xl">
                        Ճիշտ պատասխանը: <span className="underline">{SENTENCE_QUIZ[quizIndex].answer}</span>
                      </p>
                    )}
                    <button
                      onClick={nextQuestion}
                      className="mt-4 px-12 py-4 bg-slate-900 text-white rounded-full font-black text-xl hover:bg-slate-800 transition-all flex items-center gap-3"
                    >
                      {quizIndex === SENTENCE_QUIZ.length - 1 ? 'ՏԵՍՆԵԼ ԱՐԴՅՈՒՆՔԸ' : 'ՀԱՋՈՐԴԸ'}
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </motion.div>
                )}
              </div>

              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => {
                    setSelectedIndices([]);
                    setIsCorrect(null);
                  }}
                  className="p-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 transition-colors"
                  title="Մաքրել"
                >
                  <RotateCcw className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          )}

          {section === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center space-y-12"
            >
              <div className="bg-white rounded-[50px] p-16 border-8 border-yellow-400 shadow-2xl space-y-8">
                <div className="relative inline-block">
                  <Star className="w-32 h-32 text-yellow-400 fill-yellow-400 animate-bounce" />
                  <Sparkles className="absolute -top-4 -right-4 w-12 h-12 text-yellow-500" />
                </div>
                <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">ԱՊՐԵ՛Ս:</h2>
                <p className="text-3xl font-bold text-slate-500">
                  Դու հավաքեցիր <span className="text-yellow-500 text-5xl font-black">{score}</span> միավոր!
                </p>
                <div className="flex flex-col gap-4 pt-8">
                  <button 
                    onClick={reset}
                    className="w-full py-6 bg-yellow-400 text-white rounded-[32px] font-black text-2xl shadow-xl hover:bg-yellow-500 transition-all active:scale-95"
                  >
                    ԿՐԿՆԵԼ ԽԱՂԸ
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
