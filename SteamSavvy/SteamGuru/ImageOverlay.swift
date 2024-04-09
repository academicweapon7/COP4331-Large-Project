//
//  ImageOverlay.swift
//  SteamGuru
//
//  Created by Gabe Grassi on 4/9/24.
//

import Foundation
import SwiftUI

struct ImageOverlay: View {
    @Binding var text: Any?
    
    var body: some View {
        VStack {
            Text("\(self.text ?? 0)")
                .font(.largeTitle)
                .fontWeight(.semibold)
                .foregroundColor(Color.white)
                
            
        }
    }
}

