import Cookies from "js-cookie";

export async function csrfFetch(url, options = {}) {
  options.method = options.method || "GET";
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== "GET") {
    options.headers["Content-Type"] = options.headers["Content-Type"] || "application/json";
    options.headers["XSRF-Token"] = Cookies.get("csrf_token");
  }

  // console.log('CSRF Token:', Cookies.get('csrf_token')); // For debugging
  // console.log('Request Headers:', options.headers); // For debugging

  const res = await window.fetch(url, options);

  if (res.status >= 400) {
    const error = await res.json();
    throw new Error(error);
  }

  return res;
}

export function restoreCSRF() {
  return csrfFetch("/api/auth/restore");
}
