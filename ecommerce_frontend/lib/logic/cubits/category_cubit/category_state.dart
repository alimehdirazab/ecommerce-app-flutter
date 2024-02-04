import 'package:ecommerce_frontend/data/models/category/category_model.dart';

abstract class CategoryState {
  final List<CategoryModel> category;
  CategoryState(this.category);
}

class CategoryInitialState extends CategoryState {
  CategoryInitialState() : super([]);
}

class CategoryLoadingState extends CategoryState {
  CategoryLoadingState(super.category);
}

class CategoryLoadedState extends CategoryState {
  CategoryLoadedState(super.category);
}

class CategoryErrorState extends CategoryState {
  final String message;
  CategoryErrorState(this.message, super.category);
}
