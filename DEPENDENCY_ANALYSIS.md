# Application Dependency Analysis

## Core Framework
- **Angular**: ^20.3.0 (Latest version)
- **TypeScript**: ~5.9.2

## UI Libraries
- **PrimeNG**: ^20.3.0 (Latest version)
- **PrimeIcons**: ^7.0.0
- **Bootstrap**: ^5.3.8
- **@primeuix/themes**: ^1.2.5

## Reactive Programming
- **RxJS**: ~7.8.0

## Development Dependencies
- **@angular/cli**: ^20.3.8
- **@angular/build**: ^20.3.8
- **@angular/compiler-cli**: ^20.3.0
- **Karma**: ~6.4.0 (Testing)
- **Jasmine**: ~5.9.0 (Testing)
- **concurrently**: ^9.2.1
- **json-server**: ^1.0.0-beta.3

## Build Tools
- **tslib**: ^2.3.0

## Application Structure
- Angular Standalone Components
- SCSS for styling
- Bootstrap 5 Grid System
- PrimeNG Component Library
- Custom directives (Parallax, FadeIn)
- Service-based architecture

## Responsive Design Status
- **Current State**: Basic responsive breakpoints at 768px and 480px
- **Issues Identified**:
  1. Limited media query coverage
  2. Fixed sizes for many elements
  3. Grid layouts need better breakpoints
  4. Floating dock needs mobile optimization
  5. Typography scales need improvement
  6. Component-specific responsive issues

## Responsive Breakpoints Needed
- **Extra Small (xs)**: < 576px (Mobile)
- **Small (sm)**: ≥ 576px (Large Mobile)
- **Medium (md)**: ≥ 768px (Tablet)
- **Large (lg)**: ≥ 992px (Desktop)
- **Extra Large (xl)**: ≥ 1200px (Large Desktop)
- **XXL (xxl)**: ≥ 1400px (Extra Large Desktop)

