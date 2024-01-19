import FeatureList from "./FeatureList";
import LogoImage from "../assets/images/appnorr.png";
import AnalyticsImage from "../assets/images/chain.png";
import UpdateImage from "../assets/images/updated.png";
import AppstoreImage from "../assets/images/apps.png";

function FeatureListPage(props: any) {
  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <FeatureList
        image={UpdateImage}
        heading="Universal Deep Links"
        desc="Deeplinks created by Appnor is Universal. Our Deep Link works smoothly on Android, iOS, Windows and Web. AppNor's deep linking technology ensures every tap takes them directly to the right place, enhancing their experience and driving deeper engagement."
      />

      <FeatureList
        image={AppstoreImage}
        heading="Appstore Download Links"
        desc="Effortlessly create branded download links for all major app stores. AppNor takes the hassle out of the process, ensuring your users can find and install your app with just a tap."
      />

      <FeatureList
        image={AnalyticsImage}
        heading="In-depth Analytics"
        desc="Our in house GeoAnalytics + IPAnalytics gives you edge. Understand how users interact with your deep links, short URLs, and download links, gaining valuable data to optimize your campaigns and maximize app engagement."
      />

      <FeatureList
        image={LogoImage}
        heading="We Are Appnor.co®"
        desc="Appnor is innovating Deep Links since they have emerged. We are leaders in Mobile Deep Linking industry. We created several inhouse technologies around Deep Linking and URL redirection across various OS."
      />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default FeatureListPage;
