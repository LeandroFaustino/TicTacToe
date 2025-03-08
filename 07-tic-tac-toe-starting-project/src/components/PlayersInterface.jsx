import Player from "./Player";
import GameBoard from "./GameBoard";
import { useState } from "react";
import Log from "./TurnsLog";
import GameOver from "./GameOver";
import {WINNING_COMBINATIONS} from "../winning-combinations"

const initialGameBoard = [
    [null,null,null],
    [null,null,null],
    [null,null,null],
]

function deriveActivePlayer(gameTurns){
    let currentPlayer = 'X';
            if (gameTurns.length > 0 && gameTurns[0].playerSymbol === 'X'){
                currentPlayer = 'O'
            }

    return currentPlayer;        
}

export default function PlayersInterface() {
    
    const [players, setPlayers] = useState({
        X: 'Player1',
        O: 'Player2'
    })
    const [gameTurns, setGameTurns] = useState([]);

    function handleRestart(){
        setGameTurns([])
    }

    function handlePlayerNameChange(symbol, newName) {
        setPlayers(prevPlayers => {
            return {
                ...prevPlayers,
                [symbol]: newName 
            }
        })
    }

    let gameBoard = [...initialGameBoard.map(array=>[...array])] //copia o formato do array de initialGameBoard sem o seu conteúdo, o que é copiado é a referencia da memória

    for (const turn of gameTurns) { //preenche a cópia gameBoard com os turnos já jogados,
            const { square, playerSymbol } = turn;
            const { row, col } = square;
            gameBoard[row][col] = playerSymbol; // ao preencher gameBoard, vai automaticamente atualizar o conteudo em initialGameBoard pois partilham a mesma referencia de memória.
    }

    const activePlayer = deriveActivePlayer(gameTurns) //define o jogador atual ao verificar o estado atual dos turnos.

    let winner;
    

    for (const combination of WINNING_COMBINATIONS){
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

        if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
            winner = players[firstSquareSymbol]
        }
    
    }

    let draw = gameTurns.length === 9 && !winner


    function handleSelectedSquare(rowIndex, colIndex) {
        
        setGameTurns((prevTurns) => { 
            const currentPlayer = deriveActivePlayer(prevTurns); //baseado no turno passado, vai definir o atual jogador a jogar.

            const updatedTurns = [  // armazena o simbolo do jogador atual, e as coordenadas do quadrado onde carregou.
                { square: { row: rowIndex, col: colIndex }, playerSymbol: currentPlayer },
                ...prevTurns,
            ];
            return updatedTurns; //atualiza o state de gameTurns com updatedTurns
        });

        console.log(initialGameBoard)
    }

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player 
                        playerName="Player 1" 
                        symbol="X" 
                        isActive={activePlayer === 'X'} 
                        onChangeName={handlePlayerNameChange}
                        />
                    <Player 
                        playerName="Player 2"  
                        symbol="O" 
                        isActive={activePlayer === 'O'} 
                        onChangeName={handlePlayerNameChange}
                        />
                </ol>

                {(winner || draw) && 
                <GameOver winner={winner} onRestart={handleRestart}
                />}

                <GameBoard 
                    onSelectSquare={handleSelectedSquare} 
                    board={gameBoard} 
                />
            </div>
            <Log turns={gameTurns} />
        </main>
    );
}
