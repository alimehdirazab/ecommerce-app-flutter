import 'package:cached_network_image/cached_network_image.dart';
import 'package:ecommerce_frontend/core/ui.dart';
import 'package:ecommerce_frontend/data/models/product/product_model.dart';
import 'package:ecommerce_frontend/logic/services/formatter.dart';
import 'package:ecommerce_frontend/presentation/widgets/gap_widget.dart';
import 'package:ecommerce_frontend/presentation/widgets/primary_button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_carousel_slider/carousel_slider.dart';

class ProductDetailsScreen extends StatefulWidget {
  final ProductModel productModel;
  const ProductDetailsScreen({super.key, required this.productModel});

  static const String routeName = "ProductDetailsScreen";

  @override
  State<ProductDetailsScreen> createState() => _ProductDetailsScreenState();
}

class _ProductDetailsScreenState extends State<ProductDetailsScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("${widget.productModel.title}"),
        ),
        body: SafeArea(
            child: ListView(
          children: [
            SizedBox(
              height: MediaQuery.of(context).size.width,
              child: CarouselSlider.builder(
                itemCount: widget.productModel.images?.length ?? 0,
                slideBuilder: (index) {
                  String imageUrl = widget.productModel.images![index];
                  return CachedNetworkImage(
                    imageUrl: imageUrl,
                  );
                },
              ),
            ),
            const GapWidget(),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "${widget.productModel.title}",
                    style: TextStyles.heading3,
                  ),
                  Text(
                    Formatter.formatPrice(widget.productModel.price!),
                    style: TextStyles.heading2,
                  ),
                  const GapWidget(size: 10),
                  PrimaryButton(
                    onPressed: () {},
                    text: "Add To Cart",
                  ),
                  const GapWidget(size: 10),
                  Text("Description",
                      style: TextStyles.body2.copyWith(
                        fontWeight: FontWeight.bold,
                      )),
                  Text(
                    "${widget.productModel.description}",
                    style: TextStyles.body1,
                  ),
                ],
              ),
            ),
          ],
        )));
  }
}
