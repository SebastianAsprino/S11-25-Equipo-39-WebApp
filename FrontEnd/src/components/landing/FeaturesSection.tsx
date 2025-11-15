import Feature from "@/components/landing/shared/Feature";

interface FeatureItem {
  title: string;
  text: string;
}

interface FeaturesSectionProps {
  heading: string;
  description: string;
  features: FeatureItem[];
}

const FeaturesSection = ({ heading, description, features }: FeaturesSectionProps) => {
  return (
    <section className="px-6 py-16 max-w-6xl mx-auto flex flex-col gap-12">
      <div className="text-center flex flex-col gap-3">
        <h2 className="text-3xl md:text-4xl font-bold">{heading}</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <Feature key={index} title={feature.title} text={feature.text} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
