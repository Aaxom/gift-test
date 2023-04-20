import { useState, FormEvent } from "react";
import Head from "next/head";

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

const GiftTest: React.FC = () => {
  const [results, setResults] = useState<Record<string, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions: Question[] = [
    { question: "我擅长用艺术性的方式做事？", category: "J" },
    { question: "我擅长给别人传授知识？", category: "E" },
    { question: "我擅长需要手眼协调的任务？", category: "F" },
    { question: "我擅长流畅准确地完成一系列动作？", category: "F" },
    { question: "我擅长跟随音乐的节拍？", category: "G" },
    { question: "我擅长判断动物的需求？", category: "H" },
    { question: "我擅长刻画塑造事物？", category: "J" },
    { question: "我擅长需要手指灵巧的任务？", category: "F" },
    { question: "我擅长清楚明白地阐述事情？", category: "A" },
    { question: "我擅长让配色协调？", category: "J" },
    { question: "我擅长理解公式？", category: "B" },
    { question: "我擅长与身体相关的任务？", category: "F" },
    { question: "我擅长产出丰富的想法？", category: "I" },
    { question: "我擅长空间想象和思考？", category: "C" },
    { question: "我擅长找到不同寻常的问题解決办法？", category: "I" },
    { question: "我擅长有逻辑地思考问题？", category: "B" },
    { question: "我擅长理解数学向題？", category: "B" },
    { question: "我擅长用我的语言说服对方？", category: "A" },
    { question: "我擅长识别和理解我的情绪？", category: "D" },
    { question: "我擅长用数学方式进行论述？", category: "B" },
    { question: "我擅长从不同视角想想物体？", category: "C" },
    { question: "我擅长用语言来表达想法？", category: "A" },
    { question: "我擅长认识到我的愿望和需求，并与人交流？", category: "D" },
    { question: "我擅长替别人着想？", category: "E" },
    { question: "我擅长拥有破框思维？", category: "I" },
    { question: "我擅长空间定位？", category: "C" },
    { question: "我擅长遇到压力时让自己平静？", category: "D" },
    { question: "我擅长根据说明将事物在脑海中呈现出来？", category: "C" },
    { question: "我擅长与别人打交道？", category: "E" },
    { question: "我擅长与不熟悉的动物共处？", category: "H" },
    { question: "我擅长听到旋律中细微的不和谐之处？", category: "G" },
    { question: "我擅长照料不同种类的植物？", category: "H" },
    { question: "我擅长唱歌？", category: "G" },
    { question: "我擅长在时间紧迫的情況下处理问题？", category: "D" },
    { question: "我擅长识别不同草药并在工作中使用它们？", category: "H" },
    { question: "我擅长原创性思考？", category: "I" },
    { question: "我擅长装饰空间？", category: "J" },
    { question: "我擅长迅速理解对方想要给我传达什么信息？", category: "A" },
    { question: "我擅长学习不同种类的乐器？", category: "G" },
    { question: "我擅长在人与人之同斡旋？", category: "E" },
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

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        // 自动跳到下一题
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 500);
    }
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
    if (score >= 16 && score <= 20) return "非常擅长";
  };

  interface TalentPolygonProps {
    scores: { [key: string]: number };
  }

  const TalentPolygon: React.FC<TalentPolygonProps> = ({ scores }) => {
    const categories = Object.keys(scores);
    const numCategories = categories.length;
    const polygonSize = 250;
    const centerX = polygonSize / 2;
    const centerY = polygonSize / 2;
    const radius = polygonSize / 2 - 45;

    const angleSlice = (2 * Math.PI) / numCategories;

    const calculatePoint = (angle: number, level: number) => {
      const x = centerX + radius * Math.cos(angle) * level;
      const y = centerY + radius * Math.sin(angle) * level;
      return { x, y };
    };

    return (
      <svg className="mx-auto" width={polygonSize} height={polygonSize}>
        <g>
          {[4, 3, 2, 1].map((level) => {
            const points = categories
              .map((_, index) => {
                const angle = angleSlice * index - Math.PI / 2;
                const { x, y } = calculatePoint(angle, level / 4);
                return `${x},${y}`;
              })
              .join(" ");

            return (
              <polygon
                key={level}
                points={points}
                fill="none"
                stroke="black"
                strokeWidth="0.5"
                className="dark:stroke-white"
              />
            );
          })}
        </g>
        <g>
          {categories.map((category, index) => {
            const angle = angleSlice * index - Math.PI / 2;
            const scoreLevel = (scores[category] - 1) / 20;
            const { x, y } = calculatePoint(angle, scoreLevel);

            return <circle key={category} cx={x} cy={y} r={3} fill="black" className="dark:fill-white"/>;
          })}
        </g>
        <g>
          {categories.map((category, index) => {
            const angle = angleSlice * index - Math.PI / 2;
            const labelRadius = radius + 20;
            const x = centerX + labelRadius * Math.cos(angle);
            const y = centerY + labelRadius * Math.sin(angle);

            const labelText = `${category}（${scores[category]}分）`;

            return (
              <text
                key={category}
                x={x}
                y={y}
                fontSize="12"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="black"
                className="dark:fill-white"
              >
                {labelText}
              </text>
            );
          })}
        </g>
        <g>
          {categories.map((category, index) => {
            const angle = angleSlice * index - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            return (
              <line
                key={category}
                x1={centerX}
                y1={centerY}
                x2={x}
                y2={y}
                strokeWidth="1"
                stroke="black"
                className="dark:stroke-white"
              />
            );
          })}
        </g>
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      <Head>
        <title>天赋自测</title>
      </Head>

      <div className="px-4 py-8">
        <h1 className="text-4xl text-center font-bold mb-8 text-gray-900 dark:text-gray-200">
          天赋自测
        </h1>
        {!submitted && (
          <div className="max-w-sm mx-auto mb-3 px-4 xs:px-6 sm:px-8 text-gray-700 dark:text-gray-300">
            说明：总共40题，每题5个选项。
          </div>
        )}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="max-w-sm mx-auto px-4 xs:px-6 sm:px-8"
          >
            <div className="mb-6">
              <p className="mb-4 font-semibold text-gray-900 dark:text-gray-200">
                {currentQuestionIndex + 1}.{" "}
                {questions[currentQuestionIndex].question}
              </p>
              <div className="flex flex-col">
                {Object.entries(optionLabels).map(([score, label]) => (
                  <label key={score} className="mb-4 flex items-center">
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
                        answers[currentQuestionIndex] === score
                          ? "bg-blue-500"
                          : ""
                      }`}
                    ></span>
                    <span className="text-gray-900 dark:text-gray-200">
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <button
              type="button"
              className={
                "bg-blue-500 text-white px-4 py-2 rounded mr-4" +
                (currentQuestionIndex === 0
                  ? " opacity-50 cursor-not-allowed"
                  : "")
              }
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              上一题
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {currentQuestionIndex < questions.length - 1
                ? "下一题"
                : "查看结果"}
            </button>
          </form>
        ) : (
          <div className="max-w-sm mx-auto px-4 xs:px-6 sm:px-8">
            <div className="mb-8">
              你最具有
              <span className=" text-red-500">
                {Object.entries(results)
                  .sort((a, b) => b[1] - a[1])
                  .map(([key, value]) => `${talents[key]}`)
                  .slice(0, 3)
                  .join("、")}
              </span>，而
              <span className=" text-blue-500">
                {Object.entries(results)
                  .sort((a, b) => a[1] - b[1])
                  .map(([key, value]) => `${talents[key]}`)
                  .slice(0, 3)
                  .join("、")}
              </span>相对较弱。
            </div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">分析</h2>
              <TalentPolygon scores={results} />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">各项分值</h2>
              <ul>
                {Object.entries(results).map(([key, value]) => (
                  <li key={key} className="mb-2">
                    {key}.{talents[key]}: {displayTalentResult(value)} ({value}{" "}
                    分)
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-8"
              onClick={() => {
                setAnswers(Array(questions.length).fill(""));
                setCurrentQuestionIndex(0);
                setSubmitted(false);
              }}
            >
              重新测试
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftTest;
