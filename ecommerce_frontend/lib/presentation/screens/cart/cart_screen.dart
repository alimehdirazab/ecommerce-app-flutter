import 'package:ecommerce_frontend/core/ui.dart';
import 'package:ecommerce_frontend/logic/cubits/cart_cubit/cart_cubit.dart';
import 'package:ecommerce_frontend/logic/cubits/cart_cubit/cart_state.dart';
import 'package:ecommerce_frontend/logic/services/formatter.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
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
        child: BlocBuilder<CartCubit, CartState>(builder: (context, state) {
          if (state is CartLoadingState && state.items.isEmpty) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }
          if (state is CartErrorState && state.items.isEmpty) {
            return Center(
              child: Text(state.message),
            );
          }
          return Column(
            children: [
              Expanded(
                child: ListView.builder(
                  itemCount: state.items.length,
                  itemBuilder: (context, index) {
                    final item = state.items[index];
                    final price = Formatter.formatPrice(item.product!.price!);
                    final quantity = Formatter.formatPrice(item.quantity!);
                    final total = item.product!.price! * item.quantity!;
                    return ListTile(
                      title: Text("${item.product?.title}"),
                      subtitle: Text('${price} x ${quantity} = ${total}'),
                      trailing: InputQty(
                        onQtyChanged: (value) {},
                        maxVal: 99,
                        minVal: 2,
                        initVal: item.quantity!,
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
                      padding: EdgeInsets.all(
                          MediaQuery.of(context).size.width / 22),
                      color: AppColors.accent,
                      child: const Text('Place Order'),
                    ),
                  )
                ],
              )
            ],
          );
        }),
      ),
    );
  }
}
