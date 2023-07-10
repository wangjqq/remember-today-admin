import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import { getSystemInfo } from '@/service/system'

import * as echarts from 'echarts'

const SystemOverview: React.FC = () => {
  const [systemInfo, setSystemInfo] = useState([])
  useEffect(() => {
    const num = 10
    getSystemInfo({ num }).then(({ data }: any) => {
      setSystemInfo(data)
      let myChart1 = echarts.init(document.getElementById('one') as HTMLElement)
      let myChart2 = echarts.init(document.getElementById('two') as HTMLElement)
      myChart1.setOption({
        title: {
          text: '内存',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            name: '内存使用情况',
            type: 'pie',
            radius: '50%',
            data: [
              { value: data[num - 1].free_rem, name: `空闲内存-${data[num - 1].free_rem}G` },
              {
                value: (data[num - 1].total_rem - data[num - 1].free_rem).toFixed(2),
                name: `占用内存-${(data[num - 1].total_rem - data[num - 1].free_rem).toFixed(2)}G`,
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      })
      myChart2.setOption({
        title: {
          text: 'CPU/内存占用',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          top: 25,
        },
        xAxis: {
          name: '时间',
          type: 'category',
          boundaryGap: false,
          data: data.map((item: any) => item.time),
        },
        yAxis: {
          name: '使用率',
          type: 'value',
        },
        series: [
          {
            name: 'CPU',
            type: 'line',
            stack: 'Total',
            data: data.map((item: any) => item.cpu_utilization),
          },
          {
            name: '内存',
            type: 'line',
            stack: 'Total',
            data: data.map((item: any) => item.rem_utilization),
          },
        ],
      })
    })
  }, [])

  return (
    <>
      <h1>系统概览</h1>
      <div className={styles['overview']}>
        <div className={styles['overview-items']} id="one"></div>
        <div className={styles['overview-items']} id="two"></div>
        <div className={styles['overview-items']} id="three"></div>
      </div>
    </>
  )
}

export default SystemOverview
