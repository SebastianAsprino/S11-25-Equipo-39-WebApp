interface FeatureProps {
  title: string;
  text: string;
}

const Feature = ({ title, text }: FeatureProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:scale-105 transition">
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{text}</p>
    </div>
  );
};

export default Feature;
