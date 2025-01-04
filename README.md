<img width="809" alt="Screenshot 2025-01-04 at 17 32 43" src="https://github.com/user-attachments/assets/23237abd-a1aa-4073-a97f-d583cf771d23" />

<img width="1350" alt="Screenshot 2025-01-04 at 17 37 34" src="https://github.com/user-attachments/assets/2e248d04-c86a-4d40-968b-61b7e1d2774e" />


```markdown
# Modal AI Web Scraper

## Overview
**Modal AI Web Scraper** is a tool that combines web scraping capabilities with AI-powered analysis using Modal's advanced GPU infrastructure. This project enables users to input a URL, scrape its content, and perform AI analysis on the extracted data, all through a user-friendly web interface.

## Features
- **Web scraping** using server-side fetch API.
- **AI-powered content analysis** leveraging Modal's L40S GPU.
- **Real-time logging** and error handling.
- **User-friendly interface** built with React and Next.js.
- **Responsive design** powered by Tailwind CSS.

---

## Prerequisites
Ensure you have the following installed before starting:
- **Node.js** (v14 or later).
- **npm** or **yarn**.
- A **Modal account** with an API key.
- A **Vercel account** (for deployment).

---

## Installation

### 1. Clone the repository:
```bash
git clone https://github.com/yourusername/modal-ai-web-scraper.git
cd modal-ai-web-scraper
```

### 2. Install dependencies:
```bash
npm install
# or
yarn install
```

### 3. Set up environment variables:
Create a `.env.local` file in the root directory and add your Modal API key:
```env
MODAL_API_KEY=your_modal_api_key_here
```

---

## Usage

### Run the development server:
```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to access the application.

### Using the web scraper:
1. Enter a URL in the input field.
2. Click the **"Scrape and Analyze Content"** button.
3. Explore the results in the tabs below:
   - **Analysis Results**: AI-generated insights about the content.
   - **Raw HTML**: The scraped HTML content.
   - **Links**: List of links found on the page.
   - **Process Logs**: Detailed logs of the scraping and analysis process.

---

## Deployment

This project is optimized for deployment on **Vercel**. To deploy:
1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. Set the `MODAL_API_KEY` environment variable in your Vercel project settings.
4. Deploy your project.

---

## Project Structure
```plaintext
app/                 # Next.js app directory
api/                 # API routes for scraping and logging
page.tsx             # Main page component
components/          # Reusable React components
lib/                 # Utility functions and modules
public/              # Static assets
modal_functions.py   # Python script for Modal AI functions
```

---

## Contributing
We welcome contributions! Follow these steps to contribute:
1. **Fork** the repository.
2. Create a **new branch**: `git checkout -b feature/your-feature-name`.
3. Make your changes and **commit them**: `git commit -m 'Add some feature'`.
4. **Push** to the branch: `git push origin feature/your-feature-name`.
5. Submit a **pull request**.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgements
- **[Next.js](https://nextjs.org/)** for the React framework.
- **[Modal](https://modal.com/)** for AI infrastructure.
- **[Tailwind CSS](https://tailwindcss.com/)** for styling.
- **[Vercel](https://vercel.com/)** for hosting and deployment.

---

## Contact
For questions or feedback, open an issue on the [GitHub repository](https://github.com/yourusername/modal-ai-web-scraper).

**Happy scraping and analyzing!**
```
