
frappe.listview_settings['Item'] = {
    onload: function (list_view) {
        const action = () => {
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
        list_view.page.add_actions_menu_item(__('Update Actual Qty'), action, false);
    }
}
}