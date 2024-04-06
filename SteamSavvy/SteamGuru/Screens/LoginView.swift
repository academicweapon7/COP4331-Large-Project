//
//  LoginScreenView.swift
//  SteamGuru
//
//  Created by Gabe Grassi on 3/9/24.
//

import SwiftUI
import Observation


struct LoginView: View {
    @State private var username = ""
    @State private var password = ""
    @State private var wrongInput = 0
    
    @State private var showingLoginScreen = false
    
    var body: some View {
        NavigationStack {
            ZStack {
                Color.primarycolor.edgesIgnoringSafeArea(.all)
                Circle()
                    .scale(1.7)
                    .foregroundColor(.white.opacity(0.15))
                Circle()
                    .scale(1.35)
                    .foregroundColor(.white.opacity(0.2))
                
                VStack {
                    Text("Sign in")
                        .font(.largeTitle)
                        .bold()
                        .padding()
                    TextField("Username", text: $username)
                        .padding()
                        .frame(width: 300, height: 50)
                        .background(Color.white.opacity(0.3))
                        .cornerRadius(10)
                        
                    
                    SecureField("Password", text: $password)
                        .padding()
                        .frame(width: 300, height: 50)
                        .background(Color.white.opacity(0.3))
                        .cornerRadius(10)
                        
                    
                    if(wrongInput == 2){
                        Text("Incorrect Username/Password")
                            .font(.callout)
                            .fontWeight(.semibold)
                            .foregroundColor(Color(hue: 1.0, saturation: 0.777, brightness: 0.831))
                    }
                    
                    Button(action: {doLogin(login: username, password: password)}){
                        
                        Text("Login")
                            .font(.title3)
                            .foregroundColor(Color.white)
                            .frame(width: 300, height: 50)
                            .background(Color.accent)
                            .cornerRadius(10)
                    }
                    
                    .navigationDestination(isPresented: $showingLoginScreen){
                        LandingView(username: $username)
                    }
                }
                
            }
            .navigationBarHidden(true)
        }
    }
    
    func doLogin(login: String, password: String){
        let loginEndpoint: String = "https://steamguru-77d4152ed074.herokuapp.com/api/login"
        guard let loginURL = URL(string: loginEndpoint) else {
            print("Error: cannot create URL")
            return
        }
        var loginUrlRequest = URLRequest(url: loginURL)
        loginUrlRequest.httpMethod = "POST"
        
        let parameters: [String: Any] = [
            "login": login,
            "password": password
        
        ]
        
        let jsonLogin: Data
        do {
            jsonLogin = try JSONSerialization.data(withJSONObject: parameters, options: [])
            loginUrlRequest.httpBody = jsonLogin
        } catch{
            print("Error: cannot create JSON from login")
            return
        }
        
        loginUrlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
        loginUrlRequest.addValue("application/json", forHTTPHeaderField: "Accept")
        
        let session = URLSession.shared
        
        let task = session.dataTask(with: loginUrlRequest){
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
                guard let receivedLogin = try JSONSerialization.jsonObject(with: responseData, options: []) as? [String: Any] else {
                    print("Could not get JSON from responseData as dictionary")
                    return
                }
                print("The login is: " + receivedLogin.description)
                
                let loginID = receivedLogin["id"]
                
                print("The ID is: \(loginID ?? 0)")
                
                
                
                if("\(loginID ?? 0)" > "0"){
                    print("Sucessful login")
                    wrongInput = 0
                    showingLoginScreen = true
                } else {
                    wrongInput = 2
                }
            } catch {
                print("error parsing response from POST on /login")
                return
            }
            
            
        }
        task.resume()
    }
    
    
}

#Preview {
    LoginView()
}
