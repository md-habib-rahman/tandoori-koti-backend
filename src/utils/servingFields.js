// utils/servingFields.js
//
// Reads and validates the serving fields from a create/update request body.
//   servings        number of people the dish serves (whole number, 1 to 20)
//   portionLabelEn  portion size in English, for example "6 pcs" or "300 g"
//   portionLabelFi  portion size in Finnish, for example "6 kpl" or "300 g"
//
// Rules:
//   field missing from the request  ->  left out of `data` (an update keeps the old value)
//   field empty ("" or null)        ->  set to null (clears the value)
//   field invalid                   ->  reported in `errors`
//
// Works with JSON bodies and with multipart forms (where every value arrives as a string).

const MAX_SERVINGS = 20;
const MAX_LABEL_LENGTH = 60;

const isBlank = (value) =>
  value === null || (typeof value === "string" && value.trim() === "");

export function parseServingFields(body = {}) {
  const data = {};
  const errors = {};

  if (body.servings !== undefined) {
    if (isBlank(body.servings)) {
      data.servings = null;
    } else {
      const n = Number(body.servings);
      if (!Number.isInteger(n) || n < 1 || n > MAX_SERVINGS) {
        errors.servings = `Servings must be a whole number from 1 to ${MAX_SERVINGS}.`;
      } else {
        data.servings = n;
      }
    }
  }

  for (const key of ["portionLabelEn", "portionLabelFi"]) {
    if (body[key] === undefined) continue;

    if (isBlank(body[key])) {
      data[key] = null;
    } else {
      const text = String(body[key]).trim();
      if (text.length > MAX_LABEL_LENGTH) {
        errors[key] = `Must be ${MAX_LABEL_LENGTH} characters or fewer.`;
      } else {
        data[key] = text;
      }
    }
  }

  return { data, errors: Object.keys(errors).length ? errors : null };
}
