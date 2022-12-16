# TODO

- Time
  - [x] 時刻以外のstringが投げられたら例外を投げる
  - [x] 4:50の24:00に対するratio$(4+50/60)/24$を返す
- PiePointCalculator
  - [x] PiePointを返す
  - [x] 点G、半径R、StartRatio、 FinishRatioを与えると、点S、点F、点Gを返す
- Task
  - [ ] {label: "testTask", startTime: "0:00", finishTime: "12:00"}という入力から
  - [ ] "StartTime"は00:00~24:00の時間でなければならない
  - [ ] "FinishTime"は"StartTime"から24時間以内でなければならない
  - [ ] $0 \le \mathrm{StartRad, FinishRad} \le 2\pi$でなければならない
  - [ ] pointCalculaterを引数にpoint
- PieChart(Visualizer)
  - [ ] タスクの値を描画する
  - [ ]
