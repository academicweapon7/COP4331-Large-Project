//
//  SignUpView.swift
//  SteamGuru
//
//  Created by Gabe Grassi on 3/19/24.
//

import SwiftUI

struct SignUpView: View {
    @State private var email = ""
    @State private var username = ""
    @State private var password = ""
    
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
                    Text("Create Account")
                        .font(.largeTitle)
                        .bold()
                        .padding()
                    
                    TextField("Email", text: $email)
                        .padding()
                        .frame(width: 300, height: 50)
                        .background(Color.white.opacity(0.3))
                        .cornerRadius(10)
                    
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
                    
                    SecureField("Confirm Password", text: $password)
                        .padding()
                        .frame(width: 300, height: 50)
                        .background(Color.white.opacity(0.3))
                        .cornerRadius(10)
                    
                    
                    Button(action: {}){
                        //User authentication logic would go here, using test values right now
                        
                        Text("Get started")
                            .font(.title3)
                            .foregroundColor(.white)
                            .frame(width: 300, height: 50)
                            .background(Color.blue.opacity(0.8))
                            .cornerRadius(10)
                    }
                    
                    
                    // NavigationLink(destination: Text("You are logged in @\(username)"), isActive: $showingLoginScreen){
                    //EmptyView()
                //}
            }
            
        }
        .navigationBarHidden(true)
    }
}
}

#Preview {
    SignUpView()
}
