import ButtonGroup from '@module/ButtonGroup/ButtonGroup';
import { Box } from '@mui/material';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { useEffect } from 'react';

const puzzles = [
  {
    title: 'Puzzle 1',
    key: 'puzzle1'
  },
  {
    title: 'Puzzle 2',
    key: 'puzzle2'
  }
]

const Home = () => {
  const { status: sessionStatus } = useSession() as { status: string }
 
  useEffect(() => {
    if (sessionStatus === 'loading') {
      return
    } else if (sessionStatus === 'unauthenticated') {
      Router.push('/api/auth/signin')
    }
  }, [ sessionStatus ])

  return (
    <Box className='pt-container'>
      <ButtonGroup puzzles={puzzles} />
    </Box>
  );
};

export default Home