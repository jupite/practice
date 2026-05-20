'use client'

import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

export default function Page() {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // 初始化 echarts 实例
    chartInstance.current = echarts.init(chartRef.current)

    // 设置图表配置
    chartInstance.current.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    })

    // 响应式：窗口大小变化时重绘
    const handleResize = () => {
      chartInstance.current?.resize()
    }
    window.addEventListener('resize', handleResize)

    // 清理函数
    return () => {  
      window.removeEventListener('resize', handleResize)
      chartInstance.current?.dispose()
    }
  }, [])

  return (
    <div>
      <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
    </div>
  )
}
