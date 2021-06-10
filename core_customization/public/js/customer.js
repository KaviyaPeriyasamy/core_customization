frappe.ui.form.on('Customer', {
	refresh: function(frm){
		frm.trigger("show_summary");
	},
	show_summary: function(frm) {
        frappe.call({
            method:
            "core_customization.custom_scripts.python.customer.get_events",
            args: {
                'customer': frm.doc.name
            },
            callback: function(data){
                if (data.message) {
                    let section = frm.dashboard.add_section(
                        frappe.render_template('customer-dashboard', {
                            created_events: data.message[0],
                            assigned_events: data.message[1]
                        })
                    );
                    frm.dashboard.show();
                }
            }
        });
	}
});