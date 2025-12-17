//
//  Item.swift
//  TBR Sorter
//
//  Created by Ellen Fiscina on 2025-12-17.
//

import Foundation
import SwiftData

@Model
final class Item {
    var title: String
    var author: String
    var image: String?
    
    init(title: String, author: String, image: String? = nil) {
        self.title = title
        self.author = author
        self.image = image
    }
}
