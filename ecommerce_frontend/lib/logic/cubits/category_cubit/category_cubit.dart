import 'package:ecommerce_frontend/data/models/category/category_model.dart';
import 'package:ecommerce_frontend/data/repositories/category_repository.dart';
import 'package:ecommerce_frontend/logic/cubits/category_cubit/category_state.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class CategoryCubit extends Cubit<CategoryState> {
  CategoryCubit() : super(CategoryInitialState()) {
    _initialize();
  }

  final _categoryRepsitory = CategoryRepository();

  void _initialize() async {
    emit(CategoryLoadingState(state.category));
    try {
      List<CategoryModel> category =
          await _categoryRepsitory.fetchAllCategories();
      emit(CategoryLoadedState(category));
    } catch (ex) {
      emit(CategoryErrorState(ex.toString(), state.category));
    }
  }
}
