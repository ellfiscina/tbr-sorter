//
//  ContentView.swift
//  TBR Sorter
//
//  Created by Ellen Fiscina on 2025-12-17.
//

import SwiftData
import SwiftUI

struct ContentView: View {
    var body: some View {
        ZStack {
            Color.linen
                .ignoresSafeArea()

            VStack(spacing: 0) {
                ZStack {
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

                        Button {
                            // setIsModalOpen(true)
                        } label: {
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
                }
                .frame(height: 90)
                .background(Color.primaryAction)
                .clipped()
                
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
    }
}

#Preview {
    ContentView()
}
