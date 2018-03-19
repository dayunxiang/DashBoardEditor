function getNullOption() {
    return {
        xAxis: {},
        yAxis: {},
        series: []
    }
}

/**
 * 
 * @param {原始数据} data 
 * @param {显示的维度} x 
 * @param {显示的值} y 
 */
export default function (data, x, y, z) {
    let header = data[0]
    let rowLength = data.length

    let xCollection = {}
    let timeCollection = {}
    let yCollection = {}

    let timeIndex = header.indexOf(x[0]) // 横坐标，一般为时间线
    let xIndex = header.indexOf(x[1]) // 描述，一般为顶部种类描述
    let yIndex = header.indexOf(y[0]) // 比较的值

    // 处理选择参数补全情况
    if (xIndex === -1 || yIndex === -1 || timeIndex === -1) {
        return getNullOption()
    }


    for (let i = 1; i < rowLength; i++) {
        // 添加x轴的新值
        let xValue = data[i][xIndex]
        let timeValue = data[i][timeIndex]
        let yValue = parseInt(data[i][yIndex], 10)
        if (!xCollection[xValue]) {
            xCollection[xValue] = xValue
        }
        if (!timeCollection[timeValue]) {
            timeCollection[timeValue] = timeValue
        }
        // x
        if (typeof yCollection[xValue] === 'undefined') {
            yCollection[xValue] = {}
        }
        // c
        if (typeof yCollection[xValue][timeValue] === 'undefined') {
            yCollection[xValue][timeValue] = yValue
        } else {
            yCollection[xValue][timeValue] += yValue
        }
    }

    let seriesData = []
    let xValues = Object.values(xCollection)
    for (var i = 0; i < xValues.length; i++) {
        seriesData.push({
            name: xValues[i],
            type: 'line',
            stack: '总量',
            areaStyle: { normal: {} },
            data: Object.values(yCollection[xValues[i]])
        })
    }

    return {
        legend: {
            data: xValues // ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: Object.keys(timeCollection)// ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: seriesData
    };

}