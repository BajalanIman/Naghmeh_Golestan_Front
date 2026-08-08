import { BASE_URL } from "../../constants/constants";

/**
 * پاسخ API را به JSON تبدیل می‌کند و در صورت خطا،
 * پیام Backend را به صورت Error برمی‌گرداند.
 */
async function parseApiResponse(response) {
  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const error = new Error(
      data?.message ||
        data?.error ||
        `Request failed with status ${response.status}.`,
    );

    error.status = response.status;
    error.code = data?.code;
    error.data = data;

    throw error;
  }

  return data;
}

/**
 * ظرفیت کلی Activity و ظرفیت Sessionها را دریافت می‌کند.
 */
export async function fetchActivityAvailability(activityId, options = {}) {
  if (!activityId) {
    throw new Error("Activity ID is required.");
  }

  const response = await fetch(
    `${BASE_URL}registrations/availability/${activityId}`,
    {
      method: "GET",
      credentials: "include",
      signal: options.signal,
    },
  );

  const data = await parseApiResponse(response);

  return data.availability;
}

/**
 * قیمت، مالیات، ظرفیت و مبلغ نهایی را از Backend می‌گیرد.
 *
 * فرانت‌اند نباید subtotal، taxAmount یا total را خودش
 * به Backend تحمیل کند.
 */
export async function fetchActivityQuote(
  { activityId, quantity },
  options = {},
) {
  const response = await fetch(`${BASE_URL}orders/quote`, {
    method: "POST",
    credentials: "include",
    signal: options.signal,

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      activityId,
      quantity,
    }),
  });

  const data = await parseApiResponse(response);

  return data.quote;
}

/**
 * برای Activity پولی یک Order می‌سازد.
 *
 * در صورت Login، Backend اطلاعات حساب کاربر را استفاده می‌کند.
 * در حالت Guest، اطلاعات فرم استفاده می‌شوند.
 */
export async function createActivityOrder(
  {
    activityId,
    sessionIds,
    quantity,
    language,
    firstName,
    lastName,
    email,
    phone,
  },
  options = {},
) {
  const response = await fetch(`${BASE_URL}orders`, {
    method: "POST",
    credentials: "include",
    signal: options.signal,

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      activityId,
      sessionIds,
      quantity,
      language,
      firstName,
      lastName,
      email,
      phone,
    }),
  });

  return parseApiResponse(response);
}

/**
 * ثبت‌نام در Activity رایگان.
 *
 * Backend برای Activity رایگان یک Order صفر یورویی و
 * Registration تأییدشده ایجاد می‌کند.
 */
export async function createFreeActivityRegistration(
  {
    activityId,
    sessionIds,
    quantity,
    language,
    firstName,
    lastName,
    email,
    phone,
  },
  options = {},
) {
  const response = await fetch(`${BASE_URL}registrations`, {
    method: "POST",
    credentials: "include",
    signal: options.signal,

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      activityId,
      sessionIds,
      quantity,
      language,
      firstName,
      lastName,
      email,
      phone,
    }),
  });

  return parseApiResponse(response);
}

/**
 * Stripe Checkout را برای Order ایجاد می‌کند.
 *
 * برای Guest باید guestAccessToken ارسال شود.
 * برای User واردشده guestAccessToken مقدار null دارد.
 */
export async function createPaymentCheckout(
  { orderId, guestAccessToken },
  options = {},
) {
  const response = await fetch(`${BASE_URL}payments/checkout`, {
    method: "POST",
    credentials: "include",
    signal: options.signal,

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      orderId,
      guestAccessToken: guestAccessToken || null,
    }),
  });

  return parseApiResponse(response);
}

/**
 * وضعیت Payment را پس از بازگشت از Stripe دریافت می‌کند.
 *
 * این تابع بعداً برای صفحه PaymentSuccess قابل استفاده است.
 */
export async function fetchPaymentCheckoutStatus(
  { sessionId, guestAccessToken },
  options = {},
) {
  const query = new URLSearchParams();

  if (guestAccessToken) {
    query.set("guestAccessToken", guestAccessToken);
  }

  const queryString = query.toString();

  const response = await fetch(
    `${BASE_URL}payments/checkout/${sessionId}${
      queryString ? `?${queryString}` : ""
    }`,
    {
      method: "GET",
      credentials: "include",
      signal: options.signal,
    },
  );

  const data = await parseApiResponse(response);

  return data.payment;
}
