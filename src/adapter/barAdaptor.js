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
export default function(data, x, y) {
    if(x.length === 0 || y.length === 0) {
        // 必须x，y同时有值才显示
        return getNullOption()
    } else {
        let header = data[0]
        let rowLength = data.length
        // let colLength = data[0].length
       
        let xDim = {}
        let xIndex = header.indexOf(x[0]) // bar 中 x 只统计一个维度
        if(xIndex === -1) {
            return getNullOption
        }
        let xCollection = {}
        let yCollection = {}
        let yIndex = {}
        // 初始化y轴的值
        for(let j=0; j<y.length; j++) {
            let currYDim = y[j]
            yCollection[currYDim] = {}
            yIndex[currYDim] = header.indexOf(y[j])
        }
        // 遍历数据：一行行配置，因为第一行为维度行，所以会忽略该层
        for(let i = 1; i<rowLength; i++) {
            // 添加x轴的新值
            let xValue = data[i][xIndex]
            if(!xCollection[xValue]) {
                xCollection[xValue] = xValue
            }
            y.forEach(function(eachYDim) {
                let yValue = data[i][yIndex[eachYDim]]
                yCollection[eachYDim][xValue] = yCollection[eachYDim][xValue] ? yCollection[eachYDim][xValue] : 0
                yCollection[eachYDim][xValue] += parseInt(yValue, 10)
            })
        }

        var series = []
        for(let k=0; k<y.length; k++) {
            series.push({
                type: 'bar',
                name: y[k],
                data: Object.values(yCollection[y[k]])
            })
        }
    
        let options =  {
            xAxis: {
                data: Object.values(xCollection)
            },
            yAxis: {},
            legend: {
                data: y
            },
            series: series
        }
        return options
    }
}