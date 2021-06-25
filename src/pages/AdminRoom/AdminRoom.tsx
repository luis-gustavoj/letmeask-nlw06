import { useHistory, useParams } from "react-router-dom";

import logoImg from "../../assets/images/logo.svg";
import checkImg from "../../assets/images/check.svg";
import answerImg from "../../assets/images/answer.svg";
import deleteImg from "../../assets/images/delete.svg";

import { Question } from "../../components/Question/Question";
import { Button } from "../../components/Button/Button";
import { RoomCode } from "../../components/RoomCode/RoomCode";
import { useRoom } from "../../hooks/useRoom";
import { database } from "../../services/firebase";

import "./AdminRoom.scss";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { questions, title } = useRoom(roomId);

  async function handleEndRoom() {
    if (window.confirm("Are your sure you want to end this room?")) {
      await database.ref(`rooms/${roomId}`).update({
        endedAt: new Date(),
      });
    }

    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Are your sure you want to delete this question?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={() => handleEndRoom()}>
              Close room
            </Button>
          </div>
        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>{title} Room</h1>
          {questions.length > 0 && <span>{questions.length} question(s)</span>}
        </div>
        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isHighlighted={question.isHighlighted}
                isAnswered={question.isAnswered}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Mark question as answered" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img
                        src={answerImg}
                        alt="Mark question as currently answering"
                      />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Delete question" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
