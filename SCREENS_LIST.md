# Danh sách toàn bộ các màn hình trong ứng dụng - eSIM Market

## 📊 Dashboard
- `/dashboard` - Tổng quan kinh doanh (Doanh thu, Đơn hàng, Số dư đại lý)

## 🛒 Marketplace (Chợ eSIM)
- `/marketplace/products` - Quản lý danh mục gói cước tập trung
- `/marketplace/pricing` - Cấu hình công cụ định giá (Pricing Engine)
- `/marketplace/inventory` - Theo dõi tồn kho mã kích hoạt/API

## 🏢 Upstream (Quản lý Nguồn cung)
- `/upstream/suppliers` - Danh sách nhà cung cấp eSIM toàn cầu
- `/upstream/supplier-products` - Mapping sản phẩm từ nhà cung cấp vào Chợ
- `/upstream/sync-logs` - Nhật ký đồng bộ API thượng nguồn

## 👥 Downstream (Quản lý Đại lý)
- `/downstream/agents` - Danh sách đại lý & đối tác API
- `/downstream/tiers` - Cấu hình cấp bậc đại lý (Platinum, Gold, Silver)
- `/downstream/api-keys` - Quản lý khóa truy cập API Gateway

## 💳 Finance (Tài chính & Ví)
- `/finance/wallets` - Quản lý ví tiền của các đại lý
- `/finance/transactions` - Lịch sử giao dịch, nạp tiền, mua hàng
- `/finance/reconciliation` - Báo cáo đối soát nhà cung cấp & đại lý

## 📋 Digital Orders (Quản lý Đơn hàng)
- `/orders/list` - Danh sách đơn hàng eSIM toàn hệ thống
- `/orders/[id]` - Chi tiết đơn hàng & trạng thái kích hoạt
- `/orders/activation-logs` - Nhật ký gọi API kích hoạt gói cước

## ⚙️ System (Hệ thống)
- `/system/users` - Danh sách người dùng nội bộ
- `/system/settings` - Cài đặt hệ thống (Tỷ giá, Phí vận hành, Webhook)

## 🔔 Notifications (Thông báo)
- `/notifications` - Thông báo hệ thống & Cảnh báo số dư/API

---

## Tổng kết kiến trúc 3M (Marketplace - Manager - Money)

### Phân loại theo module mới:
- **Marketplace Core**: 3 màn hình
- **Upstream Layer**: 3 màn hình
- **Downstream Layer**: 3 màn hình
- **Finance & Wallet**: 3 màn hình
- **Order Management**: 3 màn hình
- **System & Dashboard**: 3 màn hình

**Tổng số màn hình cốt lõi: 18 màn hình (Tối ưu hóa từ 36 màn hình cũ)**

