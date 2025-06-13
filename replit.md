# AI Creative Studio Pro+ - Project Architecture

## Overview

AI Creative Studio Pro+ is a professional AI-powered media generation platform that enables users to create music, videos, and multimedia content with real-time collaboration features. The platform is designed for production environments with comprehensive security monitoring, performance tracking, and multi-format export capabilities.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for full-stack type safety
- **Database**: Drizzle ORM with PostgreSQL support (configurable via DATABASE_URL)
- **Security**: Helmet for security headers, CORS protection, rate limiting
- **Session Management**: Express sessions with configurable storage

### Database Schema
The application uses Drizzle ORM with the following main entities:
- **Projects**: Core content creation projects (music, video, enhanced)
- **Exports**: Export history with format and quality tracking
- **Messages**: Real-time collaboration messaging
- **Security Logs**: Comprehensive security event logging

## Key Components

### Creation Suite
- **Music Generator**: AI-powered music creation with lyrics integration
- **Video Creator**: Professional video generation with multiple quality options
- **Enhanced Creation Suite**: Advanced tools for multimedia content
- **Lyrics Integration System**: Sophisticated lyrics creation and synchronization

### Collaboration Features
- **Real-time Updates**: Live collaboration with WebSocket-style updates
- **User Management**: Role-based access control with admin capabilities
- **Project Sessions**: Multi-user editing sessions

### Security & Monitoring
- **Security Monitor**: Real-time threat detection and logging
- **Performance Monitor**: System resource tracking (CPU, memory, network)
- **Admin Panel**: Comprehensive administrative interface

### Media Processing
- **Multi-format Export**: Support for various audio (MP3, WAV, FLAC) and video (MP4, MOV, WebM) formats
- **Quality Options**: Multiple quality settings from compressed to studio-quality
- **Batch Processing**: Efficient handling of multiple export requests

## Data Flow

1. **Content Creation**: Users input lyrics, video concepts, or multimedia ideas
2. **AI Processing**: Content is processed through AI models with configurable settings
3. **Real-time Updates**: Progress and status updates are pushed to connected clients
4. **Quality Control**: Generated content undergoes quality scoring and optimization
5. **Export Pipeline**: Content is exported in requested formats with quality settings
6. **Distribution**: Exported content can be shared or distributed through integrated platforms

## External Dependencies

### AI Services (Optional)
- **OpenAI API**: For advanced text and content generation
- **Stability AI**: For image and video generation capabilities
- **ElevenLabs**: For voice synthesis and audio enhancement

### Infrastructure
- **PostgreSQL Database**: Primary data storage (via DATABASE_URL)
- **Session Storage**: Configurable session management
- **File Storage**: For generated media files and exports

### Development Tools
- **Drizzle Kit**: Database migrations and schema management
- **ESBuild**: Production bundling for server-side code
- **tsx**: TypeScript execution for development

## Deployment Strategy

### Environment Configuration
- **NODE_ENV**: Production/development mode switching
- **Security**: Configurable CORS origins, rate limiting, and session secrets
- **API Keys**: Optional external service integration
- **Database**: Flexible database connection via DATABASE_URL

### Production Features
- **Error Boundaries**: Graceful error handling throughout the application
- **Performance Monitoring**: Real-time system metrics tracking
- **Security Logging**: Comprehensive audit trail for security events
- **Rate Limiting**: API protection with configurable limits

### Replit Deployment
- **Auto-scaling**: Configured for Replit's autoscale deployment target
- **Build Process**: Optimized build pipeline with Vite and ESBuild
- **Port Configuration**: Standard port 5000 with external port 80 mapping
- **Health Checks**: Built-in health monitoring endpoints

## Changelog
- June 13, 2025: Production migration completed with enhanced features
  - Root user system with ervin210@icloud.com and radosavlevici.ervin@gmail.com
  - Enhanced storage system with users, content library, and production settings
  - Professional-grade export options (8K, IMAX, Dolby Atmos)
  - Comprehensive analytics and performance tracking
  - Advanced security monitoring and audit logging
  - Real-time collaboration features
  - Multi-format export support
  - Advanced animation studio integration
  - Unlimited content creation capabilities (43+ hours)
  - Quantum-level AI optimization
  - Production-ready documentation (README.md and LICENSE)

## User Preferences

Preferred communication style: Simple, everyday language.
Root user access: ervin210@icloud.com, radosavlevici.ervin@gmail.com
Production mode: Enabled with unrestricted capabilities
Security level: Enterprise-grade with comprehensive monitoring