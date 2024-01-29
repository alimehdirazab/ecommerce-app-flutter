import 'package:ecommerce_frontend/core/ui.dart';
import 'package:ecommerce_frontend/presentation/screens/auth/provider/login_provider.dart';
import 'package:ecommerce_frontend/presentation/widgets/gap_widget.dart';
import 'package:ecommerce_frontend/presentation/widgets/link_button.dart';
import 'package:ecommerce_frontend/presentation/widgets/primary_button.dart';
import 'package:ecommerce_frontend/presentation/widgets/primary_textfield.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  static const String routeName = "login";

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<LoginProvider>(context);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Ecommerce APP'),
        centerTitle: true,
        elevation: 0,
      ),
      body: SafeArea(
          child: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Text('Log In ', style: TextStyles.heading2),
          const GapWidget(),
          (provider.error != "")
              ? Text(
                  provider.error,
                  style: const TextStyle(color: Colors.red),
                )
              : const SizedBox(),
          const GapWidget(),
          PrimaryTextField(
            controller: provider.emailController,
            labelText: "Email Address",
          ),
          const GapWidget(),
          PrimaryTextField(
            obscureText: true,
            controller: provider.passwordController,
            labelText: "Password",
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              LinkButton(
                onPressed: () {},
                text: "Forget Password",
              ),
            ],
          ),
          const GapWidget(),
          PrimaryButton(
            onPressed: provider.logIn,
            text: (provider.isLoading) ? "..." : "log In",
          ),
          const GapWidget(),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                "Don't have an account? ",
                style: TextStyle(fontSize: 16),
              ),
              LinkButton(
                onPressed: () {},
                text: "Sign Up",
              ),
            ],
          )
        ],
      )),
    );
  }
}
