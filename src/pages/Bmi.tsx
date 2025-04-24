import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import CountUp from "react-countup";
// if put .fade in className = that element will have fadein animation

const BMI_CATEGORIES = [
  {
    range: { min: -Infinity, max: 18.5 },
    label: "Underweight",
    risk: "More than normal people",
    color: "bg-cyan-100",
    description:
      "You are underweight or thin. Generally, a normal BMI is less than 18.50",
    recommendations: [
      "Focus on nutritious, protein-rich foods",
      "Increase caloric intake by 300-500 calories",
      "Exercise regularly with moderate intensity activities",
    ],
  },
  {
    range: { min: 18.5, max: 24.9 },
    label: "Healthy Weight",
    risk: "Normal person",
    color: "bg-green-100",
    description: "You are within the standard weight range",
    recommendations: [
      "Maintain balanced nutrition from all food groups",
      "Continue regular exercise routine",
      "Focus on maintaining current healthy habits",
    ],
  },
  {
    range: { min: 25, max: 29.9 },
    label: "Overweight",
    risk: "Warning level 1",
    color: "bg-yellow-100",
    description: "You meet the criteria for being overweight",
    recommendations: [
      "Control diet and reduce daily calories by 200-300",
      "Consult healthcare provider before starting exercise",
      "Focus on moderate intensity activities",
    ],
  },
  {
    range: { min: 30, max: Infinity },
    label: "Obese",
    risk: "Warning level 2",
    color: "bg-red-100",
    description:
      "Your BMI indicates obesity. Consider consulting a healthcare provider",
    recommendations: [
      "Seek medical advice for personalized guidance",
      "Start with light physical activities",
      "Focus on sustainable lifestyle changes",
    ],
  },
];

const BMICalculator = () => {
  const [formData, setFormData] = useState({ weight: "", height: "" });
  const [bmi, setBmi] = useState<number | null>(null);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateBMI = () => {
    const weight = Number(formData.weight);
    const height = Number(formData.height);

    if (weight < 1 || height < 1) {
      setError("Please enter valid values");
      return;
    }

    const bmiValue = weight / ((height / 100) * (height / 100));
    setBmi(Number(bmiValue.toFixed(2)));
    setError("");
  };

  const getCurrentCategory = () => {
    if (!bmi) return null;
    return BMI_CATEGORIES.find(
      (category) => bmi > category.range.min && bmi <= category.range.max,
    );
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const category = getCurrentCategory();

  return (
    <div className="mx-auto my-10 flex max-w-6xl flex-col items-center gap-10">
      {/* Header */}
      <div className="mx-10 border-b border-blue-500 p-5">
        <h1 className="mb-2 text-2xl font-bold">BMI Calculator</h1>
        <p className="text-gray-600">
          Take charge of your health! Use our BMI calculator to understand your
          weight status and make informed decisions about your well-being.
        </p>
      </div>

      {/* Calculator Card */}
      <div className="mx-10 rounded-xl bg-white p-5 shadow-lg">
        {error && (
          <div className="mb-4 flex items-center rounded-lg bg-red-50 p-4 text-red-700">
            <AlertCircle className="mr-2 h-5 w-5" />
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="mb-1 block font-medium">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              className="w-full rounded-lg border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your weight"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              className="w-full rounded-lg border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your height"
            />
          </div>

          <button
            onClick={calculateBMI}
            className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-3 text-white transition duration-200 hover:from-blue-600 hover:to-indigo-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Calculate BMI
          </button>
        </div>
      </div>

      {/* Results Section */}
      {bmi && (
        <div className="mt-8 space-y-6">
          {/* BMI Result */}
          <div className="flex justify-center">
            <div className="rounded-lg border-2 border-blue-500 bg-white px-8 py-4">
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-3xl font-bold text-transparent">
                <CountUp
                  className="fade inline-block bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-3xl font-semibold text-transparent"
                  decimals={2}
                  start={0}
                  end={bmi}
                  duration={3}
                  delay={0.3}
                />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* BMI Categories Table */}
      <div className="mx-10 overflow-hidden rounded-xl bg-white text-[10px] shadow md:text-base">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                BMI
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Risk Level
              </th>
            </tr>
          </thead>
          <tbody>
            {BMI_CATEGORIES.map((cat, index) => (
              <tr
                key={index}
                className={`${bmi && bmi > cat.range.min && bmi <= cat.range.max ? cat.color : ""}`}
              >
                <td className="px-4 py-3">
                  {cat.range.min === -Infinity
                    ? "Below 18.5"
                    : cat.range.max === Infinity
                      ? "30.0 and Above"
                      : `${cat.range.min} - ${cat.range.max}`}
                </td>
                <td className="px-4 py-3">{cat.label}</td>
                <td className="px-4 py-3">{cat.risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recommendations */}
      {category && (
        <div className={`${category.color} mx-10 rounded-xl p-6 shadow-lg`}>
          <h3 className="mb-2 text-xl font-bold">{category.label}</h3>
          <p className="mb-4">{category.description}</p>
          <h4 className="mb-2 font-semibold">Recommendations:</h4>
          <ul className="list-disc space-y-2 pl-5">
            {category.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
