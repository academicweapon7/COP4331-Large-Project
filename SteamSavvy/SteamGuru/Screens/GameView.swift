//
//  GameView.swift
//  SteamGuru
//
//  Created by Gabe Grassi on 4/8/24.
//

import SwiftUI



struct GameView: View {
    @Binding var username: String
    @State private var showGameoverView = false
    @State private var showLandingView = false
    
    @State private var gameTitle1 : Any?
    @State private var gameImage1 : Any?
    @State private var peakPlayerCount1 : Any?
    // @State private var game1Chosen = false
    @State private var playerCountInt1 = 0
    
    @State private var gameTitle2 : Any?
    @State private var gameImage2 : Any?
    @State private var peakPlayerCount2 : Any?
    //@State private var game2Chosen = false
    @State private var playerCountInt2 = 0
    
    //Variables used by gameplay
    @State private var displayText : Any? = "peak players"
    @State private var function1Called = false
    @State private var function2Called = false
    @State private var gameOver = false
    @State private var highScore = 0
    @State private var score = 0
  
    
    var body: some View {
        
        //This prevents an infinite loop of generating pictures
        if(!function1Called && !function2Called){
            getGame1()
            getGame2()
        }
        
        
        //needed to add "return" because function is being called directly within a view
        
        return NavigationStack{
            ZStack{
                Color.primarycolor.edgesIgnoringSafeArea(/*@START_MENU_TOKEN@*/.all/*@END_MENU_TOKEN@*/)
                
                VStack{
                    
                    
                    HStack{
                        
                        Text("High Score: \(highScore)")
                            .font(.title3)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                            .padding(.top , -20)
                            .padding(.leading, 165.0)
                        
                        Text("Score: \(score)")
                            .font(.title3)
                            .fontWeight(.bold)
                            .padding(.top , -20)
                            .foregroundColor(.white)
                        
                    }
                    
                    Button(action: {gameplay1()}){
                        ImageView(urlString: gameImage1 as? String)
                            .padding(.bottom, -4.0)
                            .frame(width: 400.0, height: 355)
                            .opacity(0.4)
                            .overlay(ImageOverlay(text: $gameTitle1)
                                .font(.largeTitle)
                                .fontWeight(.semibold)
                                .foregroundColor(Color.white))
                            .overlay(ImageOverlay(text: $peakPlayerCount1)
                                .font(.largeTitle)
                                .fontWeight(.semibold)
                                .foregroundColor(Color.white)
                                .padding(.top, 120.0))
                            .overlay(ImageOverlay(text: $displayText)
                                .font(.callout)
                                .opacity(0.8)
                                .fontWeight(.medium)
                                .foregroundColor(Color.white)
                                .padding(.top, 180.0))
                        
                        
                    }
                    /*Printing without overlay
                     Text("\(gameTitle1 ?? "Error")")
                     .foregroundColor(Color.white)
                     Text("\(peakPlayerCount1 ?? 0)")
                     .foregroundColor(Color.white)
                     .font(.body)
                     .fontWeight(.semibold)
                     */
                    
                    
                    /*Divider()
                     .frame(height: 10.0)
                     .overlay(.white)
                     */
                    
                    Button(action: {gameplay2()}){
                        ImageView(urlString: gameImage2 as? String)
                            .padding(.top, -4.0)
                            .frame(width: 400.0, height: 355)
                            .opacity(0.4)
                            .overlay(ImageOverlay(text: $gameTitle2)
                                .font(.largeTitle)
                                .fontWeight(.semibold)
                                .foregroundColor(Color.white))
                    }
                    /*Printing without overlay
                     Text("\(gameTitle2 ?? "Error")")
                     .foregroundColor(Color.white)
                     Text("\(peakPlayerCount2 ?? 0)")
                     .foregroundColor(Color.white)
                     .font(.body)
                     .fontWeight(.semibold)
                     .padding(.bottom, 100.0)
                     */
                    
                    
                }
                
                Circle()
                    .frame(width: 100.0, height: 100.0)
                    .foregroundColor(/*@START_MENU_TOKEN@*/.white/*@END_MENU_TOKEN@*/)
                
                Text("VS")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .foregroundColor(.black)
                
                    .navigationBarBackButtonHidden(true)
                    .toolbar {
                        ToolbarItem(placement: .topBarLeading) {
                            Button(action: {
                                showLandingView = true
                            }) {
                                Image(systemName: "arrowshape.backward.circle")
                                    .resizable()
                                    .aspectRatio(contentMode: .fit)
                                    .frame(width: 30.0, height: 30.0)
                                    .foregroundColor(.white)
                                Text("Back")
                                    .fontWeight(.semibold)
                                    .foregroundColor(.white)
                                    .font(.title3)
                                
                            }
                        }
                    }
                    .navigationDestination(isPresented: $showGameoverView){
                        GameOverView(score: $score, username: $username)
                    }
                    .navigationDestination(isPresented: $showLandingView){
                        LandingView(username: $username)
                        
                    }
            }
            
        }
        
        
        //getGame API call for first game
        func getGame1(){
            let getGameEndpoint: String = "https://steamguru-77d4152ed074.herokuapp.com/api/getgame"
            guard let getGameURL = URL(string: getGameEndpoint) else {
                print("Error: cannot create URL")
                return
            }
            var getGameUrlRequest = URLRequest(url: getGameURL)
            getGameUrlRequest.httpMethod = "POST"
            
            let parameters: [String: Any] = [:]
            
            let jsonGetGame: Data
            do {
                jsonGetGame = try JSONSerialization.data(withJSONObject: parameters, options: [])
                getGameUrlRequest.httpBody = jsonGetGame
            } catch{
                print("Error: cannot create JSON from login")
                return
            }
            
            getGameUrlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
            getGameUrlRequest.addValue("application/json", forHTTPHeaderField: "Accept")
            
            let session = URLSession.shared
            
            
            //Game 1 Info
            let task = session.dataTask(with: getGameUrlRequest){
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
                    guard let receivedGame = try JSONSerialization.jsonObject(with: responseData, options: []) as? [String: Any] else {
                        print("Could not get JSON from responseData as dictionary")
                        return
                    }
                    print("The game details are: " + receivedGame.description)
                    
                    gameTitle1 = receivedGame["title"]
                    gameImage1 = receivedGame["image_url"]
                    peakPlayerCount1 = receivedGame["peakPlayerCount"]
                    playerCountInt1 = receivedGame["peakPlayerCount"] as! Int
                    
                    
                    //Debug statements
                    print("The title of the first game is: \(gameTitle1 ?? 0)")
                    print("The image URL of the first game is: \(gameImage1 ?? 0)")
                    print("The peak player count of \(gameTitle1 ?? 0) is: \(peakPlayerCount1 ?? 0)")
                    
                    function1Called = true
                    
                } catch {
                    print("error parsing response from POST on /login")
                    return
                }
                
                
            }
            task.resume()
            
        }
        
        //getGame API call for second game
        func getGame2(){
            let getGameEndpoint: String = "https://steamguru-77d4152ed074.herokuapp.com/api/getgame"
            guard let getGameURL = URL(string: getGameEndpoint) else {
                print("Error: cannot create URL")
                return
            }
            var getGameUrlRequest = URLRequest(url: getGameURL)
            getGameUrlRequest.httpMethod = "POST"
            
            let parameters: [String: Any] = [:]
            
            let jsonGetGame: Data
            do {
                jsonGetGame = try JSONSerialization.data(withJSONObject: parameters, options: [])
                getGameUrlRequest.httpBody = jsonGetGame
            } catch{
                print("Error: cannot create JSON from login")
                return
            }
            
            getGameUrlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
            getGameUrlRequest.addValue("application/json", forHTTPHeaderField: "Accept")
            
            let session = URLSession.shared
            
            //Game 2 Info
            let task2 = session.dataTask(with: getGameUrlRequest){
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
                    guard let receivedGame = try JSONSerialization.jsonObject(with: responseData, options: []) as? [String: Any] else {
                        print("Could not get JSON from responseData as dictionary")
                        return
                    }
                    print("The game details are: " + receivedGame.description)
                    
                    gameTitle2 = receivedGame["title"]
                    gameImage2 = receivedGame["image_url"]
                    peakPlayerCount2 = receivedGame["peakPlayerCount"]
                    playerCountInt2 = receivedGame["peakPlayerCount"] as! Int
                    
                    //Debug statements
                    print("The title of the second game is: \(gameTitle2 ?? 0)")
                    print("The image URL of the second game is: \(gameImage2 ?? 0)")
                    print("The peak player count of \(gameTitle2 ?? 0) is: \(peakPlayerCount2 ?? 0)")
                    
                    function2Called = true
                    
                } catch {
                    print("error parsing response from POST on /login")
                    return
                }
                
                
            }
            task2.resume()
            
        }
        
        //Game 1 is chosen
        func gameplay1() {
            if(playerCountInt1 >= playerCountInt2){
                
                getGame2()
                print("Game 1 is correct!")
                score += 1
                
            }else{showGameoverView = true}
        }
        
        //Game 2 is chosen
        func gameplay2(){
            if(playerCountInt1 <= playerCountInt2){
                
                gameTitle1 = gameTitle2
                gameImage1 = gameImage2
                peakPlayerCount1 = peakPlayerCount2
                playerCountInt1 = playerCountInt2
                print("game 2 is correct!")
                
                getGame2()
                score += 1
                
            }else{showGameoverView = true}
            
        }
        
        
    }
}



    struct GameViewPreviewContainer : View {
         @State private var username = "RickL"

         var body: some View {
              GameView(username: $username)
         }
    }

    #Preview {
        GameViewPreviewContainer()
    }
