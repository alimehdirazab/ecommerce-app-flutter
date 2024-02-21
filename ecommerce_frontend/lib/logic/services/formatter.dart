import 'package:intl/intl.dart';

class Formatter {
  static String formatPrice(int price) {
    final numberFormat = NumberFormat("PKR #,##,###");
    return numberFormat.format(price);
  }
}
