import 'package:flutter/material.dart';
import 'package:mobile/Components/home.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      debugShowMaterialGrid: false,
      home: Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              const Text(
                "Hello!",
                style: TextStyle(fontSize: 32),
              ),
              const Padding(
                padding: EdgeInsets.all(18),
                child: TextField(
                  decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    hintText: 'Enter a search term',
                  ),
                ),
              ),
              ElevatedButton(
                onPressed: () {
                  Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) {
                      return const MyHomePage(); // Create a separate widget for the second screen
                    },
                  ));
                },
                child: const Text("Login!"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
