import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryScatter,
  VictoryAxis,
} from 'victory-native';
import {wr} from '../Utils/WidthHeightRatio';
import {FuelData} from './Barchart';

interface MileageChartData {
  month: string;
  mileage: number | null;
}

interface CurveGraphProps {
  fuelData: FuelData[];
}

export const CurveGraph: React.FC<CurveGraphProps> = ({fuelData}) => {
  const [mileageChartData, setMileageChartData] = useState<MileageChartData[]>(
    [],
  );

  useEffect(() => {
    const getMonthlyPerformanceData = () => {
      const currentDate = new Date();
      const fiveMonthsAgo = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 4,
        1,
      );
      const filteredFuelData = fuelData?.filter(
        data => data.refuelDate >= fiveMonthsAgo,
      );

      let dist = Array(12).fill(0);
      let fuelCon = Array(12).fill(0);
      let indi = Array(12).fill(0);

      for (let i = 0; i < filteredFuelData?.length; i++) {
        const month = filteredFuelData[i].refuelDate.getMonth();
        dist[month] +=
          +filteredFuelData[i].endReading - +filteredFuelData[i].startReading;
        fuelCon[month] += +filteredFuelData[i].consumedFuel;
      }
      for (let month = 0; month < 12; month++) {
        indi[month] = fuelCon[month] !== 0 ? dist[month] / fuelCon[month] : 0;
      }

      let arr = [];
      const currMonth = new Date().getMonth();
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];

      for (let i = 4; i >= 0; i--) {
        const month = (currMonth - i + 12) % 12;
        const mileage =
          fuelCon[month] === 0 ? null : parseFloat(indi[month].toFixed(2));
        const obj = {month: months[month], mileage};

        arr.push(obj);
      }
      setMileageChartData(arr);
    };

    getMonthlyPerformanceData();
  }, [fuelData]);

  return (
    <>
      <Text style={styles.header}>Vehicle mileage performance</Text>

      <View style={styles.graph}>
        <VictoryChart
          theme={VictoryTheme.material}
          style={{parent: {grid: {stroke: 'none'}} as any}}
          height={245}
          domainPadding={25}>
          <VictoryAxis
            style={{
              axis: {stroke: '#CED8DE', strokeWidth: 1},
              grid: {stroke: 'none'},
              ticks: {stroke: 'none'},
              tickLabels: {
                stroke: '#0B3C58',
                strokeWidth: 0.15,
                fontSize: 11,
                dx: 5,
              },
            }}
          />
          <VictoryAxis
            dependentAxis
            style={{
              ...Platform.select({
                ios: {
                  axis: {stroke: 'none'},
                  grid: {
                    stroke: '#CED8DE',
                    strokeWidth: 1,
                    strokeDasharray: [],
                  },
                },
                android: {
                  axis: {strokeWidth: 0},
                  grid: {
                    stroke: '#CED8DE',
                    strokeWidth: 1,
                    strokeDasharray: [0, 0],
                  },
                },
              }),
              ticks: {stroke: 'none'},
              tickLabels: {stroke: '#0B3C58', strokeWidth: 0.15, dx: 5},
            }}
            tickFormat={t => (t > 1000 ? `${t / 1000}k` : t)}
          />

          <VictoryLine
            data={mileageChartData}
            x="month"
            y="mileage"
            interpolation="monotoneX"
            style={{data: {stroke: '#EB655F'}}}
          />

          <VictoryScatter
            data={mileageChartData}
            x="month"
            y="mileage"
            style={{data: {fill: '#EB655F'}}}
            size={5}
          />
        </VictoryChart>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: wr(36 / 360),
    color: '#0B3C58',
    marginBottom: wr(15 / 360),
    fontSize: wr(16 / 360),
    fontWeight: '600',
    fontFamily: 'New Rubrik',
    alignSelf: 'flex-start',
    marginLeft: wr(15 / 360),
  },
  graph: {
    width: wr(324 / 360),
    backgroundColor: '#FFFFFFCC',
    borderRadius: 12,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(166, 171, 189, 0.40)',
        shadowOffset: {width: 3, height: 4},
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  },
});
