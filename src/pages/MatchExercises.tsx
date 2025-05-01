import React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import {
  Dumbbell,
  Waves,
  Bike,
  PersonStanding,
  Footprints,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Quiz questions
const questions = [
  {
    id: 1,
    question: "How would you describe your ideal workout environment?",
    options: [
      {
        id: "a",
        text: "A peaceful, quiet space where I can focus on my breath and movement",
        type: "yoga",
      },
      {
        id: "b",
        text: "A high-energy gym with music and equipment",
        type: "hiit",
      },
      {
        id: "c",
        text: "Outdoors in nature, breathing fresh air",
        type: "cardio",
      },
      { id: "d", text: "A pool or body of water", type: "swimming" },
      {
        id: "e",
        text: "A studio with a bike and motivating instructor",
        type: "cycling",
      },
    ],
  },
  {
    id: 2,
    question: "What's your main fitness goal?",
    options: [
      { id: "a", text: "Improve flexibility and reduce stress", type: "yoga" },
      { id: "b", text: "Build strength and burn fat quickly", type: "hiit" },
      {
        id: "c",
        text: "Improve endurance and cardiovascular health",
        type: "cardio",
      },
      { id: "d", text: "Low-impact full body workout", type: "swimming" },
      {
        id: "e",
        text: "Improve leg strength and cardio without impact",
        type: "cycling",
      },
    ],
  },
  {
    id: 3,
    question: "How much time can you dedicate to exercise?",
    options: [
      { id: "a", text: "30-60 minutes of focused practice", type: "yoga" },
      { id: "b", text: "20-30 minutes of intense training", type: "hiit" },
      { id: "c", text: "45+ minutes for a good run or walk", type: "cardio" },
      { id: "d", text: "30-45 minutes in the water", type: "swimming" },
      { id: "e", text: "30-45 minutes on the bike", type: "cycling" },
    ],
  },
  {
    id: 4,
    question: "How do you feel about sweating during workouts?",
    options: [
      {
        id: "a",
        text: "I prefer gentle movement with minimal sweating",
        type: "yoga",
      },
      { id: "b", text: "The more I sweat, the better I feel!", type: "hiit" },
      {
        id: "c",
        text: "I don't mind sweating if I'm making progress",
        type: "cardio",
      },
      { id: "d", text: "I prefer not to notice my sweat", type: "swimming" },
      {
        id: "e",
        text: "I enjoy a good sweat session on the bike",
        type: "cycling",
      },
    ],
  },
  {
    id: 5,
    question: "How would you describe your current fitness level?",
    options: [
      {
        id: "a",
        text: "I'm a beginner looking for something accessible",
        type: "yoga",
      },
      { id: "b", text: "I'm fit and looking for a challenge", type: "hiit" },
      {
        id: "c",
        text: "I can handle moderate activity for extended periods",
        type: "cardio",
      },
      {
        id: "d",
        text: "I'm comfortable in water and looking for a full workout",
        type: "swimming",
      },
      {
        id: "e",
        text: "I have decent leg strength and enjoy cardio",
        type: "cycling",
      },
    ],
  },
  {
    id: 6,
    question: "What's your preferred pace of exercise?",
    options: [
      { id: "a", text: "Slow and mindful", type: "yoga" },
      { id: "b", text: "Fast-paced with bursts of intensity", type: "hiit" },
      { id: "c", text: "Steady and rhythmic", type: "cardio" },
      { id: "d", text: "Fluid and continuous", type: "swimming" },
      {
        id: "e",
        text: "Variable with options to adjust intensity",
        type: "cycling",
      },
    ],
  },
  {
    id: 7,
    question: "How do you feel about group workouts?",
    options: [
      {
        id: "a",
        text: "I enjoy the peaceful energy of a group class",
        type: "yoga",
      },
      {
        id: "b",
        text: "I thrive on the competitive energy of group training",
        type: "hiit",
      },
      {
        id: "c",
        text: "I prefer to exercise alone at my own pace",
        type: "cardio",
      },
      {
        id: "d",
        text: "I like having others around but focus on my own lane",
        type: "swimming",
      },
      {
        id: "e",
        text: "I enjoy the motivation of a group cycling class",
        type: "cycling",
      },
    ],
  },
  {
    id: 8,
    question: "How important is variety in your workout routine?",
    options: [
      {
        id: "a",
        text: "I appreciate subtle variations within a consistent practice",
        type: "yoga",
      },
      {
        id: "b",
        text: "I need constant variety to stay engaged",
        type: "hiit",
      },
      {
        id: "c",
        text: "I'm content with a similar routine if I can vary intensity or route",
        type: "cardio",
      },
      {
        id: "d",
        text: "I enjoy mixing up strokes and intensities",
        type: "swimming",
      },
      {
        id: "e",
        text: "I like varying resistance and speed within the same activity",
        type: "cycling",
      },
    ],
  },
  {
    id: 9,
    question: "How do you prefer to track your progress?",
    options: [
      {
        id: "a",
        text: "By how I feel - more flexible, calm, and centered",
        type: "yoga",
      },
      {
        id: "b",
        text: "By performance metrics - more reps, heavier weights, less rest",
        type: "hiit",
      },
      { id: "c", text: "By distance and time improvements", type: "cardio" },
      {
        id: "d",
        text: "By lap times and endurance in the water",
        type: "swimming",
      },
      {
        id: "e",
        text: "By power output, cadence, and distance",
        type: "cycling",
      },
    ],
  },
  {
    id: 10,
    question: "What's your attitude toward exercise?",
    options: [
      {
        id: "a",
        text: "It's a practice for mind-body connection and wellness",
        type: "yoga",
      },
      {
        id: "b",
        text: "It's a challenge to push my limits and get results",
        type: "hiit",
      },
      {
        id: "c",
        text: "It's a way to clear my mind and enjoy movement",
        type: "cardio",
      },
      {
        id: "d",
        text: "It's a refreshing activity that makes me feel good",
        type: "swimming",
      },
      {
        id: "e",
        text: "It's an efficient way to get a great workout",
        type: "cycling",
      },
    ],
  },
];

// Exercise type information
const exerciseTypes = {
  yoga: {
    title: "Yoga & Mindful Movement",
    description: "A mind-body practice that combines physical postures, breathing techniques, and meditation.",
    benefits: [
      "Increases flexibility and joint mobility",
      "Reduces stress and anxiety through mindful breathing",
      "Builds functional strength and balance",
      "Improves posture and body awareness",
      "Enhances mental focus and clarity",
    ],
    gettingStarted:
      "Start with beginner-friendly yoga classes, either online or at a local studio. Focus on basic poses like mountain pose, downward dog, and child's pose. Practice proper breathing techniques and don't rush your progress. Begin with 2-3 sessions per week, 20-30 minutes each, and gradually increase duration as your flexibility and strength improve.",
    icon: PersonStanding,
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    textColor: "text-purple-700",
  },
  hiit: {
    title: "High-Intensity Interval Training (HIIT)",
    description: "Alternating short periods of intense exercise with less intense recovery periods.",
    benefits: [
      "Burns calories efficiently (even after workout ends)",
      "Builds strength and power through explosive movements",
      "Improves cardiovascular health and VO2 max",
      "Requires minimal or no equipment",
      "Time-efficient (effective in 20-30 minutes)",
    ],
    gettingStarted:
      "Begin with shorter HIIT sessions (10-15 minutes) and gradually increase duration as your fitness improves. Always include a proper 5-minute warm-up and cool-down. Start with a simple work-to-rest ratio like 30 seconds of work followed by 30 seconds of rest. Choose basic exercises like jumping jacks, squats, and push-ups before advancing to more complex movements. Limit sessions to 2-3 times per week with rest days in between.",
    icon: Dumbbell,
    color: "bg-red-600",
    lightColor: "bg-red-50",
    textColor: "text-red-700",
  },
  cardio: {
    title: "Running & Walking",
    description: "Cardiovascular exercises that can be adjusted to any fitness level.",
    benefits: [
      "Strengthens heart and improves circulation",
      "Burns calories and supports weight management",
      "Builds lower body strength and endurance",
      "Releases endorphins that boost mood and reduce stress",
      "Requires minimal equipment and can be done anywhere",
    ],
    gettingStarted:
      "Start with a walk/run program if you're new to running. Try intervals of 2-3 minutes walking followed by 30 seconds of jogging, gradually increasing the running intervals as your fitness improves. Invest in properly fitted running shoes to prevent injury. Begin with 3 sessions per week and focus on time rather than distance (start with 20-30 minutes). Track your progress with a fitness app and increase your distance or pace by no more than 10% each week.",
    icon: Footprints,
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50",
    textColor: "text-emerald-700",
  },
  swimming: {
    title: "Swimming & Aquatic Exercise",
    description: "A full-body workout in water that's gentle on joints.",
    benefits: [
      "Provides a complete full-body workout",
      "Virtually zero impact on joints and spine",
      "Improves cardiovascular health and lung capacity",
      "Builds muscular endurance and tone",
      "Water resistance strengthens muscles without weights",
    ],
    gettingStarted:
      "If you're new to swimming for fitness, consider taking a few lessons to improve your technique. Start with shorter sessions (20-30 minutes) focusing on proper form rather than speed. Begin with a single stroke you're comfortable with (often freestyle or breaststroke) and practice rhythmic breathing. Use flotation devices or pull buoys if needed. Gradually increase duration before increasing intensity, and aim for 2-3 swim sessions per week with at least one rest day between workouts.",
    icon: Waves,
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    textColor: "text-blue-700",
  },
  cycling: {
    title: "Cycling & Indoor Spinning",
    description: "A low-impact cardio exercise that strengthens the lower body.",
    benefits: [
      "Builds significant leg strength and power",
      "Improves cardiovascular fitness and stamina",
      "Low impact makes it accessible for many fitness levels",
      "Highly adjustable intensity through gears/resistance",
      "Can be social (group rides) or solitary",
    ],
    gettingStarted:
      "Begin with shorter rides (20-30 minutes) on flat terrain or a stationary bike with moderate resistance. Ensure your bike is properly fitted to your height to prevent discomfort and injury. Focus on maintaining a cadence of 70-90 rpm with light to moderate resistance. For outdoor cycling, start in areas with less traffic and practice basic safety skills. For indoor cycling, try following along with beginner-friendly video classes. Gradually increase duration before adding more resistance or tackling hills.",
    icon: Bike,
    color: "bg-orange-500",
    lightColor: "bg-orange-50",
    textColor: "text-orange-700",
  },
};

export default function MatchExercises() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (questionId: number, answerType: string) => {
    setAnswers({
      ...answers,
      [questionId]: answerType,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    const typeCounts: Record<string, number> = {
      yoga: 0,
      hiit: 0,
      cardio: 0,
      swimming: 0,
      cycling: 0,
    };

    // Count the occurrences of each exercise type
    Object.values(answers).forEach((type) => {
      if (type in typeCounts) {
        typeCounts[type]++;
      }
    });

    // Find the exercise type with the highest count
    let maxCount = 0;
    let resultType = "";

    Object.entries(typeCounts).forEach(([type, count]) => {
      if (count > maxCount) {
        maxCount = count;
        resultType = type;
      }
    });

    setResult(resultType);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="font-nunito p-8 md:py-10">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-2 md:mb-10">
          <h1 className="text-3xl font-bold md:text-4xl">Match Exercises</h1>
          <p className="text-muted-foreground">
            Find the perfect workout routine that matches your personality and
            goals.
          </p>
          <div className="my-4 h-px w-full bg-green-600"></div>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-3xl">
            {result ? (
              <Card className="py-6">
                <CardHeader
                  className={cn(
                    exerciseTypes[result as keyof typeof exerciseTypes]
                      .lightColor,
                    "mx-4 rounded-xl p-4",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-full p-3 ${exerciseTypes[result as keyof typeof exerciseTypes].color}`}
                    >
                      {React.createElement(
                        exerciseTypes[result as keyof typeof exerciseTypes]
                          .icon,
                        {
                          className: "h-8 w-8 text-black",
                        },
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-2xl">
                        Your Perfect Match:{" "}
                        {
                          exerciseTypes[result as keyof typeof exerciseTypes]
                            .title
                        }
                      </CardTitle>
                      <CardDescription>
                        Based on your preferences and goals
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="">
                  <div className="space-y-6">
                    <p>
                      {
                        exerciseTypes[result as keyof typeof exerciseTypes]
                          .description
                      }
                    </p>

                    <div>
                      <h3 className="mb-2 font-semibold">Benefits:</h3>
                      <ul className="grid gap-2">
                        {exerciseTypes[
                          result as keyof typeof exerciseTypes
                        ].benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div
                              className={`h-2 w-2 rounded-full ${exerciseTypes[result as keyof typeof exerciseTypes].color}`}
                            ></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h3 className="mb-2 font-medium">Getting Started:</h3>
                      <p className="text-muted-foreground text-sm">
                        {
                          exerciseTypes[result as keyof typeof exerciseTypes]
                            .gettingStarted
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={resetQuiz}
                    className="w-full bg-green-600 font-bold hover:bg-green-700"
                  >
                    Retake Quiz
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card className="py-6">
                <CardHeader>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        Question {currentQuestion + 1} of {questions.length}
                      </CardTitle>
                      <span className="text-muted-foreground text-sm font-semibold">
                        {Math.round(progress)}% complete
                      </span>
                    </div>
                    <Progress
                      value={progress}
                      className="bg-secondary h-2 [&>div]:bg-green-600"
                    />
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold">
                      {questions[currentQuestion].question}
                    </h2>

                    <RadioGroup
                      value={answers[questions[currentQuestion].id] || ""}
                      onValueChange={(value) =>
                        handleAnswer(questions[currentQuestion].id, value)
                      }
                    >
                      <div className="grid gap-3">
                        {questions[currentQuestion].options.map((option) => (
                          <div
                            key={option.id}
                            onClick={() => {
                              handleAnswer(
                                questions[currentQuestion].id,
                                option.type,
                              );
                            }}
                            className="hover:bg-accent text-md cursor-pointer space-x-3 rounded-md border p-4 font-semibold [&:has([data-state=checked])]:border-green-500 [&:has([data-state=checked])]:bg-green-50"
                          >
                            <RadioGroupItem
                              value={option.type}
                              id={`q${questions[currentQuestion].id}-${option.id}`}
                              className="mt-1 border-green-600"
                            />
                            <span>{option.text}</span>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="font-bold"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!answers[questions[currentQuestion].id]}
                    className="bg-green-600 font-bold hover:bg-green-700"
                  >
                    {currentQuestion === questions.length - 1
                      ? "See Results"
                      : "Next"}
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
