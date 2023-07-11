import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import { getSystemInfo } from '@/service/system'

import * as echarts from 'echarts'
import { Descriptions } from 'antd'

const SystemOverview: React.FC = () => {
  const [systemInfo, setSystemInfo] = useState<any>([])
  useEffect(() => {
    const num = 10
    getSystemInfo({ num }).then(({ data }: any) => {
      setSystemInfo(data[num - 1])
      initEcharts(data, num)
    })
  }, [])

  const initEcharts = (data: any, num: number) => {
    console.log(document.getElementById('one'))
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
      yAxis: [
        {
          name: '使用率(%)',
          type: 'value',
          min: 0,
          max: 100,
        },
        {
          name: '使用率',
          type: 'value',
          min: 0,
          max: 100,
          show: false,
        },
      ],
      series: [
        {
          name: '内存',
          type: 'line',
          data: data.map((item: any) => item.rem_utilization),
          yAxisIndex: 0,
        },
        {
          name: 'CPU',
          type: 'line',
          data: data.map((item: any) => item.cpu_utilization),
          yAxisIndex: 1,
        },
      ],
    })
  }

  return (
    <>
      <h1>系统概览</h1>
      <div className={styles['overview']}>
        <div className={styles['overview-items']} id="one"></div>
        <div className={styles['overview-items']} id="two"></div>
      </div>
      <div className={styles['info_list']}>
        <Descriptions title={`系统数据(${systemInfo.time})`} bordered column={4}>
          <Descriptions.Item label="CPU占用率">{systemInfo.cpu_utilization}%</Descriptions.Item>
          <Descriptions.Item label="内存占用率">{systemInfo.rem_utilization}%</Descriptions.Item>
          <Descriptions.Item label="系统运行时间">{systemInfo.system_run_time}小时</Descriptions.Item>
          <Descriptions.Item label="系统环境运行时间">{systemInfo.environmental_run_time}小时</Descriptions.Item>
        </Descriptions>
      </div>
      <div className={styles['info_list']}>
        <Descriptions title="应用数据(所有)" bordered column={4}>
          <Descriptions.Item label="使用人数">110</Descriptions.Item>
          <Descriptions.Item label="启动次数">1000</Descriptions.Item>
          <Descriptions.Item label="日程总数">1000</Descriptions.Item>
          <Descriptions.Item label="记账总数">1000</Descriptions.Item>
        </Descriptions>
      </div>
      <div className={styles['api_list']}></div>
    </>
  )
}

export default SystemOverview
