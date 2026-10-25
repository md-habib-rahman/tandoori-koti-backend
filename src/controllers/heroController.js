import prisma from "../config/db.js";
import { v2 as cloudinary } from "cloudinary";

const LANGS = ["fi", "en"];
const t = (fi, en) => ({ fi, en });

const DEFAULT_SLIDES = [
  {
    position: 1,
    title: t(
      "Naan suoraan tandoorin tulesta.",
      "Naan fresh from the tandoor fire.",
    ),
    subtitle: t(
      "Aitoa intialaista ruokaa Kajaanissa: savuisia tandoori-annoksia ja täyteläisiä curryja.",
      "Authentic Indian food in Kajaani: smoky tandoori specialties and rich curries.",
    ),
    primaryLabel: t("Varaa pöytä", "Book a table"),
    primaryHref: "/contact#reserve",
    secondaryLabel: t("Katso lounasbuffet", "See the lunch buffet"),
    secondaryHref: "/buffet",
  },
  {
    position: 2,
    title: t(
      "Päivittäin vaihtuva lounasbuffet.",
      "A lunch buffet that changes daily.",
    ),
    subtitle: t(
      "Uudet maut joka päivä ja tuore naan jokaisen annoksen kanssa.",
      "New flavours every day, with fresh naan alongside.",
    ),
    primaryLabel: t("Katso lounasbuffet", "See the lunch buffet"),
    primaryHref: "/buffet",
    secondaryLabel: t("Varaa pöytä", "Book a table"),
    secondaryHref: "/contact#reserve",
  },
  {
    position: 3,
    title: t("Tilaa kotiin tai nouda.", "Order for pickup."),
    subtitle: t(
      "Soita ja tilaa suosikkisi, me valmistamme sen tuoreena.",
      "Call in your favourites and we will cook them fresh.",
    ),
    primaryLabel: t("Katso ruokalista", "View the menu"),
    primaryHref: "/menu",
    secondaryLabel: t("Ota yhteyttä", "Contact us"),
    secondaryHref: "/contact",
  },
];

const DEFAULT_BAND = {
  id: 1,
  buffetTitle: t("Lounasbuffet", "Lunch buffet"),
  buffetDesc: t(
    "Ma–Pe, joka päivä vaihtuvat maut ja tuore naan",
    "Mon–Fri, new flavours every day and fresh naan",
  ),
  hoursTitle: t("Aukioloajat", "Opening hours"),
  hoursFallback: t(
    "Ma–Pe 10–20, La 11–22, Su 11–20",
    "Mon–Fri 10–20, Sat 11–22, Sun 11–20",
  ),
  orderTitle: t("Tilaa tai varaa", "Order or book"),
  phone: "+358 44 902 2407",
  hours: [
    [11, 20],
    [10, 20],
    [10, 20],
    [10, 20],
    [10, 20],
    [10, 20],
    [11, 22],
  ],
};

// ---------- helpers ----------
const isText = (v, max) =>
  v && LANGS.every((l) => typeof v[l] === "string" && v[l].length <= max);

const isHref = (v) =>
  typeof v === "string" && /^(\/|#|https?:\/\/)/.test(v) && v.length <= 300;

const isUrlOrEmpty = (v) =>
  typeof v === "string" && (v === "" || /^https?:\/\//.test(v));

const bad = (res, message) => res.status(400).json({ error: message });

async function ensureSeed() {
  for (const s of DEFAULT_SLIDES) {
    await prisma.heroSlide.upsert({
      where: { position: s.position },
      update: {},
      create: s,
    });
  }
  await prisma.heroBand.upsert({
    where: { id: 1 },
    update: {},
    create: DEFAULT_BAND,
  });
}

// ---------- public ----------
// GET /api/hero
export async function getPublicHero(req, res) {
  try {
    const [slides, band] = await Promise.all([
      prisma.heroSlide.findMany({
        where: { isActive: true, imageDesktop: { not: "" } },
        orderBy: { position: "asc" },
      }),
      prisma.heroBand.findUnique({ where: { id: 1 } }),
    ]);
    res.set("Cache-Control", "public, max-age=60");
    res.json({ slides, band });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load hero" });
  }
}

// ---------- admin ----------
// GET /api/admin/hero  (includes inactive slides, seeds defaults on first call)
export async function getAdminHero(req, res) {
  try {
    await ensureSeed();
    const [slides, band] = await Promise.all([
      prisma.heroSlide.findMany({ orderBy: { position: "asc" } }),
      prisma.heroBand.findUnique({ where: { id: 1 } }),
    ]);
    res.json({ slides, band });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not load hero" });
  }
}

// PUT /api/admin/hero/slides/:id
export async function updateSlide(req, res) {
  try {
    const id = Number(req.params.id);
    const b = req.body;

    if (!isText(b.title, 120))
      return bad(
        res,
        "Title is required in Finnish and English (max 120 characters).",
      );
    if (!isText(b.subtitle, 300))
      return bad(
        res,
        "Subtitle is required in Finnish and English (max 300 characters).",
      );
    if (!isText(b.primaryLabel, 40) || !isText(b.secondaryLabel, 40))
      return bad(
        res,
        "Button labels are required in both languages (max 40 characters).",
      );
    if (!isHref(b.primaryHref) || !isHref(b.secondaryHref))
      return bad(res, "Button links must start with /, # or https://");
    if (!isUrlOrEmpty(b.imageDesktop) || !isUrlOrEmpty(b.imageMobile))
      return bad(res, "Image must be an https:// URL.");
    if (b.isActive && !b.imageDesktop)
      return bad(res, "An active slide needs a desktop image.");

    const slide = await prisma.heroSlide.update({
      where: { id },
      data: {
        isActive: !!b.isActive,
        imageDesktop: b.imageDesktop,
        imageMobile: b.imageMobile,
        title: b.title,
        subtitle: b.subtitle,
        primaryLabel: b.primaryLabel,
        primaryHref: b.primaryHref,
        secondaryLabel: b.secondaryLabel,
        secondaryHref: b.secondaryHref,
      },
    });
    res.json(slide);
  } catch (err) {
    if (err.code === "P2025")
      return res.status(404).json({ error: "Slide not found" });
    console.error(err);
    res.status(500).json({ error: "Could not save slide" });
  }
}

// PUT /api/admin/hero/band
export async function updateBand(req, res) {
  try {
    const b = req.body;
    const hoursOk =
      Array.isArray(b.hours) &&
      b.hours.length === 7 &&
      b.hours.every(
        (h) =>
          Array.isArray(h) &&
          h.length === 2 &&
          Number.isInteger(h[0]) &&
          Number.isInteger(h[1]) &&
          h[0] >= 0 &&
          h[0] <= 23 &&
          h[1] >= 1 &&
          h[1] <= 24 &&
          h[0] < h[1],
      );

    if (!hoursOk)
      return bad(
        res,
        "Opening hours need an open and close hour for each day (open before close).",
      );
    for (const k of [
      "buffetTitle",
      "buffetDesc",
      "hoursTitle",
      "hoursFallback",
      "orderTitle",
    ]) {
      if (!isText(b[k], 200))
        return bad(res, `${k} is required in both languages.`);
    }
    if (typeof b.phone !== "string" || !/^\+?[0-9 ()-]{6,20}$/.test(b.phone))
      return bad(res, "Enter a valid phone number.");

    const band = await prisma.heroBand.upsert({
      where: { id: 1 },
      update: {
        buffetTitle: b.buffetTitle,
        buffetDesc: b.buffetDesc,
        hoursTitle: b.hoursTitle,
        hoursFallback: b.hoursFallback,
        orderTitle: b.orderTitle,
        phone: b.phone,
        hours: b.hours,
      },
      create: { ...DEFAULT_BAND, ...b, id: 1 },
    });
    res.json(band);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not save band" });
  }
}

// POST /api/admin/hero/upload?kind=desktop|mobile   (multipart field "image")
export async function uploadImage(req, res) {
  try {
    if (!req.file) return bad(res, "No image received.");
    const kind = req.query.kind === "mobile" ? "mobile" : "desktop";
    const size =
      kind === "mobile"
        ? { width: 900, height: 1200 }
        : { width: 1920, height: 900 };

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "hero",
            transformation: [
              {
                ...size,
                crop: "fill",
                gravity: "auto",
                quality: "auto",
                fetch_format: "auto",
              },
            ],
          },
          (err, r) => (err ? reject(err) : resolve(r)),
        )
        .end(req.file.buffer);
    });

    res.json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Image upload failed" });
  }
}
