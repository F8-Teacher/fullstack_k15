# Cách NextJS Render

## Server Component

- Render ở phía server (NextServer) --> Trả về html cho trình duyệt (Response body)
- Nextjs trả về React Server Component Payload (RSC Payload) chứa 1 số thông tin để hướng dẫn cho trình duyệt xử lý 1 số thao tác phía client (Giá trị props, vị trí các client component). Hay nói cách khác: Cấu trúc cây component

## Client Component

- Giai đoạn tải trang lần đầu: Xảy ra quá trình prerender (Render bộ khung)
- Trình duyệt tải bundle size js về (Code đã biên dịch của client component, thư viện React, các thư viện đã import)
- React sẽ tiến hành quá trình Hydrate phía trình duyệt (Gắn sự kiện, state,... vào mã html đã trả về) ==> Giúp react sống lại ở phía trình duyệt
- Hydrate phải dựa vào RSC Payload để thực hiện gắn đúng vị trí, đúng giá trị props,...

Chỉ nên chuyển thành client component khi bắt buộc (Giảm bundle size tải về, giảm gánh nặng trình duyệt)

## Navigation

- Lần đầu có RSC Payload của trang hiện tại
- Khi navigate (Bấm vào Link) ==> Gọi API đến trang mới ==> Lấy về RSC Payload của trang mới ==> So sánh với RSC Payload của trang cũ ==> Tìm điểm khác nhau ==> React DOM chỉ cập nhật nội dung thay đổi
