frappe.ui.form.on("Work Order", {

production_item:function(frm){
	
    frappe.call({
        method: 'barcode.custom_work_order.barcode',
        args: {
            item_code: frm.doc.production_item,
        },
        callback: (r) => {
            console.log("******************************",r.message)
            frm.doc.barcode=r.message
            frm.set_value("barcode",r.message)
            frm.refresh_fields("barcode")
        }
    });
	
},
before_save:function(frm){
	
    frappe.call({
        method: 'barcode.custom_work_order.barcode',
        args: {
            item_code: frm.doc.production_item,
        },
        callback: (r) => {
            console.log("******************************",r.message)
            frm.doc.barcode=r.message
            frm.set_value("barcode",r.message)
            frm.refresh_fields("barcode")
        }
    });
	
}
})