interface FeatureIntroProps {
  heading: string;
  desc: string;
  subdesc:string
}

function FeatureIntro(params: FeatureIntroProps) {
  return (
    <div className="md:m-20 m-10 lg:w-4/5 lg:m-6">
      <h1 className="font-bold text-2xl lg:leading-relaxed  mb-5 lg:text-start lg:text-4xl">
        {params.heading}
      </h1>
      <br />
      <h4 className="text-gray-600 lg:mt-10">{params.desc}</h4>
      <h4 className="text-gray-800 font-bold mt-5 lg:mt-10">
        {params.subdesc}
      </h4>
      <br />
      <br />
    </div>
  );
}

export default FeatureIntro;
