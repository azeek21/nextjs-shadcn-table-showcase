export function getBaseUrl() {
  return process.env.NEXT_BASE_URL || "https://python-api-task.onrender.com";
}

export function getCategoriesSlug() {
  return "/categories";
}

export function getUsersSlug() {
  return "/users";
}

export function getCountsSlug() {
  return "/counts";
}
