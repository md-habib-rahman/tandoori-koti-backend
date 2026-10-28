import bcrypt from "bcryptjs";
import prisma from "../config/db.js";

const ROLES = ["ADMIN", "USER"];
const SALT_ROUNDS = 12;
const PUBLIC = {
  id: true,
  fullName: true,
  username: true,
  userRole: true,
  isAtive: true,
  createdAt: true,
};

const fail = (res, status, error) => res.status(status).json({ error });
// bcrypt only uses the first 72 bytes, so longer passwords are rejected
const validPassword = (p) =>
  typeof p === "string" && p.length >= 8 && Buffer.byteLength(p) <= 72;

// GET /api/users/me
export const getMe = (req, res) => res.json(req.user);

// PATCH /api/users/me/password   { currentPassword, newPassword }   (any logged-in user)
export async function changeOwnPassword(req, res) {
  try {
    const { currentPassword, newPassword } = req.body;
    if (typeof currentPassword !== "string" || !currentPassword)
      return fail(res, 400, "Enter your current password.");
    if (!validPassword(newPassword))
      return fail(res, 400, "New password must be 8 to 72 characters.");
    if (newPassword === currentPassword)
      return fail(
        res,
        400,
        "New password must be different from the current one.",
      );

    const me = await prisma.admin.findUnique({
      where: { id: req.user.id },
      select: { password: true },
    });
    if (!me || !(await bcrypt.compare(currentPassword, me.password)))
      return fail(res, 400, "Current password is incorrect.");

    await prisma.admin.update({
      where: { id: req.user.id },
      data: { password: await bcrypt.hash(newPassword, SALT_ROUNDS) },
    });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    fail(res, 500, "Could not change password");
  }
}

// GET /api/users   (ADMIN)
export async function listUsers(req, res) {
  try {
    res.json(
      await prisma.admin.findMany({
        select: PUBLIC,
        orderBy: { createdAt: "asc" },
      }),
    );
  } catch (err) {
    console.error(err);
    fail(res, 500, "Could not load users");
  }
}

// POST /api/users   { fullName?, username, password, userRole }   (ADMIN)
export async function createUser(req, res) {
  try {
    const { fullName, password } = req.body;
    const username =
      typeof req.body.username === "string"
        ? req.body.username.trim().toLowerCase()
        : "";
    const userRole = req.body.userRole ?? "USER";

    if (!/^[a-z0-9._-]{3,30}$/.test(username))
      return fail(
        res,
        400,
        "Username must be 3 to 30 characters: letters, numbers, dot, dash or underscore.",
      );
    if (!validPassword(password))
      return fail(res, 400, "Password must be 8 to 72 characters.");
    if (!ROLES.includes(userRole)) return fail(res, 400, "Invalid role.");
    if (
      fullName != null &&
      (typeof fullName !== "string" || fullName.length > 100)
    )
      return fail(res, 400, "Full name must be 100 characters or fewer.");

    const user = await prisma.admin.create({
      data: {
        fullName: fullName?.trim() || null,
        username,
        password: await bcrypt.hash(password, SALT_ROUNDS),
        userRole,
        isAtive: true, // created by an admin, so ready to log in
      },
      select: PUBLIC,
    });
    res.status(201).json(user);
  } catch (err) {
    if (err.code === "P2002")
      return fail(res, 409, "That username is already taken.");
    console.error(err);
    fail(res, 500, "Could not create user");
  }
}

// PATCH /api/users/:id/role   { userRole }   (ADMIN)
export async function updateRole(req, res) {
  try {
    const { id } = req.params;
    const { userRole } = req.body;
    if (!ROLES.includes(userRole)) return fail(res, 400, "Invalid role.");
    // Blocking self-edits also guarantees at least one admin always remains.
    if (id === req.user.id)
      return fail(res, 400, "You cannot change your own role.");

    const user = await prisma.admin.update({
      where: { id },
      data: { userRole },
      select: PUBLIC,
    });
    res.json(user);
  } catch (err) {
    if (err.code === "P2025") return fail(res, 404, "User not found.");
    console.error(err);
    fail(res, 500, "Could not update role");
  }
}

// DELETE /api/users/:id   (ADMIN)
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    if (id === req.user.id)
      return fail(res, 400, "You cannot delete your own account.");
    await prisma.admin.delete({ where: { id } });
    res.status(204).end();
  } catch (err) {
    if (err.code === "P2025") return fail(res, 404, "User not found.");
    console.error(err);
    fail(res, 500, "Could not delete user");
  }
}
