import { ExternalLink, MapPinPlus, NotepadText, UserRound } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

const InfoBox = ({
  homePageInfoBoxTitleOne,
  homePageInfoBoxTitleTwo,
  homePageInfoBoxTitleThree,
  homePageInfoBoxTextOne,
  // homePageInfoBoxTextTwo,
  // homePageInfoBoxTextThree,
  image,
}) => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full lg:w-[370px] h-[380px]  mb-8 lg:mb-0 rounded-md">
      <img src={image} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/50 "></div>
      <div className="absolute inset-0 text-xl text-[#ECEAD3] gap-1 flex flex-col justify-between px-4 py-4">
        {homePageInfoBoxTitleOne && (
          // text-[#ECEAD3]
          <p className="text-3xl font-bold mb-8 text-[#ECEAD3]">
            {homePageInfoBoxTitleOne}
          </p>
        )}
        {homePageInfoBoxTitleTwo && (
          <p className="text-3xl font-bold mb-8 text-[#ECEAD3]">
            {homePageInfoBoxTitleTwo}
          </p>
        )}
        {homePageInfoBoxTitleThree && (
          <p className="text-3xl font-bold mb-8 text-[#ECEAD3]">
            {homePageInfoBoxTitleThree}
          </p>
        )}
        {homePageInfoBoxTextOne && (
          <p className="text-[#1B6269]">
            {homePageInfoBoxTextOne?.length > 85
              ? `${homePageInfoBoxTextOne.slice(0, 85)}...`
              : homePageInfoBoxTextOne}
          </p>
        )}
        {/* {homePageInfoBoxTextTwo && (
          <p className="text-[#1B6269]">
            {homePageInfoBoxTextTwo?.length > 85
              ? `${homePageInfoBoxTextTwo.slice(0, 85)}...`
              : homePageInfoBoxTextTwo}
          </p>
        )}
        {homePageInfoBoxTextThree && (
          <p className="text-[#1B6269]">
            {homePageInfoBoxTextThree?.length > 85
              ? `${homePageInfoBoxTextThree.slice(0, 85)}...`
              : homePageInfoBoxTextThree}
          </p>
        )} */}
        {/* <div className="flex mt-6 gap-2">
          <NotepadText className="w-4 h-4" />
          <p className="text-sm ">Start: 01.06.2026</p>
        </div>
        <div className="flex gap-2">
          <UserRound className="w-4 h-4" />
          <p className="text-sm">Lecturer: Naghmeh</p>
        </div>
        <div className="flex gap-2">
          <MapPinPlus className="w-4 h-4" />
          <p className="text-sm">Location: Pankow, Berlin</p>
        </div> */}
        <div className=" flex gap-3 mt-6">
          <p className="text-xl font-bold  text-[#ECEAD3]">
            {" "}
            {t("homePageInfoBoxBTN")}
          </p>
          <ExternalLink color="#ECEAD3" />
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
