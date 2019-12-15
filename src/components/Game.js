import React, { Component } from 'react';
import Board from './Board';


export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xIsNext: true,
            stepNumber: 0,
            history: [
                { sqaures: Array(9).fill(null) }
            ]
        }
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step%2) === 0
        })
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const sqaures = current.sqaures.slice();
        const winner = calculateWinner(sqaures);
        if (winner || sqaures[i]) {
            return;
        }
        sqaures[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat({
                sqaures: sqaures
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        })
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.sqaures);
        const moves = history.map((step, move) => {
            const desc = move ? "Go to #" + move : "Start the Game";
            return (
                <li key={move} >
                    <button onClick={() => { this.jumpTo(move) }}>
                        {desc}
                    </button>
                </li>
            )
        });

        let status;
        if (winner) {
            status = 'Winner is ' + winner;
        } else {
            status = 'Next Player is ' + (this.state.xIsNext ? 'X' : 'O')
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board onClick={(i) => this.handleClick(i)} sqaures={current.sqaures} />
                </div>
                <div className="game-info">
                    <div>{status} </div>
                    <ul>{moves} </ul>
                </div>
            </div>
        )
    }
}

function calculateWinner(sqaures) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (sqaures[a] && sqaures[a] === sqaures[b] && sqaures[b] === sqaures[c]) {
            return sqaures[a];
        }
    }
    return null;
}