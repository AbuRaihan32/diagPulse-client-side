import {
    GithubAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
  } from "firebase/auth";
  import { createContext, useEffect, useState } from "react";
  import PropTypes from "prop-types";
import auth from "../../firebase/firebase.init";
//   import useAxiosSecure from "../../Hooks/useAxiosSecure";
  
  
  export const AuthContext = createContext();
  
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const axiosSecure = useAxiosSecure();
  
    // ! create user by email and password
    const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    // ! sign in with email ans pass.
    const signInUser = (email, password) => {
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    // ! google Login
    const googleLogin = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
    };
  
    // ! github Login
    const githubLogin = () => {
      setLoading(true);
      return signInWithPopup(auth, githubProvider);
    };
  
    // ! Update User
    const updateUser = (name, image) => {
      return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: image,
      });
    };
  
    // ! sign Out
    const logOut = () => {
      setLoading(true);
      return signOut(auth);
    };
  
    // ! User Observer
    useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
        // const loggedUser = {email: currentUser?.email? currentUser?.email : user?.email}
        setUser(currentUser);
  
        // if (currentUser) {
        //   // create Token
        //   axiosSecure.post("/jwt", loggedUser ).then((res) => {
        //     console.log(res.data);
        //   });
        // }
        // else{
        //   axiosSecure.post('/logout', loggedUser).then(res=>{
        //     console.log(res.data)
        //   })
        // }
        setLoading(false);
      });
      return () => {
        unSubscribe();
      };
    }, []);
  
    const authInfo = {
      user,
      loading,
      createUser,
      googleLogin,
      githubLogin,
      logOut,
      signInUser,
      updateUser,
    };
  
    return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
  };
  
  AuthProvider.propTypes = {
    children: PropTypes.node,
  };
  
  export default AuthProvider;
  