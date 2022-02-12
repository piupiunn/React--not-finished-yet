import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  /**Kart resimleri yüklendi */
  { src: "/img/helmet-1.png" },
  { src: "/img/potion-1.png" },
  { src: "/img/ring-1.png" },
  { src: "/img/scroll-1.png" },
  { src: "/img/shield-1.png" },
  { src: "/img/sword-1.png" },
];

function App() {
  /**Kartlar için boş dizi olan bir state oluşturuldu */
  const [cards, setCards] = useState([]);

  /**Kaç denemede bulunduğunun sayılmasının takibi için 0'dan başlayan bir sayaç stateti oluşturuldu */
  const [turns, setTurns] = useState(0);

  /** */
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        console.log("Matched");
        resetTurn();
      } else {
        console.log("Not matched");
        resetTurn();
      }
    }
  }, [choiceOne, choiceTwo]);

  /**Kartları karıştırmak için shuffleCards fonksiyonu oluşturuldu.Tüm kartlardan ikişer tane olan shuffledCards dizisi oluşturuldu. Destenin .sort metoduyla karışık bir şekilde karıştırılması sağlandı. .map metoduyla her bir card için random id verildi. Kartların stateti hazırlanmış olan shuffledCars ile güncellendi ve setTurn ile sayaç tekrar sıfırdan başlatıldı. */
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };

  /**Eğer choiceOne için bir seçim yapılmamışsa null değeri dönecektir. Ve chooseOne ın değeri null değilse karşılaştırma yapabilmek sıra chooseTwo ya geliyor. Yani; choiceOne null değilse yani true ise setChoiceTwo, null ise yani false ise setChoiceOne stati güncellenecek. */
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>

      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard handleChoice={handleChoice} key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

export default App;
