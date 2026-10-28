import prisma from "../config/db.js";
import verifyToken from "./verifyToken.js";

const USER_SELECT = {
  id: true,
  fullName: true,
  username: true,
  userRole: true,
  isAtive: true,
  createdAt: true,
};

// Runs after verifyToken. The token only holds { adminId, username }, so role and
// active status are read from the database on every request. A role change, a
// deactivated account or a deleted user therefore takes effect immediately,
// even for tokens that were issued before the new fields existed.
export async function loadUser(req, res, next) {
  try {
    const id = req.admin?.adminId ?? req.admin?.id;
    const user = id
      ? await prisma.admin.findUnique({ where: { id }, select: USER_SELECT })
      : null;

    if (!user)
      return res
        .status(401)
        .json({ error: "Account no longer exists. Please log in again." });
    if (!user.isAtive)
      return res
        .status(403)
        .json({ error: "Your account is inactive. Contact an administrator." });

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not verify account" });
  }
}

// Login check = your verifyToken + loading the user. Express accepts an array here.
export const requireAuth = [verifyToken, loadUser];

// Put after requireAuth:  router.use(requireAuth, requireRole("ADMIN"))
export const requireRole =
  (...roles) =>
  (req, res, next) =>
    roles.includes(req.user?.userRole)
      ? next()
      : res
          .status(403)
          .json({ error: "You do not have permission to do this." });

export const requireAdmin = requireRole("ADMIN"); // also used by the hero routes
