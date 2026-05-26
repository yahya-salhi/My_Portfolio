# Yahya Salhi - Portfolio Website

A modern, responsive portfolio website built with React.js, showcasing my skills, projects, and professional experience as a Full Stack Developer.

## 🌟 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Interactive 3D Elements**: Three.js integration for engaging visual effects
- **Real-time GitHub Integration**: Live data from GitHub API showing repositories and statistics
- **Dynamic Content**: Automated project showcase from GitHub repositories
- **Professional Sections**: About, Skills, Experience, Education, Projects, and Contact
- **Smooth Animations**: Framer Motion for fluid page transitions and interactions

## 🚀 Live Demo

Visit the live portfolio: [https://yahya-salhi.github.io/My_Portfolio/](https://yahya-salhi.github.io/My_Portfolio/)

## 🛠️ Built With

- **Frontend Framework**: React.js 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js with React Three Fiber
- **Animations**: Framer Motion
- **Icons**: FontAwesome
- **Email Service**: EmailJS
- **Development**: TypeScript support

## 📋 Sections

### 1. Hero Section

- Personal introduction with animated 3D computer model
- Professional title and brief description

### 2. About Section

- Detailed personal and professional overview
- Service offerings and specializations

### 3. Skills Section

- Comprehensive technical skills with proficiency levels
- Categorized by Frontend, Backend, Tools, and Frameworks
- Interactive progress bars and additional competencies

### 4. Experience Section

- Professional work experience timeline
- Detailed descriptions of roles and responsibilities

### 5. Education Section

- Learning journey and educational background
- Self-taught development path and achievements

### 6. Tech Stack Section

- Interactive 3D technology icons
- Visual representation of technical expertise

### 7. Projects Section

- Showcase of real GitHub repositories
- Project descriptions, technologies used, and live links
- Direct links to source code

### 8. GitHub Stats Section

- Real-time GitHub statistics and activity
- Repository count, followers, stars, and forks
- Most used programming languages
- Recent contribution activity

### 9. Testimonials Section

- Client feedback and recommendations
- Professional endorsements

### 10. Contact Section

- Contact form with EmailJS integration
- 3D Earth model with interactive elements
- Social media links and professional profiles

## 🔧 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yahya-salhi/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── desktop_pc/          # 3D model assets
│   ├── planet/              # 3D planet assets
│   └── logo.svg
├── src/
│   ├── assets/              # Images and icons
│   ├── components/          # React components
│   │   ├── canvas/          # 3D canvas components
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Education.jsx
│   │   ├── Experience.jsx
│   │   ├── Feedbacks.jsx
│   │   ├── GitHubStats.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Skills.jsx
│   │   ├── Tech.jsx
│   │   └── Works.jsx
│   ├── constants/           # Data and configuration
│   ├── hoc/                 # Higher-order components
│   ├── utils/               # Utility functions
│   │   ├── github.js        # GitHub API integration
│   │   └── motion.js        # Animation variants
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── styles.js
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🔗 GitHub Integration

The portfolio features real-time GitHub integration that automatically fetches:

- **Repository Data**: Latest repositories with descriptions and technologies
- **Contribution Statistics**: Commit activity and contribution patterns
- **Language Statistics**: Most used programming languages across projects
- **Profile Information**: Follower count, repository count, and profile details

### GitHub API Features

- Automatic project showcase from your repositories
- Real-time statistics and activity tracking
- Language usage analytics
- Repository filtering (excludes forks)
- Error handling and fallback data

## 🎨 Customization

### Personal Information

Update your personal information in `src/constants/index.js`:

```javascript
// Update services, experiences, projects, and testimonials
export const services = [...];
export const experiences = [...];
export const projects = [...];
export const testimonials = [...];
```

### GitHub Integration

The GitHub username is configured in `src/utils/github.js`:

```javascript
const GITHUB_USERNAME = "yahya-salhi"; // Update with your username
```

### Styling

- Colors and themes: `tailwind.config.js`
- Custom styles: `src/index.css`
- Component styles: `src/styles.js`

### 3D Models

- Computer model: `public/desktop_pc/`
- Planet model: `public/planet/`

## 📧 Contact Form Setup

The contact form uses EmailJS for sending emails. To set it up:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service and template
3. Update the EmailJS configuration in the Contact component

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA

### GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add deploy script to package.json
3. Run: `npm run deploy`

## 🔧 Environment Variables

Create a `.env` file for sensitive data:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:

- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## ⚡ Performance Optimizations

- **Code Splitting**: Lazy loading of components
- **Image Optimization**: Optimized assets and lazy loading
- **Bundle Optimization**: Vite's built-in optimizations
- **3D Model Optimization**: Efficient Three.js rendering
- **API Caching**: GitHub API response caching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Yahya Salhi**

- GitHub: [@yahya-salhi](https://github.com/yahya-salhi)
- LinkedIn: [Salhi Yahya](https://linkedin.com/in/salhi-yahya-365176168)
- Upwork: [Yahya Salhi](https://www.upwork.com/freelancers/~01fde061103dd6cd24)

## 🙏 Acknowledgments

- Three.js community for 3D graphics inspiration
- React Three Fiber for seamless React-Three.js integration
- Framer Motion for smooth animations
- Tailwind CSS for utility-first styling
- The open-source community for amazing tools and libraries

## 📈 Future Enhancements

- [ ] Blog section integration
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] Advanced GitHub analytics
- [ ] Project filtering and search
- [ ] Performance monitoring dashboard
- [ ] SEO optimization improvements
- [ ] Progressive Web App (PWA) features

---

⭐ **If you found this portfolio helpful, please give it a star!** ⭐
