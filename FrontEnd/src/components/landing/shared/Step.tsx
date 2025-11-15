interface StepProps {
  number: string;
  title: string;
  text: string;
}

const Step = ({ number, title, text }: StepProps) => {
  return (
    <div>
      <h3 className="text-xl font-semibold">
        {number}. {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{text}</p>
    </div>
  );
};

export default Step;
