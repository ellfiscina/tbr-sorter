//
//  PreviewData.swift
//  TBR Sorter
//
//  Created by Ellen Fiscina on 2025-12-18.
//

import SwiftData

func createInMemoryContainer() -> ModelContainer {
    try! ModelContainer(
        for: Schema([Book.self]),
        configurations: [.init(isStoredInMemoryOnly: true)]
    )
}

func mockBook() -> Book {
    return Book(
        title: "The Midnight Library",
        author: "Matt Haig",
        coverUrl:
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
        order: 1
    )
}

@MainActor func mockContainerForBookList() -> ModelContainer {
    let books: [Book] = [
        Book(
            title: "The Midnight Library",
            author: "Matt Haig",
            coverUrl:
                "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
            order: 1
        ),
        Book(
            title: "Atomic Habits",
            author: "James Clear",
            order: 3
        ),
        Book(
            title: "Project Hail Mary",
            author: "Andy Weir",
            coverUrl:
                "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300&h=400&fit=crop",
            order: 2
        ),
    ]

    let container = createInMemoryContainer()
    let context = container.mainContext

    for book in books {
        context.insert(book)
    }

    try! context.save()
    return container
}
