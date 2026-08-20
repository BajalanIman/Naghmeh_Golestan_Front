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
import DonationSection from "./DonationSection";
import FourItems from "./FourItems";
import { Link } from "react-router-dom";

const home = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#F1EFEE] text-[#1B6269]">
      <Mainbody />
      <Linktonews />
      <SmallInformation
        aboutUsTitle={t("aboutUsTitle")}
        aboutUsText={t("aboutUsText")}
      />

      <Imagegallery />
      <div className="px-6 lg:px-12 py-12 w-full flex flex-col lg:flex-row lg:justify-between">
        <Link to="/courses">
          <InfoBox
            homePageInfoBoxTitleOne={t("homePageInfoBoxTitleOne")}
            // homePageInfoBoxTextOne={t("homePageInfoBoxTextOne")}
            image={
              "https://res.cloudinary.com/r4pnipqe/image/upload/v1785177263/culture_poqwcc.png"
            }
          />
        </Link>
        <Link to="/courses">
          <InfoBox
            homePageInfoBoxTitleTwo={t("homePageInfoBoxTitleTwo")}
            // homePageInfoBoxTextTwo={t("homePageInfoBoxTextTwo")}
            image={
              "https://res.cloudinary.com/r4pnipqe/image/upload/v1785177262/film_ccvffj.png "
            }
          />
        </Link>
        <Link to="/courses">
          <InfoBox
            homePageInfoBoxTitleThree={t("homePageInfoBoxTitleThree")}
            // homePageInfoBoxTextThree={t("homePageInfoBoxTextThree")}
            image={
              "https://res.cloudinary.com/r4pnipqe/image/upload/v1785177263/Persische_Literatur_enxh81.png"
            }
          />
        </Link>
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
          "https://res.cloudinary.com/r4pnipqe/image/upload/v1785183105/Joins_us1_uvfe9d.jpg"
        }
      />
      <FourItems />
      <NewsletterSubscription showFormat={1} />
      <DonationSection />
      <Footer />
    </div>
  );
};
export default home;
