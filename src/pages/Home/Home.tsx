import { Button } from "../../components/Button/Button";

import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";
import googleIconImg from "../../assets/images/google-icon.svg";

import "./Home.scss";

export function Home() {
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
          <button className="create-room-button">
            <img src={googleIconImg} alt="Google logo" />
            Create your room with google
          </button>
          <div className="separator">or enter in a room</div>
          <form action="">
            <input type="text" placeholder="Type the room's code" />
            <Button type="submit">Enter room</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
