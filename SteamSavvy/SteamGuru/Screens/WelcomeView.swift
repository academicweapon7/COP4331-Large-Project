//
//  WelcomeScreenView.swift
//  SteamGuru
//
//  Created by Gabe Grassi on 3/7/24.
//

import SwiftUI

struct WelcomeView: View {
    @State private var showLoginView = false
    @State private var showSignUpView = false
    var body: some View {
        NavigationStack{
            ZStack {
                Color.primarycolor.edgesIgnoringSafeArea(/*@START_MENU_TOKEN@*/.all/*@END_MENU_TOKEN@*/)
                VStack {
                    
                    Text("Welcome to SteamGuru!")
                        .font(.title)
                        .fontWeight(.bold)
                        .foregroundColor(.white)
                       
                        
                    
                    Image("logo")
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 500)
                    
                    Button(action:{showLoginView = true}){
                        Text("Login")
                        .font(.title3)
                        .fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
                        .foregroundColor(.white)
                        .frame(width: 300, height: 30)
                        .padding()
                        .background(Color("accent"))
                        .cornerRadius(50)
                    }
                    
                    Button(action: {showSignUpView = true}){
                        Text("Sign Up")
                            .foregroundColor(.white)
                            .font(.title3)
                            .fontWeight(.bold)
                            .frame(width: 300, height: 30)
                            .padding()
                            .background(Color("accent2"))
                            .cornerRadius(50)
                            .shadow(color: Color.black.opacity(0.08), radius: 60, x: 0.0, y: 16)
                    }
                    
                    Button(action: {}){
                        Text("Forgot Password?")
                            
                    }
                    .padding(.top, 3.0)
                    
                }
                .padding()
            }
            .navigationDestination(isPresented: $showLoginView){
                LoginView()
            }
            .navigationDestination(isPresented: $showSignUpView){
                SignUpView()	
            }
        }
    }
}

#Preview {
    WelcomeView()
}

