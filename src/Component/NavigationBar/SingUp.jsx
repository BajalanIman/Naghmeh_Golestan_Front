import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { Eye, EyeOff, X } from "lucide-react";
import { BASE_URL } from "../../constants/constants";

function SignUp() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    wantsMembership: false,
    billingInterval: "MONTHLY",
  });

  const [membershipPrices, setMembershipPrices] = useState({
    MONTHLY: {
      amount: 10,
      currency: "EUR",
    },
    YEARLY: {
      amount: 100,
      currency: "EUR",
    },
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pricesLoading, setPricesLoading] = useState(true);

  useEffect(() => {
    const fetchMembershipPlans = async () => {
      try {
        setPricesLoading(true);

        const response = await axios.get(`${BASE_URL}memberships/plans`);

        const plans = response.data.plans || [];
        const prices = plans.flatMap((plan) => plan.prices || []);

        const monthlyPrice = prices.find(
          (price) => price.billingInterval === "MONTHLY",
        );

        const yearlyPrice = prices.find(
          (price) => price.billingInterval === "YEARLY",
        );

        setMembershipPrices((previousPrices) => ({
          MONTHLY: monthlyPrice
            ? {
                amount: Number(monthlyPrice.amount),
                currency: monthlyPrice.currency,
              }
            : previousPrices.MONTHLY,

          YEARLY: yearlyPrice
            ? {
                amount: Number(yearlyPrice.amount),
                currency: yearlyPrice.currency,
              }
            : previousPrices.YEARLY,
        }));
      } catch (error) {
        console.error("Unable to load membership prices:", error);
      } finally {
        setPricesLoading(false);
      }
    };

    fetchMembershipPlans();
  }, []);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (message) {
      setMessage("");
      setMessageType("");
    }
  };

  const formatPrice = (price) => {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: price.currency || "EUR",
      }).format(price.amount);
    } catch {
      return `€${price.amount}`;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoading) return;

    setMessage("");
    setMessageType("");
    setSuccess(false);

    const signUpData = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim() || null,
      password: form.password,
    };

    try {
      setIsLoading(true);

      const signUpResponse = await axios.post(
        `${BASE_URL}auth/signup`,
        signUpData,
        {
          withCredentials: true,
        },
      );

      localStorage.setItem(
        "marco_user",
        JSON.stringify(signUpResponse.data.user),
      );

      if (form.wantsMembership) {
        setMessage("Account created successfully. Redirecting to payment...");
        setMessageType("success");

        const checkoutResponse = await axios.post(
          `${BASE_URL}memberships/checkout`,
          {
            billingInterval: form.billingInterval,
          },
          {
            withCredentials: true,
          },
        );

        const checkoutUrl = checkoutResponse.data.checkoutUrl;

        if (!checkoutUrl) {
          throw new Error("The membership checkout URL was not returned.");
        }

        window.location.assign(checkoutUrl);
        return;
      }

      setMessage(signUpResponse.data.message || "Signup successful!");
      setMessageType("success");
      setSuccess(true);
    } catch (error) {
      console.error("Signup error:", error);

      setMessage(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Signup failed.",
      );

      setMessageType("error");
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-100 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] bg-white p-6 rounded shadow-md space-y-4"
      >
        <div>
          <Link style={{ color: "gray" }} to="/">
            <X />
          </Link>

          <h2 className="text-xl font-bold text-center">Sign Up</h2>
        </div>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          disabled={isLoading}
          autoComplete="given-name"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          disabled={isLoading}
          autoComplete="family-name"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          disabled={isLoading}
          autoComplete="email"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number (Optional)"
          value={form.phone}
          onChange={handleChange}
          disabled={isLoading}
          autoComplete="tel"
          className="w-full p-2 border rounded"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            disabled={isLoading}
            autoComplete="new-password"
            minLength={8}
            className="w-full p-2 border rounded pr-10"
            required
          />

          <button
            type="button"
            className="absolute right-3 top-2 cursor-pointer"
            onClick={() => setShowPassword((previousValue) => !previousValue)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <Eye size={20} color="blue" />
            ) : (
              <EyeOff size={20} color="gray" />
            )}
          </button>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="wantsMembership"
            checked={form.wantsMembership}
            onChange={handleChange}
            disabled={isLoading}
          />

          <span>I would like to become a member</span>
        </label>

        {form.wantsMembership && (
          <div className="border rounded p-3 space-y-3">
            <p className="font-medium">Select your membership:</p>

            <label className="flex items-center justify-between gap-2 border rounded p-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="billingInterval"
                  value="MONTHLY"
                  checked={form.billingInterval === "MONTHLY"}
                  onChange={handleChange}
                  disabled={isLoading}
                />

                <span>Monthly membership</span>
              </div>

              <span className="font-semibold text-[#276a70]">
                {pricesLoading
                  ? "Loading..."
                  : `${formatPrice(membershipPrices.MONTHLY)} / month`}
              </span>
            </label>

            <label className="flex items-center justify-between gap-2 border rounded p-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="billingInterval"
                  value="YEARLY"
                  checked={form.billingInterval === "YEARLY"}
                  onChange={handleChange}
                  disabled={isLoading}
                />

                <span>Yearly membership</span>
              </div>

              <span className="font-semibold text-[#276a70]">
                {pricesLoading
                  ? "Loading..."
                  : `${formatPrice(membershipPrices.YEARLY)} / year`}
              </span>
            </label>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-[#276a70] text-[#ECEAD3] p-2 rounded hover:bg-[#3a9ea8] ${
            isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isLoading
            ? form.wantsMembership
              ? "Processing..."
              : "Creating account..."
            : "Sign Up"}
        </button>

        {message && (
          <p
            className={`text-center text-sm mt-2 ${
              messageType === "success" ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>

      <div className="flex gap-1">
        <p>You already have an account?</p>

        <Link to="/login" style={{ color: "blue" }}>
          Click here!
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
