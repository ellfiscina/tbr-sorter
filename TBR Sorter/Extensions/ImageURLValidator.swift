//
//  ImageURLValidator.swift
//  TBR Sorter
//
//  Created by Ellen Fiscina on 2025-12-18.
//

import SwiftUI

extension String {
    var isValidImageURL: Bool {
        guard
            let url = URL(string: self),
            let scheme = url.scheme,
            ["http", "https"].contains(scheme.lowercased())
        else { return false }

        let imageExtensions = ["jpg", "jpeg", "png", "webp"]
        return imageExtensions.contains(url.pathExtension.lowercased())
    }
}
