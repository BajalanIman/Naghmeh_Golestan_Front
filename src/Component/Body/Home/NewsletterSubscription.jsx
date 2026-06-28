import { Send } from "lucide-react";
import React from "react";

const NewsletterSubscription = () => {
  return (
    <div className="w-full lg:h-[700px] flex flex-col lg:flex-row pt-12 lg:pt-0 px-6 lg:px-0">
      <div className="w-full lg:w-1/2 bg-[#BCDEDC] h-full px-10 py-12 lg:pb-0">
        <div className="flex gap-6 ">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold mb-1">Newsletter</h1>
            <h1 className="text-4xl font-bold">Subscription</h1>
          </div>
          <Send className="w-20 h-20" />
        </div>
        <div className="text-2xl flex flex-col gap-2 mt-12 mb-12">
          <p>History told up to date:</p>
          <p>If you want to stay up to date,</p>
          <p>subscribe to our newsletter.</p>
        </div>
        {/* email */}
        <div className="flex flex-col">
          <input
            placeholder="Your email address"
            className="bg-[#CAE0DF] border border-[#1B6269] rounded-3xl h-12 w-72 lg:w-96 pl-4"
          />
          <span className="text-[11px] pl-8 mt-3">
            I would like to receive your newsletter
          </span>
          <span className="text-[11px] pl-8 ">
            and accept the privacy policy.
          </span>
          <div className="text-white flex flex-row bg-[#1B6269] rounded-lg justify-center items-center gap-3 w-28 h-14 mt-8">
            <p>Send</p>
            <Send className=" w-6 h-6" />
          </div>
        </div>
      </div>
      {/* right */}
      <img
        className="h-96 w-full lg:w-1/2 lg:h-[700px] "
        src="https://wallpaperaccess.com/full/167767.jpg"
      />
    </div>
  );
};

export default NewsletterSubscription;
