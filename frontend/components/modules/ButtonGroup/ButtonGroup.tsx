import { Button } from "@mui/material"

import styles from './ButtonGroup.module.css'
import Router from "next/router"

const ButtonGroup = ({ puzzles }: { puzzles: Array<PuzzleOption> }) => {
  const handleClick = (key: string) => {
    Router.push(`/puzzles/${key}`)
  }
  
  return(
    <div className={styles.Container}>
      { puzzles.map(
        (puzzle, index) => {
          return <Button className={styles.Button} variant="outlined" key={`${index}${puzzle.key}`} onClick={() => handleClick(puzzle.key)}>Take {puzzle.title}</Button>
        }
      )}  
    </div>
  )
}

export default ButtonGroup