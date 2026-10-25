// utils/instagramFields.js
// Returns { data, errors }: cleaned values for Prisma, and null or { field: "message" }.

export const MAX_INSTAGRAM_PHOTOS = 6; // the home page grid shows six photos

const clean = (value) => (value === undefined || value === null ? "" : String(value).trim());
const orNull = (text) => (text === "" ? null : text);

export function parseInstagramPhoto(body = {}) {
  const data = {};
  const errors = {};

  const imageUrl = clean(body.imageUrl);
  if (!imageUrl) errors.imageUrl = "Required.";
  else if (!/^https?:\/\/\S+$/.test(imageUrl)) errors.imageUrl = "Must be a web address starting with https://";
  else data.imageUrl = imageUrl;

  for (const key of ["altFi", "altEn"]) {
    const text = clean(body[key]);
    if (text.length > 150) errors[key] = "At most 150 characters.";
    else data[key] = orNull(text);
  }

  // Optional link to the post; the Instagram profile is used when this is empty
  const postUrl = clean(body.postUrl);
  if (postUrl === "") data.postUrl = null;
  else if (!/^https:\/\/\S+$/.test(postUrl) || postUrl.length > 300) {
    errors.postUrl = "A web address starting with https://";
  } else data.postUrl = postUrl;

  return { data, errors: Object.keys(errors).length ? errors : null };
}