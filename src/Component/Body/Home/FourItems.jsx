import { useTranslation } from "react-i18next";

const items = [
  {
    translationKey: "Homepage_Literature",
    alt: "Literature",
    image:
      "https://res.cloudinary.com/r4pnipqe/image/upload/v1785710267/Litearture_u55l9r.png",
  },
  {
    translationKey: "Homepage_Music",
    alt: "Music",
    image:
      "https://res.cloudinary.com/r4pnipqe/image/upload/v1785711018/music2_exyzd5.png",
  },
  {
    translationKey: "Homepage_Film",
    alt: "Film",
    image:
      "https://res.cloudinary.com/r4pnipqe/image/upload/v1785710633/Film2_qd4e2v.png",
  },
  {
    translationKey: "Homepage_Kunst",
    alt: "Art",
    image:
      "https://res.cloudinary.com/r4pnipqe/image/upload/v1786269845/art_n8bvzw2_ul3rlz.png",
  },
];

const FourItems = () => {
  const { t } = useTranslation();

  const renderCards = (duplicate = false) =>
    items.map(({ translationKey, alt, image }, index) => (
      <article
        key={`${duplicate ? "duplicate" : "original"}-${translationKey}`}
        className="group relative h-[330px] w-[280px] shrink-0 cursor-pointer overflow-hidden rounded-lg sm:w-[320px] lg:w-[280px]"
        aria-hidden={duplicate}
      >
        <img
          src={image}
          alt={duplicate ? "" : alt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-[#1B6269]/10" />

        <div className="absolute bottom-6 left-6">
          <h3 className="text-xl font-bold text-[#ECEAD3]">
            {t(translationKey)}
          </h3>
        </div>
      </article>
    ));

  return (
    <section>
      <h2 className="mb-8 text-3xl font-bold px-12">
        {t("Connect_diverse_culture")}
      </h2>

      <div className="marquee-container mb-12">
        <div className="marquee-track">
          {/* First card collection */}
          <div className="marquee-group">{renderCards()}</div>

          {/* Duplicate for seamless animation */}
          <div className="marquee-group" aria-hidden="true">
            {renderCards(true)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FourItems;
