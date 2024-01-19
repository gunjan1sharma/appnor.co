import LogoImage from "../assets/images/docc.png";

interface FeatureListProps {
  image: string;
  heading: string;
  desc: string;
}

function FeatureList(props: FeatureListProps) {
  return (
    <div className="border mt-4 ml-3 mr-3 border-blue-500 shadow-lg p-5 xs:m-2">
      <div className="flex flex-col items-center">
        <img alt="" src={props.image} className="w-10 h-10 md:w-14 md:h-14" />
        <h1 className="font-bold text-2xl mb-5 mt-5 lg:text-center">
          {props.heading}
        </h1>
      </div>
      <h3 className="text-center mb-5">{props.desc}</h3>
    </div>
  );
}

export default FeatureList;
