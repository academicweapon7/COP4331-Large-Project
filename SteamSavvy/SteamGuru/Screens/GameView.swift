//
//  GameView.swift
//  SteamGuru
//
//  Created by Gabe Grassi on 4/8/24.
//

import SwiftUI



struct GameView: View {
    @State private var gameTitle1 : Any?
    @State private var gameImage1 : Any?
    @State private var peakPlayerCount1 : Any?
    
    @State private var gameTitle2 : Any?
    @State private var gameImage2 : Any?
    @State private var peakPlayerCount2 : Any?
    
    @State private var functionCalled = false
    
    var body: some View {
        
        //This prevents an infinite loop of generating pictures
        if(!functionCalled){
            getGame()}
        
        //needed to add "return" because function is being called directly within a view
        return ZStack{
            Color.primarycolor.edgesIgnoringSafeArea(/*@START_MENU_TOKEN@*/.all/*@END_MENU_TOKEN@*/)
            VStack{
                
                
                ImageView(urlString: gameImage1 as? String)
                    .frame(width: 400.0, height: 355)
                Text("\(gameTitle1 ?? "Error")")
                    .foregroundColor(Color.white)
                Text("\(peakPlayerCount1 ?? 0)")
                    .foregroundColor(Color.white)
                    .font(.body)
                    .fontWeight(.semibold)
                
                ImageView(urlString: gameImage2 as? String)
                    .frame(width: 400.0, height: 355)
                Text("\(gameTitle2 ?? "Error")")
                    .foregroundColor(Color.white)
                Text("\(peakPlayerCount2 ?? 0)")
                    .foregroundColor(Color.white)
                    .font(.body)
                    .fontWeight(.semibold)
                    .padding(.bottom, 100.0)
                
                
                
            }
            
        }
    }
    
    
    //getGame API call
    func getGame(){
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
                peakPlayerCount1 = receivedGame["peakPlayerCount"] as! Int
                
                //Debug statements
                print("The title of the first game is: \(gameTitle1 ?? 0)")
                print("The image URL of the first game is: \(gameImage1 ?? 0)")
                print("The peak player count of \(gameTitle1 ?? 0) is: \(peakPlayerCount1 ?? 0)")
                
                functionCalled = true
                
            } catch {
                print("error parsing response from POST on /login")
                return
            }
            
            
        }
        task.resume()
        
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
                peakPlayerCount2 = receivedGame["peakPlayerCount"] as! Int
                
                //Debug statements
                print("The title of the second game is: \(gameTitle2 ?? 0)")
                print("The image URL of the second game is: \(gameImage2 ?? 0)")
                print("The peak player count of \(gameTitle2 ?? 0) is: \(peakPlayerCount2 ?? 0)")
                
                functionCalled = true
                
            } catch {
                print("error parsing response from POST on /login")
                return
            }
            
            
        }
        task2.resume()
        
    }
    
    
}



#Preview {
    GameView()
}
