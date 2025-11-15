interface HeroProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  imageSrc: string;
  imageAlt: string;
}

const HeroSection = ({
  title,
  description,
  buttonText,
  buttonHref,
  imageSrc,
  imageAlt,
}: HeroProps) => {
  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-6 py-10 bg-white dark:bg-gray-800 rounded-b-3xl shadow-lg gap-y-12 md:gap-y-0 md:gap-x-12">
      <div className="w-full md:w-1/2 flex flex-col gap-6 text-center md:text-left">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">{title}</h1>

        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">{description}</p>

        <a href={buttonHref}>
          <button className="btn btn-primary text-lg normal-case px-6 py-3 rounded-lg shadow-lg w-full">
            {buttonText}
          </button>
        </a>
      </div>

      <div className="w-full md:w-1/2 flex justify-center md:justify-end">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="rounded-xl shadow-2xl w-full sm:w-[90%] md:w-full max-w-[600px] md:max-w-[540px]"
        />
      </div>
    </section>
  );
};

export default HeroSection;
