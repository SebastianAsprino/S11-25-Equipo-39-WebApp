import Step from "@/components/landing/shared/Step";

interface StepItem {
  number: string;
  title: string;
  text: string;
}

interface HowItWorksSectionProps {
  heading: string;
  steps: StepItem[];
}

const HowItWorksSection = ({ heading, steps }: HowItWorksSectionProps) => {
  return (
    <section className="px-6 py-2 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-10">{heading}</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {steps.map((step, index) => (
          <Step
            key={index}
            number={step.number}
            title={step.title}
            text={step.text}
          />
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
