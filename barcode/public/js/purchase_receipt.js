frappe.ui.form.on("Purchase Receipt", {
    scan_warehouse_barcode:function(frm){
        frappe.call({
            method: 'barcode.custom_purchase_receipt.scan_warehouse_barcode',
            args: {
                sc: frm.doc.scan_warehouse_barcode,
            },
            callback: (r) => {
                $.each(frm.doc.items , function(i, jvd) {
                    frappe.model.set_value(jvd.doctype, jvd.name, "warehouse", r.message);
                    frm.doc.scan_warehouse_barcode=""
                    frm.refresh_fields("scan_warehouse_barcode")
                });
            }
        });
    },
})
frappe.ui.form.on("Purchase Receipt Item", {

    item_code:function(frm,cdt,cdn){
    var row=locals[cdt][cdn]
    frappe.call({
        method: 'barcode.custom_purchase_receipt.barcode',
        args: {
            item_code: row.item_code,
        },
        callback: (r) => {
            row.item_barcode=r.message
            frm.refresh_fields("items")
        }
    });
    },
    uom:function(frm,cdt,cdn){
        var row=locals[cdt][cdn]
        frappe.call({
            method: 'barcode.custom_purchase_receipt.barcode_uom',
            args: {
                item_code: row.item_code,
                uom:row.uom
            },
            callback: (r) => {
                row.item_barcode=r.message
                frm.refresh_fields("items")
            }
        });
        },
})