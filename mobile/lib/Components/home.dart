import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile/Components/movies.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  void exo() {
    try {
      print("This is awesome!");
    } catch (err) {
      print(err);
    }
  }

  Future<http.Response> fetchAlbum() {
    try {
      return http.get(Uri.parse('https://yts.mx/api/v2/list_movies.json'));
    } catch (err) {
      print(err);
      throw err;
    } finally {
      print("Fetched!");
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(useMaterial3: false),
      home: Scaffold(
        backgroundColor: Colors.white,
        appBar: AppBar(
          title: const Text("VeloFlix"),
        ),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.all(10),
                  child: Column(children: [
                    const Text(
                      "Welcome to VeloFlix!",
                      style: TextStyle(
                        decoration: TextDecoration.none,
                        fontSize: 28,
                        color: Colors.black,
                      ),
                    ),
                    const TextField(
                      textAlign: TextAlign.center,
                      // controller: MoviesController,
                      decoration: InputDecoration(hintText: "Enter film!"),
                    ),
                    ElevatedButton(
                      onPressed: () {
                        Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (context) => const MoviePage(),
                          ),
                        );
                      },
                      child: const Text("Search!"),
                    ),
                    const Text("Something else!")
                  ]),
                )
              ],
            )
          ],
        ),
      ),
    );
  }
}
