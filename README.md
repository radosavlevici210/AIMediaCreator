# AI Creative Studio Pro+

Professional AI-powered media generation platform for creating music, videos, and multimedia content with real-time collaboration features.

## Features

### Core Capabilities
- **AI Music Generation**: Create professional music tracks with multiple genres, instruments, and voice types
- **AI Video Creation**: Generate high-quality videos with customizable styles, formats, and effects
- **Real-time Collaboration**: Work together with team members in live sessions
- **Advanced Analytics**: Track performance metrics, views, downloads, and engagement
- **Multi-format Export**: Support for various audio and video formats
- **Distribution Tools**: Direct integration with major platforms

### Advanced Features
- **AI Learning System**: Self-improving AI with multi-model selection
- **Performance Monitoring**: Real-time system performance tracking
- **Security Monitoring**: Comprehensive security logging and threat detection
- **User Management**: Role-based access control with admin capabilities
- **Theme Support**: Light and dark mode with customizable themes

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, Node.js
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter
- **Styling**: Tailwind CSS with custom theme system
- **Icons**: Lucide React, React Icons
- **Build Tool**: Vite
- **Development**: tsx, TypeScript

## Getting Started

### Prerequisites
- Node.js 20 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-creative-studio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility libraries
│   │   ├── pages/          # Application pages
│   │   └── main.tsx        # Application entry point
├── server/                 # Backend Express server
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage interface
│   └── vite.ts            # Vite integration
├── shared/                # Shared types and schemas
│   └── schema.ts          # Database schema and types
└── package.json           # Project dependencies
```

## Configuration

### Environment Variables
- `NODE_ENV`: Development or production mode
- `PORT`: Server port (default: 5000)

### Theme Customization
The application supports custom themes through CSS variables defined in `client/src/index.css`.

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get specific project
- `PATCH /api/projects/:id` - Update project

### Analytics
- `GET /api/analytics/stats` - Get project statistics
- `GET /api/analytics/performance` - Get performance metrics

### Security
- `GET /api/security/logs` - Get security logs
- `POST /api/security/logs` - Log security event

## Development

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```

### Code Style
The project uses TypeScript with strict type checking. Follow the existing code patterns and use proper TypeScript types.

## Security Features

- Input validation using Zod schemas
- Rate limiting on API endpoints
- CORS protection
- Helmet.js security headers
- Session management with secure cookies
- Security event logging
- Suspicious activity detection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

All rights reserved. See LICENSE file for details.

## Support

For support and questions, contact the development team.

## Ownership

**Root Users**: 
- ervin210@icloud.com
- radosavlevici210@icloud.com

**Copyright**: © 2025 Ervin Remus Radosavlevici. All Rights Reserved.