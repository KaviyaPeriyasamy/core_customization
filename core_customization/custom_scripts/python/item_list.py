from erpnext.stock.dashboard.item_dashboard import get_data
import frappe

@frappe.whitelist()
def update_actual_qty():
    item_list = frappe.get_list('Item')
    for row in item_list:
        res = get_data(row['name'])
        frappe.db.set_value('Item',{'name':row['name']},'actual_qty',sum([row['actual_qty'] for row in res]))
    return True

def update_price_list_rate():
    item_list = frappe.get_list('Item', {'price_list_rate': None})
    for row in item_list:
        price_list_rate = frappe.db.get_value('Item Price', {'item_code':row['name'], 'selling': 1}, 'price_list_rate')
        if price_list_rate:
            frappe.db.set_value('Item',{'name':row['name']},'price_list_rate', price_list_rate)