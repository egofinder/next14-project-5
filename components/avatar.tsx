"use client";

import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      className="rounded-full"
      src={src || "/images/noavatar.png"}
      alt="Avatar"
      width="30"
      height="30"
    />
  );
};

export default Avatar;
