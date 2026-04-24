# Danh sách toàn bộ các màn hình trong ứng dụng

## 📊 Dashboard
- `/dashboard` - Trang chủ/Dashboard

## 📦 Master Data (Dữ liệu chính)

### Suppliers (Nhà cung cấp)
- `/master-data/suppliers` - Danh sách nhà cung cấp
- `/master-data/suppliers/[id]` - Chi tiết nhà cung cấp

### Products (Sản phẩm)
- `/master-data/products` - Danh sách sản phẩm
- `/master-data/products/[id]` - Chi tiết sản phẩm

### Product Categories (Danh mục sản phẩm)
- `/master-data/product-categories` - Danh sách danh mục sản phẩm
- `/master-data/product-categories/[id]` - Chi tiết danh mục sản phẩm

### Supplier Pricing (Giá nhà cung cấp)
- `/master-data/supplier-pricing` - Danh sách giá nhà cung cấp

## 💰 Sales (Bán hàng)

### Quotations (Báo giá)
- `/sales/quotations` - Danh sách báo giá
- `/sales/quotations/create` - Tạo báo giá mới
- `/sales/quotations/[id]` - Chi tiết báo giá
- `/sales/quotations/[id]/edit` - Chỉnh sửa báo giá

### Purchase Orders (Đơn hàng mua)
- `/sales/purchase-orders` - Danh sách đơn hàng mua
- `/sales/purchase-orders/[id]` - Chi tiết đơn hàng mua
- `/sales/purchase-orders/[id]/edit` - Chỉnh sửa đơn hàng mua

## 📦 Warehouse (Kho)

### Inbound (Nhập kho)
- `/warehouse/inbound` - Danh sách phiếu nhập kho
- `/warehouse/inbound/[id]` - Chi tiết phiếu nhập kho

### Inventory (Tồn kho)
- `/warehouse/inventory` - Danh sách tồn kho
- `/warehouse/inventory/[id]` - Chi tiết tồn kho

### Outbound (Xuất kho)
- `/warehouse/outbound` - Danh sách phiếu xuất kho
- `/warehouse/outbound/[id]` - Chi tiết phiếu xuất kho
- `/warehouse/outbound/inventory` - Danh sách tồn kho xuất
- `/warehouse/outbound/inventory/[id]` - Chi tiết tồn kho xuất

## 🚚 Logistics (Hậu cần)

### Container Planning (Lập kế hoạch container)
- `/logistics/container-planning` - Danh sách kế hoạch container
- `/logistics/container-planning/[id]` - Chi tiết kế hoạch container

### Container Loading (Xếp container)
- `/logistics/container-loading` - Danh sách xếp container
- `/logistics/container-loading/[id]` - Chi tiết xếp container

### Logistics Overview
- `/logistics` - Tổng quan logistics

## 📄 Documents (Tài liệu)

### Invoices (Hóa đơn)
- `/documents/invoices` - Danh sách hóa đơn
- `/documents/invoices/[id]` - Chi tiết hóa đơn

### Packing Lists (Phiếu đóng gói)
- `/documents/packing-lists` - Danh sách phiếu đóng gói
- `/documents/packing-lists/[id]` - Chi tiết phiếu đóng gói

## ⚙️ System (Hệ thống)

### Users (Người dùng)
- `/system/users` - Danh sách người dùng
- `/system/users/import` - Import người dùng

### Settings (Cài đặt)
- `/system/settings` - Cài đặt hệ thống

## 🔔 Notifications (Thông báo)
- `/notifications` - Danh sách thông báo

---

## Tổng kết

**Tổng số màn hình: 36 màn hình**

### Phân loại theo chức năng:
- **List pages (Danh sách)**: 18 màn hình
- **Detail pages (Chi tiết)**: 14 màn hình
- **Create/Edit pages (Tạo/Chỉnh sửa)**: 4 màn hình

### Phân loại theo module:
- **Master Data**: 7 màn hình
- **Sales**: 6 màn hình
- **Warehouse**: 7 màn hình
- **Logistics**: 4 màn hình
- **Documents**: 4 màn hình
- **System**: 3 màn hình
- **Dashboard**: 1 màn hình
- **Notifications**: 1 màn hình
