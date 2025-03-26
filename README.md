# +2KART - Ultra-Fast Grocery Delivery Service

A modern grocery delivery platform offering lightning-fast deliveries within 10-15 minutes, built with cutting-edge technology and optimized for efficiency.

## 🚀 Features

- **Ultra-Fast Delivery**: 10-15 minute delivery window
- **Real-Time Tracking**: Live driver location and order status
- **Smart Routing**: AI-powered delivery route optimization
- **Dark Store Model**: Efficient inventory management
- **AI Demand Prediction**: Dynamic stock management
- **Intuitive UI/UX**: Modern, responsive interface
- **Multiple Payment Options**: Secure payment processing
- **Loyalty Program**: Rewards and subscription plans
- **Real-Time Analytics**: Business insights and metrics

## 🛠 Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Redux Toolkit
- Socket.io Client

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- Redis
- Socket.io
- JWT Authentication

### Infrastructure
- AWS (EC2, S3, CloudFront)
- Docker
- Kubernetes
- CI/CD with GitHub Actions

## 🏗 Project Structure

```
+2kart/
├── frontend/           # Next.js frontend application
├── backend/           # Express backend server
├── mobile/           # React Native mobile app
├── docs/            # Project documentation
└── docker/          # Docker configuration files
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- Redis
- Docker (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/2kart.git
cd 2kart
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:
```bash
# Frontend
cp frontend/.env.example frontend/.env.local

# Backend
cp backend/.env.example backend/.env
```

4. Start the development servers:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd frontend
npm run dev
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests. 