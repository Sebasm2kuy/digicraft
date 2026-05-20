import { NextResponse } from "next/server";
import { db } from "@/lib/db";

function getTodayKey(): string {
  const now = new Date();
  return `daily-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export async function GET() {
  try {
    const todayKey = getTodayKey();

    const totalCounter = await db.visitCounter.upsert({
      where: { key: "total" },
      update: {},
      create: { key: "total", value: 0 },
    });

    const dailyCounter = await db.visitCounter.upsert({
      where: { key: todayKey },
      update: {},
      create: { key: todayKey, value: 0 },
    });

    return NextResponse.json({
      total: totalCounter.value,
      daily: dailyCounter.value,
    });
  } catch (error) {
    console.error("Error fetching visit counts:", error);
    return NextResponse.json({ total: 0, daily: 0 }, { status: 500 });
  }
}

export async function POST() {
  try {
    const todayKey = getTodayKey();

    const totalCounter = await db.visitCounter.upsert({
      where: { key: "total" },
      update: { value: { increment: 1 } },
      create: { key: "total", value: 1 },
    });

    const dailyCounter = await db.visitCounter.upsert({
      where: { key: todayKey },
      update: { value: { increment: 1 } },
      create: { key: todayKey, value: 1 },
    });

    return NextResponse.json({
      total: totalCounter.value,
      daily: dailyCounter.value,
    });
  } catch (error) {
    console.error("Error incrementing visit counts:", error);
    return NextResponse.json({ total: 0, daily: 0 }, { status: 500 });
  }
}
