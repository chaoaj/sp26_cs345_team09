import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import {getAuth, signInAnonymously, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";
import {getDatabase, ref, get, set, push, query, orderByChild, limitToLast} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCtADYNrCCPrHRHZzhdy827vZXm0jN882E",
  authDomain: "relicquae.firebaseapp.com",
  databaseURL: "https://relicquae-default-rtdb.firebaseio.com",
  projectId: "relicquae",
  storageBucket: "relicquae.firebasestorage.app",
  messagingSenderId: "766559791679",
  appId: "1:766559791679:web:55bfa132b7aea4c97ce68a",
  measurementId: "G-7V1Z3911PW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

let firebaseReady = false;

export async function initFirebase() {
  try {
    await signInAnonymously(auth);
  } catch (error) {
    console.error("Anonymous sign in failed:", error);
  }

  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      firebaseReady = !!user;
      if (user) {
        console.log("Firebase ready:", user.uid);
      }
      unsubscribe();
      resolve(user);
    });
  });
}

export function isFirebaseReady() {
  return firebaseReady;
}

export async function loadLeaderboard() {
  try {
    const leaderboardQuery = query(
      ref(db, "scores"),
      orderByChild("score"),
      limitToLast(5)
    );

    const snapshot = await get(leaderboardQuery);

    if (!snapshot.exists()) {
      return [];
    }

    const data = snapshot.val();
    return Object.values(data).sort((a, b) => b.score - a.score);
  } catch (error) {
    console.error("Failed to load leaderboard:", error);
    return [];
  }
}


export async function submitScore(playerName, score) {
  const user = auth.currentUser;

  if (!user) {
    console.error("No user signed in");
    return;
  }

  try {
    const scoresRef = ref(db, "scores");
    const newScoreRef = push(scoresRef);

    await set(newScoreRef, {
      uid: user.uid,
      name: playerName,
      score: score,
      timestamp: Date.now()
    });

    console.log("Score saved");
  } catch (error) {
    console.error("Failed to save score:", error);
  }
}