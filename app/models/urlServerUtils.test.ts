import { getShorterUrl } from "./urlServerUtils";

const shortUrl = "https://www.google.com/";
const longUrl = "https://www.google.com/search?q=a&source=hp&ei=F2bOY4jbDdGV8gLEu6WYCw&iflsig=AK50M_UAAAAAY850Jz5jHQrWvuAxfyYCsNGjn3gG3i4b&ved=0ahUKEwjIwp-qwt38AhXRilwKHcRdCbMQ4dUDCAg&uact=5&oq=a&gs_lcp=Cgdnd3Mtd2l6EAMyEQguEIAEELEDEIMBEMcBENEDMggILhCxAxCDATIFCAAQgAQyCwguEIAEELEDEIMBMhEILhCABBCxAxCDARDHARDRAzIOCC4QgAQQsQMQxwEQ0QMyCAgAELEDEIMBMggILhCxAxCDATIICAAQsQMQgwEyCwgAEIAEELEDEIMBOggILhCPARDqAjoICAAQjwEQ6gJQ9wlY9wlgogxoAXAAeACAAXCIAXCSAQMwLjGYAQCgAQGwAQM&sclient=gws-wiz";

test("getShorterUrl returns a 5 length string for any string", () => {
  // @ts-ignore
  expect(getShorterUrl(undefined)).toBe(false);
  // @ts-ignore
  expect(getShorterUrl(null)).toBe(false);
  expect(getShorterUrl("")).toBe(false);
  
  const shortUrlPath = getShorterUrl(shortUrl);
  const longUrlPath = getShorterUrl(longUrl);
  expect(typeof shortUrlPath).toBe("string");
  expect(typeof longUrlPath).toBe("string");
  // @ts-ignore
  expect(shortUrlPath.length).toBe(5);
  // @ts-ignore
  expect(longUrlPath.length).toBe(5);
});
