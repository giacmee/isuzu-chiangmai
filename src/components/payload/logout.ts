"use client";

export async function logoutPayloadAdmin(): Promise<void> {
  try {
    await fetch("/api/users/logout", {
      method: "POST",
      credentials: "include",
    });
  } finally {
    window.location.href = "/admin/login";
  }
}
