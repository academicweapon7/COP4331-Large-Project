//
//  LoginScreenView.swift
//  SteamGuru
//
//  Created by Gabe Grassi on 3/9/24.
//

import SwiftUI

struct LoginView: View {
    @State private var username = ""
    @State private var password = ""
    @State private var wrongUsername = 0
    @State private var wrongPassword = 0
    @State private var showingLoginScreen = false
    
    var body: some View {
        NavigationView {
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
                        .border(.red, width: CGFloat(wrongUsername)).cornerRadius(4)
                    
                    SecureField("Password", text: $password)
                        .padding()
                        .frame(width: 300, height: 50)
                        .background(Color.white.opacity(0.3))
                        .cornerRadius(10)
                        .border(.red, width: CGFloat(wrongPassword)).cornerRadius(4)
                    
                    Button(action: {doLogin(login: username, password: password)}){
                        //User authentication logic would go here, using test values right now
                        
                        Text("Login")
                            .font(.title3)
                            .foregroundColor(.white)
                            .frame(width: 300, height: 50)
                            .background(Color.blue.opacity(0.8))
                            .cornerRadius(10)
                    }
                   
                    
                    NavigationLink(destination: Text("You are logged in @\(username)"), isActive: $showingLoginScreen){
                        EmptyView()
                    }
                }
                
            }
            .navigationBarHidden(true)
        }
    }
    
    func autheticateUser(username: String, password: String){
        if username.lowercased() == "rickl" {
            wrongUsername = 0
            if password == "COP4331" {
                wrongPassword = 0
                showingLoginScreen = true
            } else {
                wrongPassword = 2
            }
        } else {
            wrongUsername = 2
        }
    }
}

#Preview {
    LoginView()
}
