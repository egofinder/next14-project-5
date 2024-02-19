import { NextResponse } from "next/server";
import { db } from "@/libs/db";
import getCurrentUser from "@/actions/get-current-user";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await req.json();
  const { totalPrice, startDate, endDate, listingId } = body;

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  const listingAndReservation = await db.listing.update({
    where: { id: listingId },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          totalPrice: totalPrice,
          startDate: startDate,
          endDate: endDate,
        },
      },
    },
  });

  return NextResponse.json(listingAndReservation);
}
