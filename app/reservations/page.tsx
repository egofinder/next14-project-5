import getCurrentUser from "@/actions/get-current-user";
import getReservations from "@/actions/get-reservations";
import EmptyState from "@/components/empty-state";
import ReservationClient from "./reservation-client";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please, login to view your reservations."
      />
    );
  }
  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="You have no reservations yet."
      />
    );
  }

  return (
    <ReservationClient reservations={reservations} currentUser={currentUser} />
  );
};

export default ReservationsPage;
