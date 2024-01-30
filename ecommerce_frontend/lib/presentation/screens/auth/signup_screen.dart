import 'package:ecommerce_frontend/core/ui.dart';
import 'package:ecommerce_frontend/presentation/screens/auth/provider/signup_provider.dart';
import 'package:ecommerce_frontend/presentation/widgets/gap_widget.dart';
import 'package:ecommerce_frontend/presentation/widgets/link_button.dart';
import 'package:ecommerce_frontend/presentation/widgets/primary_button.dart';
import 'package:ecommerce_frontend/presentation/widgets/primary_textfield.dart';
import 'package:email_validator/email_validator.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  static const String routeName = "signup";

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<SignupProvider>(context);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Ecommerce APP'),
        centerTitle: true,
        elevation: 0,
      ),
      body: SafeArea(
          child: Form(
        key: provider.formKey,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            Text('Create Account ', style: TextStyles.heading2),
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
              validator: (value) {
                if (value == null || value.trim().isEmpty) {
                  return "Email Address is Required!";
                }
                if (!EmailValidator.validate(value.trim())) {
                  return "Invalid Email Address";
                }
                return null;
              },
              labelText: "Email Address",
            ),
            const GapWidget(),
            PrimaryTextField(
              obscureText: true,
              controller: provider.passwordController,
              validator: (value) {
                if (value == null || value.trim().isEmpty) {
                  return "Paasword is required!";
                }
                return null;
              },
              labelText: "Password",
            ),
            const GapWidget(),
            PrimaryTextField(
              obscureText: true,
              controller: provider.cPasswordController,
              validator: (value) {
                if (value == null || value.trim().isEmpty) {
                  return "Confirm Your Paasword!";
                }
                if (value.trim() != provider.passwordController.text.trim()) {
                  return "passwords do not match!";
                }
                return null;
              },
              labelText: "Confirm Password",
            ),
            const GapWidget(),
            PrimaryButton(
              onPressed: provider.createAccount,
              text: (provider.isLoading) ? "..." : "Create Account",
            ),
            const GapWidget(),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text(
                  "Already have an account ",
                  style: TextStyle(fontSize: 16),
                ),
                LinkButton(
                  onPressed: () {},
                  text: "Log In",
                ),
              ],
            )
          ],
        ),
      )),
    );
  }
}
