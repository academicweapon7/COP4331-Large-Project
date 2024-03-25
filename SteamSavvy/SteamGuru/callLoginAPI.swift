//
//  callLoginAPI.swift
//  SteamGuru
//
//  Created by Gabe Grassi on 3/22/24.
//

import Foundation

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
    
    let task = session.dataTask(with: loginUrlRequest) {
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
            
            guard let loginID = receivedLogin["id"] as? Int else {
                print("Could not get loginID as int from JSON")
                return
            }
            print("The ID is: \(loginID)")
        } catch {
            print("error parsing response from POST on /login")
            return
        }
    }
    task.resume()
}
