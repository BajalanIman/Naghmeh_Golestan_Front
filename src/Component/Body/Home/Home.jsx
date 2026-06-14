import Footer from "../Footer/Footer";
import Imagegallery from "./Imagegallery";
import InfoBox from "./InfoBox";
import Linktonews from "./Linktonews";
import Mainbody from "./Mainbody";
import SmallInformation from "./SmallInformation";
import Mainworkshop from "./../Workshops/Mainworkshop";
import NewsletterSubscription from "./NewsletterSubscription";
import TextAndImage from "./TextAndImage";
import { useTranslation } from "react-i18next";

const home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Mainbody />
      <Linktonews />
      <SmallInformation
        aboutUsTitle={t("aboutUsTitle")}
        aboutUsText={t("aboutUsText")}
      />
      <Imagegallery />
      <div className="px-6 lg:px-12 py-12 w-full flex flex-col lg:flex-row lg:justify-between">
        <InfoBox
          homePageInfoBoxTitleOne={t("homePageInfoBoxTitleOne")}
          homePageInfoBoxTextOne={t("homePageInfoBoxTextOne")}
          image={
            "https://static.vecteezy.com/system/resources/thumbnails/039/593/345/small_2x/ai-generated-young-women-in-traditional-clothing-celebrate-a-colorful-cultural-parade-generated-by-ai-free-photo.jpg"
          }
        />
        <InfoBox
          homePageInfoBoxTitleTwo={t("homePageInfoBoxTitleTwo")}
          homePageInfoBoxTextTwo={t("homePageInfoBoxTextTwo")}
          image={
            "https://img.freepik.com/premium-photo/cultural-exchange-event-where-people-share-traditi_1148322-51124.jpg"
          }
        />
        <InfoBox
          homePageInfoBoxTitleThree={t("homePageInfoBoxTitleThree")}
          homePageInfoBoxTextThree={t("homePageInfoBoxTextThree")}
          image={"https://wallpaperaccess.com/full/2633589.jpg"}
        />
      </div>
      <Mainworkshop
        HomepageMainWorkshopTitle={t("HomepageMainWorkshopTitle")}
        HomepageMainWorkshopText={t("HomepageMainWorkshopText")}
        ContinueReading={t("ContinueReading")}
      />
      <TextAndImage
        HomepageTextAndImageTitle={t("HomepageMissionTitle")}
        HomepageTextAndImageText={t("HomepageMissionText")}
        image={
          "https://static.vecteezy.com/system/resources/previews/026/481/532/large_2x/serenity-and-peace-with-this-breathtaking-4k-wallpaper-depicting-a-tranquil-natural-landscape-free-photo.jpg"
        }
      />
      <NewsletterSubscription />
      <TextAndImage
        HomepageTextAndImageTitle={t("HomepageOurProgramsTitle")}
        HomepageTextAndImageText={t("HomepageOurProgramsText")}
        image={
          "https://4kwallpapers.com/images/wallpapers/mushroom-forest-3840x2160-10854.jpg"
        }
      />
      {/* <Footer /> */}
    </div>
  );
};
export default home;
