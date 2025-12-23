import Image from "next/image";

import { BookOpen } from "lucide-react";

interface BookCoverProps {
  width: number;
  height: number;
  cover?: string;
}

const BookCover = ({ width, height, cover }: BookCoverProps) => {
  console.log(cover)
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
    <BookOpen className="w-16 h-16 text-white opacity-60" aria-hidden="true" />
  )
}

export default BookCover;