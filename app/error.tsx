"use client";

import EmptyState from "@/components/empty-state";
import { useEffect } from "react";

interface ErrorProps {
  error: Error;
}

const ErrorState = ({ error }: ErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="Uh No" subtitle="Something went worng!" />;
};

export default ErrorState;
