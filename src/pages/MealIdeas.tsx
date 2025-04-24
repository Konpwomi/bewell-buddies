import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock, Flame, Utensils } from "lucide-react";

// Import meals data from separate file
import { meals, tagOptions, type Meal } from "@/data/meals";

export default function MealIdeas() {
  const [selectedMealType, setSelectedMealType] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const [sortBy, setSortBy] = useState("none");

  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  // Filter meals based on selected criteria
  const filteredMeals = meals.filter((meal) => {
    const mealTypeMatch =
      selectedMealType === "all" || meal.mealType === selectedMealType;
    const tagMatch = selectedTag === "all" || meal.tags.includes(selectedTag);
    return mealTypeMatch && tagMatch;
  });

  // Sort meals based on selected criteria
  const sortedMeals = [...filteredMeals].sort((a, b) => {
    if (sortBy === "calories") return a.calories - b.calories;
    if (sortBy === "carbs") return a.carbs - b.carbs;
    if (sortBy === "protein") return b.protein - a.protein;
    if (sortBy === "fat") return a.fat - b.fat;
    return 0;
  });

  return (
    <div className="font-nunito p-8 md:py-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Meal Ideas</h1>
          <p className="text-muted-foreground">
            Discover nutritious and delicious meal options tailored to your
            dietary preferences.
          </p>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <Tabs
            defaultValue="all"
            value={selectedMealType}
            onValueChange={setSelectedMealType}
            className="w-full md:w-auto"
          >
            <TabsList className="grid w-full grid-cols-4 md:w-auto">
              <TabsTrigger value="all">All Meals</TabsTrigger>
              <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
              <TabsTrigger value="lunch">Lunch</TabsTrigger>
              <TabsTrigger value="dinner">Dinner</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex w-full flex-col gap-4 sm:flex-row md:w-auto">
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                {tagOptions.map((tag) => (
                  <SelectItem key={tag.value} value={tag.value}>
                    {tag.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Sorting</SelectItem>
                <SelectItem value="calories">Calories (Low to High)</SelectItem>
                <SelectItem value="carbs">Carbs (Low to High)</SelectItem>
                <SelectItem value="protein">Protein (High to Low)</SelectItem>
                <SelectItem value="fat">Fat (Low to High)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {sortedMeals.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sortedMeals.map((meal) => (
              <Dialog
                key={meal.id}
                onOpenChange={(open) => {
                  if (open) setSelectedMeal(meal);
                  else setSelectedMeal(null);
                }}
              >
                <DialogTrigger asChild>
                  <Card className="cursor-pointer overflow-hidden transition-shadow hover:shadow-lg">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader className="">
                      <div className="text-muted-foreground">
                        {meal.mealType}
                      </div>
                      <CardTitle className="text-lg">{meal.name}</CardTitle>
                      <div className="text-muted-foreground mb-3 text-sm">
                        {meal.description}
                      </div>
                      <div className="text-muted-foreground flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>{meal.time}</span>
                        <Flame className="ml-2 h-4 w-4" />
                        <span>{meal.calories} cal</span>
                      </div>
                    </CardHeader>
                    <CardFooter className="flex flex-wrap gap-2 pb-4">
                      {meal.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="bg-green-100"
                        >
                          {tag
                            .split("-")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1),
                            )
                            .join(" ")}
                        </Badge>
                      ))}
                    </CardFooter>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-h-[90vh] max-w-[50vh] overflow-y-auto rounded-2xl sm:max-w-[600px]">
                  {selectedMeal && (
                    <>
                      <DialogHeader>
                        <DialogTitle className="text-2xl">
                          {selectedMeal.name}
                        </DialogTitle>
                        <DialogDescription>
                          <span className="mt-2 flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-green-600" />
                              <span>{selectedMeal.time}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Flame className="h-4 w-4 text-green-600" />
                              <span>{selectedMeal.calories} cal</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Utensils className="h-4 w-4 text-green-600" />
                              <span>
                                {selectedMeal.mealType.charAt(0).toUpperCase() +
                                  selectedMeal.mealType.slice(1)}
                              </span>
                            </span>
                          </span>
                        </DialogDescription>
                      </DialogHeader>

                      <div className="grid gap-4">
                        <div className="aspect-video overflow-hidden rounded-md">
                          <img
                            src={selectedMeal.image}
                            alt={selectedMeal.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="rounded-md border p-2">
                            <div className="text-lg font-bold text-green-600">
                              {selectedMeal.protein}g
                            </div>
                            <div className="text-muted-foreground text-sm">
                              Protein
                            </div>
                          </div>
                          <div className="rounded-md border p-2">
                            <div className="text-lg font-bold text-green-600">
                              {selectedMeal.carbs}g
                            </div>
                            <div className="text-muted-foreground text-sm">
                              Carbs
                            </div>
                          </div>
                          <div className="rounded-md border p-2">
                            <div className="text-lg font-bold text-green-600">
                              {selectedMeal.fat}g
                            </div>
                            <div className="text-muted-foreground text-sm">
                              Fat
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="mb-2 font-medium">Description</h3>
                          <p className="text-muted-foreground text-sm">
                            {selectedMeal.description}
                          </p>
                        </div>

                        <div>
                          <h3 className="mb-2 font-medium">Ingredients</h3>
                          <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                            {selectedMeal.ingredients.map(
                              (ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                              ),
                            )}
                          </ul>
                        </div>

                        <div>
                          <h3 className="mb-2 font-medium">Instructions</h3>
                          <ol className="text-muted-foreground list-decimal space-y-2 pl-5 text-sm">
                            {selectedMeal.instructions.map((step, index) => (
                              <li key={index} className="pl-1">
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedMeal.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="bg-green-50"
                            >
                              {tag
                                .split("-")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() +
                                    word.slice(1),
                                )
                                .join(" ")}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <h3 className="text-lg font-medium">No meals match your filters</h3>
            <p className="text-muted-foreground">
              Try adjusting your filter criteria
            </p>
            <Button
              onClick={() => {
                setSelectedMealType("all");
                setSelectedTag("all");
                setSortBy("none");
              }}
              variant="outline"
              className="mt-4"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
