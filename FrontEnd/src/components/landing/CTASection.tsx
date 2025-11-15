interface CTASectionProps {
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const CTASection = ({
  heading,
  description,
  buttonText,
  buttonLink,
}: CTASectionProps) => {
  return (
    <section
      className="px-6 py-16 max-w-4xl mx-auto text-center
                 bg-white dark:bg-gray-800
                 border border-gray-200 dark:border-gray-700
                 rounded-2xl shadow-xl"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>

      <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
        {description}
      </p>

      <a href={buttonLink}>
        <button className="btn btn-lg btn-primary text-lg font-semibold hover:scale-105 transition">
          {buttonText}
        </button>
      </a>
    </section>
  );
};

export default CTASection;
