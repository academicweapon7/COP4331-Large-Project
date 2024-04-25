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
    @State private var highscore = 0
    @Binding var score: Int
    @Binding var username: String
   

    var body: some View {
        
        doGameover(username: username, score: score)
        
       return NavigationStack{
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
                        .padding(.bottom)
                    
                    Text("High Score: \(highscore)")
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
                        GameView(username: $username, highscore: $highscore)
                    }
                    .navigationDestination(isPresented: $showWelcomeView){
                        WelcomeView()
                    }
                }
            }
        }
    }
    
    func doGameover(username: String, score: Int){
        let gameoverEndpoint: String = "https://steamguru-77d4152ed074.herokuapp.com/api/gameover"
        guard let gameoverURL = URL(string: gameoverEndpoint) else {
            print("Error: cannot create URL")
            return
        }
        var gameoverUrlRequest = URLRequest(url: gameoverURL)
        gameoverUrlRequest.httpMethod = "POST"
        
        let parameters: [String: Any] = [
            "login": username,
            "score": score
        
        ]
        
        let jsonGameover: Data
        do {
            jsonGameover = try JSONSerialization.data(withJSONObject: parameters, options: [])
            gameoverUrlRequest.httpBody = jsonGameover
        } catch{
            print("Error: cannot create JSON from login")
            return
        }
        
        gameoverUrlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
        gameoverUrlRequest.addValue("application/json", forHTTPHeaderField: "Accept")
        
        let session = URLSession.shared
        
        let task = session.dataTask(with: gameoverUrlRequest){
            (data, response, error) in
            guard error == nil else {
                print("error calling POST on /api/login")
                print(error!)
                return
            }
            guard let responseData = data else {
                print("Error: did not receive data")
                return
            }
            
            do {
                guard let receivedGameover = try JSONSerialization.jsonObject(with: responseData, options: []) as? [String: Any] else {
                    print("Could not get JSON from responseData as dictionary")
                    return
                }
                print("The highscore is: " + receivedGameover.description)
                
                if(username != "Guest"){
                    highscore = receivedGameover["highscore"] as! Int
                }
                
            } catch {
                print("error parsing response from POST on /login")
                return
            }
            
            
        }
        task.resume()
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
