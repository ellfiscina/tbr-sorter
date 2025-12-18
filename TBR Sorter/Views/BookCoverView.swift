//
//  BookCoverView.swift
//  TBR Sorter
//
//  Created by Ellen Fiscina on 2025-12-18.
//

import SwiftUI

struct BookCoverView: View {
    let imageURL: String?
    var width: CGFloat = 60
    var height: CGFloat = 90

    var body: some View {
        Group {
            if let imageURL,
                let url = URL(string: imageURL)
            {
                AsyncImage(url: url) { phase in
                    switch phase {
                    case .empty:
                        ProgressView()

                    case .success(let image):
                        image
                            .resizable()
                            .scaledToFill()

                    case .failure:
                        placeholder

                    @unknown default:
                        placeholder
                    }
                }
            } else {
                placeholder
            }
        }
        .frame(width: width, height: height)
        .background(Color.primaryAction)
        .clipShape(RoundedRectangle(cornerRadius: 8))
    }

    private var placeholder: some View {
        Image(systemName: "book")
            .foregroundColor(.white).opacity(0.6)
    }
}

#Preview {
    BookCoverView(
        imageURL: nil
    )
    .padding()
}
