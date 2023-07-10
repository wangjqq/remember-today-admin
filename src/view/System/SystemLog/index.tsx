import { getLog } from '@/service/system'
import { Button, Col, DatePicker, Form, Input, Row, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAntdTable } from 'ahooks'
import dayjs, { Dayjs } from 'dayjs'
import styles from './index.module.less'
import { ColumnsType } from 'antd/es/table'

interface Result {
  total: number
  list: any[]
}
const { Option } = Select
const SystemLog: React.FC = () => {
  const [form] = Form.useForm()

  const { tableProps, search } = useAntdTable(
    ({ current, pageSize }, formData: Object): Promise<Result> => {
      return getLog({ ...formData, page: current, size: pageSize }).then((res: any) => ({
        total: res.data.total,
        list: res.data.list,
      }))
    },
    {
      form,
      defaultParams: [{ current: 1, pageSize: 10 }, {}],
    }
  )

  const { submit, reset } = search

  interface TableData {
    id: React.Key
    info: string
    category: 'USER' | 'SYS'
    level: 'DEBUG' | 'INFO' | 'WORING' | 'ERROR' | 'FATAL'
    time: string
    flag_id: React.Key
  }
  const columns: ColumnsType<TableData> = [
    {
      title: 'id',
      dataIndex: 'id',
      width: 70,
      align: 'center',
    },
    {
      title: '信息',
      dataIndex: 'info',
    },
    {
      title: '详细时间',
      dataIndex: 'detail_time',
      width: 200,
      align: 'center',
    },
    {
      title: '类别',
      dataIndex: 'category',
      width: 100,
      align: 'center',
    },
    {
      title: '级别',
      dataIndex: 'level',
      width: 100,
      align: 'center',
    },
    {
      title: '日期',
      dataIndex: 'time',
      width: 150,
      align: 'center',
    },
    {
      title: '用户id',
      dataIndex: 'flag_id',
      width: 150,
      align: 'center',
    },
  ]

  interface PriceInputProps {
    value?: Dayjs
    onChange?: (value: string) => void
  }
  const MyDatePicker: React.FC<PriceInputProps> = ({ value, onChange }) => {
    const dateChangeHandle = (date: any, dateString: any) => {
      onChange?.(dateString)
    }
    if (!value) {
      const value1 = null
      return <DatePicker format="YYYY-MM-DD" onChange={dateChangeHandle} allowClear value={value1} />
    } else {
      const value1 = dayjs(value)
      return <DatePicker format="YYYY-MM-DD" onChange={dateChangeHandle} allowClear value={value1} />
    }
  }

  const searchForm = (
    <div style={{ margin: '0 20px' }}>
      <Form form={form} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Form.Item name="category" initialValue="" label="类别">
          <Select style={{ width: 120, marginRight: 16 }} onChange={submit}>
            <Option value="">全部</Option>
            <Option value="USER">用户</Option>
            <Option value="SYS">系统</Option>
          </Select>
        </Form.Item>
        <Form.Item name="level" initialValue="" label="级别">
          <Select style={{ width: 120, marginRight: 16 }} onChange={submit}>
            <Option value="">全部</Option>
            <Option value="DEBUG">DEBUG</Option>
            <Option value="INFO">INFO</Option>
            <Option value="WARN">WARN</Option>
            <Option value="ERROR">ERROR</Option>
            <Option value="FATAL">FATAL</Option>
          </Select>
        </Form.Item>
        <Form.Item name="time" initialValue="" label="日期">
          <MyDatePicker />
        </Form.Item>
        <Form.Item name="name" initialValue="" label="用户名" style={{ marginLeft: '15px' }}>
          <Input.Search placeholder="查询用户名" allowClear style={{ width: 240 }} onSearch={submit} />
        </Form.Item>
        <Button type="primary" style={{ margin: '0 10px' }} onClick={submit}>
          查询
        </Button>
        <Button onClick={reset}>重置</Button>
      </Form>
    </div>
  )
  console.log(tableProps)
  return (
    <div className={styles['log']}>
      {searchForm}
      <Table
        columns={columns}
        scroll={{ y: 700 }}
        rowKey="id"
        {...tableProps}
        pagination={{ ...tableProps.pagination, showQuickJumper: true, showSizeChanger: true }}
      />
    </div>
  )
}

export default SystemLog
