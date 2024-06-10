import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
} from 'victory-native';
import {wr} from '../Utils/WidthHeightRatio';

export interface FuelData {
  startReading: any;
  consumedFuel: any;
  endReading: any;
  refuelDate: Date;
  price: string;
}

export const Barchart: React.FC<{fuelData: FuelData[]}> = ({fuelData}) => {
  const [formattedData, setFormattedData] = useState<
    {month: string; price: number}[]
  >([]);

  useEffect(() => {
    const getBarchartData = () => {
      const currentDate = new Date();
      const fiveMonthsAgo = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 4,
        1,
      );
      const curRefuelingData = fuelData?.filter(
        data => data.refuelDate >= fiveMonthsAgo,
      );
      getPriceChartData(curRefuelingData);
    };

    const getPriceChartData = (
      curRefuelingData: FuelData[] | any | undefined,
    ) => {
      let monthsArr = Array.from({length: 12}, () => 0);

      for (let i = 0; i < curRefuelingData?.length; i++) {
        const month = curRefuelingData[i].refuelDate.getMonth();
        monthsArr[month] += parseInt(curRefuelingData[i].price, 10);
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
        const obj = {month: months[month], price: monthsArr[month]};
        arr.push(obj);
      }
      setFormattedData(arr);
    };

    getBarchartData();
  }, [fuelData]);

  useEffect(() => {
    if (!Array.isArray(fuelData)) {
      console.error('Invalid or empty input data for the bar chart.');
      return;
    }
  }, [fuelData]);

  return (
    <>
      <Text style={styles.header}>Money Spent on Fuel</Text>
      <View style={styles.barGraph}>
        <VictoryChart
          theme={VictoryTheme.material}
          style={{parent: {background: {stroke: 'none'}} as any}}
          height={250}
          domainPadding={25}>
          <VictoryAxis
            style={{
              axis: {stroke: '#CED8DE', strokeWidth: 1},
              grid: {stroke: 'none'},
              ticks: {stroke: 'none'},
              tickLabels: {
                stroke: '#0B3C58',
                strokeWidth: 0.15,
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
              tickLabels: {stroke: '#0B3C58', strokeWidth: 0.15, mx: 5},
            }}
            tickFormat={x => `${x / 1000}k`}
          />
          <VictoryBar
            data={formattedData}
            x="month"
            y="price"
            style={{
              data: {fill: '#EB655F'},
            }}
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
  barGraph: {
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
      android: {},
    }),
  },
});
