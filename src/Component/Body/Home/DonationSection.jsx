import { useState } from "react";
import GolestanIcon from "../../../../public/Golestan_Logo_KulutrHub_farbe.svg";
import { useTranslation } from "react-i18next";

const DonationSection = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const [amount, setAmount] = useState(25);

  const presetAmounts = [10, 25, 50, 100];

  return (
    <section className="max-w-5xl mx-auto px-4 py-20">
      <div className="border-gray-300 border rounded-3xl shadow-xl overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Left Side */}
          <div className="bg-[#BCDEDC] p-10">
            <span className="inline-block bg-[#E4F8F7] px-4 py-2 rounded-full text-sm mb-6">
              {t("donation_support_mission_title")}
            </span>

            <h2 className="text-4xl font-bold mb-6">
              {t("donation_accessible_culture_title")}
            </h2>

            <p className="leading-8">{t("donation_description")}</p>

            <div className="mt-10 px-10 py-10 flex justify-center">
              <img src={GolestanIcon} />
            </div>
          </div>

          {/* Right Side */}
          <div className="p-10 bg-[#E4F8F7]">
            <h3 className="text-2xl font-bold mb-6">
              {t("donation_form_title")}
            </h3>

            <label className="block text-sm font-medium mb-3">
              {t("donation_choose_amount_label")}
            </label>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {presetAmounts.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAmount(value)}
                  className={`rounded-xl border p-4 font-semibold transition ${
                    amount === value
                      ? "bg-[#1B6269] text-white border-[#0f4146]"
                      : "border-[#1B6269]"
                  }`}
                >
                  €{value}
                </button>
              ))}
            </div>

            <label className="block text-sm font-medium mb-3">
              {t("donation_another_amount_label")}
            </label>

            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded-xl p-4 mb-6"
              placeholder={t("donation_another_amount_label")}
            />

            <input
              type="text"
              placeholder={t("donation_name_label")}
              className="w-full border rounded-xl p-4 mb-4"
            />

            <input
              type="email"
              placeholder={t("donation_email_label")}
              className="w-full border rounded-xl p-4 mb-6"
            />

            <div className="mb-6">
              <label className="block font-medium mb-3">
                {t("donation_payment_method_label")}
              </label>

              <div className="flex gap-3">
                <button type="button" className="border rounded-xl px-5 py-3">
                  PayPal
                </button>
              </div>
            </div>

            <button className="w-full bg-[#1B6269] hover:bg-[#0a344c] text-white font-semibold py-4 rounded-xl transition">
              {t("donation_submit_button")} €{amount}
            </button>

            <p className="text-center text-sm mt-4">
              {t("donation_secure_payment_text")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default DonationSection;
