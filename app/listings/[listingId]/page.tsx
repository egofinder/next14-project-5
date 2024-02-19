import getCurrentUser from "@/actions/get-current-user";
import getListingsById from "@/actions/get-listing-by-id";
import EmptyState from "@/components/empty-state";
import ListingClient from "./listing-client";
import { SafeUser } from "@/types";
import getReservations from "@/actions/get-reservations";

interface IParams {
  listingId: string;
}

const ListingsPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingsById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <ListingClient
      listing={listing}
      currentUser={currentUser as SafeUser}
      reservations={reservations}
    />
  );
};

export default ListingsPage;
