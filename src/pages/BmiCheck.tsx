import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function BmiCheck() {
  const [unit, setUnit] = useState("metric");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [bmiResult, setBmiResult] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState("");

  const calculateBMI = () => {
    let bmi: number;

    if (unit === "metric") {
      const heightM = Number.parseFloat(height) / 100;
      const weightKg = Number.parseFloat(weight);

      if (isNaN(heightM) || isNaN(weightKg) || heightM <= 0 || weightKg <= 0) {
        return;
      }

      bmi = weightKg / (heightM * heightM);
    } else {
      const heightInches =
        Number.parseFloat(heightFt) * 12 + Number.parseFloat(heightIn);
      const weightLbs = Number.parseFloat(weight);

      if (
        isNaN(heightInches) ||
        isNaN(weightLbs) ||
        heightInches <= 0 ||
        weightLbs <= 0
      ) {
        return;
      }

      bmi = (weightLbs * 703) / (heightInches * heightInches);
    }

    setBmiResult(Number.parseFloat(bmi.toFixed(1)));

    if (bmi < 18.5) {
      setBmiCategory("Underweight");
    } else if (bmi >= 18.5 && bmi < 25) {
      setBmiCategory("Normal");
    } else if (bmi >= 25 && bmi < 30) {
      setBmiCategory("Overweight");
    } else {
      setBmiCategory("Obesity");
    }
  };

  return (
    <div className="font-nunito p-8 md:py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold md:text-4xl">Bmi Check</h1>
          <p className="text-muted-foreground">
            Calculate your Body Mass Index (BMI) to get a general assessment of
            your weight relative to height.
          </p>
          <div className="my-4 h-px w-full bg-green-600"></div>
          <div className="flex justify-center">
            <div className="w-full max-w-3xl">
              <Card className="mt-5 mb-9 py-6">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    Calculate Your BMI
                  </CardTitle>
                  <CardDescription>
                    Enter your height and weight to calculate your BMI.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup
                    value={unit}
                    onValueChange={setUnit}
                    className="grid grid-cols-2 gap-4"
                  >
                    <Label
                      htmlFor="metric"
                      className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center justify-center rounded-md border-2 p-4 font-semibold [&:has([data-state=checked])]:border-green-500"
                    >
                      <RadioGroupItem
                        value="metric"
                        id="metric"
                        className="sr-only"
                      />
                      <span>Metric (cm/kg)</span>
                    </Label>
                    <Label
                      htmlFor="imperial"
                      className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center justify-center rounded-md border-2 p-4 font-semibold [&:has([data-state=checked])]:border-green-500"
                    >
                      <RadioGroupItem
                        value="imperial"
                        id="imperial"
                        className="sr-only"
                      />
                      <span>Imperial (ft/in/lbs)</span>
                    </Label>
                  </RadioGroup>

                  {unit === "metric" ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="font-semibold" htmlFor="height">
                          Height (cm)
                        </Label>
                        <Input
                          id="height"
                          type="number"
                          placeholder="e.g. 175"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold" htmlFor="weight">
                          Weight (kg)
                        </Label>
                        <Input
                          id="weight"
                          type="number"
                          placeholder="e.g. 70"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="font-semibold" htmlFor="height-ft">
                            Height (ft)
                          </Label>
                          <Input
                            id="height-ft"
                            type="number"
                            placeholder="e.g. 5"
                            value={heightFt}
                            onChange={(e) => setHeightFt(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-semibold" htmlFor="height-in">
                            Height (in)
                          </Label>
                          <Input
                            id="height-in"
                            type="number"
                            placeholder="e.g. 10"
                            value={heightIn}
                            onChange={(e) => setHeightIn(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold" htmlFor="weight-lbs">
                          Weight (lbs)
                        </Label>
                        <Input
                          id="weight-lbs"
                          type="number"
                          placeholder="e.g. 160"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={calculateBMI}
                    className="w-full bg-green-600 font-semibold hover:bg-green-700"
                  >
                    Calculate BMI
                  </Button>
                </CardContent>
              </Card>

              {bmiResult !== null && (
                <Card
                  className={`mb-10 border-l-4 py-6 ${
                    bmiCategory === "Underweight"
                      ? "border-l-blue-500"
                      : bmiCategory === "Normal"
                        ? "border-l-green-500"
                        : bmiCategory === "Overweight"
                          ? "border-l-yellow-500"
                          : "border-l-red-500"
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">Your BMI Result</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="mb-6 flex items-center justify-center">
                      <div className="text-center">
                        <span className="block text-5xl font-bold">
                          {bmiResult}
                        </span>
                        <span
                          className={`text-xl font-medium ${
                            bmiCategory === "Underweight"
                              ? "text-blue-500"
                              : bmiCategory === "Normal"
                                ? "text-green-500"
                                : bmiCategory === "Overweight"
                                  ? "text-yellow-500"
                                  : "text-red-500"
                          }`}
                        >
                          {bmiCategory}
                        </span>
                      </div>
                    </div>

                    {/* Mobile view - Card layout */}
                    <div className="block space-y-3 md:hidden">
                      <div
                        className={`rounded-lg border p-3 ${
                          bmiCategory === "Underweight"
                            ? "border-blue-300 bg-blue-100"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="mr-2 h-3 w-3 rounded-full bg-blue-500"></div>
                          <span
                            className={`font-medium ${bmiCategory === "Underweight" ? "font-semibold" : ""}`}
                          >
                            Underweight
                          </span>
                          {bmiCategory === "Underweight" && (
                            <span className="ml-auto text-sm text-blue-600">
                              ← Your BMI
                            </span>
                          )}
                        </div>
                        <div className="mt-1 pl-5 text-sm text-gray-600">
                          Below 18.5
                        </div>
                      </div>
                      <div
                        className={`rounded-lg border p-3 ${
                          bmiCategory === "Normal"
                            ? "border-green-300 bg-green-100"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                          <span
                            className={`font-medium ${bmiCategory === "Normal" ? "font-semibold" : ""}`}
                          >
                            Normal
                          </span>
                          {bmiCategory === "Normal" && (
                            <span className="ml-auto text-sm text-green-600">
                              ← Your BMI
                            </span>
                          )}
                        </div>
                        <div className="mt-1 pl-5 text-sm text-gray-600">
                          18.5 – 24.9
                        </div>
                      </div>
                      <div
                        className={`rounded-lg border p-3 ${
                          bmiCategory === "Overweight"
                            ? "border-yellow-300 bg-yellow-100"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
                          <span
                            className={`font-medium ${bmiCategory === "Overweight" ? "font-semibold" : ""}`}
                          >
                            Overweight
                          </span>
                          {bmiCategory === "Overweight" && (
                            <span className="ml-auto text-sm text-yellow-600">
                              ← Your BMI
                            </span>
                          )}
                        </div>
                        <div className="mt-1 pl-5 text-sm text-gray-600">
                          25.0 – 29.9
                        </div>
                      </div>
                      <div
                        className={`rounded-lg border p-3 ${
                          bmiCategory === "Obesity"
                            ? "border-red-300 bg-red-100"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
                          <span
                            className={`font-medium ${bmiCategory === "Obesity" ? "font-semibold" : ""}`}
                          >
                            Obesity
                          </span>
                          {bmiCategory === "Obesity" && (
                            <span className="ml-auto text-sm text-red-600">
                              ← Your BMI
                            </span>
                          )}
                        </div>
                        <div className="mt-1 pl-5 text-sm text-gray-600">
                          30.0 and above
                        </div>
                      </div>
                    </div>

                    {/* Desktop view - Table layout */}
                    <div className="hidden overflow-hidden rounded-lg border md:block">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="px-4 py-2 text-left font-semibold">
                              BMI Range
                            </th>
                            <th className="px-4 py-2 text-left font-semibold">
                              Category
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          <tr
                            className={`${bmiCategory === "Underweight" ? "bg-blue-100 font-semibold" : ""}`}
                          >
                            <td className="px-4 py-2">Below 18.5</td>
                            <td className="flex items-center px-4 py-2">
                              <div className="mr-2 h-3 w-3 rounded-full bg-blue-500"></div>
                              Underweight
                              {bmiCategory === "Underweight" && (
                                <span className="ml-2 text-blue-600">
                                  ← Your BMI
                                </span>
                              )}
                            </td>
                          </tr>
                          <tr
                            className={`${bmiCategory === "Normal" ? "bg-green-100 font-semibold" : ""}`}
                          >
                            <td className="px-4 py-2">18.5 – 24.9</td>
                            <td className="flex items-center px-4 py-2">
                              <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                              Normal
                              {bmiCategory === "Normal" && (
                                <span className="ml-2 text-green-600">
                                  ← Your BMI
                                </span>
                              )}
                            </td>
                          </tr>
                          <tr
                            className={`${bmiCategory === "Overweight" ? "bg-yellow-100 font-semibold" : ""}`}
                          >
                            <td className="px-4 py-2">25.0 – 29.9</td>
                            <td className="flex items-center px-4 py-2">
                              <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
                              Overweight
                              {bmiCategory === "Overweight" && (
                                <span className="ml-2 text-yellow-600">
                                  ← Your BMI
                                </span>
                              )}
                            </td>
                          </tr>
                          <tr
                            className={`${bmiCategory === "Obesity" ? "bg-red-100 font-semibold" : ""}`}
                          >
                            <td className="px-4 py-2">30.0 and above</td>
                            <td className="flex items-center px-4 py-2">
                              <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
                              Obesity
                              {bmiCategory === "Obesity" && (
                                <span className="ml-2 text-red-600">
                                  ← Your BMI
                                </span>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Alert className="py-6">
                <Info className="h-4 w-4" />
                <AlertTitle className="font-semibold">Note</AlertTitle>
                <AlertDescription>
                  BMI is a screening tool, not a diagnostic tool. It does not
                  account for factors like muscle mass, bone density, or body
                  composition. Please consult with healthcare professionals for
                  a comprehensive health assessment.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
