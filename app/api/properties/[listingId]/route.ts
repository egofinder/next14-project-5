import { NextResponse } from "next/server";
import { db } from "@/libs/db";
import getCurrentUser from "@/actions/get-current-user";

interface IParams {
  listingId?: string;
}
export async function DELETE(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid listing Id");
  }

  const listing = await db.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
