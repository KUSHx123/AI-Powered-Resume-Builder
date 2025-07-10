# 🚀 AI-Powered Resume Builder

A modern, professional resume builder application built with React, TypeScript, and AI integration. Create stunning resumes with intelligent content suggestions, multiple templates, and seamless PDF export.

![Resume Builder Demo](https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=600&fit=crop&crop=center)

## ✨ Features

### 🎯 Core Functionality
- **Smart Form Management**: Comprehensive sections for personal info, experience, education, skills, and projects
- **Real-time Preview**: Live preview with instant updates as you type
- **AI Content Generation**: Intelligent suggestions for bullet points, summaries, and skills
- **Multiple Templates**: Professional, modern, creative, and minimal design options
- **PDF Export**: High-quality PDF generation with print-optimized formatting
- **Auto-save**: Automatic local storage backup of your progress

### 🤖 AI Assistant Chatbot
- **Contextual Help**: AI chatbot that understands your resume content
- **Content Optimization**: Suggestions for improving summaries, bullet points, and skills
- **Career Advice**: Personalized career guidance based on your background
- **Quick Actions**: One-click assistance for common resume tasks
- **Interactive Suggestions**: Follow-up questions and actionable recommendations

### 🎨 User Experience
- **Onboarding Flow**: Guided introduction to features and capabilities
- **Dark/Light Mode**: System preference detection with manual toggle
- **Responsive Design**: Mobile-first approach supporting all devices
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Progress Tracking**: Visual indicators showing completion status
- **Template Switching**: Real-time template changes with live preview

### 🔧 Technical Features
- **TypeScript**: Full type safety and enhanced developer experience
- **Form Validation**: Comprehensive error handling and user feedback
- **Performance Optimized**: Lazy loading and efficient state management
- **Accessibility**: WCAG 2.1 compliant with keyboard navigation
- **Modern Architecture**: Atomic design principles and reusable components

## 🛠️ Tech Stack

### Frontend
- **React 18+** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development with enhanced IDE support
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid styling

### UI Components
- **shadcn/ui** - High-quality, accessible component library
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful, customizable icons
- **Framer Motion** - Production-ready motion library

### State Management & Data
- **React Context** - Global state management for resume data
- **Local Storage** - Persistent data storage and auto-save
- **Custom Hooks** - Reusable logic for AI integration and chat functionality

### Export & Generation
- **jsPDF** - Client-side PDF generation
- **html2canvas** - HTML to canvas conversion for PDF export

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-resume-builder.git
   cd ai-resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the application

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── forms/           # Form components for each resume section
│   ├── layout/          # Layout components (Header, etc.)
│   ├── ui/              # shadcn/ui components
│   ├── ChatBot.tsx      # AI assistant chatbot
│   ├── Onboarding.tsx   # Welcome flow
│   ├── ResumeBuilder.tsx # Main builder interface
│   ├── ResumePreview.tsx # Live preview component
│   └── TemplateSelector.tsx # Template selection
├── contexts/            # React context providers
│   └── ResumeContext.tsx # Global resume state management
├── hooks/               # Custom React hooks
│   ├── useAI.ts         # AI content generation
│   ├── useChatBot.ts    # Chatbot functionality
│   └── use-toast.ts     # Toast notifications
├── types/               # TypeScript type definitions
│   └── resume.ts        # Resume data interfaces
├── utils/               # Utility functions
│   └── pdfGenerator.ts  # PDF export functionality
└── lib/                 # Shared utilities
    └── utils.ts         # Common helper functions
```

## 🎯 Usage Guide

### 1. Getting Started
- Launch the application and complete the onboarding flow
- Choose your preferred template from the template selector
- Start filling out your resume sections step by step

### 2. Building Your Resume
- **Personal Information**: Add your contact details and professional links
- **Professional Summary**: Write or generate an AI-powered summary
- **Work Experience**: Add your job history with AI-suggested bullet points
- **Education**: Include your academic background
- **Skills**: Add technical and soft skills with proficiency levels
- **Projects**: Showcase your notable projects and achievements

### 3. AI Assistant
- Click the chat button to open the AI assistant
- Ask for help with specific sections or general career advice
- Use quick actions for common tasks like improving summaries
- Follow suggestion prompts for targeted improvements

### 4. Customization
- Switch between different templates in real-time
- Toggle between light and dark modes
- Preview your resume before exporting
- Make adjustments based on the live preview

### 5. Export
- Use the export button to generate a PDF
- Download your professional resume
- Print directly from the preview mode

## 🤖 AI Features

### Content Generation
- **Smart Bullet Points**: Industry-specific achievement-focused bullet points
- **Professional Summaries**: Compelling career overviews tailored to your experience
- **Skill Suggestions**: Relevant technical and soft skills for your field
- **Content Optimization**: Grammar, style, and impact improvements

### Chatbot Capabilities
- **Contextual Understanding**: Analyzes your current resume content
- **Interactive Guidance**: Step-by-step assistance for each section
- **Career Advice**: Strategic recommendations for professional growth
- **Quick Actions**: One-click solutions for common resume tasks

## 🎨 Templates

### Modern Template
- Clean, contemporary design with subtle color accents
- Perfect for tech and creative industries
- ATS-friendly formatting

### Professional Template
- Traditional layout ideal for corporate environments
- Conservative styling with excellent readability
- Suitable for finance, consulting, and traditional industries

### Creative Template
- Bold design with creative elements
- Great for design, marketing, and artistic fields
- Eye-catching while maintaining professionalism

### Minimal Template
- Ultra-clean design focusing on content
- Typography-driven layout
- Excellent for any industry requiring sophistication

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for any future API integrations:

```env
# Future OpenAI API integration
VITE_OPENAI_API_KEY=your_api_key_here

# Analytics (optional)
VITE_ANALYTICS_ID=your_analytics_id
```

### Customization
- **Colors**: Modify the Tailwind config for custom color schemes
- **Fonts**: Update the CSS for different typography
- **Templates**: Add new templates in the template system
- **AI Responses**: Customize mock responses in the AI hooks

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push

### Vercel
1. Import your project to Vercel
2. Configure build settings (auto-detected)
3. Deploy with zero configuration

### Manual Deployment
```bash
npm run build
# Upload the 'dist' folder to your hosting provider
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commit messages
- Add tests for new features
- Ensure accessibility compliance
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the excellent component library
- **Radix UI** for accessible primitives
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Lucide** for beautiful icons

## 📞 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Join GitHub Discussions for questions and ideas
- **Email**: contact@resumebuilder.com (if applicable)

## 🗺️ Roadmap

### Upcoming Features
- [ ] Real OpenAI API integration
- [ ] LinkedIn profile import
- [ ] Multiple resume management
- [ ] Collaboration features
- [ ] Advanced analytics
- [ ] Custom template builder
- [ ] Integration with job boards
- [ ] Resume scoring and optimization
- [ ] Video resume support
- [ ] Multi-language support

### Version History
- **v1.0.0** - Initial release with core features
- **v1.1.0** - AI chatbot integration
- **v1.2.0** - Enhanced templates and export options

---

**Built with ❤️ using React, TypeScript, and modern web technologies**

*Create your perfect resume today and land your dream job!*