//
//  Item.swift
//  TBR Sorter
//
//  Created by Ellen Fiscina on 2025-12-17.
//

import Foundation
import SwiftData

@Model
final class Book {
    var title: String
    var author: String
    var coverUrl: String?
    
    init(title: String, author: String, coverUrl: String? = nil) {
        self.title = title
        self.author = author
        self.coverUrl = coverUrl
    }
}
