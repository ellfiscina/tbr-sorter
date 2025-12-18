//
//  HeaderView.swift
//  TBR Sorter
//
//  Created by Ellen Fiscina on 2025-12-18.
//

import SwiftUI

struct HeaderView: View {
    let onAddTapped: () -> Void

    var body: some View {
        HStack(spacing: 16) {
            ZStack {
                Image(systemName: "book")
                    .foregroundColor(.white)
            }
            .frame(width: 40, height: 40)
            .background(
                RoundedRectangle(cornerRadius: 16, style: .continuous)
                    .fill(Color.white.opacity(0.2))
            )
            .shadow(color: .black.opacity(0.15), radius: 10, y: 6)

            Spacer()

            Text("TBR Sorter")
                .font(.headline)
                .foregroundColor(.white)

            Spacer()

            Button(action: onAddTapped) {
                Image(systemName: "plus")
                    .font(.system(size: 18, weight: .semibold))
                    .foregroundColor(.white)
                    .frame(width: 40, height: 40)
                    .background(
                        RoundedRectangle(cornerRadius: 16, style: .continuous)
                            .fill(Color.accent)
                    )
            }
            .buttonStyle(.plain)
            .shadow(color: .black.opacity(0.15), radius: 10, y: 6)
        }
        .padding()
        .frame(height: 90)
        .background(Color.primaryAction)
        .clipped()
    }
}


#Preview {
    HeaderView(onAddTapped: { print("Add tapped (preview)") })
}
