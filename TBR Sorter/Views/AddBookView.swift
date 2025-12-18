//
//  AddBookView.swift
//  TBR Sorter
//
//  Created by Ellen Fiscina on 2025-12-18.
//

import PhotosUI
import SwiftData
import SwiftUI

struct AddBookView: View {
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss
    
    @Query(sort: \Book.order) private var books: [Book]

    @State private var title: String = ""
    @State private var author: String = ""
    @State private var cover: String = ""

    private var isTitleValid: Bool {
        !title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    private var isCoverValid: Bool {
        cover.isEmpty || cover.isValidImageURL
    }

    private var isFormValid: Bool {
        isTitleValid && isCoverValid
    }

    var body: some View {
        NavigationStack {
            Form {
                TextField("Book Title", text: $title)
                TextField("Author", text: $author)

                Section {
                    TextField("Cover Image URL (optional)", text: $cover)
                        .textInputAutocapitalization(.never)
                        .keyboardType(.URL)
                        .autocorrectionDisabled()
                } footer: {
                    if !isCoverValid {
                        Text("Enter a valid URL")
                            .font(.caption)
                            .foregroundStyle(.red)
                    }
                }

            }
            .scrollContentBackground(.hidden)
            .background(Color.background)
            .navigationTitle("Add a New Book")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save", systemImage: "checkmark", action: addNew)
                        .disabled(!isFormValid)
                }
                ToolbarItem(placement: .cancellationAction) {
                    Button(
                        "Cancel",
                        systemImage: "xmark",
                        action: { dismiss() }
                    )
                }
            }
        }

    }

    func addNew() {
        let item = Book(
            title: title,
            author: author,
            coverUrl: cover.isEmpty ? nil : cover,
            order: books.count
        )
        modelContext.insert(item)
        dismiss()
    }
}

#Preview {
    AddBookView()
}
