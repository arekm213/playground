import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
// @ts-expect-error — no types shipped
import { Game } from 'js-chess-engine';
import BoardColumnsRow from '../components/BoardColumnsRow';
import BoardRowsColumn from '../components/BoardRowsColumn';
import DraggablePiece from '../components/DraggablePiece';
import WhiteKing from '../assets/pieces/wK.svg';
import SadWhiteKing from '../assets/pieces/wK_sad.svg';
import SadBlackKing from '../assets/pieces/bK_sad.svg';
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
import Animated, { FadeOut, LightSpeedInLeft } from 'react-native-reanimated';
import Svg, { Text as SvgText } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

import { COLUMNS, ROWS } from '../components/chessCoords';

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

type GameState = {
  turn: 'white' | 'black';
  pieces: Record<string, string>;
  moves: Record<string, string[]>;
  check: boolean;
  checkMate: boolean;
  isFinished: boolean;
};

export default function ChessScreen() {
  const { cellSize, boardSize } = useBoardDimensions();
  const innerSize = cellSize * 8;
  const pieceSize = cellSize * 0.85;

  const [game] = useState(() => new Game());
  const [tick, setTick] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [draggingSquare, setDraggingSquare] = useState<string | null>(null);
  const [failedDropCounter, setFailedDropCounter] = useState(0);
  const [checkInfo, setCheckInfo] = useState<{ side: 'white' | 'black'; mate: boolean } | null>(null);

  const state = useMemo<GameState>(
    () => game.exportJson() as GameState,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [game, tick],
  );

  const legalMoves: string[] = selected ? state.moves[selected] ?? [] : [];

  useEffect(() => {
    if (!state.check && !state.checkMate) return;
    setCheckInfo({ side: state.turn, mate: state.checkMate });
    if (state.checkMate) return;
    const timer = setTimeout(() => setCheckInfo(null), 1000);
    return () => clearTimeout(timer);
  }, [state.check, state.checkMate, state.turn]);

  const onCellPress = useCallback((square: string) => {
    const piece = state.pieces[square];
    const isOwn = piece && isOwnPiece(piece, state.turn);

    if (selected === square) {
      setSelected(null);
      return;
    }
    if (selected && (state.moves[selected] ?? []).includes(square)) {
      game.move(selected, square);
      setSelected(null);
      setTick((t) => t + 1);
      return;
    }
    setSelected(isOwn ? square : null);
  }, [state, selected, game]);

  const onDragStart = useCallback((square: string) => {
    setSelected(square);
    setDraggingSquare(square);
  }, []);

  const onDragEnd = useCallback((from: string, toCi: number, toRi: number) => {
    setDraggingSquare(null);
    if (toCi >= 0 && toCi < 8 && toRi >= 0 && toRi < 8) {
      const to = `${COLUMNS[toCi]}${ROWS[toRi]}`;
      const moves = state.moves[from] ?? [];
      if (moves.includes(to)) {
        game.move(from, to);
        setSelected(null);
        setTick((t) => t + 1);
        return;
      }
    }
    setSelected(null);
    setFailedDropCounter((c) => c + 1);
  }, [state, game]);

  const renderCell = useCallback(
    (square: string, ri: number, ci: number) => {
      const isDark = (ri + ci) % 2 === 1;
      const isSelected = selected === square;
      const isLegal = legalMoves.includes(square);
      const baseColor = isDark ? '#b58863' : '#f0d9b5';
      const bg = isSelected
        ? isDark ? '#aaa23b' : '#cdd26b'
        : isLegal
          ? isDark ? '#a3aa45' : '#cdd26b'
          : baseColor;
      const piece = state.pieces[square];
      let pieceNode = null;
      if (piece) {
        const PieceSvg = PIECE_COMPONENTS[piece];
        const isOwn = isOwnPiece(piece, state.turn);
        const hasMoves = (state.moves[square]?.length ?? 0) > 0;
        if (isOwn && hasMoves) {
          pieceNode = (
            <DraggablePiece
              square={square}
              cellSize={cellSize}
              resetCounter={failedDropCounter}
              onTap={onCellPress}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            >
              <PieceSvg width={pieceSize} height={pieceSize} />
            </DraggablePiece>
          );
        } else {
          pieceNode = (
            <View pointerEvents="none">
              <PieceSvg width={pieceSize} height={pieceSize} />
            </View>
          );
        }
      }
      const isDraggingThis = draggingSquare === square;
      return (
        <Pressable
          key={square}
          onPress={() => onCellPress(square)}
          style={[
            styles.cell,
            { width: cellSize, height: cellSize, backgroundColor: bg },
            isDraggingThis && { zIndex: 10 },
          ]}
        >
          {pieceNode}
        </Pressable>
      );
    },
    [state, selected, legalMoves, cellSize, pieceSize, draggingSquare, failedDropCounter, onCellPress, onDragStart, onDragEnd],
  );

  const boardColumnsRow = <BoardColumnsRow cellSize={cellSize} boardSize={boardSize} labelSize={LABEL_SIZE} />;
  const boardRowsColumn = <BoardRowsColumn cellSize={cellSize} boardSize={boardSize} labelSize={LABEL_SIZE} />;

  const renderCheckOverlay = () => {
    if (!checkInfo) return null;
    const sideName = checkInfo.side === 'white' ? 'White' : 'Black';
    const text = `${sideName} ${checkInfo.mate ? 'checkmated' : 'in check'}`;
    const SadKing = checkInfo.side === 'white' ? SadWhiteKing : SadBlackKing;
    return (
      <Animated.View
        key={`${checkInfo.side}-${checkInfo.mate}`}
        style={styles.checkOverlay}
        pointerEvents="none"
        entering={LightSpeedInLeft.duration(500)}
        exiting={FadeOut.duration(250)}
      >
        <SadKing width={120} height={120} />
        <Svg width={300} height={48} style={styles.checkSvgText}>
          <SvgText x={150} y={32} fill="none" stroke="#000" strokeWidth={6} strokeLinejoin="round" fontSize={24} fontWeight="bold" textAnchor="middle">
            {text}
          </SvgText>
          <SvgText x={150} y={32} fill="#fff" fontSize={24} fontWeight="bold" textAnchor="middle">
            {text}
          </SvgText>
        </Svg>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {boardColumnsRow}
      <View style={styles.middleRow}>
        {boardRowsColumn}
        <View style={[styles.boardBorder, { width: boardSize, height: boardSize }]}>
          <View style={[styles.boardInner, { width: innerSize, height: innerSize }]}>
            {ROWS.map((row, ri) =>
              COLUMNS.map((col, ci) => renderCell(`${col}${row}`, ri, ci)),
            )}
          </View>
        </View>
        {boardRowsColumn}
      </View>
      {boardColumnsRow}
      {renderCheckOverlay()}
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
  middleRow: {
    flexDirection: 'row',
  },
  boardBorder: {
    borderWidth: 2,
    borderColor: '#000',
  },
  boardInner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  checkSvgText: {
    marginTop: 10,
  },
});
