import {mixinObjs, isSame} from './index'
import Vue from 'vue'

export function getInitRow(row) {
  return {
    index: null,
    align: 'flex-start',
    initHeight: row[0].height,
    showControllerBar: false,
    children: row.map(col => getInitCol({initCol: col.value}))
  }
}

export function getInitCol(mixinOptions) {
  return mixinObjs({
    title: null,
    col: 0,
    componentKey: null,
    initCol: 0,
    showChildrenControllerBar: false
  },
  mixinOptions)
}

export function PreviewDataToLayoutData(layoutData, componentDatas, rowMixin = {}, colMixin = {}) {
  console.log('layoutData---', layoutData)
  if(JSON.stringify(layoutData) === '{}') {
    return []
  }
  console.log(111)
  const {children: rows} = layoutData
  rows.forEach(row => {
    row = mixinObjs(row, rowMixin)
    let {children: cols} = row
    cols.forEach((col, colIndex) => {
      let currentComponent = componentDatas.find(isSame('componentKey', col)) || {}
      Vue.set(cols, colIndex, mixinObjs(col, currentComponent, colMixin))
    })
  })
  return layoutData
}

export function resetIndex(row, index) {
  row.index = index + 1
}