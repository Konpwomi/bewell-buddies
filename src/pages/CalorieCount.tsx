"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function CalorieCount() {
  const [gender, setGender] = useState("female");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [unit, setUnit] = useState("metric");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [bmrResult, setBmrResult] = useState<number | null>(null);
  const [tdeeResult, setTdeeResult] = useState<number | null>(null);

  const calculateBMR = () => {
    let heightCm: number;
    let weightKg: number;

    if (unit === "metric") {
      heightCm = Number.parseFloat(height);
      weightKg = Number.parseFloat(weight);
    } else {
      // Convert imperial to metric
      heightCm =
        (Number.parseFloat(heightFt) * 12 + Number.parseFloat(heightIn)) * 2.54;
      weightKg = Number.parseFloat(weight) * 0.453592;
    }

    const ageYears = Number.parseFloat(age);

    if (
      isNaN(heightCm) ||
      isNaN(weightKg) ||
      isNaN(ageYears) ||
      heightCm <= 0 ||
      weightKg <= 0 ||
      ageYears <= 0
    ) {
      return;
    }

    // Mifflin-St Jeor Equation
    let bmr: number;

    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161;
    }

    // Calculate TDEE based on activity level
    let tdee: number;

    switch (activityLevel) {
      case "sedentary":
        tdee = bmr * 1.2;
        break;
      case "light":
        tdee = bmr * 1.375;
        break;
      case "moderate":
        tdee = bmr * 1.55;
        break;
      case "active":
        tdee = bmr * 1.725;
        break;
      case "very-active":
        tdee = bmr * 1.9;
        break;
      default:
        tdee = bmr * 1.2;
    }

    setBmrResult(Math.round(bmr));
    setTdeeResult(Math.round(tdee));
  };

  return (
    <div className="font-nunito p-8 md:py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold md:text-4xl">Calorie Count</h1>
          <p className="text-muted-foreground">
            Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy
            Expenditure (TDEE).
          </p>
          <div className="my-4 h-px w-full bg-green-600"></div>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-3xl">
            <Tabs defaultValue="calculator" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger className="font-semibold" value="calculator">
                  Calculator
                </TabsTrigger>
                <TabsTrigger value="information">Information</TabsTrigger>
              </TabsList>

              <TabsContent value="calculator" className="mt-6 space-y-6">
                <Card className="py-6">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                      Calculate Your Caloric Needs
                    </CardTitle>
                    <CardDescription>
                      Enter your details to calculate your BMR and TDEE.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup
                      value={unit}
                      onValueChange={setUnit}
                      className="grid grid-cols-2 gap-4"
                    >
                      <Label
                        htmlFor="metric-unit"
                        className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center justify-center rounded-md border-2 p-4 [&:has([data-state=checked])]:border-green-500"
                      >
                        <RadioGroupItem
                          value="metric"
                          id="metric-unit"
                          className="sr-only"
                        />
                        <span className="font-semibold">Metric (cm/kg)</span>
                      </Label>
                      <Label
                        htmlFor="imperial-unit"
                        className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center justify-center rounded-md border-2 p-4 [&:has([data-state=checked])]:border-green-500"
                      >
                        <RadioGroupItem
                          value="imperial"
                          id="imperial-unit"
                          className="sr-only"
                        />
                        <span className="font-semibold">
                          Imperial (ft/in/lbs)
                        </span>
                      </Label>
                    </RadioGroup>

                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <RadioGroup
                          value={gender}
                          onValueChange={setGender}
                          className="grid grid-cols-2 gap-4"
                        >
                          <Label
                            htmlFor="male"
                            className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center justify-center rounded-md border-2 p-4 [&:has([data-state=checked])]:border-green-500"
                          >
                            <RadioGroupItem
                              value="male"
                              id="male"
                              className="sr-only"
                            />
                            <span className="font-semibold">Male</span>
                          </Label>
                          <Label
                            htmlFor="female"
                            className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center justify-center rounded-md border-2 p-4 [&:has([data-state=checked])]:border-green-500"
                          >
                            <RadioGroupItem
                              value="female"
                              id="female"
                              className="sr-only"
                            />
                            <span className="font-semibold">Female</span>
                          </Label>
                        </RadioGroup>

                        <div className="space-y-2">
                          <Label className="font-semibold" htmlFor="age">
                            Age (years)
                          </Label>
                          <Input
                            id="age"
                            type="number"
                            placeholder="e.g. 30"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                          />
                        </div>
                      </div>

                      {unit === "metric" ? (
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label
                              className="font-semibold"
                              htmlFor="height-cm"
                            >
                              Height (cm)
                            </Label>
                            <Input
                              id="height-cm"
                              type="number"
                              placeholder="e.g. 175"
                              value={height}
                              onChange={(e) => setHeight(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              className="font-semibold"
                              htmlFor="weight-kg"
                            >
                              Weight (kg)
                            </Label>
                            <Input
                              id="weight-kg"
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
                              <Label className="font-semibold" htmlFor="height-ft">Height (ft)</Label>
                              <Input
                                id="height-ft"
                                type="number"
                                placeholder="e.g. 5"
                                value={heightFt}
                                onChange={(e) => setHeightFt(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="font-semibold" htmlFor="height-in">Height (in)</Label>
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
                            <Label className="font-semibold" htmlFor="weight-lbs">Weight (lbs)</Label>
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

                      <div className="space-y-2">
                        <Label
                          className="font-semibold"
                          htmlFor="activity-level"
                        >
                          Activity Level
                        </Label>
                        <Select
                          value={activityLevel}
                          onValueChange={setActivityLevel}
                        >
                          <SelectTrigger id="activity-level">
                            <SelectValue placeholder="Select activity level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sedentary">
                              Sedentary (little or no exercise)
                            </SelectItem>
                            <SelectItem value="light">
                              Light (exercise 1-3 days/week)
                            </SelectItem>
                            <SelectItem value="moderate">
                              Moderate (exercise 3-5 days/week)
                            </SelectItem>
                            <SelectItem value="active">
                              Active (exercise 6-7 days/week)
                            </SelectItem>
                            <SelectItem value="very-active">
                              Very Active (hard exercise daily)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      onClick={calculateBMR}
                      className="w-full font-semibold bg-green-600 hover:bg-green-700"
                    >
                      Calculate
                    </Button>
                  </CardContent>
                </Card>

                {bmrResult !== null && tdeeResult !== null && (
                  <Card className="border-green-200 py-6">
                    <CardHeader>
                      <CardTitle className="font-bold"> Your Results</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2 rounded-lg border bg-green-50 p-4 text-center">
                          <h3 className="text-md font-medium">
                            Basal Metabolic Rate (BMR)
                          </h3>
                          <p className="text-3xl font-bold text-green-600">
                            {bmrResult} calories/day
                          </p>
                          <p className="text-muted-foreground text-sm">
                            Calories your body needs at complete rest
                          </p>
                        </div>

                        <div className="space-y-2 rounded-lg border bg-green-50 p-4 text-center">
                          <h3 className="text-md font-medium">
                            Total Daily Energy Expenditure (TDEE)
                          </h3>
                          <p className="text-3xl font-bold text-green-600">
                            {tdeeResult} calories/day
                          </p>
                          <p className="text-muted-foreground text-sm">
                            Calories you burn daily with activity
                          </p>
                        </div>
                      </div>

                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>What do these numbers mean?</AlertTitle>
                        <AlertDescription>
                          <p className="mb-2">
                            Your BMR is the number of calories your body needs
                            to maintain basic functions at rest.
                          </p>
                          <p>
                            Your TDEE is an estimate of how many calories you
                            burn per day when exercise is taken into account. To
                            maintain weight, eat this amount. To lose weight,
                            eat less. To gain weight, eat more.
                          </p>
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="information" className="mt-6 space-y-6">
                <Card className="py-6">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                      Understanding BMR and TDEE
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold">What is BMR?</h3>
                      <p>
                        Basal Metabolic Rate (BMR) is the number of calories
                        your body needs to maintain basic physiological
                        functions while at complete rest. These functions
                        include breathing, circulation, cell production,
                        nutrient processing, and protein synthesis.
                      </p>

                      <h3 className="text-lg font-bold">What is TDEE?</h3>
                      <p>
                        Total Daily Energy Expenditure (TDEE) is an estimation
                        of how many calories you burn per day when exercise and
                        activity are taken into account. It's calculated by
                        multiplying your BMR by an activity factor.
                      </p>

                      <h3 className="text-lg font-bold">
                        Activity Levels Explained
                      </h3>
                      <ul className="list-disc space-y-2 pl-6">
                        <li>
                          <strong>Sedentary:</strong> Little or no exercise,
                          desk job (BMR × 1.2)
                        </li>
                        <li>
                          <strong>Light:</strong> Light exercise 1-3 days/week
                          (BMR × 1.375)
                        </li>
                        <li>
                          <strong>Moderate:</strong> Moderate exercise 3-5
                          days/week (BMR × 1.55)
                        </li>
                        <li>
                          <strong>Active:</strong> Hard exercise 6-7 days/week
                          (BMR × 1.725)
                        </li>
                        <li>
                          <strong>Very Active:</strong> Hard daily exercise &
                          physical job or training twice a day (BMR × 1.9)
                        </li>
                      </ul>

                      <h3 className="text-lg font-bold">
                        How to Use These Numbers
                      </h3>
                      <ul className="list-disc space-y-2 pl-6">
                        <li>
                          <strong>To maintain weight:</strong> Consume calories
                          equal to your TDEE
                        </li>
                        <li>
                          <strong>To lose weight:</strong> Consume fewer
                          calories than your TDEE (typically 500 calories less
                          per day to lose 1 pound per week)
                        </li>
                        <li>
                          <strong>To gain weight:</strong> Consume more calories
                          than your TDEE (typically 500 calories more per day to
                          gain 1 pound per week)
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
