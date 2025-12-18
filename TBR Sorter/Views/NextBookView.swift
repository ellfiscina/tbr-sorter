//
//  NextBookView.swift
//  TBR Sorter
//
//  Created by Ellen Fiscina on 2025-12-18.
//

import SwiftUI

struct NextBookView: View {
    let book: Book
    var body: some View {
        VStack(spacing: 24) {
            BookCoverView(imageURL: book.coverUrl, width: 128, height: 176)

            VStack(spacing: 8) {
                Text(book.title)
                    .font(.title2)
                    .fontWeight(.semibold)
                    .lineLimit(2)
                    .multilineTextAlignment(.center)

                Text("by \(book.author)")
            }
        }
        .transition(
            .opacity
                .combined(with: .scale(scale: 0.97))
        )

    }
}

#Preview {
    NextBookView(book: mockBook())
}
