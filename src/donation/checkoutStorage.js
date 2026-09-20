const KEY = "golestan_donation_checkout";
export const saveCheckout = (value) => {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* Checkout still works without storage. */
  }
};
export const readCheckout = () => {
  try {
    return JSON.parse(sessionStorage.getItem(KEY)) || null;
  } catch {
    return null;
  }
};
export const clearCheckout = () => {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* Storage may be disabled. */
  }
};
export function isStripeCheckoutUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "checkout.stripe.com";
  } catch {
    return false;
  }
}
