# Bài toán

```
Admin
    - Dashboard: Trang tổng quan
    - Users: Người dùng
     + List
     + Thêm
     + Sửa
     + Xóa
    - Products: Sản phẩm
     + List
     + Thêm
     + Sửa
     + Xóa
    - Orders: Đơn hàng
     + List
     + Thêm
     + Sửa
     + Xóa
```

Permission:

- products.list --> Xem danh sách sản phẩm
- products.create --> Thêm sản phẩm

Middleware:

- AuthMiddleware
- AdminMiddleware

Phân quyền:

type => ADMIN => Full quyền
type => STAFF => Chịu ảnh hưởng bởi dữ liệu của RBAC

Endpoint:

GET /api/admin/roles
POST /api/admin/roles
Body:
{
"name": "Manager",
"permissions": ["products.list", "products.create"]
}
