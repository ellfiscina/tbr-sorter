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
    var order: Int
    
    init(title: String, author: String, coverUrl: String? = nil, order: Int) {
        self.title = title
        self.author = author
        self.coverUrl = coverUrl
        self.order = order
    }
}
