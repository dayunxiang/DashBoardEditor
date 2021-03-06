const pivotData = [
    ["年份", "月份", "大区", "项目", "负责人", "金额", "利润"],
    ["2013", "1", "浙江", "U8", "小明", "32", "3.2"],
    ["2013", "1", "广东", "U8", "小红", "5", "0.5"],
    ["2013", "2", "新疆", "Cloud", "小刚", "123", "12.3"],
    ["2013", "2", "吉林", "U8", "小刚", "14", "1.4"],
    ["2013", "2", "山东", "U8", "小刚", "143", "14.3"],
    ["2013", "2", "北京", "NC", "小红", "1", "0.1"],
    ["2013", "3", "西北", "NC", "小李", "432", "43.2"],
    ["2013", "3", "山东", "NC", "小明", "64", "6.4"],
    ["2013", "3", "重庆", "NC", "小李", "45", "4.5"],
    ["2013", "3", "湖北", "U8", "小李", "75", "7.5"],
    ["2013", "4", "河南", "U8", "小李", "36", "3.6"],
    ["2013", "4", "黑龙江", "NC", "小李", "42", "4.2"],
    ["2013", "5", "浙江", "U8", "小红", "53", "5.3"],
    ["2013", "5", "陕西", "NC", "小刚", "59", "4.2"],
    ["2013", "5", "陕西", "U8", "小明", "25", "2.5"],
    ["2013", "6", "青海", "NC", "小刚", "44", "4.2"],
    ["2013", "7", "安徽", "NC", "小刚", "45", "4.3"],
    ["2013", "7", "浙江", "NC", "小刚", "26", "2"],
    ["2013", "8", "江西", "U8", "小李", "41", "4.2"],
    ["2013", "9", "四川", "U8", "小刚", "48", "4.5"],
    ["2013", "10", "海南", "U8", "小李", "35", "3.5"],
    ["2013", "11", "新加坡", "NC", "小李", "45", "4.5"],
    ["2013", "11", "天津", "U8", "小明", "56", "5.6"],
    ["2013", "12", "重庆", "U8", "小李", "76", "7.6"],
    ["2013", "12", "广东", "NC", "小红", "87", "8.7"],
    ["2013", "12", "浙江", "U8", "小明", "54", "5.4"],
    ["2013", "12", "广东", "U8", "小李", "234", "23.4"],
    ["2013", "12", "福建", "U8", "小明", "24", "2.4"],
    ["2014", "1", "贵州", "NC", "小李", "67", "6.7"],
    ["2014", "1", "广西", "U8", "小李", "46", "4.6"],
    ["2014", "1", "河北", "U8", "小李", "52", "5.2"],
    ["2014", "2", "马来西亚", "U8", "小李", "20", "2"],
    ["2014", "2", "广东", "NC", "小明", "20", "2"],
    ["2014", "2", "云南", "Cloud", "小李", "20", "2"],
    ["2014", "2", "浙江", "NC", "小红", "200", "2"],
    ["2014", "3", "青海", "U8", "小李", "20", "2"],
    ["2014", "3", "内蒙古", "NC", "小李", "20", "2"],
    ["2014", "3", "湖南", "U8", "小明", "43", "4.3"],
    ["2014", "3", "江西", "U8", "小李", "23", "2.3"],
    ["2014", "4", "广东", "NC", "小李", "25", "2.5"],
    ["2014", "4", "海南", "NC", "小刚", "446", "2"],
    ["2014", "5", "陕西", "U8", "小红", "45", "4.5"],
    ["2014", "5", "陕西", "U8", "小明", "20", "2"],
    ["2014", "5", "福建", "U8", "小李", "20", "2"],
    ["2014", "6", "广西", "Cloud", "小李", "20", "2"],
    ["2014", "7", "山东", "U8", "小明", "20", "2"],
    ["2014", "7", "浙江", "U8", "小李", "65", "6.5"],
    ["2014", "8", "西藏", "Cloud", "小李", "40", "4"],
    ["2014", "9", "宁夏", "U8", "小红", "20", "2"],
    ["2014", "10", "甘肃", "U8", "小明", "30", "3"],
    ["2014", "11", "海南", "U8", "小李", "20", "2"],
    ["2014", "11", "湖北", "Cloud", "小李", "20", "2"],
    ["2014", "12", "广东", "U8", "小李", "20", "2"],
    ["2014", "12", "广东", "U8", "小李", "120", "12"],

    ["2015", "1", "浙江", "U8", "小明", "32", "3.2"],
    ["2015", "1", "广东", "U8", "小红", "5", "0.5"],
    ["2015", "2", "新疆", "Cloud", "小刚", "123", "12.3"],
    ["2015", "2", "吉林", "U8", "小刚", "14", "1.4"],
    ["2015", "2", "山东", "U8", "小刚", "143", "14.3"],
    ["2015", "2", "北京", "NC", "小红", "1", "0.1"],
    ["2015", "3", "西北", "NC", "小李", "432", "43.2"],
    ["2015", "3", "山东", "NC", "小明", "64", "6.4"],
    ["2015", "3", "重庆", "NC", "小李", "45", "4.5"],
    ["2015", "3", "湖北", "U8", "小李", "75", "7.5"],
    ["2015", "4", "河南", "U8", "小李", "36", "3.6"],
    ["2015", "4", "黑龙江", "NC", "小李", "42", "4.2"],
    ["2015", "5", "浙江", "U8", "小红", "53", "5.3"],
    ["2015", "5", "陕西", "NC", "小刚", "42", "4.2"],
    ["2015", "5", "陕西", "U8", "小明", "25", "2.5"],
    ["2015", "6", "青海", "NC", "小刚", "42", "4.2"],
    ["2015", "7", "安徽", "NC", "小刚", "43", "4.3"],
    ["2015", "7", "浙江", "NC", "小刚", "20", "2"],
    ["2015", "8", "江西", "U8", "小李", "42", "4.2"],
    ["2015", "9", "四川", "U8", "小刚", "45", "4.5"],
    ["2015", "10", "海南", "U8", "小李", "35", "3.5"],
    ["2015", "11", "新加坡", "NC", "小李", "45", "4.5"],
    ["2015", "11", "天津", "U8", "小明", "56", "5.6"],
    ["2015", "12", "重庆", "U8", "小李", "76", "7.6"],
    ["2015", "12", "广东", "NC", "小红", "87", "8.7"],
    ["2015", "12", "浙江", "U8", "小明", "54", "5.4"],
    ["2015", "12", "广东", "U8", "小李", "234", "23.4"],
    ["2015", "12", "福建", "U8", "小明", "24", "2.4"],
    ["2016", "1", "贵州", "NC", "小李", "67", "6.7"],
    ["2016", "1", "广西", "U8", "小李", "426", "4.6"],
    ["2016", "1", "河北", "U8", "小李", "52", "5.2"],
    ["2016", "2", "马来西亚", "U8", "小李", "20", "2"],
    ["2016", "2", "广东", "NC", "小明", "20", "2"],
    ["2016", "2", "云南", "Cloud", "小刚", "20", "2"],
    ["2016", "2", "浙江", "NC", "小红", "20", "2"],
    ["2016", "3", "青海", "U8", "小李", "120", "2"],
    ["2016", "3", "内蒙古", "NC", "小李", "20", "2"],
    ["2016", "3", "湖南", "U8", "小明", "43", "4.3"],
    ["2016", "3", "江西", "U8", "小刚", "23", "2.3"],
    ["2016", "4", "广东", "NC", "小李", "25", "2.5"],
    ["2016", "4", "海南", "NC", "小刚", "89", "2"],
    ["2016", "5", "陕西", "U8", "小红", "85", "4.5"],
    ["2016", "5", "陕西", "U8", "小明", "20", "2"],
    ["2016", "5", "福建", "U8", "小李", "1X`20", "2"],
    ["2016", "6", "广西", "Cloud", "小李", "20", "2"],
    ["2016", "7", "山东", "U8", "小明", "20", "2"],
    ["2016", "7", "浙江", "U8", "小李", "65", "6.5"],
    ["2016", "8", "西藏", "Cloud", "小李", "40", "4"],
    ["2016", "9", "宁夏", "U8", "小红", "20", "2"],
    ["2016", "10", "甘肃", "U8", "小明", "30", "3"],
    ["2016", "11", "海南", "U8", "小李", "20", "2"],
    ["2016", "11", "湖北", "Cloud", "小李", "20", "2"],
    ["2016", "12", "广东", "U8", "小李", "20", "2"],
    ["2016", "12", "广东", "U8", "小李", "120", "12"],

    ["2017", "1", "浙江", "U8", "小明", "32", "3.2"],
    ["2017", "1", "广东", "U8", "小红", "85", "0.5"],
    ["2017", "2", "新疆", "Cloud", "小刚", "123", "12.3"],
    ["2017", "2", "吉林", "U8", "小刚", "14", "1.4"],
    ["2017", "2", "山东", "U8", "小刚", "143", "14.3"],
    ["2017", "2", "北京", "NC", "小红", "1", "0.1"],
    ["2017", "3", "西北", "NC", "小李", "432", "43.2"],
    ["2017", "3", "山东", "NC", "小明", "64", "6.4"],
    ["2017", "3", "重庆", "NC", "小李", "45", "4.5"],
    ["2017", "3", "湖北", "U8", "小李", "75", "7.5"],
    ["2017", "4", "河南", "U8", "小李", "136", "3.6"],
    ["2017", "4", "黑龙江", "NC", "小李", "42", "4.2"],
    ["2017", "5", "浙江", "U8", "小红", "53", "5.3"],
    ["2017", "5", "陕西", "NC", "小刚", "42", "4.2"],
    ["2017", "5", "陕西", "U8", "小明", "25", "2.5"],
    ["2017", "6", "青海", "NC", "小刚", "42", "4.2"],
    ["2017", "7", "安徽", "NC", "小刚", "43", "4.3"],
    ["2017", "7", "浙江", "NC", "小刚", "20", "2"],
    ["2017", "8", "江西", "U8", "小李", "42", "4.2"],
    ["2017", "9", "四川", "U8", "小刚", "45", "4.5"],
    ["2017", "10", "海南", "U8", "小李", "35", "3.5"],
    ["2017", "11", "新加坡", "NC", "小李", "45", "4.5"],
    ["2017", "11", "天津", "U8", "小明", "56", "5.6"],
    ["2017", "12", "重庆", "U8", "小李", "76", "7.6"],
    ["2017", "12", "广东", "NC", "小红", "87", "8.7"],
    ["2017", "12", "浙江", "U8", "小明", "54", "5.4"],
    ["2017", "12", "广东", "U8", "小李", "234", "23.4"],
    ["2017", "12", "福建", "U8", "小明", "324", "2.4"],
    ["2018", "1", "贵州", "NC", "小李", "67", "6.7"],
    ["2018", "1", "广西", "U8", "小李", "46", "4.6"],
    ["2018", "1", "河北", "U8", "小李", "52", "5.2"],
    ["2018", "2", "马来西亚", "U8", "小李", "20", "2"],
    ["2018", "2", "广东", "NC", "小明", "20", "2"],
    ["2018", "2", "云南", "Cloud", "小李", "20", "2"],
    ["2018", "2", "浙江", "NC", "小红", "20", "2"],
    ["2018", "3", "青海", "U8", "小李", "20", "2"],
    ["2018", "3", "内蒙古", "NC", "小李", "20", "2"],
    ["2018", "3", "湖南", "U8", "小明", "43", "4.3"],
    ["2018", "3", "江西", "U8", "小李", "23", "2.3"],
    ["2018", "4", "广东", "NC", "小李", "25", "2.5"],
    ["2018", "4", "海南", "NC", "小刚", "40", "2"],
    ["2018", "5", "陕西", "U8", "小红", "45", "4.5"],
    ["2018", "5", "陕西", "U8", "小明", "20", "2"],
    ["2018", "5", "福建", "U8", "小李", "220", "2"],
    ["2018", "6", "广西", "Cloud", "小李", "20", "2"],
    ["2018", "7", "山东", "U8", "小明", "90", "2"],
    ["2018", "7", "浙江", "U8", "小李", "65", "6.5"],
    ["2018", "8", "西藏", "Cloud", "小李", "40", "4"],
    ["2018", "9", "宁夏", "U8", "小红", "20", "2"],
    ["2018", "10", "甘肃", "U8", "小明", "30", "3"],
    ["2018", "11", "海南", "U8", "小李", "20", "2"],
    ["2018", "11", "湖北", "Cloud", "小李", "20", "2"],
    ["2018", "12", "广东", "U8", "小李", "20", "2"],
    ["2018", "12", "广东", "U8", "小李", "120", "12"],
]

export default pivotData