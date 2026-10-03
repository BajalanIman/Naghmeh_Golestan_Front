import { useEffect, useMemo, useState } from "react";

import { useTranslation } from "react-i18next";

import {
  createActivityOrder,
  createFreeActivityRegistration,
  createPaymentCheckout,
  fetchActivityAvailability,
  fetchActivityQuote,
} from "./bookingApi";
import { analyzeCourseSessions } from "./courseSessionUtils.js";

/**
 * sessionMode:
 *
 * "SINGLE"
 * کاربر فقط یک Session را انتخاب می‌کند.
 *
 * "MULTIPLE"
 * کاربر می‌تواند چند Session را انتخاب کند.
 *
 * "ALL"
 * کاربر به صورت خودکار برای تمام Sessionها ثبت‌نام می‌شود.
 *
 * برای Event معمولاً SINGLE مناسب است.
 * برای Course چندجلسه‌ای معمولاً ALL مناسب است.
 */
const ActivityBooking = ({
  activity,
  activityLabel = "Activity",
  sessionMode: requestedSessionMode,
  requireConsent = false,
  consentText = "I agree to be contacted regarding this registration.",
  title,
  description,
  submitLabel,
  className = "",
  onBookingCompleted,
}) => {
  const { i18n } = useTranslation();

  const isCourse = activity?.type === "COURSE";

  // Course session handling is special:
  // - ordinary course: every session is included automatically
  // - course with alternative time slots: user chooses ONE time slot and
  //   all dates that belong to that slot are included automatically
  const sessionMode = isCourse
    ? "ALL"
    : activity?.sessionSelectionMode || requestedSessionMode || "SINGLE";

  const [availability, setAvailability] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const [selectedSessionIds, setSelectedSessionIds] = useState([]);

  const [selectedCourseSlotKey, setSelectedCourseSlotKey] = useState("");

  const [guestForm, setGuestForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [quote, setQuote] = useState(null);

  const [availabilityLoading, setAvailabilityLoading] = useState(false);

  const [quoteLoading, setQuoteLoading] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [consentAccepted, setConsentAccepted] = useState(false);

  const [message, setMessage] = useState("");

  const [messageType, setMessageType] = useState("");

  const storedUser = useMemo(() => {
    try {
      const savedUser = localStorage.getItem("marco_user");

      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  }, []);

  const currentLanguage = useMemo(() => {
    const rawLanguage = i18n.resolvedLanguage || i18n.language || "en";

    const languageCode = rawLanguage.split("-")[0].toUpperCase();

    return ["EN", "DE", "FA"].includes(languageCode) ? languageCode : "EN";
  }, [i18n.language, i18n.resolvedLanguage]);

  const sessions = useMemo(() => activity?.sessions || [], [activity]);

  const courseSchedule = useMemo(
    () => analyzeCourseSessions(isCourse ? sessions : [], i18n.language || "en"),
    [isCourse, sessions, i18n.language],
  );

  const courseHasTimeSlots = isCourse && courseSchedule.hasTimeSlots;

  const selectedCourseSlot = useMemo(
    () =>
      courseHasTimeSlots
        ? courseSchedule.groups.find((group) => group.key === selectedCourseSlotKey) || null
        : null,
    [courseHasTimeSlots, courseSchedule.groups, selectedCourseSlotKey],
  );

  const effectiveSessionIds = useMemo(() => {
    if (isCourse) {
      if (courseHasTimeSlots) {
        return selectedCourseSlot?.sessionIds || [];
      }

      return sessions.map((session) => session.id).filter(Boolean);
    }

    if (sessionMode === "ALL") {
      return sessions.map((session) => session.id).filter(Boolean);
    }

    return selectedSessionIds;
  }, [
    isCourse,
    courseHasTimeSlots,
    selectedCourseSlot,
    sessionMode,
    sessions,
    selectedSessionIds,
  ]);

  const timeSlotSelectionMissing =
    courseHasTimeSlots && !selectedCourseSlotKey;

  const isFree = Boolean(activity?.isFree);

  const resolvedTitle = title || `Book this ${activityLabel}`;

  const resolvedDescription =
    description ||
    `Select the number of participants and complete the booking information.`;

  const clearMessage = () => {
    if (message) {
      setMessage("");
      setMessageType("");
    }
  };

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
  };

  const formatCurrency = (value, currency = "EUR") => {
    return new Intl.NumberFormat(i18n.language || "en", {
      style: "currency",
      currency,
    }).format(Number(value || 0));
  };

  /*
    پیام موفقیت یا خطا بعد از ۵ ثانیه حذف می‌شود.
  */
  useEffect(() => {
    if (!message) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  /*
    با تغییر Activity، Stateهای رزرو Reset می‌شوند.
  */
  useEffect(() => {
    setQuantity(1);
    setQuote(null);
    setAvailability(null);
    setConsentAccepted(false);
    setMessage("");
    setMessageType("");

    setSelectedCourseSlotKey("");

    if (!activity) {
      setSelectedSessionIds([]);
      return;
    }

    if (isCourse) {
      setSelectedSessionIds([]);
      return;
    }

    if (sessionMode === "ALL") {
      setSelectedSessionIds([]);
      return;
    }

    if (activity.sessions?.length === 1) {
      setSelectedSessionIds([activity.sessions[0].id]);

      return;
    }

    setSelectedSessionIds([]);
  }, [activity?.id, isCourse, sessionMode]);

  /*
    دریافت ظرفیت Activity و Sessionها.
  */
  useEffect(() => {
    if (!activity?.id) {
      return undefined;
    }

    const controller = new AbortController();

    const loadAvailability = async () => {
      try {
        setAvailabilityLoading(true);

        const result = await fetchActivityAvailability(activity.id, {
          signal: controller.signal,
        });

        setAvailability(result);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Availability loading error:", error);

          showMessage(error.message || "Unable to load availability.", "error");
        }
      } finally {
        setAvailabilityLoading(false);
      }
    };

    loadAvailability();

    return () => controller.abort();
  }, [activity?.id]);

  /*
    با تغییر تعداد نفرات یا Sessionهای انتخاب‌شده،
    Quote جدید از Backend می‌گیریم.

    برای SINGLE و MULTIPLE تا قبل از انتخاب Session
    قیمت نمایش داده نمی‌شود.
  */
  useEffect(() => {
    const selectionRequired = courseHasTimeSlots
      ? !selectedCourseSlotKey
      : sessions.length > 0 && !isCourse && sessionMode !== "ALL";

    if (
      !activity?.id ||
      !quantity ||
      selectionRequired ||
      (!isCourse &&
        sessions.length > 0 &&
        sessionMode !== "ALL" &&
        selectedSessionIds.length === 0)
    ) {
      setQuote(null);
      setQuoteLoading(false);
      return undefined;
    }

    const controller = new AbortController();

    const loadQuote = async () => {
      try {
        setQuote(null);
        setQuoteLoading(true);

        const result = await fetchActivityQuote(
          {
            activityId: activity.id,
            sessionIds: effectiveSessionIds,
            quantity,
          },
          {
            signal: controller.signal,
          },
        );

        if (!controller.signal.aborted) setQuote(result);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Quote loading error:", error);

          setQuote(null);

          showMessage(
            error.message || "Unable to calculate the booking price.",
            "error",
          );
        }
      } finally {
        if (!controller.signal.aborted) setQuoteLoading(false);
      }
    };

    loadQuote();

    return () => controller.abort();
  }, [
    activity?.id,
    quantity,
    sessionMode,
    sessions.length,
    effectiveSessionIds,
    isCourse,
    courseHasTimeSlots,
    selectedCourseSlotKey,
  ]);

  const selectedSessionsRemaining = useMemo(() => {
    if (effectiveSessionIds.length === 0) {
      return null;
    }

    const remainingValues = effectiveSessionIds
      .map((sessionId) =>
        availability?.sessions?.find((item) => item.id === sessionId)?.remaining,
      )
      .filter((value) => value !== null && value !== undefined)
      .map(Number);

    return remainingValues.length > 0 ? Math.min(...remainingValues) : null;
  }, [availability?.sessions, effectiveSessionIds]);

  const effectiveRemaining = useMemo(() => {
    const values = [availability?.remaining, selectedSessionsRemaining]
      .filter((value) => value !== null && value !== undefined)
      .map(Number);

    return values.length > 0 ? Math.min(...values) : null;
  }, [availability?.remaining, selectedSessionsRemaining]);

  const getTimeSlotRemaining = (group) => {
    const remainingValues = group.sessionIds
      .map((sessionId) =>
        availability?.sessions?.find((item) => item.id === sessionId)?.remaining,
      )
      .filter((value) => value !== null && value !== undefined)
      .map(Number);

    if (remainingValues.length === 0) {
      return availability?.remaining ?? null;
    }

    const sessionRemaining = Math.min(...remainingValues);

    return availability?.remaining === null ||
      availability?.remaining === undefined
      ? sessionRemaining
      : Math.min(sessionRemaining, Number(availability.remaining));
  };

  const allCourseTimeSlotsFull =
    courseHasTimeSlots &&
    courseSchedule.groups.length > 0 &&
    courseSchedule.groups.every((group) => getTimeSlotRemaining(group) === 0);

  const maximumSelectable = useMemo(() => {
    if (timeSlotSelectionMissing) {
      return 0;
    }

    const backendMaximum =
      availability?.maxTicketsPerOrder || activity?.maxTicketsPerOrder || 5;

    const configuredMaximum = Math.min(Number(backendMaximum) || 5, 5);

    if (effectiveRemaining === null || effectiveRemaining === undefined) {
      return configuredMaximum;
    }

    return Math.max(Math.min(configuredMaximum, effectiveRemaining), 0);
  }, [
    timeSlotSelectionMissing,
    availability?.maxTicketsPerOrder,
    activity?.maxTicketsPerOrder,
    effectiveRemaining,
  ]);

  /*
    اگر ظرفیت Slot/Session انتخاب‌شده تغییر کند و تعداد نفرات
    بیشتر از ظرفیت باقی‌مانده باشد، quantity اصلاح می‌شود.
  */
  useEffect(() => {
    if (timeSlotSelectionMissing) {
      setQuantity(1);
      return;
    }

    if (maximumSelectable > 0 && quantity > maximumSelectable) {
      setQuantity(maximumSelectable);
    }
  }, [timeSlotSelectionMissing, maximumSelectable, quantity]);

  const isFullyBooked =
    availability?.isFull ||
    allCourseTimeSlotsFull ||
    (!timeSlotSelectionMissing && maximumSelectable === 0);

  const handleCourseTimeSlotSelection = (group) => {
    if (!group || getTimeSlotRemaining(group) === 0) {
      return;
    }

    setSelectedCourseSlotKey(group.key);
    setQuantity(1);
    clearMessage();
  };

  const handleGuestChange = (event) => {
    const { name, value } = event.target;

    setGuestForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    clearMessage();
  };

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
    clearMessage();
  };

  const handleSessionSelection = (sessionId) => {
    clearMessage();

    if (sessionMode === "ALL") {
      return;
    }

    if (sessionMode === "SINGLE") {
      setSelectedSessionIds([sessionId]);
      return;
    }

    setSelectedSessionIds((previousSessionIds) => {
      if (previousSessionIds.includes(sessionId)) {
        return previousSessionIds.filter((id) => id !== sessionId);
      }

      return [...previousSessionIds, sessionId];
    });
  };

  const validateBookingInformation = () => {
    if (!activity) {
      showMessage("Activity information is unavailable.", "error");

      return null;
    }

    if (courseHasTimeSlots && !selectedCourseSlotKey) {
      showMessage("Please select a course time slot.", "error");

      return null;
    }

    if (
      !Number.isInteger(quantity) ||
      quantity < 1 ||
      quantity > maximumSelectable
    ) {
      showMessage(
        `Please select between 1 and ${maximumSelectable} participants.`,
        "error",
      );

      return null;
    }

    if (
      !isCourse &&
      sessions.length > 0 &&
      sessionMode !== "ALL" &&
      selectedSessionIds.length === 0
    ) {
      showMessage("Please select a session.", "error");

      return null;
    }

    if (requireConsent && !consentAccepted) {
      showMessage("Please accept the registration consent.", "error");

      return null;
    }

    const firstName = storedUser?.firstName || guestForm.firstName.trim();

    const lastName = storedUser?.lastName || guestForm.lastName.trim();

    const email = (storedUser?.email || guestForm.email)?.trim().toLowerCase();

    const phone = (storedUser?.phone || guestForm.phone)?.trim();

    if (!firstName) {
      showMessage("Please enter your first name.", "error");

      return null;
    }

    if (firstName.length < 2) {
      showMessage("Please enter a valid first name.", "error");

      return null;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailPattern.test(email)) {
      showMessage("Please enter a valid email address.", "error");

      return null;
    }

    return {
      firstName,
      lastName: lastName || null,
      email,
      phone: phone || null,
    };
  };

  const refreshAvailability = async () => {
    if (!activity?.id) {
      return;
    }

    try {
      const result = await fetchActivityAvailability(activity.id);

      setAvailability(result);
    } catch (error) {
      console.error("Availability refresh error:", error);
    }
  };

  const handleBooking = async (event) => {
    event.preventDefault();

    if (isSubmitting || quoteLoading || isFullyBooked || !quote) {
      return;
    }

    setMessage("");
    setMessageType("");

    const customer = validateBookingInformation();

    if (!customer) {
      return;
    }

    try {
      setIsSubmitting(true);

      const bookingPayload = {
        activityId: activity.id,
        sessionIds: effectiveSessionIds,
        quantity,
        language: currentLanguage,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
      };

      /*
        Activity رایگان:
        مستقیماً Registration ساخته می‌شود.
      */
      if (isFree) {
        const registrationResult =
          await createFreeActivityRegistration(bookingPayload);

        showMessage(
          registrationResult.message || "Registration completed successfully.",
          "success",
        );

        await refreshAvailability();

        if (typeof onBookingCompleted === "function") {
          onBookingCompleted({
            type: "FREE_REGISTRATION",
            result: registrationResult,
          });
        }

        return;
      }

      /*
        Activity پولی:
        ابتدا Order ساخته می‌شود.
      */
      const orderResult = await createActivityOrder(bookingPayload);

      const orderId = orderResult.order?.id;

      if (!orderId) {
        throw new Error("The order ID was not returned.");
      }

      const guestAccessToken = orderResult.guestAccessToken || null;

      /*
        اطلاعات دسترسی Guest موقتاً در sessionStorage
        ذخیره می‌شود تا صفحه موفقیت بتواند وضعیت Payment
        را بررسی کند.
      */
      sessionStorage.setItem(
        `activity_checkout:${orderId}`,
        JSON.stringify({ orderId, guestAccessToken, activityId: activity.id }),
      );
      sessionStorage.setItem(
        "activity_checkout",
        JSON.stringify({
          orderId,
          guestAccessToken,
          activityId: activity.id,
          createdAt: new Date().toISOString(),
        }),
      );

      showMessage("Order created. Redirecting to secure payment...", "success");

      /*
        سپس Stripe Checkout ساخته می‌شود.
      */
      const checkoutResult = await createPaymentCheckout({
        orderId,
        guestAccessToken,
      });

      sessionStorage.setItem(
        `activity_checkout_session:${checkoutResult.checkoutSessionId}`,
        JSON.stringify({ orderId, guestAccessToken, activityId: activity.id }),
      );

      if (!checkoutResult.checkoutUrl) {
        throw new Error("The payment checkout URL was not returned.");
      }

      if (typeof onBookingCompleted === "function") {
        onBookingCompleted({
          type: "PAID_ORDER",
          order: orderResult,
          checkout: checkoutResult,
        });
      }

      window.location.assign(checkoutResult.checkoutUrl);
    } catch (error) {
      console.error(`${activityLabel} booking error:`, error);

      showMessage(error.message || "Unable to complete the booking.", "error");

      /*
        اگر Order ساخته شده ولی Stripe خطا داده باشد،
        اطلاعات Order در sessionStorage باقی می‌ماند تا
        بعداً امکان تلاش مجدد فراهم شود.
      */
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!activity) {
    return null;
  }

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 lg:p-10 ${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-[#1B6269]">
          {resolvedTitle}
        </h2>

        <p className="text-gray-500 mt-2">{resolvedDescription}</p>
      </div>

      <form
        onSubmit={handleBooking}
        className="grid grid-cols-1 lg:grid-cols-2 gap-5"
      >
        {/* اطلاعات User واردشده */}
        {storedUser && (
          <>
            <input
              type="text"
              value={`${storedUser.firstName || ""} ${
                storedUser.lastName || ""
              }`.trim()}
              placeholder="Full Name"
              readOnly
              className="border border-gray-300 rounded-xl p-4 bg-gray-50"
            />

            <input
              type="email"
              value={storedUser.email || ""}
              placeholder="Email Address"
              readOnly
              className="border border-gray-300 rounded-xl p-4 bg-gray-50"
            />

            <input
              type="tel"
              value={storedUser.phone || ""}
              placeholder="Phone Number"
              readOnly
              className="border border-gray-300 rounded-xl p-4 bg-gray-50 lg:col-span-2"
            />
          </>
        )}

        {/* اطلاعات Guest */}
        {!storedUser && (
          <>
            <input
              type="text"
              name="firstName"
              value={guestForm.firstName}
              onChange={handleGuestChange}
              disabled={isSubmitting}
              autoComplete="given-name"
              placeholder="First Name"
              className="border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#186f77]"
            />

            <input
              type="text"
              name="lastName"
              value={guestForm.lastName}
              onChange={handleGuestChange}
              disabled={isSubmitting}
              autoComplete="family-name"
              placeholder="Last Name"
              className="border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#186f77]"
            />

            <input
              type="email"
              name="email"
              value={guestForm.email}
              onChange={handleGuestChange}
              disabled={isSubmitting}
              autoComplete="email"
              placeholder="Email Address"
              className="border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#186f77]"
            />

            <input
              type="tel"
              name="phone"
              value={guestForm.phone}
              onChange={handleGuestChange}
              disabled={isSubmitting}
              autoComplete="tel"
              placeholder="Phone Number"
              className="border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#186f77]"
            />
          </>
        )}

        {courseHasTimeSlots && (
          <div className="lg:col-span-2 space-y-3">
            <div>
              <h3 className="font-semibold">Choose a time slot</h3>
              <p className="text-sm text-gray-500 mt-1">
                Your registration includes all {courseSchedule.sessionCount} course
                sessions at the time slot you choose.
              </p>
            </div>

            {courseSchedule.groups.map((group) => {
              const remaining = getTimeSlotRemaining(group);
              const slotIsFull = remaining === 0;
              const checked = selectedCourseSlotKey === group.key;

              return (
                <label
                  key={group.key}
                  className={`flex items-start gap-3 border rounded-xl p-4 ${
                    slotIsFull ? "opacity-60" : "cursor-pointer"
                  } ${checked ? "ring-2 ring-[#186f77]" : ""}`}
                >
                  <input
                    type="radio"
                    name={`course-slot-${activity.id}`}
                    checked={checked}
                    onChange={() => handleCourseTimeSlotSelection(group)}
                    disabled={isSubmitting || availabilityLoading || slotIsFull}
                    className="mt-1"
                  />

                  <span>
                    <strong>{group.label}</strong>
                    <br />
                    <span className="text-sm text-gray-600">
                      {group.sessions.length} sessions
                    </span>
                    {remaining !== null && remaining !== undefined && (
                      <>
                        <br />
                        <span className="text-sm">Remaining places: {remaining}</span>
                      </>
                    )}
                    {slotIsFull && (
                      <>
                        <br />
                        <span className="text-red-600">Fully booked</span>
                      </>
                    )}
                  </span>
                </label>
              );
            })}
          </div>
        )}

        {/* تعداد شرکت‌کنندگان */}
        <div className="lg:col-span-2">
          <label
            htmlFor={`quantity-${activity.id}`}
            className="block font-semibold mb-2"
          >
            Number of Participants
          </label>

          <select
            id={`quantity-${activity.id}`}
            value={quantity}
            onChange={handleQuantityChange}
            disabled={
              isSubmitting ||
              availabilityLoading ||
              isFullyBooked ||
              timeSlotSelectionMissing
            }
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#186f77]"
          >
            {maximumSelectable > 0 ? (
              Array.from(
                {
                  length: maximumSelectable,
                },
                (_, index) => index + 1,
              ).map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))
            ) : timeSlotSelectionMissing ? (
              <option value={1}>Choose a time slot first</option>
            ) : (
              <option value={1}>No places available</option>
            )}
          </select>
        </div>

        {/* انتخاب Session فقط برای Activityهایی که انتخاب جلسه دارند */}
        {!isCourse && sessions.length > 0 && sessionMode !== "ALL" && (
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-semibold">Select session</h3>

            {sessions.map((session) => {
              const sessionAvailability = availability?.sessions?.find(
                (item) => item.id === session.id,
              );

              const checked = selectedSessionIds.includes(session.id);

              const sessionIsFull = sessionAvailability?.isFull;

              return (
                <label
                  key={session.id}
                  className={`flex items-start gap-3 border rounded-xl p-4 ${
                    sessionIsFull ? "opacity-60" : ""
                  }`}
                >
                  <input
                    type={sessionMode === "SINGLE" ? "radio" : "checkbox"}
                    name={
                      sessionMode === "SINGLE"
                        ? `session-${activity.id}`
                        : undefined
                    }
                    checked={checked}
                    onChange={() => handleSessionSelection(session.id)}
                    disabled={
                      isSubmitting || sessionIsFull || sessionMode === "ALL"
                    }
                    className="mt-1"
                  />

                  <span>
                    <strong>
                      {session.title || `${activityLabel} session`}
                    </strong>
                    <br />
                    {new Date(session.startAt).toLocaleString(
                      i18n.language,
                    )} – {new Date(session.endAt).toLocaleString(i18n.language)}
                    {sessionAvailability?.remaining !== null &&
                      sessionAvailability?.remaining !== undefined && (
                        <>
                          <br />
                          Remaining places: {sessionAvailability.remaining}
                        </>
                      )}
                    {sessionIsFull && (
                      <>
                        <br />
                        <span className="text-red-600">Fully booked</span>
                      </>
                    )}
                  </span>
                </label>
              );
            })}
          </div>
        )}

        {/* خلاصه رزرو */}
        <div className="lg:col-span-2 border rounded-xl p-5 bg-gray-100">
          <h3 className="text-xl font-bold mb-4">Booking Summary</h3>

          <div className="space-y-2">
            <div className="flex justify-between gap-4">
              <span>{activityLabel}</span>

              <span className="text-right font-medium">
                {activity.translations?.find(
                  (item) => item.language === currentLanguage,
                )?.title ||
                  activity.translations?.find((item) => item.language === "EN")
                    ?.title ||
                  activity.translations?.[0]?.title ||
                  activity.slug}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Participants</span>
              <span>{quantity}</span>
            </div>

            {courseHasTimeSlots && selectedCourseSlot && (
              <div className="flex justify-between gap-4">
                <span>Time slot</span>
                <span className="text-right">{selectedCourseSlot.label}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Remaining places</span>

              <span>
                {availabilityLoading
                  ? "Loading..."
                  : timeSlotSelectionMissing
                    ? "Choose a time slot"
                    : effectiveRemaining === null ||
                        effectiveRemaining === undefined
                      ? "Unlimited"
                      : effectiveRemaining}
              </span>
            </div>

            <hr className="my-4" />

            {quoteLoading ? (
              <p>Calculating price...</p>
            ) : quote ? (
              <>
                <div className="flex justify-between">
                  <span>
                    {isCourse
                      ? "Course price / participant"
                      : "Price per session / participant"}
                  </span>

                  <span>{formatCurrency(quote.unitPrice, quote.currency)}</span>
                </div>

                {!isCourse && (
                  <div className="flex justify-between">
                    <span>Sessions</span>
                    <span>{quote.sessionCount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Subtotal</span>

                  <span>{formatCurrency(quote.subtotal, quote.currency)}</span>
                </div>

                {Number(quote.discount || 0) > 0 && (
                  <div className="flex justify-between">
                    <span>Discount</span>

                    <span>
                      -{formatCurrency(quote.discount, quote.currency)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>
                    Tax (
                    {quote.taxPercentage ?? Number(quote.taxRate || 0) * 100}
                    %)
                  </span>

                  <span>{formatCurrency(quote.taxAmount, quote.currency)}</span>
                </div>

                <div className="border-t pt-3 mt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>

                  <span>{formatCurrency(quote.total, quote.currency)}</span>
                </div>
              </>
            ) : (
              <p className="text-red-700">Price information is unavailable.</p>
            )}
          </div>
        </div>

        {/* رضایت */}
        {requireConsent && (
          <label className="lg:col-span-2 flex items-start gap-3 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={consentAccepted}
              onChange={(event) => {
                setConsentAccepted(event.target.checked);

                clearMessage();
              }}
              disabled={isSubmitting}
              className="mt-1"
            />

            <span>{consentText}</span>
          </label>
        )}

        {/* دکمه رزرو */}
        <button
          type="submit"
          disabled={
            isSubmitting ||
            quoteLoading ||
            availabilityLoading ||
            !quote ||
            isFullyBooked ||
            timeSlotSelectionMissing
          }
          className={`lg:col-span-2 bg-[#186f77] hover:bg-[#27b4c1] text-white font-semibold py-4 rounded-xl transition ${
            isSubmitting ||
            quoteLoading ||
            availabilityLoading ||
            !quote ||
            isFullyBooked ||
            timeSlotSelectionMissing
              ? "opacity-60 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          {isFullyBooked
            ? "Fully Booked"
            : isSubmitting
              ? isFree
                ? "Registering..."
                : "Preparing secure payment..."
              : submitLabel ||
                (isFree
                  ? `Reserve ${quantity > 1 ? "Places" : "Place"}`
                  : `Continue to Payment – ${formatCurrency(
                      quote?.total,
                      quote?.currency || activity.currency,
                    )}`)}
        </button>

        {message && (
          <p
            className={`lg:col-span-2 text-center text-sm ${
              messageType === "success" ? "text-green-700" : "text-red-700"
            }`}
          >
            {message}
          </p>
        )}

        <p className="lg:col-span-2 text-center text-sm text-gray-500">
          {isFree
            ? "No payment is required for this activity."
            : "Your booking is confirmed after successful payment."}
        </p>
      </form>
    </div>
  );
};

export default ActivityBooking;
