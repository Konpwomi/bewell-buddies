import homeSvg from "@/assets/home.svg";
import { Button } from "./components/ui/button";
import { BarChart, Flame, Activity, Utensils, Dumbbell } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";
import { Link } from "react-router";

// Define the features data array
const features = [
  {
    icon: BarChart,
    title: "BMI Check",
    description:
      "Calculate your Body Mass Index instantly to assess your current weight status and receive personalized health recommendations.",
    route: "/bmi-check",
  },
  {
    icon: Flame,
    title: "Calorie Count",
    description:
      "Monitor daily calorie intake with our intuitive tracker to maintain nutritional balance and achieve sustainable weight management goals.",
    route: "/calorie-count",
  },
  {
    icon: Activity,
    title: "Track Progress",
    description:
      "Visualize your health journey with detailed charts and analytics to celebrate milestones and identify opportunities for improvement.",
    route: "/progress",
  },
  {
    icon: Dumbbell,
    title: "Match Exercises",
    description:
      "Find personalized workout routines tailored to your fitness level, goals, and available equipment for optimal physical development.",
    route: "/match-exercises",
  },
  {
    icon: Utensils,
    title: "Meal Ideas",
    description:
      "Browse our curated collection of nutritionist-approved recipes that combine flavor with balanced nutrition for every dietary preference.",
    route: "/meal-ideas",
  },
];

// Define testimonials data array
const testimonials = [
  {
    quote:
      "Health encompasses physical, emotional, and mental wellbeing not merely the absence of illness. When we nurture all aspects of our health, including our thoughts, emotions and relationships, we create true harmony in our lives and discover our greatest potential.",
    author: "Gautama Buddha",
    role: "(philosopher & spiritual teacher)",
  },
  {
    quote:
      "The human body possesses remarkable self-healing capabilities. Rather than focusing solely on treating symptoms, we must recognize that nutrition and movement are fundamental medicines. Walking daily and choosing wholesome foods can prevent countless ailments.",
    author: "Hippocrates",
    role: "(Greek physician)",
  },
  {
    quote:
      "Health remains our most precious asset one that requires our conscious protection. Medicine may comfort the patient, but ultimately, the body's natural resilience drives healing. Our moral obligation includes preserving our health for ourselves and future generations.",
    author: "Albert Schweitzer",
    role: "(philosopher & physician)",
  },
  {
    quote:
      "Without good health, we cannot fully experience life's joys or reach our potential. Maintaining physical wellbeing clarifies our mind and strengthens our resolve. Remember that self-care isn't selfish it's the foundation for everything you hope to accomplish.",
    author: "Ralph Waldo Emerson",
    role: "(philosopher & essayist)",
  },
];
function Home() {
  return (
    <div className="font-nunito flex w-full flex-col items-center gap-40 p-8 lg:mx-auto lg:max-w-6xl">
      {/* Hero Section */}
      <div className="mt-20 flex flex-col items-center gap-15 lg:flex-row-reverse lg:gap-40">
        <img className="h-70 w-70 lg:h-90 lg:w-90" src={homeSvg} alt="Home" />
        <div className="flex flex-col items-center gap-8 lg:items-baseline">
          <div className="space-y-3">
            <p className="text-center text-3xl font-bold text-green-600 lg:text-left lg:text-5xl">
              <span className="text-black">Welcome to</span> BeWell Buddies
            </p>
            <p className="text-muted-foreground text-center lg:text-left lg:text-lg">
              BeWell Buddies is here to empower you with valuable insights,
              practical tools, and personalized guidance - helping you achieve
              your wellness goals one step at a time.
            </p>
          </div>
          <div className="space-x-5">
            <Button
              asChild
              size="lg"
              className="bg-green-600 font-semibold hover:bg-green-700"
            >
              <Link to="/bmi-check">Get Started</Link>
            </Button>
            <Button asChild className="font-semibold" variant="outline" size="lg">
              <Link to="/meal-ideas">Explore Meal Ideas</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mission Section with Mapped Cards */}
      <section className="w-full">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">
            Our <span className="text-green-600">Mission</span>
          </h2>
          <p className="text-muted-foreground mt-2 md:text-lg">
            Committed to delivering exceptional healthcare services and
            improving lives
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="items-center bg-white p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <feature.icon className="h-11 w-11 text-green-500" />
              </div>
              <CardHeader className="">
                <CardTitle className="font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-center">
                {feature.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <div className="mb-20 lg:mb-32">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">
            Testimonial <span className="text-green-600">by</span> Pasien
          </h2>
          <p className="text-muted-foreground mt-2 mb-10 text-center md:text-xl">
            Committed to delivering exceptional healthcare services and
            improving lives
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="rounded-xl bg-white p-8 shadow-lg">
              <div className="text-start">{testimonial.quote}</div>
              <div className="mt-3 text-start font-bold text-green-600">
                {testimonial.author}
              </div>
              <div className="text-start text-sm font-semibold text-gray-500">
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
