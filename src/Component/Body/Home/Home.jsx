import Footer from "../Footer/Footer";
import Imagegallery from "./Imagegallery";
import InfoBox from "./InfoBox";
import Linktonews from "./Linktonews";
import Mainbody from "./Mainbody";
import SmallInformation from "./SmallInformation";
import Mainworkshop from "./../Workshops/Mainworkshop";
import NewsletterSubscription from "./NewsletterSubscription";
import TextAndImage from "./TextAndImage";

const home = () => {
  return (
    <div>
      <Mainbody />
      <Linktonews />
      <SmallInformation />
      <Imagegallery />
      <div className="px-6 lg:px-12 py-12 w-full flex flex-col lg:flex-row lg:justify-between">
        <InfoBox
          image={
            "https://static.vecteezy.com/system/resources/thumbnails/039/593/345/small_2x/ai-generated-young-women-in-traditional-clothing-celebrate-a-colorful-cultural-parade-generated-by-ai-free-photo.jpg"
          }
        />
        <InfoBox
          image={
            "https://img.freepik.com/premium-photo/cultural-exchange-event-where-people-share-traditi_1148322-51124.jpg"
          }
        />
        <InfoBox image={"https://wallpaperaccess.com/full/2633589.jpg"} />
      </div>
      <Mainworkshop />
      <TextAndImage
        text={
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
        }
        image={
          "https://static.vecteezy.com/system/resources/previews/026/481/532/large_2x/serenity-and-peace-with-this-breathtaking-4k-wallpaper-depicting-a-tranquil-natural-landscape-free-photo.jpg"
        }
      />
      <NewsletterSubscription />
      <TextAndImage
        text={
          "Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis."
        }
        image={
          "https://4kwallpapers.com/images/wallpapers/mushroom-forest-3840x2160-10854.jpg"
        }
      />
      <Footer />
    </div>
  );
};
export default home;
