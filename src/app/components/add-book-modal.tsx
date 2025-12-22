'use client';

import { useState, useRef } from 'react';

import { X } from 'lucide-react';

import { useModal } from '@/contexts/modal-context';

const AddBookModal = () => {
  const { isOpen, closeModal } = useModal();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleAddBook = (title: string, author: string, coverUrl?: string) => {}

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && author.trim()) {
      handleAddBook(title.trim(), author.trim(), coverUrl.trim() || undefined);
      setTitle('');
      setAuthor('');
      setCoverUrl('');
      closeModal();
    }
  };

  const handleClose = () => {
    setTitle('');
    setAuthor('');
    setCoverUrl('');
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        className="relative w-full sm:max-w-md bg-cream sm:rounded-3xl shadow-2xl animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 duration-300 border-4 border-accent"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b-4 border-accent">
          <h2 id="modal-title" className="text-2xl text-gray-800">Add a New Book</h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-white hover:bg-blush active:scale-95 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5 text-gray-700" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 text-gray-600">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm text-gray-700 mb-2">
              Book Title
            </label>
            <input
              ref={firstInputRef}
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-2xl border-3 border-primary focus:outline-none focus:ring-4 focus:ring-accent/30 focus:border-accent transition-all shadow-sm"
              placeholder="Enter book title"
              required
              aria-required="true"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="author" className="block text-sm text-gray-700 mb-2">
              Author
            </label>
            <input
              id="author"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-2xl border-3 border-primary focus:outline-none focus:ring-4 focus:ring-accent/30 focus:border-accent transition-all shadow-sm"
              placeholder="Enter author name"
              required
              aria-required="true"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="coverUrl" className="block text-sm text-gray-700 mb-2">
              Cover Image URL <span className="text-gray-500">(optional)</span>
            </label>
            <input
              id="coverUrl"
              type="url"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-2xl border-3 border-primary focus:outline-none focus:ring-4 focus:ring-accent/30 focus:border-accent transition-all shadow-sm"
              placeholder="https://example.com/cover.jpg"
              aria-describedby="coverUrl-description"
            />
            <p id="coverUrl-description" className="sr-only">
              Optional: Enter a URL for the book cover image
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-5 py-3 bg-white text-gray-700 rounded-2xl hover:bg-gray-50 active:scale-95 transition-all shadow-md border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || !author.trim()}
              className="flex-1 px-5 py-3 bg-primary text-white rounded-2xl hover:bg-primary/90 active:scale-95 disabled:bg-gray-300 disabled:text-gray-500 transition-all shadow-md disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
              aria-disabled={!title.trim() || !author.trim()}
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBookModal;