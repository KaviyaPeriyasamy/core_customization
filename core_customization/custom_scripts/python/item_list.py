from erpnext.stock.dashboard.item_dashboard import get_data
import frappe

@frappe.whitelist()
def update_actual_qty():
    item_list = frappe.get_list('Item')
    for row in item_list:
        res = get_data(row['name'])
        frappe.db.set_value('Item',{'name':row['name']},'actual_qty',sum([row['actual_qty'] for row in res]))
    return True