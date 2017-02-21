# 使用说明

* 在终端输入tsc
* 在调试界面点击绿色三角或按F5键运行


#更新

* 重构了DisplayObject类 ，增加了alpha，scaleX，scaleY，rotation 的成员变量，以及与之相对应的global变量

* 重构了DisplayObject的draw方法，增加了render方法，其子类通过覆盖render方法来完成内部逻辑

* 在上一版本上改进了文本框和位图的显示方法，增加了矩阵matrix ，通过矩阵的变换对DisplayObject的平移旋转缩放进行修改

#问题

* Bitmap类中的Image加载有问题，如果只显示一帧的话，图片的rotation和scale不会有所改变，可能是setTransform的使用问题
