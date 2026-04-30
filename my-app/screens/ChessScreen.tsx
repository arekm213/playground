import { useCallback, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
// @ts-expect-error — no types shipped
import { Game } from 'js-chess-engine';
import BoardColumnsRow from '../components/BoardColumnsRow';
import BoardRowsColumn from '../components/BoardRowsColumn';
import WhiteKing from '../assets/pieces/wK.svg';
import WhiteQueen from '../assets/pieces/wQ.svg';
import WhiteRook from '../assets/pieces/wR.svg';
import WhiteBishop from '../assets/pieces/wB.svg';
import WhiteKnight from '../assets/pieces/wN.svg';
import WhitePawn from '../assets/pieces/wP.svg';
import BlackKing from '../assets/pieces/bK.svg';
import BlackQueen from '../assets/pieces/bQ.svg';
import BlackRook from '../assets/pieces/bR.svg';
import BlackBishop from '../assets/pieces/bB.svg';
import BlackKnight from '../assets/pieces/bN.svg';
import BlackPawn from '../assets/pieces/bP.svg';
import type { ComponentType } from 'react';
import type { SvgProps } from 'react-native-svg';

const COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const;
const ROWS = [8, 7, 6, 5, 4, 3, 2, 1] as const;

const PIECE_COMPONENTS: Record<string, ComponentType<SvgProps>> = {
  K: WhiteKing, Q: WhiteQueen, R: WhiteRook, B: WhiteBishop, N: WhiteKnight, P: WhitePawn,
  k: BlackKing, q: BlackQueen, r: BlackRook, b: BlackBishop, n: BlackKnight, p: BlackPawn,
};

const isOwnPiece = (piece: string, turn: string) => {
  const isWhite = piece === piece.toUpperCase();
  return (turn === 'white' && isWhite) || (turn === 'black' && !isWhite);
};

const LABEL_SIZE = 20;

const useBoardDimensions = () => {
  const { width } = useWindowDimensions();
  return useMemo(() => {
    const maxBoardSize = Math.min(width - 16 - LABEL_SIZE * 2, 480);
    const cellSize = Math.floor((maxBoardSize - 4) / 8);
    const boardSize = cellSize * 8 + 4;
    return { cellSize, boardSize };
  }, [width]);
};

export default function ChessScreen() {
  const { cellSize, boardSize } = useBoardDimensions();

  const [game] = useState(() => new Game());
  const [, forceTick] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const state = useMemo(
    () => game.exportJson() as { turn: 'white' | 'black'; pieces: Record<string, string>; check: boolean; checkMate: boolean; isFinished: boolean },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [game, selected],
  );

  const legalMoves: string[] = selected ? (game.moves(selected) as string[]) : [];

  const onCellPress = (square: string) => {
    const piece = state.pieces[square];

    if (selected) {
      if (selected === square) {
        setSelected(null);
        return;
      }
      if (legalMoves.includes(square)) {
        game.move(selected, square);
        setSelected(null);
        forceTick((t) => t + 1);
        return;
      }
      if (piece && isOwnPiece(piece, state.turn)) {
        setSelected(square);
        return;
      }
      setSelected(null);
      return;
    }

    if (piece && isOwnPiece(piece, state.turn)) {
      setSelected(square);
    }
  };

  const renderSquare = useCallback(
    (square: string, ri: number, ci: number) => {
      const piece = state.pieces[square];
      const isDark = (ri + ci) % 2 === 1;
      const isSelected = selected === square;
      const isLegal = legalMoves.includes(square);
      const baseColor = isDark ? '#b58863' : '#f0d9b5';
      const bg = isSelected
        ? isDark ? '#aaa23b' : '#cdd26b'
        : isLegal
          ? isDark ? '#a3aa45' : '#cdd26b'
          : baseColor;
      const PieceSvg = piece ? PIECE_COMPONENTS[piece] : null;
      return (
        <Pressable
          key={square}
          onPress={() => onCellPress(square)}
          style={[styles.cell, { width: cellSize, height: cellSize, backgroundColor: bg }]}
        >
          {PieceSvg && <PieceSvg width={cellSize * 0.85} height={cellSize * 0.85} />}
        </Pressable>
      );
    },
    [state, selected, legalMoves, cellSize, onCellPress],
  );

  const statusText = state.checkMate
    ? `Checkmate — ${state.turn === 'white' ? 'Black' : 'White'} wins`
    : state.check
      ? `${state.turn} in check`
      : `${state.turn} to move`;

  const boardColumnsRow = <BoardColumnsRow cellSize={cellSize} boardSize={boardSize} labelSize={LABEL_SIZE} />;
  const boardRowsColumn = <BoardRowsColumn cellSize={cellSize} boardSize={boardSize} labelSize={LABEL_SIZE} />;

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{statusText}</Text>
      {boardColumnsRow}
      <View style={styles.middleRow}>
        {boardRowsColumn}
        <View style={[styles.board, { width: boardSize, height: boardSize }]}>
          {ROWS.map((row, ri) =>
            COLUMNS.map((col, ci) => renderSquare(`${col}${row}`, ri, ci)),
          )}
        </View>
        {boardRowsColumn}
      </View>
      {boardColumnsRow}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  status: {
    color: '#fff',
    fontSize: 18,
    textTransform: 'capitalize',
    marginBottom: 8,
  },
  middleRow: {
    flexDirection: 'row',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 2,
    borderColor: '#000',
  },
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
