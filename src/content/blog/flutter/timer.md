---
title: 实现计时器和倒计时功能
published: 2025-03-28
description: "实现计时器和倒计时功能"
tags: ["Flutter"]
category: Flutter
draft: false
---
实现计时器和倒计时功能

# 计时器

```dart
import 'dart:async';

import 'package:flutter/material.dart';

class TimecountPage extends StatefulWidget {
  const TimecountPage({super.key});

  @override
  State<TimecountPage> createState() => _TimecountPageState();
}

class _TimecountPageState extends State<TimecountPage> {
  String timeString = "00:00:00";
  Stopwatch stopwatch = Stopwatch();
  late Timer timer;
  void start() {
    stopwatch.start();
    timer = Timer.periodic(const Duration(milliseconds: 100), update);
  }

  // 更新计时
  void update(Timer t) {
    if (stopwatch.isRunning) {
      setState(() {
        // 拼接时间字符串
        timeString =
            (stopwatch.elapsed.inMinutes % 60).toString().padLeft(2, "0") +
                ":" +
                (stopwatch.elapsed.inSeconds % 60).toString().padLeft(2, "0") +
                ":" +
                (stopwatch.elapsed.inMilliseconds % 1000 / 10)
                    .clamp(0, 99)
                    .toStringAsFixed(0)
                    .padLeft(2, "0");
      });
    }
  }

  // 停止计时
  void stop() {
    setState(() {
      timer.cancel();
      stopwatch.stop();
    });
  }

  // 重置计时
  void reset() {
    timer.cancel();
    stopwatch.reset();
    setState(() {
      timeString = "00:00:00";
    });
    stopwatch.stop();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('计时器'),
      ),
      body: Center(
        child: Column(
          children: [
            Expanded(
                flex: 2,
                child: Center(
                  child: Text(
                    '$timeString',
                    style: const TextStyle(
                        color: Colors.red,
                        fontSize: 32,
                        fontWeight: FontWeight.bold),
                  ),
                )),
            Expanded(
                flex: 2,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    ElevatedButton(
                        onPressed: () {
                          reset();
                        },
                        child: const Icon(Icons.refresh, size: 30)),
                    const SizedBox(
                      width: 30,
                    ),
                    ElevatedButton(
                        onPressed: () {
                          stopwatch.isRunning ? stop() : start();
                        },
                        child: Icon(
                            stopwatch.isRunning
                                ? Icons.pause
                                : Icons.play_arrow,
                            size: 30))
                  ],
                ))
          ],
        ),
      ),
    );
  }
}

```

# 倒计时

```dart
import 'dart:async';

import 'package:flutter/material.dart';

class TomatoPage extends StatefulWidget {
  const TomatoPage({super.key});

  @override
  State<TomatoPage> createState() => _TomatoPageState();
}

class _TomatoPageState extends State<TomatoPage> {
  static const int initialTime = 25 * 60 * 1000; // 25分钟（毫秒）
  int remainingTime = initialTime;
  Timer? timer;
  bool isRunning = false;
  void start() {
    if (isRunning) return;
    isRunning = true;
    timer = Timer.periodic(const Duration(milliseconds: 10), (t) {
      if (remainingTime > 0) {
        setState(() {
          remainingTime -= 10; // 每10毫秒递减
        });
      } else {
        stop();
        _showTimeUpDialog();
      }
    });
  }

  void stop() {
    timer?.cancel();
    isRunning = false;
  }

  void reset() {
    stop();
    setState(() {
      remainingTime = initialTime;
    });
  }

  void _showTimeUpDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text("时间到！"),
        content: const Text("番茄时钟完成，请休息一下！"),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("确定"),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    stop();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    int minutes = remainingTime ~/ 60000;
    int seconds = (remainingTime % 60000) ~/ 1000;
    int milliseconds = (remainingTime % 1000) ~/ 10;
    return Scaffold(
      appBar: AppBar(
        title: Text('番茄时钟'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              '$minutes:${seconds.toString().padLeft(2, '0')}.${milliseconds.toString().padLeft(2, '0')}',
              style: const TextStyle(
                  fontSize: 40, fontWeight: FontWeight.bold, color: Colors.red),
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ElevatedButton(
                  onPressed: reset,
                  child: const Icon(Icons.refresh, size: 30),
                ),
                const SizedBox(width: 30),
                ElevatedButton(
                  onPressed: () => isRunning ? stop() : start(),
                  child: Icon(isRunning ? Icons.pause : Icons.play_arrow,
                      size: 30),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

```

