//
//  GameOverView.swift
//  SteamGuru
//
//  Created by Gabe Grassi on 4/12/24.
//

import SwiftUI

struct GameOverView: View {
    @State private var showGameView = false
    @State private var showWelcomeView = false
    @Binding var score: Int
    @Binding var username: String
   

    var body: some View {
        
        NavigationStack{
            ZStack{
                Color.primarycolor.edgesIgnoringSafeArea(/*@START_MENU_TOKEN@*/.all/*@END_MENU_TOKEN@*/)
                VStack{
                   
                    Text("Game Over :(")
                        .font(.title)
                        .fontWeight(.semibold)
                        .padding(.bottom)
                        .foregroundColor(.white)
                    
                    Text("Score: \(score)")
                        .font(.body)
                        .foregroundColor(Color.white)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal)
                        .padding(.bottom, 100)
                    
                    
                    Button(action: {showGameView = true}){
                        
                        Text("Play Again")
                            .font(.title3)
                            .foregroundColor(Color.white)
                            .frame(width: 300, height: 50)
                            .background(Color.accent)
                            .cornerRadius(10)
                    }
                    
                    Button(action: {showWelcomeView = true}){
                        
                        Text("Log Out")
                            .font(.title3)
                            .foregroundColor(Color.white)
                            .frame(width: 300, height: 50)
                            .background(Color(.darkGray))
                            .cornerRadius(10)
                    }
                    
                   
                    .navigationBarBackButtonHidden(true)
                    .navigationDestination(isPresented: $showGameView){
                        GameView(username: $username)
                    }
                    .navigationDestination(isPresented: $showWelcomeView){
                        WelcomeView()
                    }
                }
            }
        }
    }
}

struct GameOverPreviewContainer : View {
     @State private var score = 99
     @State private var username = "RickL"

     var body: some View {
          GameOverView(score: $score, username: $username)
     }
}

#Preview {
    GameOverPreviewContainer()
}
