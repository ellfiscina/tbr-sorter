import Image from "next/image";

import { BookOpen } from "lucide-react";

interface BookCoverProps {
  width: number;
  height: number;
  cover?: string;
  iconSize: number;
}

const BookCover = ({ width, height, cover, iconSize }: BookCoverProps) => {
  return cover ? (
    <Image
      className="w-full h-full object-cover"
      src={cover}
      alt="Book cover"
      priority
      width={width}
      height={height}
    />
  ) : (
    <BookOpen className={`w-${iconSize} h-${iconSize} text-white opacity-60`} aria-hidden="true" />
  )
}

export default BookCover;