import { auth } from "./firebase";
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut,
} from "firebase/auth";

const actionCodeSettings = {
  // This is the URL Firebase redirects back to after the user clicks the link
  url: "https://flowershop-woad.vercel.app", // change to your production URL when deploying
  handleCodeInApp: true,
};

export const sendLoginLink = (email) => {
  return sendSignInLinkToEmail(auth, email, actionCodeSettings).then(() => {
    // Save email locally so we can use it when the user comes back
    window.localStorage.setItem("emailForSignIn", email);
  });
};

export const completeSignIn = () => {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem("emailForSignIn");
    return signInWithEmailLink(auth, email, window.location.href).then(() => {
      window.localStorage.removeItem("emailForSignIn");
    });
  }
  return Promise.resolve(null);
};

export const logOut = () => signOut(auth);