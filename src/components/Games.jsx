import React from 'react'
import TicTacToe from '../reusable/TicTacToe'

const Games = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center gap-4'>
      <TicTacToe />
    </div>
  )
}

export default Games