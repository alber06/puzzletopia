import ButtonGroup from "@module/ButtonGroup/ButtonGroup";

const puzzles = [
  {
    title: "Puzzle 1",
    key: 'puzzle1'
  },
  {
    title: "Puzzle 2",
    key: 'puzzle2'
  }
]

const Home = () => {
  return (
    <ButtonGroup puzzles={puzzles} />
  );
};

export default Home