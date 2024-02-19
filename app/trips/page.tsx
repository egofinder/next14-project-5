import getCurrentUser from "@/actions/get-current-user";
import getReservations from "@/actions/get-reservations";
import EmptyState from "@/components/empty-state";
import TripClient from "./trip-client";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="You have no reservations yet"
      />
    );
  }

  return <TripClient reservations={reservations} currentUser={currentUser} />;
};

export default TripsPage;
