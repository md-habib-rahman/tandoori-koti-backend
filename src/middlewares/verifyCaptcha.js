export default async function verifyRecaptcha(req, res, next) {
  try {
    const { recaptchaToken } = req.body;

    if (!recaptchaToken) {
      return res.status(400).json({
        success: false,
        message: "reCAPTCHA token is required",
      });
    }

    const secret = process.env.CAPTCHA_SECRET_KEY;

    if (!secret) {
      console.error("RECAPTCHA_SECRET_KEY is not configured");

      return res.status(500).json({
        success: false,
        message: "reCAPTCHA is not configured",
      });
    }

    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret,
          response: recaptchaToken,
        }),
      }
    );

    const result = await response.json();

    if (!result.success) {
      console.warn("reCAPTCHA verification failed:", result);

      return res.status(403).json({
        success: false,
        message: "reCAPTCHA verification failed",
      });
    }

    // Verification passed
    req.recaptcha = result;

    next();
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to verify reCAPTCHA",
    });
  }
}