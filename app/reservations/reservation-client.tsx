"use client";

import Container from "@/components/container";
import Heading from "@/components/heading";
import ListingCard from "@/components/listings/listing-card";
import { SafeReservation, SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface ReservationClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
}

const ReservationClient = ({
  reservations,
  currentUser,
}: ReservationClientProps) => {
  const router = useRouter();
  const [deleteingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch(() => {
          toast.error("Failed to cancel reservation");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => {
          return (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deleteingId === reservation.id}
              actionLabel="Cancel guest Reservation"
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default ReservationClient;
