import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

const cookieName = "admin_session";
const sessionDurationSeconds = 8 * 60 * 60;

function getSigningKey() {
  const password = process.env.ADMIN_PASSWORD;
  return password ? createHash("sha256").update(password).digest() : null;
}

function signatureFor(expiration, key) {
  return createHmac("sha256", key).update(String(expiration)).digest("hex");
}

function hasValidSession(request) {
  const key = getSigningKey();
  const value = request.cookies.get(cookieName)?.value || "";
  const [expirationText, signature] = value.split(".");
  const expiration = Number(expirationText);

  if (!key || !Number.isSafeInteger(expiration) || expiration <= Date.now() || !/^[a-f0-9]{64}$/.test(signature || "")) {
    return false;
  }

  const expected = Buffer.from(signatureFor(expiration, key), "hex");
  return timingSafeEqual(Buffer.from(signature, "hex"), expected);
}

function isSameOrigin(request) {
  const origin = request.headers.get("origin");
  const requestHost = request.headers.get("host");
  const requestProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0].trim()
    || new URL(request.url).protocol.slice(0, -1);

  if (!origin) return true;

  try {
    const originUrl = new URL(origin);
    return originUrl.host === requestHost && originUrl.protocol === `${requestProtocol}:`;
  } catch {
    return false;
  }
}

export async function GET(request) {
  return NextResponse.json(
    { authenticated: hasValidSession(request) },
    { status: hasValidSession(request) ? 200 : 401, headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request) {
  const configuredPassword = process.env.ADMIN_PASSWORD;

  if (!configuredPassword) {
    return NextResponse.json({ error: "Admin authentication is not configured." }, { status: 503 });
  }

  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  let submittedPassword;
  try {
    submittedPassword = (await request.json()).password;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof submittedPassword !== "string") {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const expected = createHash("sha256").update(configuredPassword).digest();
  const received = createHash("sha256").update(submittedPassword).digest();

  if (!timingSafeEqual(received, expected)) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const expiration = Date.now() + sessionDurationSeconds * 1000;
  const key = getSigningKey();
  const response = NextResponse.json({ authenticated: true }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set(cookieName, `${expiration}.${signatureFor(expiration, key)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: sessionDurationSeconds,
  });

  return response;
}

export async function DELETE(request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const response = NextResponse.json({ authenticated: false }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set(cookieName, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return response;
}