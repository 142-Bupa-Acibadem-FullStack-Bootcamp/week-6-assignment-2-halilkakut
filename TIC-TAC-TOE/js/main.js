window.addEventListener('DOMContentLoaded', () => {
    const boxes = Array.from(document.querySelectorAll('.box'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const result = document.querySelector('.result');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'IT IS A TIE';

    
    /*
    Indexes within the board
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]
    */

    const winningStatues = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const isValidAction = (box) => {
        if (box.innerText === 'X' || box.innerText === 'O'){
            return false;
        }
    
        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
     }

     const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const conclusion = (type) => {
        switch(type){
           case PLAYERO_WON:
                result.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
           case PLAYERX_WON:
                result.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
           case TIE:
                result.innerText = 'Tie';
            }
        result.classList.remove('hide');
    };

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
          const winStatus = winningStatues[i];
          const a = board[winStatus[0]];
          const b = board[winStatus[1]];
          const c = board[winStatus[2]];
          if (a === "" || b === "" || c === "") {
            continue;
          }
          if (a === b && b === c) {
            roundWon = true;
            break;
          }
        }
      
        if (roundWon) {
          conclusion(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
          isGameActive = false;
          return;
        }
      
        if (!board.includes("")) conclusion(TIE);
      }

      const userAction = (box, index) => {
        if (isValidAction(box) && isGameActive) {
          box.innerText = currentPlayer;
          box.classList.add(`player${currentPlayer}`);
          updateBoard(index);
          handleResultValidation();
          changePlayer();
        }
      };

      boxes.forEach( (box, index) => {
        box.addEventListener('click', () => userAction(box, index));
    });

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        result.classList.add('hide');
    
        if (currentPlayer === 'O') {
            changePlayer();
        }
    
        boxes.forEach(box => {
            box.innerText = '';
            box.classList.remove('playerX');
            box.classList.remove('playerO');
        });
    }

    resetButton.addEventListener('click', resetBoard);
  });