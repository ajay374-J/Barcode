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
            method: 'barcode.custom_purchase_receipt.barcode_item',
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