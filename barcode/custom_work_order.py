import frappe

@frappe.whitelist()
def barcode(item_code):
    doc=frappe.get_doc("Item",item_code)
    barcodes=frappe.db.sql("""select barcode from `tabItem Barcode`  where parent='{0}'  and  uom='{1}' """.format(item_code,doc.stock_uom),as_dict=1)
    if barcodes:
        return barcodes[0].barcode
    else:
        barcode=frappe.db.sql("""select barcode from `tabItem Barcode`  where parent='{0}'  and  uom='' """.format(item_code),as_dict=1)
        if barcode:
            return barcodes[0].barcode

