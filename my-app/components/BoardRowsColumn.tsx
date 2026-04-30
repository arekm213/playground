import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ROWS = [8, 7, 6, 5, 4, 3, 2, 1] as const;

type Props = {
  cellSize: number;
  boardSize: number;
  labelSize: number;
};

function BoardRowsColumn({ cellSize, boardSize, labelSize }: Props) {
  return (
    <View style={{ height: boardSize, width: labelSize, paddingVertical: 2 }}>
      {ROWS.map((r) => (
        <View key={r} style={{ height: cellSize, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.label}>{r}</Text>
        </View>
      ))}
    </View>
  );
}

export default memo(BoardRowsColumn);

const styles = StyleSheet.create({
  label: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});
