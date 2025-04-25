const CalorieCount = () => {
  return (
    <div className="font-nunito p-8 md:py-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-2 md:mb-16">
          <h1 className="text-3xl font-bold md:text-4xl">Calorie Count</h1>
          <p className="text-muted-foreground">
            Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy
            Expenditure (TDEE).
          </p>
          <div className="my-4 h-px w-full bg-green-600"></div>
        </div>
      </div>
    </div>
  );
};

export default CalorieCount;
