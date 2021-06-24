import { useHistory } from "react-router-dom";

import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";
import googleIconImg from "../../assets/images/google-icon.svg";

import { Button } from "../../components/Button/Button";
import { useAuth } from "../../hooks/useAuth";

import "./Home.scss";
import { FormEvent } from "react";
import { useState } from "react";
import { database } from "../../services/firebase";

export function Home() {
  const history = useHistory();
  const { signInWithGoogle, user } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Room does not exists.");
      return;
    }

    if (roomRef.val().endedAt) {
      alert("Room already closed");
      return;
    }

    history.push(`rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Illustration symbolizing questions and answers"
        />
        <strong>Create a live room for Q&amp;A</strong>
        <p>Answer the doubts of your audience in real time</p>
      </aside>
      <main>
        <div className="main-container">
          <img src={logoImg} alt="Letmeask" />
          {!user && (
            <>
              <button onClick={handleCreateRoom} className="create-room-button">
                <img src={googleIconImg} alt="Google logo" />
                Create your room with google
              </button>
              <div className="separator">or enter in a room</div>
            </>
          )}
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Type the room's code"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Enter room</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
