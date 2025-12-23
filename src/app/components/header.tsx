'use client';

import { BookOpen, Plus } from "lucide-react";

import { useModal } from "@/contexts/modal-context";

const Header = ({ email }: { email: string }) => {
  const { openModal } = useModal();

  return (
    <div className="px-6 py-4 bg-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -mr-16 -mt-16" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12" aria-hidden="true" />

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg" aria-hidden="true">
            <BookOpen className="w-6 h-6 text-white" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-white text-xl font-bold">My Reading List</h1>
            <p className="text-white/80 text-xs flex items-center gap-1">
              {email}
            </p>
          </div>
        </div>
        <button
          onClick={openModal}
          className="cursor-pointer w-10 h-10 bg-accent hover:bg-accent/90 active:scale-95 rounded-2xl flex items-center justify-center transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
          aria-label="Add new book to reading list"
        >
          <Plus className="w-5 h-5 text-white" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default Header;