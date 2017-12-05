export class OrderStatusUtil {
  static getOrderStatus(num) {
    switch (num) {
      case "1":
        return "Refunding";
        break;
      case "2":
        return "Changing";
        break;
      case "3":
        return "Refunded";
        break;
      case "4":
        return "Changed";
        break;
      case "105":
        return "Upcoming";
        break;
      case "106":
        return "Complete";
        break;
      case "107":
        return "To be paid";
        break;
      case "109":
        return "Canceled";
        break;
    }
  }

  static getOrderClass(status) {
    switch (status) {
      case "To be paid":
        return "notpay";
        break;
      case "Upcoming":
        return "upcoming";
        break;
      case "Complete":
        return "complete";
        break;
    }
  }

  static getSilverType(status) {
    switch (status) {
      case "1":
        return "Income";
        break;
      case "2":
        return "Expense";
        break;
      case "3":
        return "Expired";
        break;
      case "4":
        return "Refund";
        break;
      case "5":
        return "Exchange";
      case "7":
        return "Manual recharge";
        break;
    }
  }
  static getGoldType(status) {
    let type = {
      0: "Income",
      1: "Recharge",
      2: "Expense",
      3: "Withdraw",
      4: "Refund",
      5: "Exchange",
      6: "Cashback",
      7: "Manual recharge"
    };
    return type[status];
  }
}
