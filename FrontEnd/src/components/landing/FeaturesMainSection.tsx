import Feature from "@/components/landing/shared/Feature";

interface FeatureItem {
  title: string;
  text: string;
}

interface FeaturesMainSectionProps {
  heading: string;
  features: FeatureItem[];
}

const FeaturesMainSection = ({ heading, features }: FeaturesMainSectionProps) => {
  return (
    <section className="px-6 py-20 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">{heading}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <Feature key={index} title={feature.title} text={feature.text} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesMainSection;
