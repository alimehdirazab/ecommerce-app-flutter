import 'package:ecommerce_frontend/core/ui.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:input_quantity/input_quantity.dart';

class CartScreen extends StatefulWidget {
  const CartScreen({super.key});

  static const String routeName = "cart";

  @override
  State<CartScreen> createState() => _CartScreenState();
}

class _CartScreenState extends State<CartScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Cart'),
      ),
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: ListView.builder(
                itemCount: 5,
                itemBuilder: (context, index) {
                  return ListTile(
                    title: const Text("Product Name"),
                    subtitle: const Text('price x quantity = total'),
                    trailing: InputQty(
                      onQtyChanged: (value) {},
                      maxVal: 99,
                      minVal: 2,
                      initVal: 1,
                    ),
                  );
                },
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Flexible(
                  child: Column(
                    children: [
                      Text('5 items',
                          style: TextStyles.body1
                              .copyWith(fontWeight: FontWeight.bold)),
                      Text(
                        'Total 9980',
                        style: TextStyles.heading3,
                      )
                    ],
                  ),
                ),
                SizedBox(
                  width: MediaQuery.of(context).size.width / 2.5,
                  child: CupertinoButton(
                    onPressed: () {},
                    padding:
                        EdgeInsets.all(MediaQuery.of(context).size.width / 22),
                    color: AppColors.accent,
                    child: const Text('Place Order'),
                  ),
                )
              ],
            )
          ],
        ),
      ),
    );
  }
}
