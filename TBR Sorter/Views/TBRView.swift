//
//  TBRView.swift
//  TBR Sorter
//
//  Created by Ellen Fiscina on 2025-12-18.
//

import SwiftData
import SwiftUI

struct TBRView: View {
    @Environment(\.modelContext) private var modelContext

    @Query(sort: \Book.order) private var books: [Book]
    
    @State private var draggedBook: Book?
    
    var body: some View {
        VStack(alignment: .center) {
            if (books.count > 0) {
                Text("Pick randomly or start reading • Reorder your queue below")
                    .font(.default)
                    .multilineTextAlignment(.center)
                    .underline(color: Color.secondaryAccent)
                    .padding()
                
                HStack{
                    Text("\(books.count - 1)")
                        .font(.title3)
                        .fontWeight(.semibold)
                        .foregroundStyle(.black)
                        .frame(width: 26, height: 26)
                        .background(Color.secondaryAccent)
                        .clipShape(
                            RoundedRectangle(cornerRadius: 8, style: .continuous)
                        )
                    Text("In Your Queue")
                        .font(.title3)
                    
                    Spacer()
                }
                .padding(20)
                
                ScrollView {
                    LazyVStack(spacing: 8) {
                        ForEach(books) { book in
                            BookCardRow(book: book, draggedBook: $draggedBook)
                        }
                    }
                    .padding()
                }
            }
        }

    }
}

#Preview {
    TBRView().modelContainer(mockContainerForBookList())
}
