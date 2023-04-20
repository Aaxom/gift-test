import { useState, FormEvent } from 'react';
import Head from 'next/head';

type Question = {
  question: string;
  category: string;
};

type Talent = {
  [key: string]: string;
};

const optionLabels: Record<string, string> = {
  "1": "完全不符合",
  "2": "不太符合",
  "3": "部分符合",
  "4": "很符合",
  "5": "非常符合",
};

const Home: React.FC = () => {
  const [results, setResults] = useState<Record<string, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions: Question[] = [
    { question: "用艺术性的方式做事", category: "J" },
    { question: "给别人传授知识", category: "E" },
    { question: "需要手眼协调的任务", category: "F" },
    { question: "流畅准确地完成一系列动作", category: "F" },
    { question: "跟随音乐的节拍", category: "G" },
    { question: "判断动物的需求", category: "H" },
    { question: "刻画塑造事物", category: "J" },
    { question: "需要手指灵巧的任务", category: "F" },
    { question: "清楚明白地阐述事情", category: "A" },
    { question: "让配色协调", category: "J" },
    { question: "理解公式", category: "B" },
    { question: "与身体相关的任务", category: "F" },
    { question: "产出丰富的想法", category: "I" },
    { question: "空间想象和思考", category: "C" },
    { question: "找到不同寻常的问题解決办法", category: "I" },
    { question: "有逻辑地思考问题", category: "B" },
    { question: "理解数学向題", category: "B" },
    { question: "用我的语言说服对方", category: "A" },
    { question: "识别和理解我的情绪", category: "D" },
    { question: "用数学方式进行论述", category: "B" },
    { question: "从不同视角想想物体", category: "C" },
    { question: "用语言来表达想法", category: "A" },
    { question: "认识到我的愿望和需求，并与人交流", category: "D" },
    { question: "替别人着想", category: "E" },
    { question: "拥有破框思维", category: "I" },
    { question: "空间定位", category: "C" },
    { question: "遇到压力时让自己平静", category: "D" },
    { question: "根据说明将事物在脑海中呈现出来", category: "C" },
    { question: "与别人打交道", category: "E" },
    { question: "与不熟悉的动物共处", category: "H" },
    { question: "听到旋律中细微的不和谐之处", category: "G" },
    { question: "照料不同种类的植物", category: "H" },
    { question: "唱歌", category: "G" },
    { question: "在时间紧迫的情況下处理问题", category: "D" },
    { question: "识别不同草药并在工作中使用它们", category: "H" },
    { question: "原创性思考", category: "I" },
    { question: "装饰空间", category: "J" },
    { question: "迅速理解对方想要给我传达什么信息", category: "A" },
    { question: "学习不同种类的乐器", category: "G" },
    { question: "在人与人之同斡旋", category: "E" },
  ];

  const talents: Talent = {
    A: "语言天赋",
    B: "逻辑-算数天赋",
    C: "空间天赋",
    D: "内省天赋",
    E: "人际天赋",
    F: "身体-动觉天赋",
    G: "音乐天赋",
    H: "自然天赋",
    I: "创造天赋",
    J: "美学天赋",
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setSubmitted(true);
      const scores: Record<string, number> = {};
      Object.values(answers).forEach((value, index) => {
        const category = questions[index].category;
        scores[category] = (scores[category] || 0) + parseInt(value);
      });
      setResults(scores);
    }
  };

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({ ...answers, [currentQuestionIndex]: event.target.value });
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const displayTalentResult = (score: number) => {
    if (score >= 4 && score <= 7) return "完全不擅长";
    if (score >= 8 && score <= 11) return "不太擅长";
    if (score >= 12 && score <= 15) return "有些擅长";
    if (score >= 16 && score <= 19) return "非常擅长";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>天赋测验</title>
      </Head>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl text-center font-bold mb-8">天赋测验</h1>
        {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-6 mx-3">
            <p className="mb-2 font-semibold">
              {currentQuestionIndex + 1}. {questions[currentQuestionIndex].question}（{questions[currentQuestionIndex].category}类）
            </p>
            <div className="flex flex-col">
              {Object.entries(optionLabels).map(([score, label]) => (
                <label key={score} className="mb-2 flex items-center">
                  <input
                    className="hidden"
                    type="radio"
                    name={`question_${currentQuestionIndex}`}
                    value={score}
                    required
                    onChange={handleAnswerChange}
                    checked={answers[currentQuestionIndex] === score}
                    id={`question_${currentQuestionIndex}_option_${score}`}
                  />
                  <span
                    className={`inline-block w-4 h-4 mr-2 border border-gray-500 rounded-full ${
                      answers[currentQuestionIndex] === score ? 'bg-blue-500' : ''
                    }`}
                  ></span>
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>
          <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded mr-4" onClick={handlePreviousQuestion}>
            上一题
          </button>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {currentQuestionIndex < questions.length - 1 ? '下一题' : '完成'}
          </button>
        </form>
      ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">结果</h2>
            <ul>
              {Object.entries(results).map(([key, value]) => (
                <li key={key} className="mb-2">
                  {talents[key]}（{key}类）: {displayTalentResult(value)} (
                  {value} 分)
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
