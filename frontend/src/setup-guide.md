# Portfolio Integration Guide for VS Code

## 1. Create New React Project

```bash
# Create new project with Vite
npm create vite@latest ebenezer-portfolio -- --template react-ts
cd ebenezer-portfolio

# Install base dependencies
npm install
```

## 2. Install Required Dependencies

```bash
# Core animation and icons
npm install motion lucide-react

# Utility libraries  
npm install clsx tailwind-merge

# Install Tailwind CSS v4
npm install tailwindcss@next @tailwindcss/vite@next

# If you want to use shadcn/ui components (recommended)
npx shadcn@latest init
npx shadcn@latest add button card badge separator input textarea label
```

## 3. Configure Vite (vite.config.ts)

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
```

## 4. Update src/index.css

Replace the contents with your globals.css content (copy from the Figma project).

## 5. Create ImageWithFallback Component

Create `src/components/ImageWithFallback.tsx`:

```typescript
import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
}

export function ImageWithFallback({ src, alt, fallback, ...props }: ImageWithFallbackProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      if (fallback) {
        setImageSrc(fallback);
      }
    }
  };

  return (
    <img
      {...props}
      src={imageSrc}
      alt={alt}
      onError={handleError}
    />
  );
}
```

## 6. Add Your Profile Image

1. Create an `src/assets/images/` folder
2. Add your profile image there (e.g., `profile.jpg`)
3. Update the import in App.tsx from:
   ```typescript
   import profileImage from 'figma:asset/8ed14f983811b5d3116b3fd3ad5e273f96ea5de3.png';
   ```
   to:
   ```typescript
   import profileImage from './assets/images/profile.jpg';
   ```

## 7. Update App.tsx

Replace the ImageWithFallback import from:
```typescript
import { ImageWithFallback } from './components/figma/ImageWithFallback';
```
to:
```typescript
import { ImageWithFallback } from './components/ImageWithFallback';
```

## 8. Update Import Paths

Update all component imports to use relative paths:
```typescript
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
// ... etc
```

## 9. Start Development Server

```bash
npm run dev
```

## 10. Optional Enhancements

### Add a Custom Domain (for deployment)
Update `package.json` with build scripts for deployment to services like Netlify or Vercel.

### Add Form Handling
Consider integrating with services like:
- Formspree
- Netlify Forms  
- EmailJS

### Add Analytics
- Google Analytics
- Plausible Analytics

### Performance Optimization
- Lazy loading for images
- Code splitting for better performance

## Project Structure

```
ebenezer-portfolio/
├── public/
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── profile.jpg
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── label.tsx
│   │   └── ImageWithFallback.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
└── vite.config.ts
```

## Troubleshooting

### Common Issues:

1. **Motion import errors**: Make sure you're using `motion/react` not `framer-motion`
2. **Tailwind classes not working**: Ensure Tailwind CSS v4 is properly configured
3. **Component import errors**: Check that all shadcn/ui components are installed
4. **Image not loading**: Make sure your profile image is in the correct assets folder

### Deployment Options:

- **Netlify**: Drag and drop the `dist` folder after `npm run build`
- **Vercel**: Connect your GitHub repo for automatic deployments
- **GitHub Pages**: Use GitHub Actions for automated deployment