//
//  VerificationView.swift
//  SteamGuru
//
//  Created by Gabe Grassi on 4/24/24.
//

import SwiftUI

struct VerificationView: View {
    @State private var successfulVerification = false
    @State private var userVerification = ""
    @Binding var email: String
    @Binding var verifyCode: Int
    
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
                    Text("Verify your email")
                        .font(.custom("VeniteAdoremus", size: 28))
                        .bold()
                        .padding()
                        .foregroundColor(.white)
                    
                    Text("Please enter the 6-digit verification code sent to **\(email)**")
                        .font(.body)
                        .foregroundColor(Color.white)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal)
                        .padding(.bottom, 20)
                    
                    
                    TextField("Verification Code", text: $userVerification)
                        .padding()
                        .frame(width: 300, height: 50)
                        .background(Color.white.opacity(0.3))
                        .cornerRadius(10)
                    
                    
                    Button(action: {doVerify(email: email, enteredVerification: userVerification)}){
                        
                        Text("Verify")
                            .font(.custom("VeniteAdoremus", size: 20))
                            .foregroundColor(.white)
                            .frame(width: 300, height: 50)
                            .background(Color.accent)
                            .cornerRadius(10)
                    }
                    
                }
            
            }
            .navigationBarBackButtonHidden(true)
            .navigationDestination(isPresented: $successfulVerification){
                LoginView()
            }
        }
        
    }
    
    func doVerify(email : String, enteredVerification: String){
        
        let verifyEndpoint: String = "https://steamguru-77d4152ed074.herokuapp.com/api/verifyaccount"
        guard let verifyURL = URL(string: verifyEndpoint) else {
            print("Error: cannot create URL")
            return
        }
        var verifyUrlRequest = URLRequest(url: verifyURL)
        verifyUrlRequest.httpMethod = "POST"
        
        let parameters: [String: Any] = [
            "email": email,
            "verif_code": enteredVerification
        ]
        
        let jsonVerify: Data
        do {
            jsonVerify = try JSONSerialization.data(withJSONObject: parameters, options: [])
            verifyUrlRequest.httpBody = jsonVerify
        } catch{
            print("Error: cannot create JSON from login")
            return
        }
        
        verifyUrlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
        verifyUrlRequest.addValue("application/json", forHTTPHeaderField: "Accept")
        
        let session = URLSession.shared
        
        let task = session.dataTask(with: verifyUrlRequest){
            (data, response, error) in
            guard error == nil else {
                print("error calling POST on /api/verifyaccount")
                print(error!)
                return
            }
            guard let responseData = data else {
                print("Error: did not receive data")
                return
            }
            
            do {
                guard let receivedVerify = try JSONSerialization.jsonObject(with: responseData, options: []) as? [String: Any] else {
                    print("Could not get JSON from responseData as dictionary")
                    return
                }
                print("The login is: " + receivedVerify.description)
                
                let verifyError = receivedVerify["error"] as? String
                
                print("The error is: \(verifyError ?? "0")")
                
                
                
                if verifyError!.compare("") == .orderedSame {
                    print("Successful verification")
                    successfulVerification = true
                }else{successfulVerification = false}
                
              
            } catch {
                print("error parsing response from POST on /login")
                return
            }
            
            
        }
        task.resume()
        
    }
    
}


struct VerificationViewPreviewContainer : View {
     @State private var email = "RickL@gmail.com"
     @State private var verifyCode = 236491

     var body: some View {
          VerificationView(email: $email, verifyCode: $verifyCode)
     }
}

#Preview {
    VerificationViewPreviewContainer()
}

