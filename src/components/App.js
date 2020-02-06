/*
 * Maintained by jemo from 2020.2.1 to now
 * Created by jemo on 2020.2.1 12:21:29
 * App
 */

import React, { Component } from 'react'
import axios from '../config/axios'
import Chart from 'react-apexcharts'
import Dialog from '@material-ui/core/Dialog'
import CircularProgress from '@material-ui/core/CircularProgress'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      areaTree: [],
      chinaDayList: [],
      chinaDayAddList: [],
      chinaTotal: {},
      lastUpdateTime: '',
      showLoading: false,
    }
  }

  handleShowLoading = () => {
    this.setState({
      showLoading: true,
    })
  }

  handleCloseLoading = () => {
    this.setState({
      showLoading: false,
    })
  }

  async componentDidMount() {
    try {
      this.handleShowLoading()
      const response = await axios.get('/data')
      const {
        areaTree,
        chinaDayList,
        chinaDayAddList,
        chinaTotal,
        lastUpdateTime,
      } = response.data
      this.handleCloseLoading()
      this.setState({
        areaTree,
        chinaDayList,
        chinaDayAddList,
        chinaTotal,
        lastUpdateTime,
      })
    }
    catch(error) {
      console.error('AppComponentDidMountCatchError: ', error)
      this.handleCloseLoading()
    }
  }

  render() {
    const {
      chinaDayList = [],
      chinaDayAddList = [],
      showLoading,
    } = this.state
    const confirmData = []
    const suspectData = []
    const healData = []
    const deadData = []
    const confirmNewData = []
    const suspectNewData = []
    const healNewData = []
    const deadNewData = []
    for(let i = 0; i < chinaDayList.length; i++) {
      const dayData = chinaDayList[i]
      dayData.date = `2020.${dayData.date}`
      confirmData.push([
        dayData.date,
        dayData.confirm,
      ])
      suspectData.push([
        dayData.date,
        dayData.suspect,
      ])
      healData.push([
        dayData.date,
        dayData.heal,
      ])
      deadData.push([
        dayData.date,
        dayData.dead,
      ])
    }
    for(let i = 0; i < chinaDayAddList.length; i++) {
      const dayData = chinaDayAddList[i]
      dayData.date = `2020.${dayData.date}`
      confirmNewData.push([
        dayData.date,
        dayData.confirm,
      ])
      suspectNewData.push([
        dayData.date,
        dayData.suspect,
      ])
      healNewData.push([
        dayData.date,
        dayData.heal,
      ])
      deadNewData.push([
        dayData.date,
        dayData.dead,
      ])
    }
    const options = {
      chart: {
        id: 'cumulativeDataChart',
      },
      title: {
        text: '疫情累计数据',
        align: 'left'
      },
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeFormatter: {
            year: 'yyyy',
            month: 'MM 月',
            day: 'MM-dd',
          },
          datetimeUTC: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        x: {
          format: 'yyyy-MM-dd'
        }
      },
      legend: {
        offsetY: -5,
      },
    }
    const series = [
      {
        name: '确诊',
        data: confirmData,
      },
      {
        name: '疑似',
        data: suspectData,
      },
      {
        name: '治愈',
        data: healData,
      },
      {
        name: '死亡',
        data: deadData,
      },
    ]
    const newOptions = {
      chart: {
        id: 'newDataChart',
      },
      title: {
        text: '疫情新增数据',
        align: 'left'
      },
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeFormatter: {
            year: 'yyyy',
            month: 'MM 月',
            day: 'MM-dd',
          },
          datetimeUTC: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        x: {
          format: 'yyyy-MM-dd'
        }
      },
      legend: {
        offsetY: -5,
      },
    }
    const newSeries = [
      {
        name: '新增确诊',
        data: confirmNewData,
      },
      {
        name: '新增疑似',
        data: suspectNewData,
      },
      {
        name: '新增治愈',
        data: healNewData,
      },
      {
        name: '新增死亡',
        data: deadNewData,
      },
    ]
    return (
      <div>
        <div
          style={{
            padding: 20,
            fontSize: 20,
            backgroundColor: '#ecf0f1',
            marginBottom: 10,
          }}>
          新型冠状病毒肺炎数据
        </div>
        <Chart
          options={options}
          series={series}
          type='line'
        />
        <Chart
          options={newOptions}
          series={newSeries}
          type='line'
        />
        <div
          style={{
            marginTop: 10,
            fontSize: 12,
            paddingLeft: 10,
          }}>
          数据来源：
          <a
            href='https://news.qq.com//zt2020/page/feiyan.htm'>
            腾讯新闻
          </a>
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 12,
            paddingLeft: 10,
          }}>
          目计行网络技术支持
        </div>
        <Dialog
          open={showLoading}
          onClose={this.handleCloseLoading}>
          <CircularProgress
            size={30}
            style={{
              margin: 10,
            }}
          />
        </Dialog>
      </div>
    )
  }

}

export default App
