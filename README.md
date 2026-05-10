# FieldMind

FieldMind is an AI-powered voice clinical note generator designed for community health workers operating in low-resource settings. This application leverages Gemma 4 via the Google AI Studio API to streamline the process of clinical documentation, making it more efficient and accessible.

## Key Features

*   **Voice Recording with Live Transcript:** Capture patient interactions verbally and receive real-time transcription for accurate record-keeping.
*   **Photo Attachment for Visual Analysis:** Enhance clinical notes with visual context by attaching photos, aiding in comprehensive analysis.
*   **Automatic SOAP Note Generation:** Automatically generate structured SOAP (Subjective, Objective, Assessment, Plan) notes from recorded information.
*   **Gemma 4 Reasoning Chain Display:** Understand the AI's decision-making process with a transparent display of Gemma 4's reasoning chain.
*   **Urgency Classification:** Notes are automatically classified into Urgent, Routine, or Follow-up categories to prioritize patient care.
*   **Action Item Checklist:** Generate actionable checklists to ensure all necessary follow-up tasks are completed.
*   **Offline Note Storage in the Browser:** Store notes securely and accessibly within the browser, enabling functionality even without an internet connection.

## Tech Stack

*   **Frontend:** React
*   **Build Tool:** Vite

## Getting Started

### Prerequisites

*   Node.js 18 or higher

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/fieldmind.git
    cd fieldmind
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Environment Variables

Create a `.env` file in the root directory and add your Google AI Studio API key:

```
VITE_API_KEY=YOUR_GOOGLE_AI_STUDIO_API_KEY
```

### Running the Application

```bash
npm run dev
```

This will start the development server. Open your browser and navigate to `http://localhost:5173` (or the port indicated in your terminal).

### Building for Production

```bash
npm run build
```

This command builds the app for production to the `dist` folder.

## Deployment

This application can be deployed to platforms like Vercel. Ensure the `VITE_API_KEY` environment variable is set in your deployment environment.

## License

This project is open-source and available under the [MIT License](LICENSE).
