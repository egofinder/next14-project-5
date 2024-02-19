import { db } from "@/libs/db";

interface IParams {
  listingId?: string;
}

export default async function getListingsById(params: IParams) {
  try {
    const { listingId } = params;

    const listing = await db.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });
    if (!listing) {
      throw new Error("Listing not found");
    }
    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
