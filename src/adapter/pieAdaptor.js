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
    let header = data[0]
    let rowLength = data.length
   
    let xDim = {}
    let xCollection = {}
    let yCollection = {}
   
    let xIndex = header.indexOf(x[0]) // pie 中x只能为一个维度
    let yIndex = header.indexOf(y[0])
    if(xIndex === -1 || yIndex === -1) {
        return getNullOption()
    }

    // 遍历数据：一行行配置，因为第一行为维度行，所以会忽略该层
    for(let i = 1; i<rowLength; i++) {
        // 添加x轴的新值
        let xValue = data[i][xIndex]
        let yValue = parseInt(data[i][yIndex])
        if(!xCollection[xValue]) {
            xCollection[xValue] = xValue
        }
        if(!yCollection[xValue]) {
            yCollection[xValue] = yValue
        } else {
            yCollection[xValue] += yValue
        }
    }

    let xDimValue = Object.values(xCollection)
    let seriesData = []
    xDimValue.forEach(function(eachDimValue) {
        seriesData.push({value: yCollection[eachDimValue], name: xCollection[eachDimValue]})
    })

    return {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: Object.values(xCollection)
        },
        series: [
            {
                name: y[0],
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: seriesData,
            }
        ]
    }
}