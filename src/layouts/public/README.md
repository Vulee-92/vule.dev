# Public Layout

Layout này được thiết kế cho giao diện người xem (public-facing pages) với header, footer và content area.

## Cấu trúc

```
src/layouts/public/
├── layout.tsx          # Layout chính với header và footer
├── content.tsx         # Component PublicContent để wrap content
├── css-vars.ts         # CSS variables cho layout
├── index.ts            # Export các components
└── components/
    └── public-header.tsx  # Header component với navigation
```

## Cách sử dụng

### 1. Sử dụng trong routing

```tsx
import { PublicLayout } from 'src/layouts/public';

// Trong routes/sections.tsx
{
  path: '/',
  element: (
    <PublicLayout>
      <Suspense fallback={renderFallback()}>
        <Outlet />
      </Suspense>
    </PublicLayout>
  ),
  children: [
    { index: true, element: <HomePage /> },
  ],
}
```

### 2. Sử dụng PublicContent trong pages

```tsx
import { PublicContent } from 'src/layouts/public';

export default function HomePage() {
  return (
    <PublicContent maxWidth="xl">
      {/* Your content here */}
      <Typography variant="h1">Welcome to our site</Typography>
    </PublicContent>
  );
}
```

### 3. Tùy chỉnh header

Header có thể được tùy chỉnh bằng cách:

- Chỉnh sửa `PublicHeader` component trong `components/public-header.tsx`
- Hoặc override slots trong layout:

```tsx
<PublicLayout
  slotProps={{
    header: {
      slots: {
        leftArea: <YourCustomHeader />,
      },
    },
  }}
>
  {children}
</PublicLayout>
```

## Tính năng

- **Responsive design**: Header và footer responsive trên mobile
- **Navigation menu**: Menu navigation với mobile hamburger menu
- **Auth buttons**: Sign In/Sign Up buttons
- **Footer**: Footer với company info, quick links và contact
- **CSS Variables**: Có thể tùy chỉnh spacing và styling

## CSS Variables

Layout sử dụng các CSS variables sau:

- `--layout-public-content-pt`: Padding top của content
- `--layout-public-content-pb`: Padding bottom của content  
- `--layout-public-content-px`: Padding horizontal của content

Có thể override trong `css-vars.ts` hoặc truyền qua props `cssVars`. 