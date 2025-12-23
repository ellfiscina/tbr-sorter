'use client';

import { BookOpen } from "lucide-react";

import { useModal } from "@/contexts/modal-context";

const CallToAction = () => {
  const { openModal } = useModal();

  return (
    <div className="px-6 py-16 text-center">
      <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blush to-secondary rounded-3xl flex items-center justify-center shadow-lg rotate-12 hover:rotate-0 transition-transform" aria-hidden="true">
        <BookOpen className="w-10 h-10 text-white" aria-hidden="true" />
      </div>
      <h3 className="text-gray-900 mb-2">No books yet!</h3>
      <p className="text-sm text-gray-500 mb-6">
        Start building your reading list
      </p>
      <button
        onClick={openModal}
        className="cursor-pointer px-6 py-3 bg-primary text-white rounded-2xl hover:bg-primary/90 active:scale-95 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Add your first book to the reading list"
      >
        Add Your First Book
      </button>
    </div>
  )
}

export default CallToAction;