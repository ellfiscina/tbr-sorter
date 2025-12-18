//
//  BookCardRow.swift
//  TBR Sorter
//
//  Created by Ellen Fiscina on 2025-12-18.
//

import SwiftData
import SwiftUI
internal import UniformTypeIdentifiers

struct BookCardRow: View {
    let book: Book

    @Environment(\.modelContext) private var modelContext
    @Query(sort: \Book.order) private var books: [Book]

    @Binding var draggedBook: Book?

    var body: some View {
        HStack(spacing: 16) {
            Image(systemName: "line.3.horizontal")
                .foregroundColor(Color.secondaryAccent)

            BookCoverView(imageURL: book.coverUrl)

            VStack(alignment: .leading, spacing: 4) {
                Text(book.title)
                    .font(.headline)
                Text(book.author)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
            }

            Spacer()

            Button(role: .destructive) {
                modelContext.delete(book)
            } label: {
                Image(systemName: "trash")
            }
        }
        .padding()
        .background(.white)
        .clipShape(RoundedRectangle(cornerRadius: 20, style: .continuous))
        .shadow(color: .black.opacity(0.1), radius: 10, y: 6)
        .onDrag {
            draggedBook = book
            return NSItemProvider(object: "book" as NSString)
        }
        .onDrop(of: [.text], delegate: BookDropDelegate(
            item: book,
            books: books,
            draggedBook: $draggedBook,
            modelContext: modelContext
        ))
    }
}

struct BookDropDelegate: DropDelegate {
    let item: Book
    let books: [Book]

    @Binding var draggedBook: Book?
    let modelContext: ModelContext

    func dropEntered(info: DropInfo) {
        guard let draggedBook,
              draggedBook != item,
              let fromIndex = books.firstIndex(of: draggedBook),
              let toIndex = books.firstIndex(of: item)
        else { return }

        withAnimation {
            var reordered = books
            reordered.move(
                fromOffsets: IndexSet(integer: fromIndex),
                toOffset: toIndex > fromIndex ? toIndex + 1 : toIndex
            )

            for (index, book) in reordered.enumerated() {
                book.order = index
            }
        }
    }

    func performDrop(info: DropInfo) -> Bool {
        draggedBook = nil
        try? modelContext.save()
        UIImpactFeedbackGenerator(style: .medium).impactOccurred()
        return true
    }
}


#Preview {
    BookCardRow(book: mockBook(), draggedBook: .constant(nil)).modelContainer(mockContainerForBookList())
}
