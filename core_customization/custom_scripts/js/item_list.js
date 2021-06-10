
frappe.listview_settings['Item'] = {
    onload: function (list_view) {
    listview.page.add_menu_item(__("Update Actual Qty"), function () {
        frappe.call({
            method:
            "core_customization.custom_scripts.python.item_list.update_actual_qty",
            freeze: true,
            freeze_message: __("Processing ..."),
            callback: function(data){
                if (r.message) {
                    frappe.msgprint(__("Actual Qty updated"))
                }
            }
        });
    });
}
}