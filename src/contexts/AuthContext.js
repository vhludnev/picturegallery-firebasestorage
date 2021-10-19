import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/config';

const AuthContext = React.createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

	const login = (email, password) => auth.signInWithEmailAndPassword(email, password)
  const logout = () => auth.signOut()
  const updateEmail = (email) => currentUser.updateEmail(email)
  const updatePassword = (password) => currentUser.updatePassword(password) 
	const updateProfile = (displayName) => currentUser.updateProfile({ displayName: displayName }) 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user)
			setLoading(false)  
    })
    return () => unsubscribe()
  }, [])

  const value = {
    currentUser,
    login,
    logout, 
		updateEmail,
		updatePassword,
		updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}