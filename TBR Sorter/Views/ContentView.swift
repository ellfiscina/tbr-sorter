//
//  ContentView.swift
//  TBR Sorter
//
//  Created by Ellen Fiscina on 2025-12-17.
//

import SwiftData
import SwiftUI

struct ContentView: View {
    @State private var showingSheet = false

    var body: some View {
        ZStack {
            Color.background
                .ignoresSafeArea()

            VStack(spacing: 0) {
                HeaderView(
                    onAddTapped: { showingSheet = true }
                )

                Spacer()
            }
            .clipShape(
                RoundedRectangle(cornerRadius: 24, style: .continuous)
            )
            .overlay(
                RoundedRectangle(cornerRadius: 24, style: .continuous)
                    .stroke(Color.accent, lineWidth: 4)
            )
            .padding()
        }
        .sheet(isPresented: $showingSheet) {
            AddBookView()
        }
    }
}

#Preview {
    ContentView()
}
