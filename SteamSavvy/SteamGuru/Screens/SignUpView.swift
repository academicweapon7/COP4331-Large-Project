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
    @State private var passwordConfirm = ""
    @State private var invalidEmail = 0
    @State private var invalidPassword = 0
    @State private var invalidPasswordConf = 0
    @State private var successfulRegister = false
    @State private var emailInUse = false
    @State private var usernameInUse = false
    
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
                    
                    SecureField("Confirm Password", text: $passwordConfirm)
                        .padding()
                        .frame(width: 300, height: 50)
                        .background(Color.white.opacity(0.3))
                        .cornerRadius(10)
                    
                    if(invalidEmail == 1){
                        Text("Invalid Email")
                            .font(.callout)
                            .fontWeight(.semibold)
                            .foregroundColor(Color(hue: 1.0, saturation: 0.777, brightness: 0.831))
                    }
                    
                    if(invalidPassword == 1){
                        Text("Invalid Password \n 8 characters minimum \n One uppercase letter \n One number\n One special character (!@#$&*)")
                            .font(.custom("callout", fixedSize: 14))
                            .fontWeight(.semibold)
                            .foregroundColor(Color(hue: 1.0, saturation: 0.777, brightness: 0.831))
                            .multilineTextAlignment(.center)
                            
                            
                    }
                    
                    if(invalidPasswordConf == 1){
                        Text("Passwords do not match")
                            .font(.callout)
                            .fontWeight(.semibold)
                            .foregroundColor(Color(hue: 1.0, saturation: 0.777, brightness: 0.831))
                    }
                    
                    if(successfulRegister){
                        Text("Register Successful!")
                            .font(.callout)
                            .fontWeight(.semibold)
                    }
                    
                    if(emailInUse){
                        Text("Email already in use")
                            .font(.callout)
                            .fontWeight(.semibold)
                            .foregroundColor(Color(hue: 1.0, saturation: 0.777, brightness: 0.831))
                    }
                    
                    if(usernameInUse){
                        Text("Username already in use")
                            .font(.callout)
                            .fontWeight(.semibold)
                            .foregroundColor(Color(hue: 1.0, saturation: 0.777, brightness: 0.831))
                    }
                    
                    
                    Button(action: {doRegister(login: username, password: password, email: email)}){
                        
                        Text("Get started")
                            .font(.title3)
                            .foregroundColor(.white)
                            .frame(width: 300, height: 50)
                            .background(Color.accent)
                            .cornerRadius(10)
                    }
                    
                }
            
            }
            .navigationDestination(isPresented: $successfulRegister){
                LoginView()
            }
        }
    }
    
    
    func validateInput(enteredEmail: String, enteredPassword: String) -> Bool{
        
        let emailFormat = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}"
        let emailPredicate = NSPredicate(format:"SELF MATCHES %@", emailFormat)
        if(!emailPredicate.evaluate(with: enteredEmail)){
            invalidEmail = 1
            return false
        }else{invalidEmail = 0}
        
        let passwordFormat = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[d$@$!%*?&#])[A-Za-z\\dd$@$!%*?&#]{8,}"
        let passwordPredicate = NSPredicate(format:"SELF MATCHES %@", passwordFormat)
        if(!passwordPredicate.evaluate(with: enteredPassword)){
            invalidPassword = 1
            return false
        }else{invalidPassword = 0}
        
        if(password != passwordConfirm){
            invalidPasswordConf = 1
            return false
        }else{invalidPasswordConf = 0}
        
        return true
    }
    
    func doRegister(login: String, password: String, email: String){
        
        if(!validateInput(enteredEmail: email, enteredPassword: password)){
            return
        }
        
        let registerEndpoint: String = "https://steamguru-77d4152ed074.herokuapp.com/api/register"
        guard let registerURL = URL(string: registerEndpoint) else {
            print("Error: cannot create URL")
            return
        }
        var registerUrlRequest = URLRequest(url: registerURL)
        registerUrlRequest.httpMethod = "POST"
        
        let parameters: [String: Any] = [
            "login": login,
            "password": password,
            "email": email
        ]
        
        let jsonRegister: Data
        do {
            jsonRegister = try JSONSerialization.data(withJSONObject: parameters, options: [])
            registerUrlRequest.httpBody = jsonRegister
        } catch{
            print("Error: cannot create JSON from login")
            return
        }
        
        registerUrlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
        registerUrlRequest.addValue("application/json", forHTTPHeaderField: "Accept")
        
        let session = URLSession.shared
        
        let task = session.dataTask(with: registerUrlRequest){
            (data, response, error) in
            guard error == nil else {
                print("error calling POST on /api/register")
                print(error!)
                return
            }
            guard let responseData = data else {
                print("Error: did not receive data")
                return
            }
            
            do {
                guard let receivedRegister = try JSONSerialization.jsonObject(with: responseData, options: []) as? [String: Any] else {
                    print("Could not get JSON from responseData as dictionary")
                    return
                }
                print("The login is: " + receivedRegister.description)
                
                let RegisterError = receivedRegister["error"] as? String
                
                print("The error is: \(RegisterError ?? "0")")
                
                
                
                if RegisterError!.compare("") == .orderedSame {
                    print("Sucessful register")
                    successfulRegister = true
                }else{successfulRegister = false}
                
                if(RegisterError!.compare("Email already in use.") == .orderedSame) {
                    emailInUse = true
                }else{emailInUse = false}
                if (RegisterError!.compare("Login already in use.") == .orderedSame){
                    usernameInUse = true
                }else{usernameInUse = false}
            } catch {
                print("error parsing response from POST on /login")
                return
            }
            
            
        }
        task.resume()
    }
    
}

#Preview {
    SignUpView()
}
