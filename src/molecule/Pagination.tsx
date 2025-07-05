import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function Pagination(props: {
  totalPages: number;
  active: number;
  next: () => void;
  prev: () => void;
}) {
  const { totalPages, active, next, prev } = props;

  return (
    <div className="flex justify-center items-center mt-8 px-2 sm:px-4 gap-8">
      <IconButton
        size="sm"
        variant="outlined"
        onClick={prev}
        disabled={active === 1}
        className="pr-4"
      >
        <ArrowLeftIcon className="h-4 w-4" />
      </IconButton>
      <Typography color="gray" className="font-normal">
        Page <strong className="text-gray-900">{active}</strong> of{" "}
        <strong className="text-gray-900">{totalPages}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={next}
        disabled={active === totalPages}
        className="pr-4"
      >
        <ArrowRightIcon className="h-4 w-4 " />
      </IconButton>
    </div>
  );
}
