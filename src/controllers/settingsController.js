import prisma from "../config/db.js";

const DEFAULT_SETTINGS = {
  id: 1,
  isDeliveryFee: false,
  deliveryFee: null,
  isVat: false,
  VatAmount: null,
  isTax: false,
  taxAmount: null,
  isServiceCharge: false,
  serviceChargeAmount: null,
  lunchBuffetPrice: null,
  lunchChildPrice: null,
  luchTakewayPrice: null,
};

const BOOLEAN_FIELDS = ["isDeliveryFee", "isVat", "isTax", "isServiceCharge"];

const AMOUNT_FIELDS = [
  "deliveryFee",
  "VatAmount",
  "taxAmount",
  "serviceChargeAmount",
  "lunchBuffetPrice",
  "lunchChildPrice",
  "luchTakewayPrice",
];

const REQUIRED_AMOUNT_BY_TOGGLE = {
  isDeliveryFee: "deliveryFee",
  isVat: "VatAmount",
  isTax: "taxAmount",
  isServiceCharge: "serviceChargeAmount",
};

function validateSettings(body) {
  const errors = [];

  for (const field of BOOLEAN_FIELDS) {
    if (typeof body[field] !== "boolean") {
      errors.push(`${field} must be a boolean.`);
    }
  }

  for (const field of AMOUNT_FIELDS) {
    const value = body[field];

    if (value === null || value === "") {
      continue;
    }

    if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
      errors.push(`${field} must be a non-negative number or null.`);
    }
  }

  for (const [toggle, amountField] of Object.entries(
    REQUIRED_AMOUNT_BY_TOGGLE,
  )) {
    if (
      body[toggle] === true &&
      (body[amountField] === null ||
        body[amountField] === "" ||
        body[amountField] === undefined)
    ) {
      errors.push(`${amountField} is required when ${toggle} is enabled.`);
    }
  }

  return errors;
}

function normalizeSettings(body) {
  return {
    isDeliveryFee: body.isDeliveryFee,
    isEnableDelivery: body.isEnableDelivery,
    lunchBuffetPrice:
      body.lunchBuffetPrice === "" || body.lunchBuffetPrice == null
        ? null
        : body.lunchBuffetPrice,
    lunchChildPrice:
      body.lunchChildPrice === "" || body.lunchChildPrice == null
        ? null
        : body.lunchChildPrice,
    luchTakewayPrice:
      body.luchTakewayPrice === "" || body.luchTakewayPrice == null
        ? null
        : body.luchTakewayPrice,
    deliveryFee:
      body.deliveryFee === "" || body.deliveryFee == null
        ? null
        : body.deliveryFee,

    isVat: body.isVat,
    VatAmount:
      body.VatAmount === "" || body.VatAmount == null ? null : body.VatAmount,

    isTax: body.isTax,
    taxAmount:
      body.taxAmount === "" || body.taxAmount == null ? null : body.taxAmount,

    isServiceCharge: body.isServiceCharge,
    serviceChargeAmount:
      body.serviceChargeAmount === "" || body.serviceChargeAmount == null
        ? null
        : body.serviceChargeAmount,
  };
}

// GET /api/settings
// Public read endpoint for checkout and other frontend pages.
export const getSettings = async (req, res) => {
  try {
    const settings = await prisma.settings.findUnique({
      where: { id: 1 },
    });

    return res.status(200).json({
      success: true,
      data: settings ?? DEFAULT_SETTINGS,
    });
  } catch (error) {
    console.error("getSettings error:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to fetch settings.",
    });
  }
};

// PUT /api/settings/admin
// Admin-only update endpoint.
export const updateSettings = async (req, res) => {
  try {
    const errors = validateSettings(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: errors.join(" "),
      });
    }

    const data = normalizeSettings(req.body);

    const settings = await prisma.settings.upsert({
      where: { id: 1 },
      create: {
        id: 1,
        ...data,
      },
      update: data,
    });

    return res.status(200).json({
      success: true,
      message: "Settings updated successfully.",
      data: settings,
    });
  } catch (error) {
    console.error("updateSettings error:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to update settings.",
    });
  }
};
