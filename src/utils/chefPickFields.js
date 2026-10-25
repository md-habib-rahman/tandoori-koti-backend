// utils/chefPickFields.js
//
// Reads and validates the "chef's recommendation" fields from a create/update request body.
//   isChefPick     true or false: show this dish in the home page Chef's Recommended section
//   chefPickOrder  whole number 1-99: position in the section (1 = first). Optional.
//   chefTagEn/Fi   short badge text, for example "House signature" / "Talon suosikki". Optional.
//
// Same rules as parseServingFields:
//   field missing from the request  ->  left out of `data` (an update keeps the old value)
//   field empty ("" or null)        ->  set to null (clears the value)
//   field invalid                   ->  reported in `errors`

export const MAX_CHEF_PICKS = 6;
const MAX_TAG_LENGTH = 40;
const MAX_ORDER = 99;

const isBlank = (value) =>
  value === null || (typeof value === "string" && value.trim() === "");

export function parseChefPickFields(body = {}) {
  const data = {};
  const errors = {};

  if (body.isChefPick !== undefined) {
    const text = String(body.isChefPick).toLowerCase();
    if (text === "true" || text === "false") {
      data.isChefPick = text === "true"; // works for JSON booleans and for multipart form strings
    } else {
      errors.isChefPick = "isChefPick must be true or false.";
    }
  }

  if (body.chefPickOrder !== undefined) {
    if (isBlank(body.chefPickOrder)) {
      data.chefPickOrder = null;
    } else {
      const n = Number(body.chefPickOrder);
      if (!Number.isInteger(n) || n < 1 || n > MAX_ORDER) {
        errors.chefPickOrder = `Order must be a whole number from 1 to ${MAX_ORDER}.`;
      } else {
        data.chefPickOrder = n;
      }
    }
  }

  for (const key of ["chefTagEn", "chefTagFi"]) {
    if (body[key] === undefined) continue;

    if (isBlank(body[key])) {
      data[key] = null;
    } else {
      const text = String(body[key]).trim();
      if (text.length > MAX_TAG_LENGTH) {
        errors[key] = `Must be ${MAX_TAG_LENGTH} characters or fewer.`;
      } else {
        data[key] = text;
      }
    }
  }

  return { data, errors: Object.keys(errors).length ? errors : null };
}

// The home page section has room for a handful of dishes. Call this before saving a dish whose
// isChefPick is true. `id` is the dish being edited (leave it out when creating a new dish).
// Returns an error message, or null when it is fine to save.
export async function checkChefPickLimit(prisma, { id, isChefPick }) {
  if (isChefPick !== true) return null;

  const others = await prisma.regularMenu.count({
    where: { isChefPick: true, ...(id ? { NOT: { id } } : {}) },
  });

  return others >= MAX_CHEF_PICKS
    ? `You can choose at most ${MAX_CHEF_PICKS} chef's recommendations. Remove one first.`
    : null;
}
