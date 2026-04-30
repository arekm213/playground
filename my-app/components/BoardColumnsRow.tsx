import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const;

type Props = {
  cellSize: number;
  boardSize: number;
  labelSize: number;
};

function BoardColumnsRow({ cellSize, boardSize, labelSize }: Props) {
  return (
    <View style={[styles.row, { width: boardSize + labelSize * 2 }]}>
      <View style={{ width: labelSize }} />
      <View style={{ width: boardSize, flexDirection: 'row', justifyContent: 'space-around' }}>
        {COLUMNS.map((c) => (
          <Text key={c} style={[styles.label, { width: cellSize }]}>
            {c}
          </Text>
        ))}
      </View>
      <View style={{ width: labelSize }} />
    </View>
  );
}

export default memo(BoardColumnsRow);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  label: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});
