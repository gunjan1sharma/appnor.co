import FaqComponent from "./FaqComponent";

function FaqList(props: any) {
  return (
    <div className="p-4 mt-20 lg:mx-20">
      <h1>FAQ (How it works)</h1>
      <div
        className="mt-3 mb-3"
        style={{ borderBottomWidth: "1px", borderBottomColor: "lightgray" }}
      />
      <FaqComponent
        faq="What is AppNor and what does it do?"
        answer="AppNor is an all-in-one platform that simplifies app engagement by providing deep linking, URL shortening, and app download link generation. It helps you connect users directly to specific content within your app, create branded short links for easy sharing, and generate beautiful download links for all major app stores."
      />
      <FaqComponent
        faq="How can AppNor benefit my business?"
        answer="AppNor can increase user engagement, boost app downloads, and gain valuable insights into user behavior. Deep linking takes users directly to the right spot in your app, keeping them immersed and exploring more. Branded short links enhance shareability and promote your app across channels. Download links make your app easily discoverable and accessible to a wider audience. Additionally, AppNor provides analytics to track user interactions and optimize your campaigns."
      />
      <FaqComponent
        faq="Is AppNor easy to use?"
        answer="Absolutely! AppNor is designed with a user-friendly interface that requires no technical expertise. Creating deep links, short URLs, and download links is just a few clicks away. The platform is also mobile-friendly for on-the-go management."
      />

      <FaqComponent
        faq=" Does AppNor offer a free plan?"
        answer="Yes, AppNor offers a generous freemium plan that allows you to try out its core features. This is perfect for businesses starting out or testing the platform before upgrading. Paid plans offer additional features and higher usage limits to cater to growing needs."
      />
      <FaqComponent
        faq="How can I integrate AppNor with my existing tools?"
        answer="AppNor integrates seamlessly with popular marketing and analytics tools, including Google Analytics, Facebook Ads, and Mailchimp. This allows you to leverage your existing workflows and gain a holistic view of your app engagement efforts."
      />
      <FaqComponent
        faq="Is AppNor secure and reliable?"
        answer="AppNor takes data security very seriously. It uses robust encryption and adheres to industry-standard security practices to protect your app and user data. The platform is also highly reliable and offers uptime guarantees to ensure consistent performance."
      />

     
    </div>
  );
}

export default FaqList;
