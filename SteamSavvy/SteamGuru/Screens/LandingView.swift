//
//  LandingView.swift
//  SteamGuru
//
//  Created by Gabe Grassi on 4/2/24.
//

import SwiftUI	

struct LandingView: View {
    @Binding var username: String
   
    var body: some View {
        
        ZStack{
            Color.primarycolor.edgesIgnoringSafeArea(/*@START_MENU_TOKEN@*/.all/*@END_MENU_TOKEN@*/)
            VStack{
                Text("@\(self.username)")
                    .font(.headline)
                    .fontWeight(.semibold)
                    //.padding(.leading, 200)
                    .frame(width: 130.0, height: 1.0)
                    .foregroundStyle(.white)
                    .offset(x: 125, y: -340)
                    
                
                Button(action: {}){
                    
                    Text("Start Game")
                        .font(.title3)
                        .foregroundColor(Color.white)
                        .frame(width: 300, height: 50)
                        .background(Color.accent)
                        .cornerRadius(10)
                }
            }
        }
        
    }
}




struct BindingViewPreviewContainer : View {
     @State
     private var username = "RickL"

     var body: some View {
          LandingView(username: $username)
     }
}

#Preview {
    BindingViewPreviewContainer()
}
