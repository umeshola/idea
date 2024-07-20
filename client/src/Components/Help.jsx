import React from 'react';

export default function Help() {
    return (
        <div className="p-6 max-w-2xl mx-auto bg-slate-200 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center text-gray-800">Welcome to Idea!</h1>
            <p className="mt-4 text-lg text-gray-700">
                Idea is an innovative platform designed for individuals to share, discuss, and develop their ideas. Whether you're looking to brainstorm, seek funding, or collaborate with others, our app has everything you need to turn your ideas into reality.
            </p>

            <h2 className="mt-6 text-2xl font-semibold text-gray-800">Key Features</h2>
            <ul className="mt-2 list-disc list-inside text-gray-700">
                <li className="mt-2">
                    <strong>Share Your Ideas:</strong> Post your ideas along with images to attract attention and feedback from the community.
                </li>
                <li className="mt-2">
                    <strong>Comment and Collaborate:</strong> Engage with other users by commenting on their ideas, providing constructive feedback, and exploring collaboration opportunities.
                </li>
                <li className="mt-2">
                    <strong>Live Chat:</strong> Connect with friends and fellow users in real-time to discuss ideas and strategies.
                </li>
                <li className="mt-2">
                    <strong>Find Collaborators:</strong> Users can express interest in working on ideas, while owners can accept or decline collaboration requests.
                </li>
                <li className="mt-2">
                    <strong>AI Assistance:</strong> Use our AI chatbot to generate new ideas, get insights on various topics, and receive guidance throughout your journey.
                </li>
            </ul>

            <h2 className="mt-6 text-2xl font-semibold text-gray-800">Getting Started</h2>
            <p className="mt-4 text-lg text-gray-700">
                To get started, simply create an account and begin sharing your ideas. You can browse through existing ideas, comment on them, and connect with other users who share your interests. Remember, the goal is to foster a community where everyone can contribute and innovate together!
            </p>

            <h2 className="mt-6 text-2xl font-semibold text-gray-800">Need Help?</h2>
            <p className="mt-4 text-lg text-gray-700">
                If you encounter any issues or have questions while using the app, feel free to reach out to our support team through the app's contact feature. We're here to help you make the most of your Idea experience!
            </p>
        </div>
    );
}
