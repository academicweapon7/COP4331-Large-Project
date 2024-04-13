//
//  LandingView.swift
//  SteamGuru
//
//  Created by Gabe Grassi on 4/2/24.
//

import SwiftUI	

struct LandingView: View {
    @Binding var username: String
    @State private var showGameView = false
   
    var body: some View {
        NavigationStack{
            ZStack{
                Color.primarycolor.edgesIgnoringSafeArea(/*@START_MENU_TOKEN@*/.all/*@END_MENU_TOKEN@*/)
                VStack{
                    Text("@\(self.username)")
                        .font(.headline)
                        .fontWeight(.semibold)
                    //.padding(.leading, 200)
                        .frame(width: 130.0, height: 1.0)
                        .foregroundStyle(.white)
                        .offset(x: 125, y: -220)
                    
                    
                    Text("How to play!")
                        .font(.title)
                        .fontWeight(.semibold)
                        .padding(.bottom)
                        .foregroundColor(.white)
                    
                    Text("You will be presented with two different games on Steam. The objective of the game is to select the one with the highest peak player count.")
                        .font(.body)
                        .foregroundColor(Color.white)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal)
                        .padding(.bottom, 100)
                    
                    
                    Button(action: {showGameView = true}){
                        
                        Text("Start Game")
                            .font(.title3)
                            .foregroundColor(Color.white)
                            .frame(width: 300, height: 50)
                            .background(Color.accent)
                            .cornerRadius(10)
                    }
                    
                   
                    
                    .navigationDestination(isPresented: $showGameView){
                        GameView()
                    }
                }
            }
        }
    }
}




struct BindingViewPreviewContainer : View {
     @State private var username = "RickL"

     var body: some View {
          LandingView(username: $username)
     }
}

#Preview {
    BindingViewPreviewContainer()
}
