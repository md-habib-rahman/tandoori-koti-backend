// utils/reviewFields.js
// Both functions return { data, errors }: cleaned values for Prisma, and null or { field: "message" }.

export const REVIEW_SOURCES = ["GOOGLE", "FACEBOOK", "OTHER"];

const LIMITS = { name: 60, text: 500 };

const clean = (value) => (value === undefined || value === null ? "" : String(value).trim());

// One review, as sent by the admin form
export function parseReview(body = {}) {
  const data = {};
  const errors = {};

  const name = clean(body.authorName);
  if (!name) errors.authorName = "Required.";
  else if (name.length > LIMITS.name) errors.authorName = `At most ${LIMITS.name} characters.`;
  else data.authorName = name;

  const rating = Number(body.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) errors.rating = "Choose a rating from 1 to 5.";
  else data.rating = rating;

  const text = clean(body.text);
  if (!text) errors.text = "Required.";
  else if (text.length > LIMITS.text) errors.text = `At most ${LIMITS.text} characters.`;
  else data.text = text;

  if (body.source !== undefined) {
    const source = clean(body.source).toUpperCase();
    if (!REVIEW_SOURCES.includes(source)) errors.source = "Unknown source.";
    else data.source = source;
  }

  // The date the guest wrote the review. It decides which reviews are the "latest".
  if (body.reviewedAt !== undefined && clean(body.reviewedAt) !== "") {
    const date = new Date(body.reviewedAt);
    if (Number.isNaN(date.getTime())) errors.reviewedAt = "Not a valid date.";
    else data.reviewedAt = date;
  }

  if (body.isPublished !== undefined) {
    const flag = String(body.isPublished).toLowerCase();
    if (flag === "true" || flag === "false") data.isPublished = flag === "true";
    else errors.isPublished = "Must be true or false.";
  }

  return { data, errors: Object.keys(errors).length ? errors : null };
}

// The numbers and link shown in the pill above the reviews. Empty values clear a field.
export function parseReviewSettings(body = {}) {
  const data = {};
  const errors = {};

  const rating = clean(body.googleRating);
  if (rating === "") data.googleRating = null;
  else {
    const n = Number(rating);
    if (!Number.isFinite(n) || n < 0 || n > 5) errors.googleRating = "A number from 0 to 5, for example 4.6.";
    else data.googleRating = Math.round(n * 10) / 10;
  }

  const count = clean(body.googleReviewCount);
  if (count === "") data.googleReviewCount = null;
  else {
    const n = Number(count);
    if (!Number.isInteger(n) || n < 0 || n > 1000000) errors.googleReviewCount = "A whole number, for example 128.";
    else data.googleReviewCount = n;
  }

  const url = clean(body.googleReviewsUrl);
  if (url === "") data.googleReviewsUrl = null;
  else if (!/^https:\/\/\S+$/.test(url) || url.length > 500) errors.googleReviewsUrl = "A web address starting with https://";
  else data.googleReviewsUrl = url;

  return { data, errors: Object.keys(errors).length ? errors : null };
}