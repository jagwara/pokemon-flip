// TODO: MAke this work
// import 'client-only';

/**
 * Get Cookie
 * @param {string} cname - cookie name
 * @reference https://www.w3schools.com/js/js_cookies.asp
 * @returns string
 * */
export const getCookie = (cname: string) => {
  if (typeof window === 'undefined') return;

  if (!cname) {
    console.error('Cookie name is not defined');
    return null;
  }
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie
      .split('=')
      .map((part) => part.trim());
    if (cookieName === cname) {
      return cookieValue;
    }
  }
  return null;
};

/**
 * Set cookie on document
 *
 * @param {string} cname - cookie name
 * @param {string} cvalue - cookie value
 * @param {number} exdays - expiry days
 * @returns void
 */
export const setCookie = (
  cname: string | undefined,
  cvalue: string,
  exdays = 365 //default 1year
) => {
  if (typeof window === 'undefined') return null;
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
};

/**
 * Delete cookie
 *
 * @param {string} cname - Cookie name to fetch
 * @returns void
 */
export const deleteCookie = (cname: string) => {
  if (typeof window === 'undefined') return null;
  document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
