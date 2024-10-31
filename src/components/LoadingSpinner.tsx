import { ArrowBigRightIcon, LoaderIcon } from "lucide-react";
import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <LoaderIcon className="animate-spin" />
    </div>
  );
}
