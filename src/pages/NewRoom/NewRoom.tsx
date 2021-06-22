import { Link } from "react-router-dom";

import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";

import { Button } from "../../components/Button/Button";
import { useAuth } from "../../hooks/useAuth";

import "../Home/Home.scss";
import "./NewRoom.scss";

export function NewRoom() {
  // const { user } = useAuth();

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
          <h2>Create a new room</h2>
          <form action="">
            <input type="text" placeholder="Type the room's code" />
            <Button type="submit">Create room</Button>
          </form>
          <p>
            Do you wanna join in a existing room? <Link to="/">click here</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
