export default function(data, x, y) {
    // return {
    //     xAxis: {
    //         data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
    //     },
    //     yAxis: {},
    //     series: [{
    //         name: '销量',
    //         type: 'bar',
    //         data: [5, 20, 36, 10, 10, 20]
    //     }]
    // }
    let header = data[0]
    let rowLength = data.length
    // let colLength = data[0].length
    let xCollection = []
    let yCollection = {}
    let xIndex = header.indexOf(x[0])
    let yIndex = header.indexOf(y[0])
    if(xIndex !== -1 && yIndex !== -1) {
        for(let i=1; i<rowLength; i++) {
            let tempXDim = data[i][xIndex]
            if(xCollection.indexOf(tempXDim) === -1) {
                xCollection.push(tempXDim)
                yCollection[tempXDim] = 0
            }
            let tempXValue = data[i][yIndex]
            yCollection[tempXDim] += parseInt(tempXValue, 10)
         }
    }
    return {
        xAxis: {
            data: xCollection
        },
        yAxis: {},
        series: [{
            type: 'bar',
            data: Object.values(yCollection)
        }]
    }
}