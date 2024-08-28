import {
    ColorType,
    createChart as createLightWeightChart,
    CrosshairMode,
    ISeriesApi,
    UTCTimestamp,
  } from "lightweight-charts";
  
  
  export class ChartManager {
    private candleSeries: ISeriesApi<"Candlestick">;
    private lastUpdateTime: number = 0;
    private chart: any;
    private currentBar: {
      open: number | null;
      high: number | null;
      low: number | null;
      close: number | null;
      volume:number| null;
    } = {
      open: null,
      high: null,
      low: null,
      close: null,
      volume:null
    };
  
    constructor(
      ref: any,
      initialData: any[],
      layout: { background: string; color: string }
    ) {
      const chart = createLightWeightChart(ref, {
        autoSize: true,
        overlayPriceScales: {
          ticksVisible: true,
          borderVisible: true,
          scaleMargins: {
            top: 0.1, // Adjust the top margin of the price scale
            bottom: 0.1, // Adjust the bottom margin of the price scale
          },
          invertScale: false, // Invert the price scale (false by default)
        },
        crosshair: {
          mode: CrosshairMode.Normal,
          vertLine: {
            color: 'rgba(224, 227, 235, 0.5)', // Vertical line color
            width: 1, // Vertical line width
            style: 1, // Vertical line style (1: solid, 2: dotted, 3: dashed)
            visible: true, // Visibility of vertical line
            labelVisible: true, // Visibility of label on vertical line
          },
          horzLine: {
            color: 'rgba(224, 227, 235, 0.5)', // Horizontal line color
            width: 1, // Horizontal line width
            style: 1, // Horizontal line style
            visible: true, // Visibility of horizontal line
            labelVisible: true, // Visibility of label on horizontal line
          },
        },
        rightPriceScale: {
          visible: true,
          ticksVisible: true,
          entireTextOnly: true,
          borderColor: '#4e5b6c', // Border color of the price scale
          scaleMargins: {
            top: 0.1, // Margin at the top of the scale
            bottom: 0.1, // Margin at the bottom of the scale
          },
        },
        leftPriceScale: {
          visible: false, // Show or hide the left price scale
        },
        timeScale: {
          rightOffset: 12, // Padding on the right side of the chart
          barSpacing: 8, // Distance between bars in the chart
          fixLeftEdge: false, // Prevents scrolling past the first bar
          lockVisibleTimeRangeOnResize: true, // Locks the visible time range when resizing
          borderVisible: true, // Show or hide the time scale border
          borderColor: '#4e5b6c', // Border color of the time scale
          visible: true, // Show or hide the time scale
          timeVisible: true, // Show or hide the time labels
          secondsVisible: false, // Show or hide seconds on the time scale
        },
        grid: {
          horzLines: {
            visible: false, // Show or hide horizontal grid lines
            color: '#4e5b6c', // Color of the horizontal grid lines
            style: 1, // Style of the horizontal grid lines
          },
          vertLines: {
            visible: false, // Show or hide vertical grid lines
            color: '#4e5b6c', // Color of the vertical grid lines
            style: 1, // Style of the vertical grid lines
          },
        },
        layout: {
          background: {
            type: ColorType.Solid,
            color: layout.background, // Background color of the chart
          },
          textColor: "white", // Color of the text in the chart
          fontSize: 12, // Font size for labels
          fontFamily: 'Arial', // Font family for labels
        },
        watermark: {
          visible: true, // Show or hide a watermark
          fontSize: 20, // Font size of the watermark
          horzAlign: 'center', // Horizontal alignment of the watermark
          vertAlign: 'center', // Vertical alignment of the watermark
          color: 'rgba(255, 255, 255, 0.4)', // Color of the watermark
          text: 'trading view', // Text to display as the watermark
        },
        localization: {
          dateFormat: 'dd MMM \'yy', // Date format for the time scale
        },
        handleScroll: {
          mouseWheel: true, // Allow scrolling with the mouse wheel
          pressedMouseMove: true, // Allow scrolling by dragging the chart
        },
        handleScale: {
          axisDoubleClickReset: true, // Reset the scale on double-click
          axisPressedMouseMove: {
            time: true, // Allow scaling the time axis
            price: true, // Allow scaling the price axis
          },
          mouseWheel: true, // Allow scaling with the mouse wheel
          pinch: true, // Allow scaling with pinch gestures
        },
      });
      
      this.chart = chart;
      this.candleSeries = chart.addCandlestickSeries();
  
      this.candleSeries.setData(
        initialData.map((data) => ({
          ...data,
          time: (data.timestamp / 1000) as UTCTimestamp,
        }))
      );
    }
  
    public update(updatedPrice: any) {
      if (!this.lastUpdateTime) {
        this.lastUpdateTime = new Date().getTime();
      }
  
      this.candleSeries.update({
        time: (this.lastUpdateTime / 1000) as UTCTimestamp,
        close: updatedPrice.close,
        low: updatedPrice.low,
        high: updatedPrice.high,
        open: updatedPrice.open,
      });
  
      if (updatedPrice.newCandleInitiated) {
        this.lastUpdateTime = updatedPrice.time;
      }
    }
    public destroy() {
      this.chart.remove();
    }
  }
  