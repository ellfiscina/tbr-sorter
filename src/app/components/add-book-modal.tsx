'use client';

import { useActionState, useEffect, useRef } from 'react';

import { X } from 'lucide-react';
import { useFormStatus } from 'react-dom';

import { useModal } from '@/contexts/modal-context';
import { useNotification } from '@/contexts/notification-context';
import { addBook } from '@/lib/actions';

const initialState = { success: null as boolean | null };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex-1 px-5 py-3 bg-primary text-white rounded-2xl hover:bg-primary/90 active:scale-95 disabled:bg-gray-300 disabled:text-gray-500 transition-all shadow-md disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
    >
      {pending ? 'Adding…' : 'Add Book'}
    </button>
  );
}

const AddBookModal = () => {
  const { isOpen, closeModal } = useModal();
  const { showNotification } = useNotification();

  const [state, action] = useActionState(addBook, initialState);

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (isOpen) {
      firstInputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeModal]);

  useEffect(() => {
    if (state.success === true) {
      showNotification('Book added with success', 'success');
      formRef.current?.reset();
      closeModal();
    }

    if (state.success === false) {
      showNotification('Something went wrong', 'error');
    }
  }, [state.success, showNotification, closeModal]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closeModal}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full sm:max-w-md bg-cream sm:rounded-3xl shadow-2xl animate-in slide-in-from-bottom sm:slide-in-from-bottom-0 duration-300 border-4 border-accent"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b-4 border-accent">
          <h2 className="text-2xl text-gray-800">Add a New Book</h2>
          <button
            onClick={closeModal}
            className="p-2 rounded-full bg-white hover:bg-blush active:scale-95 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <form
          ref={formRef}
          action={action}
          className="p-6 text-gray-600"
        >
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm text-gray-700 mb-2">
              Book Title
            </label>
            <input
              ref={firstInputRef}
              id="title"
              name="title"
              type="text"
              required
              className="w-full px-4 py-3 bg-white rounded-2xl border-3 border-primary focus:outline-none focus:ring-4 focus:ring-accent/30 focus:border-accent transition-all shadow-sm"
              placeholder="Enter book title"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="author" className="block text-sm text-gray-700 mb-2">
              Author
            </label>
            <input
              id="author"
              name="author"
              type="text"
              required
              className="w-full px-4 py-3 bg-white rounded-2xl border-3 border-primary focus:outline-none focus:ring-4 focus:ring-accent/30 focus:border-accent transition-all shadow-sm"
              placeholder="Enter author name"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="coverUrl" className="block text-sm text-gray-700 mb-2">
              Cover Image URL <span className="text-gray-500">(optional)</span>
            </label>
            <input
              id="coverUrl"
              name="coverUrl"
              type="url"
              className="w-full px-4 py-3 bg-white rounded-2xl border-3 border-primary focus:outline-none focus:ring-4 focus:ring-accent/30 focus:border-accent transition-all shadow-sm"
              placeholder="https://example.com/cover.jpg"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 px-5 py-3 bg-white text-gray-700 rounded-2xl hover:bg-gray-50 active:scale-95 transition-all shadow-md border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Cancel
            </button>

            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
