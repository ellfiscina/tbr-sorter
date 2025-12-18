//
//  TBR_SorterApp.swift
//  TBR Sorter
//
//  Created by Ellen Fiscina on 2025-12-17.
//

import SwiftData
import SwiftUI

@main
struct TBR_SorterApp: App {
    init() {
        let cache = URLCache(
            memoryCapacity: 50 * 1024 * 1024,  // 50 MB
            diskCapacity: 200 * 1024 * 1024,  // 200 MB
            diskPath: "image-cache"
        )
        URLCache.shared = cache
    }

    var sharedModelContainer: ModelContainer = {
        let schema = Schema([
            Book.self
        ])
        let modelConfiguration = ModelConfiguration(
            schema: schema,
            isStoredInMemoryOnly: false
        )

        do {
            return try ModelContainer(
                for: schema,
                configurations: [modelConfiguration]
            )
        } catch {
            fatalError("Could not create ModelContainer: \(error)")
        }
    }()

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(sharedModelContainer)
    }
}
