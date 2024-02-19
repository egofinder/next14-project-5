"use client";
import Container from "@/components/container";
import Heading from "@/components/heading";
import ListingCard from "@/components/listings/listing-card";
import { SafeListing, SafeUser } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface PropertyClientProps {
  listings: SafeListing[];
  currentUser: SafeUser;
}

const PropertyClient = ({ listings, currentUser }: PropertyClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/properties/${id}`)
        .then(() => {
          toast.success("Property deleted successfully");
          router.refresh();
        })
        .catch(() => {
          toast.error("Failed to delete property");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => {
          return (
            <ListingCard
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onCancel}
              disabled={deletingId === listing.id}
              actionLabel="Delete property"
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default PropertyClient;
