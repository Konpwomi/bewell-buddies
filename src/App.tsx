import homeSvg from "@/assets/images/home.svg"; // Adjust the path according to your project structure
import { Button } from "./components/ui/button";
import { BarChart, Flame, Activity, Utensils } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";

function Home() {
  return (
    <div className="mx-10 my-20 md:my-25 flex flex-col items-center gap-30 lg:mx-auto lg:max-w-6xl">
      {/* Hero Section */}
      <div className="flex flex-col items-center gap-15 lg:mx-10 lg:flex-row-reverse lg:gap-40">
        <img className="h-70 w-70 lg:h-80 lg:w-80" src={homeSvg} alt="Home" />
        <div className="flex flex-col items-center gap-15 lg:items-baseline lg:gap-0">
          <div className="space-y-2 lg:mb-5">
            <p className="text-center font-semibold text-blue-600 lg:mb-5 lg:text-left lg:text-4xl">
              Welcome to BeWell Buddies
            </p>
            <p className="text-center text-xl font-semibold lg:text-left">
              We're thrilled to have you here! Let's explore tools and resources
              that support your journey to better wellness.
            </p>
            <p className="text-center text-gray-400 lg:text-left">
              BeWell Buddies is here to empower you with valuable insights,
              practical tools, and personalized guidance - helping you achieve
              your wellness goals one step at a time.
            </p>
          </div>

          <div className="space-x-5">
            <Button className="h-10 bg-gradient-to-r from-blue-500 to-indigo-500">
              Bmi Check
            </Button>
            <Button className="h-10 bg-gradient-to-r from-blue-500 to-indigo-500">
              Calories Count
            </Button>
          </div>
        </div>
      </div>
      {/* Mission Section */}
      <section className="w-full">
        <div className="mb-10 text-center">
          <h2 className="text-xl font-bold md:text-2xl lg:text-3xl">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-xl text-transparent md:text-2xl lg:text-3xl">
              Mission
            </span>
          </h2>
          <p className="text-muted-foreground mt-4 md:text-xl">
            Committed to delivering exceptional healthcare services and
            improving lives
          </p>
        </div>
        <div className="mx-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white">
            <CardHeader className="text-center">
              <BarChart className="text-blue-500 mx-auto mb-4 h-12 w-12" />
              <CardTitle>BMI Check</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-center">
              Easily calculate your Body Mass Index (BMI) to understand your
              health status and take necessary actions.
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="text-center">
              <Flame className="text-blue-500 mx-auto mb-4 h-12 w-12" />
              <CardTitle>Calorie Count</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-center">
              Track your daily calorie intake to maintain a balanced diet and
              achieve your fitness goals.
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="text-center">
              <Activity className="text-blue-500 mx-auto mb-4 h-12 w-12" />
              <CardTitle>Track Progress</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-center">
              Monitor your fitness journey and track your progress over time to
              stay motivated and on track.
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="text-center">
              <Utensils className="text-blue-500 mx-auto mb-4 h-12 w-12" />
              <CardTitle>Meal Ideas</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-center">
              Discover healthy and delicious meal ideas to support your wellness
              goals and keep your diet exciting.
            </CardContent>
          </Card>
        </div>
      </section>
      <div>
        <div className="mb-5 text-center text-xl font-bold md:text-2xl lg:text-3xl">
          Testimonial{" "}
          <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-xl text-transparent md:text-2xl lg:text-3xl">
            by
          </span>{" "}
          Pasien
        </div>
        <p className="text-muted-foreground mt-4 mb-10 text-center md:text-xl">
          Committed to delivering exceptional healthcare services and improving
          lives
        </p>
        <div className="grid grid-cols-1 gap-10 mx-10 md:grid-cols-2">
          {[
            {
              quote:
                "Health is not just the absence of a disease. It is an active state of physical, emotional, mental, and social well-being. True health is a harmonious balance of all these aspects of life. Our bodies are nourished not only by what we eat but also by the thoughts we think, the emotions we feel, and the relationships we nurture.",
              author: "Gautama Buddha",
              role: "(author)",
            },
            {
              quote:
                "Natural forces within us are the true healers of disease. The natural healing force within each one of us is the greatest force in getting well. Let food be thy medicine and medicine be thy food. Walking is man's best medicine So what you gonna do about it than.",
              author: "Hippocrates",
              role: "(Greek physician)",
            },
            {
              quote:
                "Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship. To preserve health is a moral obligation. The art of medicine consists of amusing the patient while nature cures the disease.",
              author: "Albert Schweitzer",
              role: "(philosopher & physician)",
            },
            {
              quote:
                "The first wealth is health. To keep the body in good health is a duty, otherwise we shall not be able to keep our mind strong and clear. The greatest gift you can give your family and the world is a healthy you.",
              author: "Ralph Waldo Emerson",
              role: "(philosopher)",
            },
          ].map((testimonial, index) => (
            <div key={index} className="rounded-xl bg-white p-8 shadow-lg">
              <div className="text-start ">
                {testimonial.quote}
              </div>
              <div className="mt-3 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-start font-semibold text-transparent">
                {testimonial.author}
              </div>
              <div className="text-start text-sm text-gray-500">
                {testimonial.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
