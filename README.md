正在学习Redux...

该项目为一个练手项目，为一个可视化仪表盘编辑器

## 目标功能

- [x] 引入echart，允许调整组件属性
- [x] 生成JSON格式配置信息，支持导入导出

#### 后续

- [x] 组件全屏
- [x] 组件间拖拽交换位置等

- [ ] 多数据面板 
- [ ] 数据适配层 && 数据调试层
- [ ] 栅格可配置（非24栅格）
- [ ] 导出图片

## 技术栈或类库

- react
- redux
- react-router
- react-dnd
- ant-design
- echart
- ...

## 其他

Q：以后有什么拓展打算？

A：首先，这是一个热身项目。假若要说目标，其实是有抄袭原型的。参考[网易有数](https://youdata.163.com/index/video)。之前简单提及数据展示的问题，指的不是redux中的状态变更，而是基于`异构系统`->`多维数据`中的数据展示，说白了，就是作为`BI`的一小部分，提供一个前端应用，以支持可视化。