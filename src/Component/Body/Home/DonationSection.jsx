import { useState } from "react";

const DonationSection = () => {
  const [amount, setAmount] = useState(25);

  const presetAmounts = [10, 25, 50, 100];

  return (
    <section className="max-w-5xl mx-auto px-4 py-20">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Left Side */}
          <div className="bg-[#0A5F91] text-white p-10">
            <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm mb-6">
              Support Our Mission
            </span>

            <h2 className="text-4xl font-bold mb-6">
              Help Us Keep Culture Accessible
            </h2>

            <p className="text-violet-100 leading-8">
              Your contribution helps us organize cultural events, workshops,
              exhibitions, and community programs for people of all ages and
              backgrounds.
            </p>

            <div className="mt-10 space-y-4">
              <div>🎨 Support creative workshops</div>
              <div>📚 Fund educational programs</div>
              <div>🌍 Promote cultural diversity</div>
              <div>🤝 Strengthen community connections</div>
            </div>
          </div>

          {/* Right Side */}
          <div className="p-10">
            <h3 className="text-2xl font-bold text-[#0A5F91] mb-6">
              Make a Donation
            </h3>

            <label className="block text-sm font-medium mb-3">
              Choose an Amount
            </label>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {presetAmounts.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAmount(value)}
                  className={`rounded-xl border p-4 font-semibold transition ${
                    amount === value
                      ? "bg-[#0A5F91] text-white border-violet-300"
                      : "border-gray-300"
                  }`}
                >
                  €{value}
                </button>
              ))}
            </div>
            <label className="block text-sm font-medium mb-3">
              Another Amount
            </label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded-xl p-4 mb-6"
              placeholder="Custom Amount"
            />

            <input
              type="text"
              placeholder="Name (optional)"
              className="w-full border rounded-xl p-4 mb-4"
            />

            <input
              type="email"
              placeholder="Email (optional)"
              className="w-full border rounded-xl p-4 mb-6"
            />

            <div className="mb-6">
              <label className="block font-medium mb-3">Payment Method</label>

              <div className="flex gap-3">
                <button type="button" className="border rounded-xl px-5 py-3">
                  PayPal
                </button>
              </div>
            </div>

            <button className="w-full bg-[#0A5F91] hover:bg-[#0a344c] text-white font-semibold py-4 rounded-xl transition">
              Donate €{amount}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Secure payment processing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default DonationSection;
