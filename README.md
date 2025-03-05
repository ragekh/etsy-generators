# Etsy AI Generators (v1.0.0)

A collection of AI-powered tools to help Etsy sellers optimize their shops and listings. This project has reached version 1.0.0 with a consistent user experience across all generators.

## Features

This application provides eight AI-powered generators for Etsy sellers:

1. **Shop Name Generator** - Create unique and memorable names for your Etsy shop
2. **Product Description Generator** - Write compelling product descriptions that sell
3. **Product Keywords Generator** - Find the perfect keywords to improve visibility
4. **Listing Title Generator** - Create catchy, SEO-friendly listing titles
5. **Customer Response Generator** - Craft professional responses to customer inquiries and reviews
6. **Shop Bio Generator** - Create a compelling shop bio to attract customers
7. **Promotion Text Generator** - Generate text for sales, discounts, or social media promotions
8. **Shop Announcement Generator** - Create announcements for shop updates and vacations

## Tech Stack

### Backend
- Node.js
- Express.js
- OpenAI API (via OpenRouter)

### Frontend
- Next.js
- React
- Tailwind CSS
- Axios

## Project Structure

```
etsy_generators/
├── backend/
│   ├── middleware/
│   │   └── validation.js
│   ├── routes/
│   │   ├── announcement.js
│   │   ├── customer-response.js
│   │   ├── description.js
│   │   ├── index.js
│   │   ├── keywords.js
│   │   ├── promotion.js
│   │   ├── shop-bio.js
│   │   ├── shop-name.js
│   │   └── title.js
│   ├── utils/
│   │   └── ai.js
│   ├── .env
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── components/
│   │   ├── CopyButton.js
│   │   ├── CharacterCounter.js
│   │   ├── Icons.js
│   │   ├── Layout.js
│   │   └── LoadingSpinner.js
│   ├── pages/
│   │   ├── announcement.js
│   │   ├── customer-response.js
│   │   ├── description.js
│   │   ├── index.js
│   │   ├── keywords.js
│   │   ├── promotion.js
│   │   ├── shop-bio.js
│   │   ├── shop-name.js
│   │   └── title.js
│   ├── public/
│   ├── styles/
│   │   └── globals.css
│   ├── next.config.js
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/etsy_generators.git
   cd etsy_generators
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Create a `.env` file in the backend directory with the following content:
   ```
   OPENROUTER_API_KEY=your_openrouter_api_key
   PORT=5001
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to http://localhost:3000 (or http://localhost:3001 if port 3000 is in use)

## Deployment

### Backend Deployment

The backend can be deployed to platforms like Heroku, AWS, or DigitalOcean.

### Frontend Deployment

The frontend can be deployed to Vercel, Netlify, or any other static site hosting service.

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the generated `out` directory to your hosting service.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Changelog

### Version 1.0.0 (2025-05-03)
- Achieved consistent user experience across all generators
- Added regeneration functionality to all generators
- Added copy button for easy copying of generated content
- Added character counter for both input forms and results
- Improved loading states with spinners and visual feedback
- Added SEO component with schema.org structured data
- Added smooth scrolling to results when they're generated
- Updated backend routes to handle timestamp parameter for regeneration