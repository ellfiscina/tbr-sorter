//
//  UpNextView.swift
//  TBR Sorter
//
//  Created by Ellen Fiscina on 2025-12-18.
//

import SwiftData
import SwiftUI

struct UpNextView: View {
    @Environment(\.modelContext) private var modelContext

    @Query(sort: \Book.order) private var books: [Book]

    @State private var randomOverride: Book?

    private var upNextBook: Book? {
        randomOverride ?? books.first
    }

    var body: some View {
        VStack(spacing: 16) {
            Text("Up Next")
                .padding(.horizontal, 25)
                .padding(.vertical, 12)
                .foregroundStyle(.white)
                .fontWeight(.semibold)
                .background(Color.accent)
                .clipShape(RoundedRectangle(cornerRadius: 25))

            VStack(spacing: 24) {
                if let book = upNextBook {
                    ZStack {
                        NextBookView(book: book)
                            .id(book.id)
                    }.animation(
                        .spring(response: 0.4, dampingFraction: 0.85),
                        value: upNextBook?.id
                    )

                    VStack(spacing: 12) {
                        Button {
                            startReading()
                        } label: {
                            Label(
                                "Start Reading",
                                systemImage: "checkmark.circle"
                            )
                        }
                        .buttonStyle(
                            CustomButtonStyle(backgroundColor: .primaryAction)
                        )

                        Button {
                            pickRandomBook()
                        } label: {
                            Label("Random Pick", systemImage: "shuffle")
                        }
                        .buttonStyle(
                            CustomButtonStyle(backgroundColor: .secondaryAction)
                        )
                        .disabled(books.count <= 1)
                    }
                } else {
                    VStack(spacing: 16) {
                        Text("No books yet")
                            .font(.title2)
                            .fontWeight(.bold)
                            .foregroundStyle( Color.secondaryAction)
                        Text("Start building your reading list")
                            .foregroundStyle(.secondary)
                    }
                    
                }
            }
            .padding(24)
            .frame(maxWidth: .infinity)
            .background(.white)
            .clipShape(
                RoundedRectangle(cornerRadius: 24, style: .continuous)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 24, style: .continuous)
                    .stroke(Color.primaryAction, lineWidth: 4)
            )
            .shadow(color: .black.opacity(0.10), radius: 25, y: 20)
            .shadow(color: .black.opacity(0.10), radius: 10, y: 8)
        }
    }

    private func startReading() {
        guard let book = upNextBook else { return }
        modelContext.delete(book)

        if randomOverride?.id == book.id {
            randomOverride = nil
        }
    }

    func pickRandomBook() {
        guard books.count > 1 else { return }

        var random: Book
        repeat {
            random = books.randomElement()!
        } while random.id == upNextBook?.id

        randomOverride = random
    }

}

struct CustomButtonStyle: ButtonStyle {
    let backgroundColor: Color

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.headline)
            .foregroundStyle(.white)
            .padding(.horizontal, 24)
            .padding(.vertical, 12)
            .background(backgroundColor)
            .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
            .shadow(color: .black.opacity(0.15), radius: 10, y: 6)
    }
}

#Preview {
    UpNextView().modelContainer(mockContainerForBookList())
}
