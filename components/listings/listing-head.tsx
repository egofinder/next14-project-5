"use client";

import useCountries from "@/hooks/use-countries";
import { SafeUser } from "@/types";
import Heading from "../heading";
import Image from "next/image";
import HeartButton from "../heart-button";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}: ListingHeadProps) => {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);
  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt="Image"
          src={imageSrc}
          fill
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
